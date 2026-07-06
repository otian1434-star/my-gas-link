# 曜舞天堂目前狀態總覽

本檔是給更換聊天室、換 AI、或隔一段時間回來接手時快速讀取用。
建議讀取順序：

1. `CURRENT_STATE_曜舞天堂.md`
2. `AI_HANDOFF_曜舞天堂.md`
3. `PROJECT_MEMORY.md`
4. `AI_WORKFLOW.md`
5. `CHANGELOG.md`

## 專案與部署

- 專案資料夾：`C:\Users\User\Desktop\GIT論壇開發`
- GitHub repo：`otian1434-star/my-gas-link`
- 官方網站：https://otian1434-star.github.io/my-gas-link/index.html
- 目前已驗證上線的功能部署 commit：`5726213 Retry GitHub Pages deployment`
- 部署狀態：2026-07-06 已用空 commit 重新觸發 GitHub Pages，第二次部署成功。
- 線上驗證：`assets/js/cms-posts.js` 已包含 `scrollToCurrentHash`，首頁公告卡片可跳到指定文章。
- 注意：若本文件後續被提交推送，會產生新的文件 commit；不影響上述功能部署驗證結論。

## 重要外部連結

- 官方 LINE：https://lin.ee/8Dy3o36
- 官方 LINE ID：`@184jiknt`
- 自動贊助：https://web-hosts.net/%E6%9B%9C%E8%88%9E%E5%A4%A9%E5%A0%82.html
- 推文回報：https://web-hosts.net/share/WtNas3Zg
- Google Apps Script Web App：
  `https://script.google.com/macros/s/AKfycbwP5pmmCMGgcr__owE1SHVYgQ4RMUHtZWr5UtOpxqgSbmZhaVtxHhrK2W_CUeB_tXo2/exec`
- Cloudflare CMS OAuth Worker：
  `https://yaowu-cms-oauth.otian1434.workers.dev`

## 目前遊戲設定文字

- 遊戲名稱：曜舞天堂 經典不敗
- 遊戲版本：3.81 內掛版
- 經驗倍率：3 倍
- 內掛倍率：1 倍
- 金幣倍率：1 倍
- 掉落倍率：1 倍
- 玩家等級上限：55 級（隨進度調整開放）
- 寵物經驗：3 倍
- 寵物等級上限：52
- 正式開服時間：2026/07/09 20:00

## 前台主要功能

- 首頁黑金史詩風主視覺。
- 左側官方 LINE@ 浮動圖。
- 右側 24 小時自動贊助浮動圖。
- 右下角曜舞快捷視窗。
- 背景音樂播放器。
- 站內全文搜尋。
- 最新公告卡片可直達指定公告文章。
- 職業介紹輪播。
- 遊戲資料、遊戲特色、武器、防具、道具、地圖、玩家服務等完整導覽。
- 帳號申請頁已串 Google Apps Script。

## 後台與表單

- 後台：Decap CMS。
- OAuth：Cloudflare Worker 協助 GitHub 登入。
- 帳號申請：`register.html` 送到 Google Apps Script，再寫入 Google 試算表。
- Apps Script 已處理：
  - 遊戲帳號 / 暱稱重複檢查。
  - 手機號碼文字格式，避免開頭 0 被吃掉。
  - LINE ID 欄位。
- 不要提交 OAuth secret、token、密碼、管理密語。

## 目前重要內容狀態

- 活動公告已包含：
  - `🎁 永久活動 ── 曜舞官方的祝福・加 LINE 好禮`
  - `🎉 開服活動 ── 歡慶開服慶`
  - `💎 開服活動 ── 開服贊助好禮`
- 推文說明：
  - 包月推文代工 `$399 TWD`
  - 三組優惠價 `$1000 TWD`
  - 單日上限 60 顆，等於 10 次
  - 分享圖片圖庫已加入 19 張完整文宣圖
- 直播說明：
  - 1 HR：藍鑽 60、推文幣 15、直播獎勵兌換證 1 個
  - 2 HR：藍鑽 120、推文幣 30、直播獎勵兌換證 2 個
  - 3 HR：藍鑽 150、推文幣 45、直播獎勵兌換證 3 個
- 變身圖鑑：
  - 一般到高級 80%
  - 高級到稀有 50%
  - 稀有到英雄 35%
  - 英雄到傳說 18%
  - 傳說到神話目前不公開
- 龍印魔石目前暫時下架，不給玩家看到。
- 防外掛驗證教學已移除影片，只保留教學文字。
- 功能性補丁下載點：
  `https://drive.google.com/file/d/119_5OrCMO-p78mp8gWumjdO3OZpeUqdo/view?usp=sharing`

## 目前 Git 工作樹注意事項

常見未追蹤本機素材，預設不要提交：

- `assets/media/video/`
- `yaowu-remotion-video/`
- `天堂小圖/`
- `完整文宣圖/文宣影片素材*.mp4`
- `影片處理skill/`
- `文宣背景圖(無LOGO)/`

這些多數是影片、文宣、行銷後端素材。除非使用者明確要求，不要推到網站 Git。

## 核心檔案

- `config.js`：網站主要設定、連結、音樂、浮動圖。
- `data/site.json`：後台可編輯站台資料。
- `data/posts.json`：公告與文章資料。
- `data/search-index.json`：搜尋索引。
- `assets/js/forum.js`：前台導覽、浮動面板、音樂、共用互動。
- `assets/js/cms-posts.js`：文章渲染、公告 hash 定位、表格包裝。
- `assets/css/style.css`：全站黑金風格樣式。
- `pages/`：各內容頁。
- `admin/config.yml`：Decap CMS 後台設定。
- `GOOGLE_APPS_SCRIPT_ACCOUNT_APPLICATION.gs`：申請表單後端。

## 每次更新固定流程

1. 先看 `git status --short`。
2. 只修改本次任務相關檔案。
3. 外來 HTML 必須轉成曜舞天堂黑金風格。
4. 更新 `CHANGELOG.md`。
5. 重要狀態同步更新 `PROJECT_MEMORY.md`、`AI_HANDOFF_曜舞天堂.md`、本檔。
6. 提交前只 `git add` 相關檔案，避免把影片素材一起送上去。
7. 推送後檢查 GitHub Pages Actions 是否成功。

## 影片與文宣

- 影片工作資料夾：`影片處理skill/`
- Remotion 專案：`yaowu-remotion-video/`
- 文宣空底圖：`文宣背景圖(無LOGO)/`
- 完整文宣圖：`完整文宣圖/`
- 影片素材預設只留本機，不推網站 Git。
- 若要人物頭髮、臉、衣服自然動起來，必須先用真正 Image-to-Video 產 B-roll，再用 Remotion 後製。

## 目前可直接交給下一個 AI 的一句話

「請先讀 `CURRENT_STATE_曜舞天堂.md`、`AI_HANDOFF_曜舞天堂.md`、`PROJECT_MEMORY.md`、`AI_WORKFLOW.md`、`CHANGELOG.md`，這個網站是曜舞天堂 3.81 內掛版黑金史詩風官方論壇，所有新內容都要轉成曜舞風格，影片素材預設不要推上 Git。」
