# Task 5：檢視 dashboard {#observe-dashboard}

## 目標 {#goal}

從 Aspire dashboard 追蹤 Task 4 的同一次操作，使用 Console 與 Traces 理解呼叫順序、耗時及錯誤位置。

!!! tip "維護現場觀點"
    當流程卡住，維護團隊需要知道問題出在資訊不足、工具存取，還是某次交棒。追蹤記錄能協助定位，減少只看到「AI 失敗」卻不知道從何查起的情況。

## 步驟 {#steps}

### 1. 開啟 Aspire dashboard

回到執行 `aspire run` 的 Terminal，使用輸出中的 Aspire dashboard（儀表板）連結。
請在 **VM 內的瀏覽器**開啟，或回到 Task 1 已開啟的 dashboard。

![原 repo 的 dashboard 連結位置，示範從 Aspire 輸出開啟 dashboard](../assets/images/challenge-4-dashboard-link.png){ .workshop-figure width="1351" height="352" loading="lazy" }

*圖片 1：原始教材示意畫面，標示 Dashboard URL 的位置；實際連結請從自己的 Aspire Terminal 取得。*

### 2. 核對 Resources

確認 `app`、`dotnetworkflow` 與 `frontend` 仍在執行。
如果某個資源在 Task 4 後停止或變成不健康，先查看該資源的 Console。

![原 repo 的 Aspire dashboard Resources，示範資源與 endpoints 的檢視位置](../assets/images/challenge-4-dashboard-resources.png){ .workshop-figure width="3022" height="767" loading="lazy" }

*圖片 2：原始教材示意畫面；自己的資源狀態與 endpoints 可能不同。*

### 3. 查看 Console

開啟 **Console／Console logs**，選擇 `dotnetworkflow`，依 Task 4 的操作時間找出本次 request。
再查看 `app`，觀察 Python A2A 呼叫、初始化或資料存取問題。

先用 Task 4 記錄的時間與 Machine ID 找到入口，再依紀錄實際提供的工單 ID 與排程／備品結果核對同一次交棒。不要把其他次操作的成功訊息拼成這次的結果；若紀錄不足以關聯，標示「證據不足」並請講師協助。

可核對的重點包括：

- .NET 接到哪一筆範例機台 request。
- 實際建立的 Agent 數量；目前程式會記錄 `Workflow built with ... agents`。
- 是否看到 `Workflow built with 5 agents`；若 request 失敗，記下第一個錯誤及發生位置。
- A2A Agents 是否 discovery／呼叫成功，是否出現錯誤或工單不存在。

![原 repo 的 Aspire Console，示範檢視 workflow 與 agent 呼叫訊息](../assets/images/challenge-4-dashboard-console.png){ .workshop-figure width="2234" height="1634" loading="lazy" }

*圖片 3：原始教材示意畫面，示範在 Console 查看 logs；本次訊息依實際執行結果而定。*

### 4. 查看 Traces

開啟 **Traces**，以操作時間、服務與可用的 request 資訊找到同一次呼叫。
展開 trace 的追蹤區段（spans），觀察 workflow、Agent invocations、HTTP 或 tool 相關紀錄。

![原 repo 的 Aspire Traces，示範查看 spans 與呼叫時間](../assets/images/challenge-4-dashboard-traces.png){ .workshop-figure width="3043" height="1739" loading="lazy" }

*圖片 4：原始教材示意畫面；實際可見的 spans 依目前 instrumentation 而定。*

依畫面實際提供的資訊，回答：

1. Request 從哪個服務進入？
2. 哪些 Agent 呼叫屬於同一次操作？順序是否符合 sequential workflow？
3. 最長的 span 是哪一段？它代表模型、tool、HTTP 呼叫還是其他處理？
4. 若有失敗，哪個 span 或 log 提供第一個明確錯誤？

**回到維護交接來看：**診斷是否有依據，工單是否確實建立，排程與備品結果是否對應同一張工單？這些證據能幫助團隊判斷下一步要補資料、處理服務問題，還是交由負責人審核維護安排，而不是只停在「流程已完成」。

## 完成條件 {#checklist}

- [ ] 在 Console 找到本次 request，確認是否記錄 `Workflow built with 5 agents`，並確認有無錯誤；若有，記下第一個錯誤的位置。
- [ ] 在 Traces 找到對應時間與服務的 spans，以及可說明的呼叫順序與耗時。
- [ ] 區分 Agent output、tool result、HTTP 狀態與資料寫入證據，並說明五個 Agent 是否達到核對條件。

## 下一步 {#next}

閱讀 [結論](../review.md)，整理本次流程與觀察結果。

## 疑難排解 {#troubleshooting}

??? question "看不到本次 trace"
    確認 Task 4 真正呼叫 API，而不是只按了 `Load Demo`。
    核對服務、時間範圍與 Console 是否有本次 request，再請講師確認 OpenTelemetry 設定與資料接收。
    沒有 trace 不代表操作成功，也不能只依 UI 的完成字樣判定。

??? question "Logs 顯示五步完成，但某個工具結果失敗"
    流程執行結束與業務成功是兩件事。
    回到 [Task 4](task-4-run-workflow.md)，核對具體 tool result、工單 ID 與後續傳遞，記錄失敗而不是忽略它。
