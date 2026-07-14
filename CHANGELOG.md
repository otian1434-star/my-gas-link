# 曜舞天堂更新紀錄

本檔記錄網站、內容、圖片、影片、後台、表單、部署與文件異動。
新的 AI 或新的聊天室接手時，請先讀 `AI_HANDOFF_曜舞天堂.md`、`PROJECT_MEMORY.md`、`AI_WORKFLOW.md`，再讀本檔最近紀錄。

## 2026-07-14 - 新增圖鑑收藏內容與 07/14 更新歷程

### 類型
- 網站內容
- 更新歷程
- 搜尋索引

### 異動
- `pages/features-equipment-collection.html` 改為「圖鑑收藏」，新增開通方式與奇岩村 NPC 製作位置。
- 圖鑑收藏頁依武器、防具、飾品整理能力清單。
- `pages/features-overview.html` 與 `assets/js/forum.js` 導覽入口改為「圖鑑收藏」。
- `data/posts.json` 新增 `07/14-更新歷程`，並加入圖鑑收藏官方查詢連結。
- `data/search-index.json` 重新生成。

### 驗證
- `node scripts\build-search-index.js` 成功，產出 63 筆搜尋紀錄。
- `data/posts.json`、`data/search-index.json`、`data/site.json` JSON 解析通過。
- `assets/js/forum.js`、`config.js` 語法檢查通過。
- `git diff --check` 無空白錯誤，僅有 Windows 換行提示。

## 2026-07-06 - 空部署成功並整理目前狀態記憶

### 類型
- 部署
- 文件
- AI 交接

### 異動
- 建立空 commit `e3491c0 Trigger GitHub Pages rebuild` 觸發 GitHub Pages，但第一次 deploy job 失敗。
- 建立第二個空 commit `5726213 Retry GitHub Pages deployment` 重新觸發部署，GitHub Pages 成功上架。
- 線上驗證 `assets/js/cms-posts.js` 已包含 `scrollToCurrentHash`，表示公告指定文章定位修正已上線。
- 新增 `CURRENT_STATE_曜舞天堂.md`，整理目前網站、部署、連結、伺服器設定、內容狀態、Git 注意事項與交接句。
- `PROJECT_MEMORY.md` 與 `AI_HANDOFF_曜舞天堂.md` 補充最新部署狀態與新的接手讀取順序。

### 相關檔案
- `CURRENT_STATE_曜舞天堂.md`
- `PROJECT_MEMORY.md`
- `AI_HANDOFF_曜舞天堂.md`
- `CHANGELOG.md`

### 驗證
- GitHub Actions `pages build and deployment` run `146` 成功。
- 線上 `cms-posts.js` 檢查到 `scrollToCurrentHash`。

### 備註
- 本次文件更新會另外提交；若推送後產生新的文件 commit，不影響 `5726213` 的功能部署驗證結論。
- 未追蹤影片與行銷素材仍保留本機，未納入提交。

## 2026-07-06 - 修正首頁公告卡片指定文章定位

### 類型
- 前台互動
- 使用體驗
- 文件

### 異動
- `assets/js/cms-posts.js` 修正從首頁最新公告卡片進入 `pages/news.html#post-x` 時，因文章列表非同步載入導致 hash 定位失效的問題。
- 文章列表渲染完成後會依目前網址 hash 自動捲到指定文章。
- `assets/css/style.css` 新增文章錨點保留上方距離，避免固定導覽列遮住目標文章，並加入短暫高亮效果。
- `PROJECT_MEMORY.md`、`AI_HANDOFF_曜舞天堂.md` 同步更新。

### 驗證
- `assets/js/cms-posts.js`、`assets/js/forum.js` 語法檢查通過。
- `data/posts.json`、`data/search-index.json`、`data/site.json` JSON 解析通過。

## 2026-07-06 - 新增 LINE 禮盒永久活動與推文素材圖庫

### 類型
- 網站內容
- 活動公告
- 推文說明
- 文件

### 異動
- `data/posts.json` 新增活動公告：
  - `🎁 永久活動 ── 曜舞官方的祝福・加 LINE 好禮`
- `pages/promo.html` 推文說明頁調整：
  - 包月推文代工服務保留每月 `$399 TWD`，新增三組優惠價 `$1000 TWD`。
  - 發文規定獎勵上限改為單則 6 顆印章 / 單日上限 60 顆（10 次）。
  - 分享圖片區新增 `完整文宣圖` 內 19 張官方文宣圖片，採折疊式縮圖圖庫與 lazy loading，避免頁面初始高度過大。
