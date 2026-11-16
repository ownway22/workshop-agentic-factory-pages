# Task 1：啟動 Aspire {#start-aspire}

## 目標 {#goal}

在遠端桌面中，啟動既有 multi-agent application，並找到 frontend、workflow API 與 Python Agents 的執行資源。

## 步驟 {#steps}

### 1. 啟動 Aspire 應用程式

回到遠端桌面，從 **repository 根目錄**，在 Ubuntu Terminal 執行：

```bash
cd challenge-4/agent-workflow
aspire run
```

保持這個 Terminal 開啟。若 Aspire 顯示選擇 launch profile，使用講師指定的設定。
首次啟動可能需要還原 .NET 套件與初始化服務；Python 與 frontend 相依套件須由講師預先準備。此 AppHost 不會自動執行 Python 或 npm 套件安裝。以輸出與資源狀態判斷進度，不假設固定等待時間。

### 2. 確認服務正常

Aspire 會提供 dashboard 連結，並啟動這三個命名資源：

| 資源 | 用途 |
|---|---|
| `app` | Python app，提供 Maintenance Scheduler 與 Parts Ordering 的 A2A 路徑 |
| `dotnetworkflow` | .NET workflow API 與 VM 內的 Repair Planner |
| `frontend` | 學員操作的 Factory Agent Workflow UI |

在 **VM 內**開啟 dashboard；若 VS Code 提示按住 `Ctrl` 或 `Alt` 點選 Terminal 連結，依目前介面提示操作。
若網址帶有 dashboard 登入 token，僅在自己的 VM 使用，不要分享或截圖公開。

### 3. 確認連線成功

在 dashboard 的 **Resources** 中核對三個資源是否已啟動，並查看是否有 health check 或啟動錯誤。
先保留 dashboard，接下來會使用其中的 endpoints 與 logs。

![原始 repository 的 Aspire Resources 示意畫面，顯示資源、狀態與 endpoints](../assets/images/challenge-4-dashboard-resources.png){ .workshop-figure width="3022" height="767" loading="lazy" }

*原始教材示意畫面；實際資源狀態、網址與連接埠以自己的 VM 為準。*

## Checklist {#checklist}

- [ ] 啟動成功，`aspire run` 正在執行，沒有未處理的啟動錯誤。
- [ ] 服務正常，Resources 找到 `app`、`dotnetworkflow` 與 `frontend`。
- [ ] 連線成功，能在 VM 內開啟 Aspire dashboard。

## 下一步 {#next}

進入 [Task 2：確認 Workflow API 連線](task-2-api-access.md)。

## 疑難排解 {#troubleshooting}

??? question "找不到 aspire 命令或 .NET SDK"
    回到 [準備](../prerequisites.md) 核對工具與交付環境。
    請講師協助，不要在 workshop 中臨時執行未審查的安裝 script 或替換共用 runtime。

??? question "Port 已被占用"
    先查看錯誤指出的資源與 port，確認是否為自己之前啟動的同一套環境。
    若是自己仍開啟的 Aspire Terminal，可以用 `Ctrl+C` 正常停止後再啟動。
    若不確定服務屬於誰，請講師處理，不要任意終止其他程序或修改 firewall。

??? question "Python app 沒有啟動或 A2A 初始化失敗"
    在 `app` 的 Console 中查看 Python runtime、套件、設定檔與 endpoint 的具體錯誤。
    此 app 需要 Python 3.13 環境；`/health` 正常也不保證 A2A Agents 初始化成功。
    記錄經遮蔽的錯誤並請講師協助，不要跳過這個服務繼續宣稱五步流程已完成。
