# 曜舞天堂 AI 交接文件

這份文件是給新的 AI、剪輯工具、或新的聊天室快速接手用。
接手順序建議：

1. 先讀本檔。
2. 再讀 `PROJECT_MEMORY.md`。
3. 再讀 `AI_WORKFLOW.md`。
4. 看最近變更時讀 `CHANGELOG.md`。
5. 如果要做影片或文宣，再讀 `影片處理skill/README.md` 與 `yaowu-remotion-video/src/Composition.tsx`。
6. 如果要規劃後續影片系列或挑素材，再讀 `影片處理skill/yaowu-video-roadmap.md`。

## 強制紀錄規則

- 每次完成網站、內容、圖片、影片、後台、表單、部署、文件更新後，都要更新 `CHANGELOG.md`。
- 若是長期會影響後續接手的資訊，也要同步更新 `PROJECT_MEMORY.md`。
- 若是會影響新 AI 工作方式、使用者偏好、風格規則、素材位置、影片流程，還要同步更新本檔。
- 影片和文宣素材預設只留在本地紀錄，不推上網站 Git，除非使用者明確要求。

## 專案定位

- 專案名稱：曜舞天堂 經典不敗
- 遊戲版本：3.81 內掛版
- 主要定位：經典天堂私服，黑金史詩風，強調懷舊、質感、官方感、完整資料庫與玩家便利性。
- 官方網站：https://otian1434-star.github.io/my-gas-link/index.html
- 官方 LINE：https://lin.ee/8Dy3o36
- 官方 LINE ID：@184jiknt
- 自動贊助：https://web-hosts.net/%E6%9B%9C%E8%88%9E%E5%A4%A9%E5%A0%82.html
- 推文回報：https://web-hosts.net/share/WtNas3Zg

## 使用者工作習慣

- 使用繁體中文溝通。
- 希望直接實作，不要只停在建議。
- 若是網站內容、文案、HTML 轉換，預設要整理成「曜舞天堂官方風格」。
- 若是可合理判斷的修正，直接做；只有高風險或資訊不足才先問。
- 給使用者回覆要清楚、短、能執行，不需要過度安慰或空泛說明。
- 使用者常會提供原始 HTML，需求是「轉成曜舞天堂風格」，不是照貼原白底樣式。

## 視覺風格規則

- 主風格：黑金、暗色、史詩、天堂感、官方網站質感。
- 文字：金色標題、白色或淡金正文，避免灰到看不清楚。
- 卡片：暗底、金色邊框、柔和光暈，不要白底 Google 文件感。
- 表格：要支援手機瀏覽，可橫向滑動或自適應。
- 背景：可用暗色遊戲場景，但資訊區文字必須清楚。
- 按鈕：金色或暗金底，明確 hover 狀態。
- 不要把外部網站 iframe 或 Google 外掛直接塞進內容，除非使用者明確要求。
- 論壇內若出現其他天堂名稱，原則上改成「曜舞天堂」。

## 影片與 Image-to-Video 規則

- 使用者要的「靜態圖變動態」不是只要推鏡、粒子、光效，而是人物頭髮、臉、衣服、旗幟、雲霧、水火自然動起來。
- 真正人物動態必須使用 Image-to-Video 模型；Remotion 只負責後製合成、字幕、品牌、片頭片尾、音樂、轉場。
- 本機已建立 Wan2.2 I2V 環境：
  - venv：`C:\Users\User\.cache\yaowu-i2v-lab\venv`
  - 模型：`C:\Users\User\.cache\yaowu-i2v-lab\models\Wan2.2-TI2V-5B-Diffusers`
  - 腳本：`影片處理skill/scripts/run_wan_i2v_test.py`
- 已實測結果：
  - 複雜戰場圖、軍隊圖、多人圖容易崩壞。
  - 單人近景、主角臉較大、背景乾淨的圖比較可用。
  - `04-single-character-purple/wan-native-832x480.mp4` 是目前本機較清楚示範，但仍不應視為正式宣傳素材標準。
  - `04-single-character-purple/wan-subtle-512.mp4` 是較穩低解析示範。
  - `01-quick-nav-queen`、`05-moon-archer` 目前版本不適合作正式素材。
- 正式素材建議：
  - 每段 1 到 2 秒。
  - 先用多個短片段拼接，不追求單張圖變成 6 秒長鏡頭。
  - 用保守 prompt 鎖住臉、構圖、衣服，僅讓頭髮、布料、光影、背景元素微動。
  - 若要達到使用者外部 AI 網站範例的自然髮絲/臉部/衣料品質，應改用高品質外部 I2V 服務或 API 產主素材，再由本地 Remotion 後製。