- `data/search-index.json` 已重新生成。
- `PROJECT_MEMORY.md`、`AI_HANDOFF_曜舞天堂.md` 同步更新。

### 驗證
- `data/posts.json` JSON 解析通過。
- `assets/js/cms-posts.js`、`assets/js/forum.js` 語法檢查通過。
- `node scripts\build-search-index.js` 成功，產出 63 筆搜尋紀錄。

### 備註
- `完整文宣圖/完整文宣圖1.png` 至 `完整文宣圖13.png`、`完整文宣圖/太陽神-1.png` 至 `太陽神-6.png` 已納入 Git；影片素材仍留在本機，不納入網站提交。

## 2026-07-05 - 調整直播推廣箱兌換證數量

### 類型
- 網站內容
- 文件

### 異動
- `pages/stream.html` 直播推廣箱內容物調整為：
  - 1 HR：藍鑽 60、推文幣 15、直播獎勵兌換證 1 個。
  - 2 HR：藍鑽 120、推文幣 30、直播獎勵兌換證 2 個。
  - 3 HR：藍鑽 150、推文幣 45、直播獎勵兌換證 3 個。
- `社群文宣提案.md`、`PROJECT_MEMORY.md`、`AI_HANDOFF_曜舞天堂.md` 同步更新。
- `pages/transform-guide.html` 移除「傳說 → 神話 0%」合成機率。
- `data/posts.json` 開服活動小怪掉落表移除「機率參考」欄位。
- `assets/js/cms-posts.js`、`assets/js/forum.js` 與 `assets/css/style.css` 調整文章與內容頁表格呈現：
  - 桌機表格依內容寬度顯示，不再撐滿整個文章外框。
  - 手機若表格超出寬度，顯示「左右滑動查看完整表格」提示。
- `data/search-index.json` 已重新生成。

### 驗證
- `node scripts\build-search-index.js` 成功，產出 63 筆搜尋紀錄。
- `data/posts.json`、`data/search-index.json`、`data/site.json` JSON 解析通過。
- `assets/js/cms-posts.js`、`config.js`、`assets/js/forum.js` 語法檢查通過。

### 備註
- 本次更新將隨部署提交推送到 `target main`。

## 2026-07-05 - 開服前內容、活動公告與音樂素材更新

### 類型
- 網站內容
- 遊戲設定
- 音樂播放器
- 公告
- 文件

### 異動
- `pages/version.html` 玩家等級上限由 52 級改為 55 級，並標註「隨進度調整開放」。
- `config.js` 與 `data/site.json` 音樂清單同步更新為目前 `assets/media/music/` 內的 22 首 MP3。
- 新增 `pages/features-level-rewards.html` 等級獎勵表，整理王族、騎士、妖精、法師、黑妖、龍騎士、幻術士職業獎勵。
- `pages/features-overview.html`、`assets/js/forum.js` 已加入等級獎勵表入口。
- `pages/promo.html` 與 `pages/stream.html` 推廣商人區塊改為「推廣商人兌換清單」，並更新推廣幣商人 / 推文幣商人兌換項目。
- `pages/stream.html` 直播推廣箱內容物改為藍鑽、推文幣、直播獎勵兌換證。
- `pages/transform-guide.html` 系統提示新增變身合成機率說明。
- `data/posts.json` 新增兩篇活動公告：
  - `🎉 開服活動 ── 歡慶開服慶`
  - `💎 開服活動 ── 開服贊助好禮`
- `scripts/build-search-index.js` 將 `features-*` 頁面分類調整為「遊戲特色」。
- `data/search-index.json` 已重新生成。
- `社群文宣提案.md` 同步更新掉寶 1 倍、等級上限 55 級與直播獎勵文字。

### 驗證
- `node scripts/build-search-index.js` 成功，產出 63 筆搜尋紀錄。
- `data/posts.json`、`data/site.json`、`data/search-index.json` JSON 解析通過。
- 已檢查舊版推廣商人標題、直播欄位、變身頁標題、玩家等級舊值、掉寶舊值與舊音樂檔名，未殘留於前台來源與搜尋索引。
- `git diff --check` 無空白錯誤，僅有 Windows 換行提示。

### 備註
- 本次更新將隨部署提交推送到 `target main`。

## 2026-06-30 20:48 - 直式影片官網畫面改用手機版官網截圖

### 類型
- 影片
- Remotion
- 社群文宣
- 文件

