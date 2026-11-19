# 準備 {#preparation}

## 環境說明 {#environment}

在開始 Task 1 前，確認您已進入講師提供的 **Ubuntu 遠端桌面**，並使用講師指定的登入方式、VM、repository 路徑與 Azure 身分。講師已準備好環境建置、權限、模型、Agent 與資料試跑，不由學員現場重複建立。

<br/>

![學員透過 Azure 遠端桌面使用 VS Code 與 Foundry 的環境示意](assets/images/workshop-env-architecture.png){ .workshop-env-architecture width="1672" height="941" loading="eager" fetchpriority="high" }

<br/>

### 兩個瀏覽器，用途不一樣

| 所在位置 | 用途 |
|---|---|
| 自己電腦的瀏覽器 | 閱讀 GitHub Pages 教材，以及進入講師指定的遠端桌面入口 |
| Ubuntu 桌面內的瀏覽器 | 開啟 VM 內的 frontend 與 Aspire dashboard |

## 完成條件

- [ ] 已進入自己被指派的遠端桌面。
- [ ] 已確認專案、資料庫與 Agent 設定符合自己的分配。
- [ ] 已確認遠端桌面中使用 VS Code 進入工作目錄 `agentic-factory`。
- [ ] 已完成 GitHub Copilot BYOK 設定，並在 Chat 中選用 `gpt-5.4-mini`。

### 1．遠端桌面登入 {#1}

![Ubuntu 遠端桌面登入畫面](assets/images/vm-ubuntu-rdp.png){ .vm-ubuntu-rdp width="1672" height="1020" loading="eager" fetchpriority="high" }

<br/>

### 2．VS Code 進入工作目錄 `agentic-factory` {#2-vs-code-agentic-factory}

![從 Ubuntu 的 Development 選單開啟 Visual Studio Code](assets/images/development-vs-code.png){ .development-vs-code width="1672" height="1023" loading="eager" fetchpriority="high" }

<br/>

![VS Code 已開啟 agentic-factory 工作目錄的畫面](assets/images/vs-code-agentic-factory.png){ .vs-code-agentic-factory width="1672" height="1020" loading="eager" fetchpriority="high" }

<br/>


### 3．設定 GitHub Copilot BYOK {#copilot-byok}

在 **Ubuntu 遠端桌面內的 VS Code** 設定 GitHub Copilot BYOK（Bring Your Own Key，自備金鑰）。以下所需的 key 與模型設定，請查閱講師提供的 `參賽者資訊.md`，使用自己被分配的資料。

**1．選擇 Azure 並輸入 key**

開啟 **GitHub Copilot Chat → 模型選單 → Manage Models（管理模型）→ Add Models（新增模型）→ Azure**，依提示輸入 `參賽者資訊.md` 中的 key。

![GitHub Copilot 新增 Azure 模型提供者與輸入 key 的畫面](assets/images/copilot-byok-azure.png){ .copilot-byok-azure width="1672" height="941" loading="eager" fetchpriority="high" }

<br/>

**2．選擇 gpt-5.4-mini 並填寫設定**

選擇 **gpt-5.4-mini**，依 `參賽者資訊.md` 填寫以下必要欄位，確認無誤後儲存：

- `id`
- `name`
- `url`

![GitHub Copilot 設定 gpt-5.4-mini 的 id、name 與 url 欄位](assets/images/copilot-byok-config.png){ .copilot-byok-config width="1672" height="941" loading="eager" fetchpriority="high" }

**3．回到 Chat 確認模型**

回到 GitHub Copilot Chat 的模型選單，選用剛新增的 **gpt-5.4-mini**，確認目前使用的是自己的 Azure BYOK 模型。

![GitHub Copilot Chat 選用已設定的 gpt-5.4-mini 模型](assets/images/copilot-byok-chat.png){ .copilot-byok-chat width="1672" height="941" loading="eager" fetchpriority="high" }

<br/>

## 步驟

這次操作的不是五個獨立的聊天視窗，而是由 frontend、workflow、Agent 與工具共同組成的 multi-agent application。接下來的四個 Task，可以從操作對照背後的概念：

| 本次操作 | 學習重點 |
|---|---|
| [Task 1：啟動 Aspire](tasks/task-1-start-aspire.md) | 從 Resources 與 Graph 辨識 .NET、Python 與 frontend，理解一個應用程式可以由多個服務組成。 |
| [Task 2：開啟 frontend](tasks/task-2-open-frontend.md) | 使用者透過同一個 UI 提交任務，不需要逐一操作每個 Agent。 |
| [Task 3：執行 workflow](tasks/task-3-run-workflow.md) | Agent 透過工具取得資料或執行動作，再把結果交給後續步驟。 |
| [Task 4：檢視 dashboard](tasks/task-4-observe-dashboard.md) | 使用 Console 與 Traces 追蹤同一次操作的順序、耗時與錯誤，而不只看最後的文字回答。 |

---

## 下一步 {#next}

進入 [Task 1：啟動 Aspire](tasks/task-1-start-aspire.md)。