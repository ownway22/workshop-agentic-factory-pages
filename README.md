# 晶圓製造工廠的 Agentic Factory：Workshop 教學網站

這是獨立於應用程式的 **MkDocs + Material for MkDocs + mkdocs-glightbox** 教材專案。
學員在自己的電腦瀏覽 GitHub Pages，Task 1–4 則在講師提供的 Ubuntu 遠端桌面操作。
學員不需要為了閱讀教材安裝 MkDocs。

## 範圍與目前發布狀態

- 以原 [Challenge 4 繁中教材](https://github.com/microsoft/agentic-factory-hack/blob/main/challenge-4/README_zh-TW.md) 重新編排為四個 Tasks，不另設 Workflow API 連線檢查頁。
- 不修改原應用程式、Azure 基礎設施或其他 workshop 文件。
- 不使用完成版 solution code 作為教材實作模板。
- GitHub Pages：<https://ownway22.github.io/workshop-agentic-factory-pages/>。
- 課程順序維持為 **Factory → Travel**；學員使用的活動入口由講師提供，教材不放置本機預覽連結。
- 原始碼存放於公開的 [網站 repository](https://github.com/ownway22/workshop-agentic-factory-pages)，由 GitHub Actions 建置並發布。

網站可以成功建置，不代表 Azure 環境、五個 Agents 或多人 workshop 已完成實測。
教材中的完成條件是學員實際演練時要核對的項目，不是本網站建置的測試結果。

## 專案結構

```text
workshop-pages-mkdocs/
├── mkdocs.yml
├── requirements-docs.in
├── requirements-docs.lock
├── README.md
├── .gitignore
├── publish-site.sh
├── .github/workflows/pages.yml
└── docs/
    ├── index.md
    ├── prerequisites.md
    ├── review.md
    ├── troubleshooting.md
    ├── resources.md
    ├── tasks/
    │   ├── task-1-start-aspire.md
    │   ├── task-2-open-frontend.md
    │   ├── task-3-run-workflow.md
    │   └── task-4-observe-dashboard.md
    └── assets/
        ├── images/
        ├── javascripts/accessibility.js
        ├── stylesheets/extra.css
        └── source-license.txt
```

## 講師／維護者：本機預覽

以下命令適用於 Linux。網站使用 **Python 3.12**；這與 Agent 應用程式要求的 Python 3.13 是不同的環境。
使用已安裝的 [uv](https://docs.astral.sh/uv/) 建立專案專用虛擬環境，不安裝至系統 Python。

從 repository 根目錄開始：

```bash
cd workshop-pages-mkdocs
uv venv --python 3.12 .venv
uv pip sync --python .venv/bin/python --require-hashes requirements-docs.lock
.venv/bin/python -m mkdocs serve --dev-addr 127.0.0.1:2800
```

在執行網站的同一台電腦開啟 <http://127.0.0.1:2800/>。若使用遠端開發環境，請使用其受控的 localhost forwarding。
`2800` 是教材預覽 port，**不是** workflow API port `5231`。
若 `2800` 已被占用，請改用另一個未占用的 loopback port，不要停止其他人的服務。

按 `Ctrl+C` 停止預覽。不要直接以 `file://` 開啟建置的 HTML，這不是已驗證的搜尋使用方式。

### 建置與驗收

在 `workshop-pages-mkdocs/` 中執行：

```bash
.venv/bin/python -m mkdocs build --strict --clean
```

建置結果位於 `site/`，不納入原始碼版本控制。驗收時確認：

- 左側目錄有導覽、準備、獨立的 Task 1–4 與結論；授權說明位於結論頁，正文保留，但不列於結論頁的左側子目錄。疑難排解和教材資訊保留為可由正文連結開啟的頁面。
  結論頁的授權標題使用 `<h2 id="license">` 保留標題與錨點，不產生 Markdown 目錄項目，因此不依賴 CSS 隱藏。
- 結論頁的疑難排解、教材資訊與授權連結皆可開啟，且不含指向本機開發 port 的課程入口。
- 所有頁面與圖片可開啟，本頁目錄與正文連結正確。
- 搜尋「維護」、「工單」、`Aspire` 與 `Foundry` 能找到相關內容並開啟正確頁面；不要只測縮短的詞幹。
- 點選教材圖片會開啟 lightbox，關閉按鈕與 `Esc` 可返回教材。
- 淺／深色切換與窄視窗選單正常，程式碼／表格不撐開整個頁面。
- 桌面版頁首與目錄靠左對齊，搜尋列位於深淺色切換左側；兩者的提示使用繁體中文。點選頁首圖示或標題可回到首頁。
- 頁尾保留教材及素材授權資訊，不顯示上一頁／下一頁橫幅或 Material for MkDocs 的產生器標示。
- 導覽與頁內目錄整合在左側，不重複顯示網站名稱；頁首圖示與標題保留。頁內只顯示二級標題，不顯示右側目錄；首頁顯示「情境」、「目標」與「步驟」。
- GitHub project Pages 的子路徑下，導覽、圖片、搜尋與 lightbox 仍能運作。
- `Tab` 可聚焦導覽、搜尋與色彩控制項，`Enter`／空白鍵可操作；搜尋與 lightbox 可用 `Esc` 返回。
- 390px 窄螢幕與 200% 文字放大（根字級加倍）下，導覽及內容仍可使用；不以改變 DPR 冒充縮放驗收。
  減少動態效果的系統偏好不會讓 lightbox 無法關閉。
- 圖片具有正確的 width／height，低於首屏的截圖延遲載入；完成條件是自行核對清單，不宣稱網站會儲存進度。

只修改教材時，不需要啟動 Azure Agents；不要把網站驗收當成 workflow 成功的證據。

## 同日課程的共用標準

### 教學編排

Factory 目前採四個 Tasks，與 Travel 的 Acts 各自編排，不因章節數相同而視為相同流程。
每個實作章節使用固定順序：

1. 目標
2. 前置條件
3. 操作步驟
4. 預期畫面與證據
5. 完成條件
6. 疑難排解
7. 下一步

固定使用「學員操作 · 必做」「講師課前準備」「選做」「需授權／可能計費」標示角色。
講師的環境準備以收合區塊呈現，不要求學員現場重新佈建。
預估時間未經試跑一律標示「待講師試跑確認」，不能把未知耗時或範例結果寫成已量測數據。

Task 的共用章節 anchors 為 `goal`、`prerequisites`、`steps`、`evidence`、
`completion`、`troubleshooting`、`next`，以免增刪中文小節後產生的流水號破壞連結。

### 視覺規格

| 項目 | 標準 |
|---|---|
| 字型 | 沿用參考站的 Material 系統字型 fallback，不載入 Google Fonts |
| 正文 | 16px、行高 1.8 |
| H1 | 首頁桌面 38px／800、窄螢幕 30px；其他頁面使用 Material 的 32px／800 |
| H2 | 25px／800 |
| 提示框 | Material 的 12.8px、行高 1.8 |
| 內容最大寬度 | 1440px；桌面版增加目錄與主內容間距 |
| 主色變數／淺色重點 | `#14171c`／`#006780`；連結 `#007a9e`；使用 black／cyan palette |
| 深色背景／重點 | `#1d232c`／`#9ce8fa`；連結 `#70d7ef` |
| 圖示與圖片 | 首頁圖示桌面 72px、窄螢幕 52px，排除 lightbox；一般圖片圓角 6px 並加陰影 |
| 目錄配置 | 左側整合頁內二級標題、不顯示右側目錄；首頁展開主要小節 |

視覺沿用參考站配色，並依需求調整頁首與桌面版面；不搬入該站的日期、人數、BYOK 配置或教材文案。
保留目前的文件套件版本、Task 1–4、操作截圖與鍵盤增補程式，不重新加入活動入口或頂端橫幅。
額外保留鍵盤焦點樣式，並允許首頁標題與頁首在放大文字時換行，避免窄視窗溢位；正常字級下仍維持參考站版型。

`accessibility.js` 為 Material 原生的 label／toggle 控制項加入可讀名稱、提示、鍵盤操作與展開狀態，
將 palette 移到搜尋後方，並讓頁首標題與圖示一樣連回首頁；保留原本搜尋與 palette 的事件處理，不增加外掛或自訂搜尋。
處理的 Enter／空白鍵須阻止重複傳到 Material 全域快捷鍵，避免一次按鍵觸發兩次切換。
這項小幅 JavaScript 是為補齊鍵盤操作；theme 升級後需重測，不能只檢查 HTML 中有 `role`。
目前未啟用 `navigation.instant`；若將來變更導覽方式，也須驗證每次換頁後的鍵盤控制。

### 版本與驗證狀態

目前教材版為 **standard-1（草稿）**，更新日期為 **2026-11-16**。
這是編輯版本與更新日，不是活動日期、git tag 或 GitHub Pages 已發布的證明。
修改版本或驗證狀態時，同步更新 `mkdocs.yml` 的 copyright 與 `docs/resources.md`。
網站建置／互動驗收與 Azure／五個 Agents 的實際 lab 驗收分開記錄。

### 更新依賴

`requirements-docs.in` 固定直接依賴；`requirements-docs.lock` 包含解析後的間接依賴與 hashes。
`jieba` 用於中文搜尋斷詞；`glightbox` 的 JavaScript／CSS 隨網站建置輸出。
字型採系統字型，不載入 Google Fonts，也不加入 analytics 或第三方搜尋服務。
搜尋使用 `zh`／`en`，並明確停用 stemming，避免繁中介面的預設 pipeline
將 `Aspire` 等英文術語縮成詞幹，影響完整術語的前綴搜尋。

若確實需要調整套件，先修改 manifest，再重新產生 lock 並完成驗收：

```bash
uv pip compile --python-version 3.12 --universal --generate-hashes \
  requirements-docs.in --output-file requirements-docs.lock
uv pip sync --python .venv/bin/python --require-hashes requirements-docs.lock
.venv/bin/python -m mkdocs build --strict --clean
```

不要安裝 MkDocs 2 或 pre-release 來取代此 Material 相容組合。
[Material 官方](https://squidfunk.github.io/mkdocs-material/)已公告 2027-05-05 EOL；
本專案依需求保留 Material，未自動遷移至 Zensical。

## GitHub Pages：更新網站

網站 repository 的 `main` 分支有新提交時，GitHub Actions 會建置並發布網站。
日後可繼續在目前資料夾編輯教材，再依下列步驟更新：

1. 在 `workshop-pages-mkdocs/` 執行 `.venv/bin/python -m mkdocs build --strict --clean`，確認建置沒有錯誤。
2. 在同一資料夾執行：

   ```bash
   bash publish-site.sh
   ```

3. 檢查列出的變更，確認公開內容後輸入 `yes`。腳本只會同步網站檔案，不會推送原專案的其他內容。
4. 等待 [GitHub Actions](https://github.com/ownway22/workshop-agentic-factory-pages/actions) 完成，再重新整理教學網站。

發布用的 Git 資料存放於本機 `.pages-publish.git/`，不會被上傳或影響原專案的 Git 狀態。
若遠端有本機尚未包含的變更，腳本會停止以避免覆蓋；請先處理遠端變更，再重新發布。
若直接 clone 網站 repository，請使用一般 Git 流程提交並推送 `main`。

> 網站 repository 為公開狀態。發布前請確認文件與截圖不含密碼、金鑰、登入連結或其他不應公開的資料。
> 網站發布不會一併部署 Azure 資源或 Agent workflow。

## 教材與圖片來源

- 教材依 [原 Challenge 4](https://github.com/microsoft/agentic-factory-hack/blob/main/challenge-4/README_zh-TW.md) 重新編排與改寫，技術指令及欄位對照目前的 exercise 程式碼。
- 操作截圖來自 [challenge-4/images](https://github.com/microsoft/agentic-factory-hack/tree/main/challenge-4/images/)，其中登入資訊及環境位址已為公開發布遮蔽。
- 原始圖片沿用 Microsoft repository 的 MIT License；授權文字放在 `docs/assets/source-license.txt`，會隨網站發布。
- `factory.png` 及三張 `factory-maintenance-0*.png` 複製自使用者指定的本機參考站，並已由使用者確認素材使用權。
- 準備頁使用使用者指定的 `workshop-env-architecture.png`；首頁流程圖已為網頁載入最佳化。
- Travel 的素材與授權不併入本站。
- 參考指定網站的配色與排版，不沿用該站的 VM 配置、日期、學員人數或其他活動安排。

編輯頁面時使用相對 Markdown 連結，新增頁面時同步更新 `mkdocs.yml` 的 `nav`。