### 異動
- `YaowuForumGuide20` 三段官網畫面全部改用手機版截圖。
- `YaowuEpic30` 內的官方論壇段落改用手機版首頁截圖。
- `YaowuVertical18` 內的申請帳號段落改用手機版申請頁截圖。
- 取代原本桌機截圖放進直式影片後被左右裁切的做法。
- `YaowuPromo30` 為橫式 1920x1080 版本，仍保留桌機官網截圖。
- 新增/使用手機截圖素材：
  - `forum-home-mobile.png`
  - `forum-features-mobile.png`
  - `forum-register-mobile.png`
- 重新輸出官網導覽影片、完整形象直式影片、舊版直式短片、preview，並重建社群影片 contact sheet。

### 相關檔案
- `yaowu-remotion-video/src/Composition.tsx`
- `yaowu-remotion-video/public/assets/screens/forum-home-mobile.png`
- `yaowu-remotion-video/public/assets/screens/forum-features-mobile.png`
- `yaowu-remotion-video/public/assets/screens/forum-register-mobile.png`
- `影片處理skill/exports/social-series-20260630/yaowu-forum-guide-20s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-epic-30s-v.mp4`
- `影片處理skill/exports/yaowu-vertical-18s.mp4`
- `影片處理skill/exports/social-series-20260630/social-series-contact-sheet.jpg`
- `影片處理skill/yaowu-video-roadmap.md`
- `AI_HANDOFF_曜舞天堂.md`
- `PROJECT_MEMORY.md`
- `CHANGELOG.md`

### 驗證
- `npm run lint` 通過。
- `YaowuForumGuide20`、`YaowuEpic30`、`YaowuVertical18` 成功重新輸出 MP4。
- 已檢視 preview 與 contact sheet，確認直式影片中的官網畫面皆為手機版畫面，未再左右裁切桌機版。

### 備註
- 影片與 Remotion 工作資料屬於後端行銷素材，本次未推送網站 Git。

## 2026-06-30 20:12 - 輸出四支直式社群宣傳影片

### 類型
- 影片
- Remotion
- 社群文宣
- 文件

### 異動
- 新增四支 1080x1920 直式社群影片 composition。
- 四支影片採用不同主視覺與不同音樂，避免連續貼文看起來像同一支。
- 片尾沿用統一 LINE QR / Logo CTA，方便建立品牌辨識。
- 官網導覽影片第二段原本截圖過暗，已改用更清楚的快速目錄/功能頁截圖。
- 重新輸出四支影片、每支 3 張 preview，並產生 contact sheet 總覽。

### 相關檔案
- `yaowu-remotion-video/src/Root.tsx`
- `yaowu-remotion-video/src/Composition.tsx`
- `影片處理skill/exports/social-series-20260630/yaowu-recruit-15s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-forum-guide-20s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-classes-20s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-epic-30s-v.mp4`
- `影片處理skill/exports/social-series-20260630/social-series-contact-sheet.jpg`
- `影片處理skill/yaowu-video-roadmap.md`
- `AI_HANDOFF_曜舞天堂.md`
- `PROJECT_MEMORY.md`
- `CHANGELOG.md`

### 驗證
- `npm run lint` 通過。
- 四支影片皆成功輸出 MP4。
- 已檢視 contact sheet，確認四支主畫面有區隔，職業影片 7 職業完整顯示，官網導覽無黑畫面。

### 備註
- 影片與 Remotion 工作資料屬於後端行銷素材，本次未推送網站 Git。

## 2026-06-30 16:28 - 建立本機 Wan2.2 Image-to-Video 測試流程

### 類型
- 影片
- I2V
- 本機環境
- 文件

### 異動
- 建立本機 I2V Python venv：`C:\Users\User\.cache\yaowu-i2v-lab\venv`。
- 安裝 PyTorch CUDA、Diffusers、Transformers、Accelerate、imageio、ffmpeg wrapper 等必要套件。
- 下載 Wan2.2 TI2V 5B Diffusers 模型到：`C:\Users\User\.cache\yaowu-i2v-lab\models\Wan2.2-TI2V-5B-Diffusers`。
- 新增 Wan2.2 I2V 測試腳本與 SVD 測試腳本。
- 實測確認：本機可以產出真正 image-to-video，人物、頭髮、衣服、旗幟、光影與背景會生成動態，不只是 Remotion 推鏡。
- 實測也確認：複雜軍隊/多人/細節密集圖容易崩壞，不應直接作正式 I2V 素材。
- 產生單人近景測試素材與抽幀總覽。

