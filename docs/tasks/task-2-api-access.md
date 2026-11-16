# Task 2：確認 Workflow API 連線 {#api-access}

## 目標 {#goal}

確認遠端桌面內的 workflow API 可以連線，並理解 frontend 要呼叫哪個 endpoint。

!!! tip "維護現場觀點"
    現場需要的不只是「API 有回應」，而是異常能轉成可供下一個角色接手的維護資訊。此步先排除連線與設定問題，後續再核對工單等實際成果。

## 步驟 {#steps}

### 1. 找到 dotnetworkflow 的 HTTP endpoint

在 Aspire dashboard 的 **Resources** 中，找到 `dotnetworkflow`。
目前原始 launch settings 的 HTTP API 使用 `http://localhost:5231`；
若講師交付的設定不同，以 Resources 顯示的 HTTP endpoint 為準。

### 2. 檢查 health endpoint

在 **VM 內的 Terminal** 執行：

```bash
curl --fail --silent --show-error http://localhost:5231/health
```

若 HTTP endpoint 使用其他 port，先將命令中的網址換成 Resources 顯示的值。
預期收到 HTTP 200 的 JSON，`status` 欄位值為 `"Configured"`，並包含執行當下的時間。這表示必要設定已通過格式與完整性檢查，不代表 Foundry、Cosmos DB 或五個 Agent 已實際連線並成功執行。

### 3. 理解 frontend 的 API URL

目前 AppHost 會將 `dotnetworkflow` 的 HTTP endpoint 提供給 frontend 的 `VITE_API_URL`。
在非 Codespaces 的環境，它使用 VM 內的服務網址，而不是 `*.app.github.dev`。

開啟 frontend 後，可以在畫面下方的 `Using VITE_API_URL` 核對。
實際 workflow 使用 `/api/analyze_machine/stream` 傳送資料，透過 Server-Sent Events（SSE）更新操作進度。
真正呼叫與觀察會在 Task 4 進行。

## 完成條件 {#checklist}

- [ ] 找到 `dotnetworkflow` 的 HTTP endpoint，並從 VM 內的 Terminal 發出 `/health` 請求。
- [ ] 收到 HTTP 200，且 JSON 的 `status` 為 `"Configured"`；了解這只代表設定檢查通過。
- [ ] 知道前端介面（frontend）的 `VITE_API_URL` 指向 workflow API，並能分辨 workflow API 與 Python app 的用途。

## 下一步 {#next}

進入 [Task 3：開啟 frontend](task-3-open-frontend.md)。

## 疑難排解 {#troubleshooting}

??? question "Connection refused"
    先確認 `dotnetworkflow` 正在執行，並核對 scheme、hostname 與 port。
    查看該資源的 Console 是否在啟動時失敗。不要在自己的筆電 Terminal 執行 VM 的 localhost 測試。

??? question "Health 有回應，frontend 卻出現 Failed to fetch"
    確認 frontend 是在 VM 內的瀏覽器開啟，且 `VITE_API_URL` 指向 `dotnetworkflow` 的正確 endpoint。
    在瀏覽器的 Network 中核對實際 Request URL，再看 `dotnetworkflow` logs 是否收到請求。
    若有 CORS 或 TLS 錯誤，記錄具體訊息並請講師處理，不要加入任意代理或停用驗證。

??? question "看到舊的 Codespaces 網址"
    確認是在講師交付的 Ubuntu 環境，並核對是否殘留 `CODESPACE_NAME`、
    `GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN` 或手動覆寫的 frontend 設定。
    請講師確認來源，不要直接照抄教材截圖中的範例 hostname。
