# 疑難排解 {#troubleshooting}

先找出失敗在哪個層次，再查看對應 Task 的詳細說明。不要以重建環境、連續重試或公開 API 取代調查。

## 快速定位 {#triage}

| 現象 | 先核對 | 詳細說明 |
|---|---|---|
| 沒有 VM、工具或正確的 repository | 講師交付、工具版本與根目錄 | [準備](prerequisites.md) |
| Aspire 啟動失敗、port 衝突、Python 初始化失敗 | Resources 與該資源的 Console | [Task 1 疑難排解](tasks/task-1-start-aspire.md#troubleshooting) |
| Connection refused、Failed to fetch、API 網址不對 | 瀏覽器是否在 VM 內、`dotnetworkflow` endpoint、`VITE_API_URL` | [Task 2 疑難排解](tasks/task-2-api-access.md#troubleshooting) |
| frontend 沒有出現 | Vite 的狀態與相依服務 | [Task 3 疑難排解](tasks/task-3-open-frontend.md#troubleshooting) |
| 401／403、Agent 初始化失敗、找不到工單、429 | 實際 pipeline、tool result、身分與資料設定 | [Task 4 疑難排解](tasks/task-4-run-workflow.md#troubleshooting) |
| 找不到這次 trace，或狀態與業務結果不一致 | 是否真的送出 request、時間與服務篩選 | [Task 5 疑難排解](tasks/task-5-observe-dashboard.md#troubleshooting) |

!!! warning "需授權：環境與雲端設定"
    學員可以檢查自己 VM 內的畫面與去識別化 logs；變更身分、roles、模型、network、共用資料或資源生命週期，交由講師或資源負責人處理。
    不要關閉 TLS 驗證、公開 VM ports，或停止不確定歸屬的程序。

## 回報問題的最小資訊 {#report}

請記錄：

1. 哪個 Task、哪個操作步驟。
2. 操作時間、服務名稱與範例機台 ID。
3. 預期結果與實際現象，必要時附經遮蔽的 HTTP 狀態或錯誤文字。
4. 已做過的檢查，以及是否可能重複提交過同一筆請求。

**不要附上** `.env`、keys、tokens、密碼、dashboard 登入網址、完整 traces 或真實人員資料。
若需要更完整的證據，依講師指定的受控方式提供。

## 下一步 {#next}

修正後回到原 Task 重新核對完成條件，不直接跳到最後。
若本次環境尚未排除問題，清楚記錄「未完成／證據不足」；停止或保留服務依講師指示，並參考 [結論](review.md)。