- 影片與文宣素材是後端行銷資料，預設不推上網站 Git。

## 網站架構

- 專案根目錄：`C:\Users\User\Desktop\GIT論壇開發`
- 主要前台：
  - `index.html`
  - `pages/`
  - `assets/css/style.css`
  - `assets/js/forum.js`
  - `config.js`
  - `data/site.json`
- 後台：
  - `admin/config.yml`
  - Decap CMS
  - Cloudflare Worker OAuth：`CLOUDFLARE_WORKER_CMS_OAUTH.js`
- 表單：
  - `register.html`
  - `GOOGLE_APPS_SCRIPT_ACCOUNT_APPLICATION.gs`
  - `GOOGLE_APPS_SCRIPT_SETUP.md`
- 搜尋：
  - `data/search-index.json`
  - 若頁面內容有大改，需注意搜尋索引是否同步。

## Git 與部署規則

- 正式 GitHub repo：`otian1434-star/my-gas-link`
- 正式遠端常用名稱：`target`
- 上架前要先確認：
  - `git status --short`
  - `git diff -- <本次相關檔案>`
  - `git diff --check -- <本次相關檔案>`
- 只提交本次任務相關檔案。
- 影片、文宣、Remotion 工作資料預設是後端行銷素材，不要推上網站 Git，除非使用者明確要求。
- 不要提交 OAuth secret、token、管理密語、私人密碼。

## 外部服務紀錄

- Google Apps Script Web App：
  - `https://script.google.com/macros/s/AKfycbwP5pmmCMGgcr__owE1SHVYgQ4RMUHtZWr5UtOpxqgSbmZhaVtxHhrK2W_CUeB_tXo2/exec`
- Cloudflare CMS OAuth Worker：
  - `https://yaowu-cms-oauth.otian1434.workers.dev`
- Google 試算表欄位：
  - 送出時間
  - 遊戲帳號
  - 遊戲密碼
  - 暱稱
  - 職業與性別
  - 電子信箱
  - 手機號碼
  - 如何得知
  - 來源頁面
  - 備註
  - LINE ID
- 手機號碼欄位必須以文字格式保存，避免開頭 0 被 Google Sheets 移除。

## 目前伺服器設定文字

- 經驗倍率：3 倍
- 內掛倍率：1 倍
- 金幣倍率：1 倍
- 掉落倍率：1 倍
- 玩家等級上限：55 級（隨進度調整開放）
- 版本：3.81 內掛版
- 預計開服：2026/07/09 20:00
- 封測期間：開服前可持續測試。

## 網站內容狀態

- 背景音樂播放器目前使用 `assets/media/music/` 內 22 首 MP3，`config.js` 與 `data/site.json` 需同步維護。
- 遊戲特色已新增等級獎勵表，入口在遊戲特色總覽、桌機選單、手機選單。
- 推文說明與直播說明的推廣商人兌換清單已更新為最新兌換品項。
- 直播推廣箱目前欄位是藍鑽、推文幣、直播獎勵兌換證。
- 變身圖鑑大全已加入變身合成機率：一般到高級 80%、高級到稀有 50%、稀有到英雄 35%、英雄到傳說 18%、傳說到神話 0%。
- 活動公告目前已有兩篇開服活動：
  - `🎉 開服活動 ── 歡慶開服慶`
  - `💎 開服活動 ── 開服贊助好禮`
- 龍印魔石目前先不要公開，後續使用者提供新版內容再恢復。
- 防外掛驗證教學已移除影片，只保留文字教學。
- 功能性補丁下載點已換新：
  - `https://drive.google.com/file/d/119_5OrCMO-p78mp8gWumjdO3OZpeUqdo/view?usp=sharing`
- 贊助連結已接到：
  - 全站 sponsor URL
  - 右側自動贊助圖
  - 浮動快捷視窗
  - 贊助說明頁按鈕
- 推文回報按鈕已接到：
  - `https://web-hosts.net/share/WtNas3Zg`

## 影片與文宣資料

影片製作資料不屬於正式網站上架內容，預設不要推到 Git。

### Remotion 專案

- 專案資料夾：`yaowu-remotion-video/`
- 主要檔案：
  - `yaowu-remotion-video/src/Root.tsx`
  - `yaowu-remotion-video/src/Composition.tsx`
