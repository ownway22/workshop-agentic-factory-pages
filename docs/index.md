# 導覽 {#overview .factory-title}

## 情境

本教材以晶圓製造工廠作為設備維護的說明情境。非預期停機可能影響產線；維護團隊必須釐清異常、安排具備合適技能的人員與時段、確認備品，並把診斷結果清楚交接。
這是一場以 **Microsoft Foundry、Microsoft Agent Framework 與 Aspire** 為主線的 hands-on workshop，觀察五個 Agents 如何把異常資訊整理成診斷、維修規劃、維護排程與備品準備。

實際操作沿用原始 repository 的輪胎製造範例資料，例如硫化溫度 `curing_temperature` 與週期時間 `cycle_time`。這些是合成遙測資料（synthetic telemetry），不是晶圓設備的真實讀值，也不代表實廠狀況。

<br/>

![示意圖：工廠設備異常經由五個 AI 助理轉為診斷、維修、排程與備品準備](assets/images/factory-maintenance-workflow.png){ .factory-maintenance-workflow width="2200" height="1100" loading="eager" fetchpriority="high" }

<br/>

### 五個 Agents 如何協作

| 順序 | Agent | 在維護情境中的角色 | 目前 Challenge 4 的呼叫方式 |
|---|---|---|---|
| 1 | Anomaly Classification Agent | 判斷異常與嚴重程度（severity） | Foundry Agent Service，使用 remote MCP tools |
| 2 | Fault Diagnosis Agent | 結合異常與知識，提出可能原因 | Foundry Agent Service，使用 MCP／knowledge |
| 3 | Repair Planner Agent | 整理維修需求、技能、備品與工單 | VM 內 .NET workflow 的流程內呼叫，使用 Cosmos DB tools |
| 4 | Maintenance Scheduler Agent | 根據工單與可用條件安排維護 | VM 內 Python service，透過 HTTP A2A 呼叫 |
| 5 | Parts Ordering Agent | 根據工單檢查與準備備品 | VM 內 Python service，透過 HTTP A2A 呼叫 |

## 目標

本次練習不連接實廠感測器（sensors），而是手動提交一筆**合成遙測資料（telemetry）**。我們將注意力放在資料如何在 Agents 之間傳遞，以及如何從工具呼叫（tool calls）、工單與追蹤記錄（traces）找到可核對的證據。完成五個 Tasks 後，你應能：

- 使用 Aspire 啟動 .NET、Python 與 frontend 組成的應用程式。
- 解釋五個 Agents 的分工，以及 sequential orchestration 的依賴順序。
- 分辨 Foundry 託管 Agents、VM 內的 .NET agent，以及 Python HTTP A2A 的呼叫邊界。
- 從 UI、Console 與 Traces 追蹤一次操作，而不只相信模型回答「已完成」。

## 步驟

每頁都提供操作、完成條件與疑難排解。若前置條件尚未滿足，請先向講師確認，不要跳過失敗步驟。完成條件是供自行核對的清單，網站不儲存學員進度。需要協助時，可先由全站 [疑難排解](troubleshooting.md)，若仍無法解決，請舉手讓講師知道。

| 頁面 | 你要做的事 | 要看到的結果 |
|---|---|---|
| [準備](prerequisites.md) | 確認遠端桌面、工具與既有環境 | 可以在指定 VM 內開啟 repository 與 Terminal |
| [Task 1：啟動 Aspire](tasks/task-1-start-aspire.md) | 啟動服務 | 可找到 frontend、workflow 與 Python service |
| [Task 2：確認 Workflow API 連線](tasks/task-2-api-access.md) | 在 VM 內檢查 API | `/health` 有回應，API URL 指向正確服務 |
| [Task 3：開啟 frontend](tasks/task-3-open-frontend.md) | 進入操作 UI | 看見 Machine ID、Telemetry 與五個 Agent 面板 |
| [Task 4：執行 workflow](tasks/task-4-run-workflow.md) | 觸發一筆合成異常 | 核對五步的實際輸出與 tool results |
| [Task 5：檢視 dashboard](tasks/task-5-observe-dashboard.md) | 查看 Console 與 Traces | 能說明同一次操作的呼叫順序與問題位置 |

---

## 下一步 {#next}

進入 [準備](prerequisites.md)。
