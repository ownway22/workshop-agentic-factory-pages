# 結論 {#review-and-conclusion}

本場從一筆合成遙測資料（telemetry）出發，透過 frontend 觀察五個 Agent 的接力，再使用工具結果、Console 與 Traces 核對執行過程。要帶走的不只是「讓五個 Agent 跑完」，而是理解如何把不同能力組成一個**資訊能交接、結果可核對的應用程式**。

![維護團隊核對排程與備品的情境示意](assets/images/factory-maintenance-03-human-review-and-readiness.png){ .factory-maintenance-03-human-review-and-readiness width="2200" height="1100" loading="lazy" }

<br/>

## 1．多 Agent 協作，分工與交接要清楚 {#agent-sequence}

本次 workflow 依序處理：

**異常分類 → 故障診斷 → 維修規劃 → 維護排程 → 備品確認**

這不是把五段回答排在一起，而是讓每一步的結果成為後續工作的依據：

- **分類與診斷**：從異常讀值與嚴重程度，進一步查找可能原因及知識依據。
- **診斷與工單**：把可能原因整理成維修工作、技能與備品需求，建立可識別的工作對象。
- **工單與後續安排**：讓排程與備品處理對應同一張工單，避免不同角色各自處理不同的資訊。

背後的 Agent 可以使用不同語言，也可以分別由 Foundry 託管、在 .NET workflow 行程內建立，或透過 Python A2A 服務呼叫。**Agent Framework 串接工作順序，Aspire 則協助啟動服務與觀察執行過程。**

多 Agent 的重點不只是分工，而是每次交接後，下一個角色都知道正在處理什麼、有哪些依據，以及還缺少什麼。

## 2．流程跑完之後，還要核對什麼 {#verify-results}

畫面顯示 Done，或 Agent 回答「已完成」，都不能單獨證明工作結果正確。請分開看三個層次：

- **執行狀態**：服務是否正常、request 是否有回應、各步驟是否結束。`Workflow built with 5 agents` 只表示 workflow 已建立，不代表五個 Agent 都成功完成工作。
- **結果證據**：工具是否成功、是否有新工單 ID、排程與備品結果是否對應同一張工單。文字摘要要能對得上實際的 tool results。
- **業務決策**：診斷是否有足夠依據、維護安排是否可行、備品是否符合需求，仍須由負責人確認。

備品足夠時，不需訂購也可能是合理結果；需要補購時，才核對訂單紀錄是否成功建立。**不是每一步都產生新紀錄，才算處理成功。**

若結果不一致，請沿著同一次操作的時間、Machine ID 與工單 ID，回到 Console 和 Traces 找出問題位置。證據不足時，清楚記錄尚未確認的部分，比反覆提交直到出現完成畫面更有幫助。

## 3．回到業務：這些協作為誰而做 {#business-value}

回到設備異常的情境，不同角色需要的不只是更完整的 Agent 回答：

- **設備人員**：需要有依據的可能原因與清楚的維修工作，才能判斷後續檢查及處理方向。
- **製造人員**：需要能對應工單、可協調的維護安排，才能討論維護急迫性與生產時段。
- **物料人員**：需要明確的備品需求與庫存、補購結果，才能確認維護準備是否仍有缺口。

<br/>

!!! success "自動化之後，人要看得更清楚"
    **當 Agent 把資訊整理好、讓執行過程留下證據，真正值得追求的，是讓負責決策的人更清楚掌握判斷依據，並決定下一步。**

---

<h2 id="license">授權</h2>

本教材改寫自 [Microsoft 原始教材](https://github.com/microsoft/agentic-factory-hack/blob/main/challenge-4/README_zh-TW.md) · © Microsoft · 教材與素材採 MIT License。
