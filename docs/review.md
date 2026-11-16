# 結論 {#review-and-conclusion}

## 從設備異常到維護準備 {#maintenance-workflow}

晶圓製造設備出現異常時，發現問題只是第一步。非預期停機可能影響產線；團隊還需要釐清可能原因、安排具備合適技能的人員與時段、確認備品，並把維護資訊交接清楚，才能讓後續處理有依據。

## 五個 Agents 的接力 {#agent-sequence}

Multi-agent 協作能把複雜工作分成明確的職責，讓團隊看見資訊如何從異常判斷轉成維護準備。
但 Agent 的建議不等於已完成維修或採購：仍須核對診斷、工單、排程與備品資訊，並由負責人依正式流程做出決策。Agent 分工合作，依序傳遞資訊：

| 順序 | Agent | 工作 |
|---|---|---|
| 1 | Anomaly Classification | 判斷設備是否異常及異常的嚴重程度。 |
| 2 | Fault Diagnosis | 分析異常資訊，提出可能原因與檢查方向。 |
| 3 | Repair Planner | 根據診斷整理維修需求、技能、備品與工單。 |
| 4 | Maintenance Scheduler | 依工單與可用條件安排維護人員和時段。 |
| 5 | Parts Ordering | 依工單檢查庫存，規劃備品準備。 |

## 授權 {#license}

本教材改寫自 [Microsoft 原始教材](https://github.com/microsoft/agentic-factory-hack/blob/main/challenge-4/README_zh-TW.md)。
原始 repository 與素材採 MIT License，© Microsoft；詳見 [授權全文](assets/source-license.txt)。