- 技術：
  - Remotion 4
  - React
  - TypeScript
  - 輸出 MP4

### Remotion compositions

- `YaowuPromo15`
  - 15 秒
  - 1920x1080
  - 橫式震撼短版
- `YaowuPromo30`
  - 30 秒
  - 1920x1080
  - 橫式完整介紹版，含片頭片尾、論壇畫面、遊戲內容資訊。
- `YaowuOutro6`
  - 6 秒
  - 1920x1080
  - 片尾定格，含官方 Logo 與 LINE QR。
- `YaowuVertical18`
  - 18 秒
  - 1080x1920
  - 直式短影音版，適合 Reels、Shorts、TikTok。
- `YaowuRecruit15`
  - 15 秒
  - 1080x1920
  - 直式封測招募，主打封測、倍率、官網申請。
- `YaowuForumGuide20`
  - 20 秒
  - 1080x1920
  - 直式官網導覽，主打論壇、快速目錄、帳號申請。
- `YaowuClasses20`
  - 20 秒
  - 1080x1920
  - 直式七職業介紹，完整展示 7 職業圖，不裁切半張。
- `YaowuEpic30`
  - 30 秒
  - 1080x1920
  - 直式完整形象片，主打品牌情緒、經典不敗、系統亮點。

### 已輸出影片

- `影片處理skill/exports/yaowu-outro-6s.mp4`
- `影片處理skill/exports/yaowu-outro-final-frame.png`
- `影片處理skill/exports/yaowu-promo-30s.mp4`
- `影片處理skill/exports/yaowu-promo-30s-forum-preview.png`
- `影片處理skill/exports/yaowu-promo-30s-content-preview.png`
- `影片處理skill/exports/yaowu-vertical-18s.mp4`
- `影片處理skill/exports/yaowu-vertical-18s-mood-preview.png`
- `影片處理skill/exports/yaowu-vertical-18s-class-preview.png`
- `影片處理skill/exports/yaowu-vertical-18s-apply-preview.png`
- `影片處理skill/exports/yaowu-vertical-18s-final-preview.png`
- `影片處理skill/exports/social-series-20260630/yaowu-recruit-15s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-forum-guide-20s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-classes-20s-v.mp4`
- `影片處理skill/exports/social-series-20260630/yaowu-epic-30s-v.mp4`
- `影片處理skill/exports/social-series-20260630/social-series-contact-sheet.jpg`

### 影片素材來源

- 片頭：
  - `曜舞LOGO橫式影片片頭.mp4`
  - `曜舞LOGO直視影片片頭.mp4`
- 片尾：
  - `曜舞橫式影片片尾.mp4`
- Logo：
  - `曜舞天堂LOGO.png`
- LINE QR：
  - `曜舞官方LINE@QRCORD.png`
- 音樂：
  - `assets/media/music/`
  - 橫式影片曾用 `music153.mp3`
  - 直式影片已改用 `music176.mp3`，避免連續影片音樂重複。
- 文宣與背景：
  - `文宣背景圖(無LOGO)/`
  - `完整文宣圖/`
  - `assets/media/video/`
  - `assets/media/classes/`

### 影片企劃與素材規劃

- 後續影片系列、素材比例、動態背景素材包、量產順序已整理在：
  - `影片處理skill/yaowu-video-roadmap.md`
- `文宣背景圖(無LOGO)` 定位為空底圖與可動態化素材來源。
- `完整文宣圖` 定位為已完成文宣圖，適合做資訊卡、CTA、片尾前重點卡，不建議丟進 AI image-to-video。
- 若使用者要求人物頭髮、臉部、披風、衣料、旗幟、煙霧、雲層真的動，必須先走 AI image-to-video；Remotion 只負責品牌後製與合成。
- `QuickNavMotionDemo` 只是 Remotion 後製動態示範，不能當成真正 AI 影片替代品。
- 第一輪 I2V 測試素材包：
  - `影片處理skill/i2v素材庫/第一輪測試/`
  - 已挑 `快速目錄新背景圖.png`、`文宣圖片8.png`、`文宣圖片5.png`
  - 每張圖都有 `source.png` 與 `prompt.md`
  - 總覽預覽：`影片處理skill/i2v素材庫/第一輪測試/i2v-test-selection-preview.jpg`