### 相關檔案
- `影片處理skill/scripts/run_wan_i2v_test.py`
- `影片處理skill/scripts/run_svd_i2v_test.py`
- `影片處理skill/i2v素材庫/第一輪測試/README.md`
- `影片處理skill/i2v素材庫/第一輪測試/prompt-wan-subtle-character.md`
- `影片處理skill/i2v素材庫/第一輪測試/04-single-character-purple/wan-subtle-512.mp4`
- `影片處理skill/i2v素材庫/第一輪測試/05-moon-archer/wan-subtle-512.mp4`
- `影片處理skill/i2v素材庫/第一輪測試/06-ocean-elf/wan-subtle-512.mp4`
- `影片處理skill/i2v素材庫/第一輪測試/wan-character-tests-contact.jpg`

### 驗證
- `torch.cuda.is_available()` 回傳 True。
- GPU：NVIDIA GeForce RTX 4080 SUPER，約 16GB VRAM。
- `01-quick-nav-queen`：測出嚴重融化，不採用。
- `04-single-character-purple`：相對穩定，可作候選素材。
- `04-single-character-purple/wan-native-832x480.mp4`：原生 480p 清晰度較前面低解析改善，但整體仍未達正式宣傳素材標準。
- `05-moon-archer`：嚴重破碎，淘汰。
- `06-ocean-elf`：可再調參。

### 備註
- 影片/I2V 素材屬於後端行銷工作資料，預設不推上網站 Git。
- StabilityAI SVD 模型為 gated repo，需要 Hugging Face 授權登入，暫未使用。
- 本機 Wan2.2 可作技術測試與輔助素材，但目前不應作為正式主素材來源。
- 後續正式片應以「高品質外部 I2V 產片 + Remotion 品牌後製」為主，不要把多角色細節圖直接硬轉。

## 2026-06-30 11:57 - 建立第一輪 AI 圖生影片測試素材包

### 類型
- 影片
- I2V
- 文宣素材
- 文件

### 異動
- 從 `文宣背景圖(無LOGO)` 挑選 3 張適合 image-to-video 測試的背景圖。
- 建立第一輪 I2V 測試素材包。
- 每張測試圖均建立專用 `prompt.md`，包含目標、Prompt、Negative、建議參數與驗收重點。
- 建立三圖總覽預覽圖。
- 更新影片企劃總表、AI 交接文件與專案記憶。

### 相關檔案
- `影片處理skill/i2v素材庫/第一輪測試/README.md`
- `影片處理skill/i2v素材庫/第一輪測試/i2v-test-selection-preview.jpg`
- `影片處理skill/i2v素材庫/第一輪測試/01-quick-nav-queen/source.png`
- `影片處理skill/i2v素材庫/第一輪測試/01-quick-nav-queen/prompt.md`
- `影片處理skill/i2v素材庫/第一輪測試/02-ocean-elf/source.png`
- `影片處理skill/i2v素材庫/第一輪測試/02-ocean-elf/prompt.md`
- `影片處理skill/i2v素材庫/第一輪測試/03-battle-party/source.png`
- `影片處理skill/i2v素材庫/第一輪測試/03-battle-party/prompt.md`
- `影片處理skill/yaowu-video-roadmap.md`
- `AI_HANDOFF_曜舞天堂.md`
- `PROJECT_MEMORY.md`
- `CHANGELOG.md`

### 驗證
- 已確認 3 張 source 圖成功複製。
- 已生成並檢視總覽預覽圖。
- 已檢查本機目前沒有現成 I2V Python 環境，尚未產出真動態影片。

### 備註
- 本機硬體有 RTX 4080 SUPER 16GB，可作為後續本機 I2V 測試基礎。
- 目前未安裝 `torch`、`diffusers`、`transformers`、`accelerate`、`safetensors`。
- 本次尚未推送 Git。

## 2026-06-30 11:27 - 修正靜態圖動態化方向為 AI I2V 優先

### 類型
- 影片
- Skill
- 文件

### 異動
- 明確區分 Remotion 後製動態與真正 AI image-to-video。
- 將 `QuickNavMotionDemo` 標記為 Remotion 後製動態示範，不再視為完整 AI 影片替代方案。
- 補充真正需要人物頭髮、臉部、披風、衣料、旗幟、煙霧、雲層連續動態時，必須先使用 AI image-to-video，再交給 Remotion 做品牌合成。
- 新增角色真動態 image-to-video 提示詞模板。

### 相關檔案
- `影片處理skill/yaowu-video-roadmap.md`
- `影片處理skill/image-to-motion-skill.md`
- `影片處理skill/prompt-templates.md`
- `CHANGELOG.md`

### 驗證
- 本次為流程與文件修正，未重新渲染影片。
- 已確認現有 `QuickNavMotionDemo` 仍只作為後製示範保留。

