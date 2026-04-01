---
name: auto-commit
description: Use this skill when user says anything related to committing 
or pushing code, such as "help me commit", "push this", "save to github", 
"commit my changes", or similar. This skill analyzes current git changes, 
generates a commit message, and completes the full git add, commit, 
and push process.
---

# Auto Commit & Push

## 目標
分析目前專案的 git 變更，自動產生清楚的 commit message，
並完成完整的 add → commit → push 流程。

## 步驟

### 1. 確認目前狀態
先執行：
```bash
git status
git diff --stat
```
讓使用者知道哪些檔案有變動。

### 2. 分析變更，產生 commit message
根據變更的檔案和內容，依照這個格式產生 message：
```
<類型(<隨機數不得重複>): <簡短描述>

類型選項：
- feat：新功能
- fix：修 bug
- style：樣式調整
- refactor：重構
- docs：文件更新
- chore：雜項設定
```

範例：`feat(001): 新增使用者登入頁面`

### 3. 請使用者確認
把產生的 commit message 顯示給使用者看，**詢問是否確認後再執行**，
不可以直接跑，要等使用者說 OK。

### 4. 執行指令
使用者確認後，依序執行：
```bash
git add .
git commit -m "產生的 message"
git push
```

### 5. 回報結果
顯示每個步驟是否成功，如果有錯誤清楚說明原因。

## 注意事項
- 永遠要先讓使用者確認 commit message 才執行
- 如果偵測到 merge conflict，停下來提醒使用者先解決
- 如果 push 失敗（例如需要先 pull），提示使用者下一步怎麼做