- 後續先製作 6 組可重複使用的動態背景素材：
  - 黑金主視覺
  - 海潮魔法
  - 亞丁戰火
  - 快速資料庫
  - 伺服器設定
  - 超寬史詩橫幅

### 近期影片修正重點

- 直式影片的職業介紹場景，原本圖片比例被裁切，已改成 7 張職業圖完整展示，不再裁半身或亂縮。
- 直式影片音樂已更換，不再連續使用同一首。
- 申請帳號場景原本太暗，已提高截圖亮度、降低遮罩與暗角，讓背景與文字更清楚。
- 論壇首頁截圖遇到 YouTube iframe 不易正常呈現，已用替代縮圖處理，避免影片區塊黑掉。
- 2026-06-30 已輸出四支直式社群短片，主畫面分別使用封測招募、官網導覽、七職業、完整形象，不要再用同一組畫面重剪成四支。
- `YaowuForumGuide20` 第二段已改用快速目錄/功能頁截圖，避免原資料庫截圖太暗。
- `YaowuForumGuide20` 已全面改用手機版官網截圖素材：`forum-home-mobile.png`、`forum-features-mobile.png`、`forum-register-mobile.png`。後續直式影片呈現官網時，優先使用手機版截圖，不要把桌機版硬裁成 9:16。
- `YaowuEpic30` 的官方論壇段落與 `YaowuVertical18` 的申請帳號段落也已改成手機版截圖；所有直式官網畫面都要遵守同一規則。
- `YaowuPromo30` 是橫式 1920x1080，官網畫面保留桌機版即可。
- 四支短片的音樂已分配為 `music149.mp3`、`music142.mp3`、`music83.mp3`、`music165.mp3`，後續續作不要連續重複同一首。
- 已新增 `QuickNavMotionDemo`，用 Remotion 模仿 AI 生成影片的鏡頭與氣氛，輸出示範在 `影片處理skill/exports/bg-motion-demo/`。
- 使用者已指出此效果與參考 AI 影片仍有明顯差距，因為參考影片的人物頭髮、臉、披風會真實動。後續不能只靠 Remotion，需要先產 AI image-to-video B-roll。

### 常用影片指令

在 `yaowu-remotion-video/` 內執行：

```powershell
npm run lint
npx remotion render YaowuVertical18 out\yaowu-vertical-18s.mp4 --codec=h264 --crf=18
npx remotion render YaowuRecruit15 out\yaowu-recruit-15s-v.mp4 --codec=h264 --crf=18
npx remotion render YaowuForumGuide20 out\yaowu-forum-guide-20s-v.mp4 --codec=h264 --crf=18
npx remotion render YaowuClasses20 out\yaowu-classes-20s-v.mp4 --codec=h264 --crf=18
npx remotion render YaowuEpic30 out\yaowu-epic-30s-v.mp4 --codec=h264 --crf=18
npx remotion render YaowuPromo30 out\yaowu-promo-30s.mp4 --codec=h264 --crf=18
npx remotion render YaowuOutro6 out\yaowu-outro-6s.mp4 --codec=h264 --crf=18
```

## 影片風格方向

- 目標感受：震撼、吸睛、史詩、熱血，但不要廉價閃爍。
- 節奏：短影音前 3 秒必須有強視覺或強句子。
- 不想太早曝光完整遊戲畫面時，可用：
  - Logo 片頭
  - 文宣背景動態化
  - 職業圖
  - 官網畫面
  - 申請帳號流程
  - 系統亮點文字
  - LINE/官網 CTA
- 不要每支影片都用同一首歌。
- 直式影片不要直接把橫式畫面硬塞進去，需重新構圖。

## 文案方向

常用核心訊息：

- 經典 3.81，內掛版。
- 找回最初天堂的節奏。
- 開服前持續開放測試。
- 官網即可申請帳號。
- 官方協助預先建立角色。
- 加入 LINE 取得最新資訊。

避免：

- 過度誇張到失真。
- 太多系統細節塞在同一張圖。
- QR Code 直接白底硬貼，應加框、光暈、底板，與黑金風格融合。

## 後續接手提醒

- 新 AI 若要改網站，先查本次相關檔案，不要全站亂重構。
- 新 AI 若要做影片，不要把影片素材提交到網站 Git。
- 新 AI 若要新增文章內容，要統一轉成曜舞黑金風格。
- 新 AI 若看到白底 HTML，應重製樣式，不是照貼。
- 新 AI 若要上架，必須明確確認要推到 `otian1434-star/my-gas-link`。