### 備註
- 後續若要達到使用者參考影片等級，應先產出 AI image-to-video B-roll，再用 Remotion 套片頭、片尾、Logo、字幕、CTA。
- 本次尚未推送 Git。

## 2026-06-30 11:05 - 建立靜態圖動態化示範模板

### 類型
- 影片
- Remotion
- 文件

### 異動
- 新增 `QuickNavMotionDemo` composition，用 `快速目錄新背景圖.png` 模仿 `快速目錄 影片背景.mp4` 的 AI 影片動態效果。
- 效果包含慢速推鏡、右向平移、金色光束、漂移霧氣、熱光 bloom、前景火星粒子與暗角電影色調。
- 將素材複製到 `yaowu-remotion-video/public/assets/motion-quick-nav.png`。
- 輸出 8 秒示範影片與 3 張預覽圖到 `影片處理skill/exports/bg-motion-demo/`。
- 更新影片企劃總表、AI 交接文件與專案記憶。

### 相關檔案
- `yaowu-remotion-video/src/Root.tsx`
- `yaowu-remotion-video/src/Composition.tsx`
- `yaowu-remotion-video/public/assets/motion-quick-nav.png`
- `影片處理skill/exports/bg-motion-demo/quick-nav-motion-demo.mp4`
- `影片處理skill/exports/bg-motion-demo/quick-nav-motion-frame-000.png`
- `影片處理skill/exports/bg-motion-demo/quick-nav-motion-frame-120.png`
- `影片處理skill/exports/bg-motion-demo/quick-nav-motion-frame-220.png`
- `影片處理skill/yaowu-video-roadmap.md`
- `AI_HANDOFF_曜舞天堂.md`
- `PROJECT_MEMORY.md`
- `CHANGELOG.md`

### 驗證
- 已執行 `npm run lint`，通過 ESLint 與 TypeScript 檢查。
- 已成功渲染 `QuickNavMotionDemo` 示範影片。
- 已檢查 0、120、220 frame 預覽圖。

### 備註
- 本次尚未推送 Git。
- 輸出影片與 Remotion 專案仍屬本地行銷素材，預設不推到網站 Git。

## 2026-06-30 10:40 - 整理後續影片企劃與素材規劃

### 類型
- 影片
- 文宣
- 文件

### 異動
- 新增 `影片處理skill/yaowu-video-roadmap.md`，整理後續影片系列、動態背景素材包、素材資料夾定位與量產順序。
- 將 `文宣背景圖(無LOGO)` 定位為空底圖與動態背景素材來源。
- 將 `完整文宣圖` 定位為已完成文宣圖，適合資訊卡、CTA、社群貼文與片尾前重點卡。
- 更新 `影片處理skill/README.md`、`AI_HANDOFF_曜舞天堂.md`、`PROJECT_MEMORY.md`，讓後續 AI 能知道影片規劃入口。

### 相關檔案
- `影片處理skill/yaowu-video-roadmap.md`
- `影片處理skill/README.md`
- `AI_HANDOFF_曜舞天堂.md`
- `PROJECT_MEMORY.md`
- `CHANGELOG.md`

### 驗證
- 已盤點兩個文宣資料夾的素材檔名與尺寸。
- 已抽看代表素材，確認可分為空底圖動態化與完成文宣圖資訊卡兩種用途。
- 未輸出新影片，因本次任務是先建立後續影片規劃。

### 備註
- 本次尚未推送 Git。
- 影片規劃與素材仍屬於本地行銷資料，預設不推到網站 Git。

## 2026-06-30 00:00 - 建立 AI 交接與更新紀錄制度

### 類型
- 文件
- 工作流程
- 影片/文宣交接

### 異動
- 新增 `AI_HANDOFF_曜舞天堂.md`，集中記錄網站、後台、表單、影片、文宣、視覺風格與 Git 注意事項。
- 新增 `AI_WORKFLOW.md`，規定所有 AI 每次完成更新後必須留下紀錄。
- 補充 `PROJECT_MEMORY.md` 的影片與文宣製作紀錄。
- 建立本 `CHANGELOG.md`，作為後續每次更新的固定紀錄入口。

### 相關檔案
- `AI_HANDOFF_曜舞天堂.md`
- `AI_WORKFLOW.md`
- `PROJECT_MEMORY.md`
- `CHANGELOG.md`

### 驗證
- 文件建立完成。
- 未執行網站測試，因本次只新增與更新交接文件。

### 備註
- 本次尚未推送 Git。
- 影片與文宣素材仍預設為本地行銷資料，不列入網站 Git 上架範圍。

<!-- 新紀錄請在此處上方新增 -->
