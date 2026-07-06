# 曜舞天堂網站 Memory

## 專案概況

- 專案資料夾：`c:\Users\User\Desktop\GIT論壇開發`
- GitHub Pages 倉庫：`otian1434-star/my-gas-link`
- 主要網站：靜態 HTML/CSS/JS。
- 後台：Decap CMS + GitHub OAuth，OAuth 由 Cloudflare Worker 協助。
- 表單：Google Apps Script 接收申請資料，寫入 Google 試算表。
- 部署：主要透過 `git push target main` 上架 GitHub Pages。

## 重要檔案

- `config.js`：全站主要設定，包含網站名稱、LINE、下載、贊助、懸浮視窗、音樂播放器。
- `data/site.json`：後台可編輯的站台設定資料。
- `assets/js/forum.js`：前台共用導覽、浮動面板、側邊圖片、音樂播放器等。
- `assets/css/style.css`：全站主要視覺樣式。
- `pages/`：各頁面 HTML。
- `data/search-index.json`：全站搜尋索引，常會因生成時間或內容更新而變動。
- `admin/config.yml`：Decap CMS 後台設定。
- `GOOGLE_APPS_SCRIPT_ACCOUNT_APPLICATION.gs`：帳號申請資料接收端。
- `GOOGLE_APPS_SCRIPT_SETUP.md`：Google Apps Script 設定說明。
- `CLOUDFLARE_WORKER_CMS_OAUTH.js`：Cloudflare Worker OAuth 程式。
- `CLOUDFLARE_CMS_OAUTH_SETUP.md`：Cloudflare Worker OAuth 設定說明。

## 目前外部服務與連結

- 官方網站：https://otian1434-star.github.io/my-gas-link/index.html
- 官方 LINE：https://lin.ee/8Dy3o36
- 官方 LINE ID：@184jiknt
- 自動贊助：https://web-hosts.net/%E6%9B%9C%E8%88%9E%E5%A4%A9%E5%A0%82.html
- 推文回報：https://web-hosts.net/share/WtNas3Zg
- Google Apps Script Web App：
  - `https://script.google.com/macros/s/AKfycbwP5pmmCMGgcr__owE1SHVYgQ4RMUHtZWr5UtOpxqgSbmZhaVtxHhrK2W_CUeB_tXo2/exec`
- Cloudflare CMS OAuth Worker：
  - `https://yaowu-cms-oauth.otian1434.workers.dev`

## 目前伺服器設定文字

- 經驗倍率：3 倍
- 內掛倍率：1 倍
- 金幣倍率：1 倍
- 掉落倍率：1 倍
- 玩家等級上限：55 級（隨進度調整開放）
- 寵物等級上限：52 級
- 版本：3.81 內掛版
- 預計開服：2026/07/09 20:00
- 封測期間：開服前可持續測試。

## 已完成的主要功能

- 官方論壇首頁視覺改為曜舞天堂風格。
- 網站名稱改為「曜舞天堂 經典不敗」。
- 版本文字統一為「3.81 內掛版」。
- 加入網站 Logo、favicon、主視覺圖、背景圖。
- 加入左右側懸浮圖片：
  - 左側官方 LINE@。
  - 右側 24 小時自動贊助。
- 加入右下浮動快捷視窗。
- 加入站內搜尋功能。
- 加入後台發文與格式化輔助。
- 加入 Google Apps Script 帳號申請表單串接。
- 加入推文說明、直播說明、遊戲下載、防毒排除、輔助工具教學。
- 加入職業介紹輪播。
- 加入大量遊戲特色、地圖介紹、道具介紹、武器/防具介紹頁面。
- 加入背景音樂播放器。

## 近期已上架變更

- 玩家等級上限已更新為 55 級，標註「隨進度調整開放」。
- 背景音樂播放器已同步目前 `assets/media/music/` 內的 22 首 MP3。
- 遊戲特色新增 `等級獎勵表`，入口已加入遊戲特色總覽、桌機選單與手機選單。
- 推文說明與直播說明的推廣商人兌換清單已改為最新項目。
- 推文說明頁新增包月推文代工三組優惠價 `$1000 TWD`，發文規定單日上限改為 60 顆（10 次）。
- 推文說明頁分享圖片區已加入 `完整文宣圖/完整文宣圖1.png` 到 `完整文宣圖13.png`，使用折疊縮圖圖庫避免頁面過長；若要上架需確認 `完整文宣圖/` 圖片檔有被納入 Git。
- 直播推廣箱內容物已改為藍鑽、推文幣、直播獎勵兌換證；1/2/3 小時分別為 1/2/3 個兌換證。
- 變身圖鑑大全新增變身合成機率說明，公開到英雄合成傳說為止；傳說合成神話目前不公開。
- 活動公告與一般內容頁表格已改成依內容寬度呈現，手機超寬表格會顯示左右滑動提示。
- 活動公告新增：
  - `🎁 永久活動 ── 曜舞官方的祝福・加 LINE 好禮`
  - `🎉 開服活動 ── 歡慶開服慶`
  - `💎 開服活動 ── 開服贊助好禮`
- `data/search-index.json` 已重新生成，搜尋內容已同步。
- 防外掛驗證教學頁移除影片，只保留教學。
- 防外掛驗證教學標題與 Step 2 已更新：
  - 點擊【HOME】進入【LH 喝水程式】，確認「驗證視窗」內顯示的英文字母代碼。
- 功能性補丁下載點更新：
  - `https://drive.google.com/file/d/119_5OrCMO-p78mp8gWumjdO3OZpeUqdo/view?usp=sharing`
- 自動贊助連結已接到：
  - 全站 `sponsorUrl`
  - 浮動快捷視窗「贊助連結」
  - 右側自動贊助圖
  - 贊助說明頁按鈕
- 推文回報頁已加入按鈕：
  - `https://web-hosts.net/share/WtNas3Zg`
- 龍印魔石頁已暫時下架：
  - 移除選單入口。
  - 移除遊戲特色總覽卡片。
  - 刪除公開頁 `pages/equipment-dragon-seal.html`。
  - 搜尋頁加了過濾保護。

## 暫時隱藏或待更新內容

- 龍印魔石：目前不給玩家看，等使用者之後提供新版內容再恢復。
- `pages/download.html` 目前也有既有未提交變更，後續處理時需先確認差異。

## 工作樹注意事項

目前常見未提交項目：

- `data/search-index.json`
- `pages/download.html`
- `天堂小圖/`
- `社群文宣提案.md`

這些可能是使用者或其他工具先前留下的變更。除非任務明確相關，不要一起提交。

## 影片與 I2V 本機環境

- 影片/文宣/Remotion/I2V 工作資料預設只留本機，不推上網站 Git，除非使用者明確要求。
- 本機已建立真正 image-to-video 測試環境：
  - venv：`C:\Users\User\.cache\yaowu-i2v-lab\venv`
  - Wan2.2 模型：`C:\Users\User\.cache\yaowu-i2v-lab\models\Wan2.2-TI2V-5B-Diffusers`
  - 主要腳本：`影片處理skill/scripts/run_wan_i2v_test.py`
  - 備用 SVD 腳本：`影片處理skill/scripts/run_svd_i2v_test.py`
- 硬體：RTX 4080 SUPER 16GB，可跑低解析 Wan2.2 I2V 測試。
- 已確認本機 Wan2.2 能產出真正 I2V，不是單純推鏡後製。
- 重要限制：
  - 複雜軍隊、人群、多角色、密集旗幟或建築線條會容易融化。
  - 單人近景、背景較乾淨、臉部較大的圖比較適合轉動態。
  - 原生 480p 測試比低解析清楚，但仍未達正式宣傳素材標準。
  - 正式影片建議使用高品質外部 I2V 服務/API 產出主素材，再交給 Remotion 做品牌、字幕、片頭片尾、音樂。
- 第一輪可參考輸出：
  - `影片處理skill/i2v素材庫/第一輪測試/04-single-character-purple/wan-native-832x480.mp4`：本機目前較清楚，但只適合技術參考。
  - `影片處理skill/i2v素材庫/第一輪測試/04-single-character-purple/wan-subtle-512.mp4`：較穩但偏低解析。
  - `影片處理skill/i2v素材庫/第一輪測試/06-ocean-elf/wan-subtle-512.mp4`：可再調參。
  - `影片處理skill/i2v素材庫/第一輪測試/05-moon-archer/wan-subtle-512.mp4`：淘汰。
  - `影片處理skill/i2v素材庫/第一輪測試/01-quick-nav-queen/wan-test-512.mp4`：崩壞，不採用。

## Git 注意事項

- 主要推送遠端：`target`
- 常用上架命令：

```powershell
git push target main
```

- 每次提交前都應：
  - `git status --short`
  - `git diff -- <相關檔案>`
  - `git diff --check -- <相關檔案>`
  - 只 `git add` 本次任務相關檔案。

## 內容風格規則

- 所有貼上的 HTML 內容都要轉換成曜舞天堂風格，不要保留白底 Google 文件感。
- 前台頁面偏黑金、暗色、史詩風。
- 表格要手機可左右滑動或可讀。
- 重要資訊用卡片、提示框、徽章、標題分區呈現。
- 避免大段白底內容破壞整體感。
- 外部導入、iframe、Google 外掛類內容若非必要，優先移除或改成本地內容。

## 後台與資料安全

- 後台登入已改走 Cloudflare Worker OAuth。
- 不要在公開文件提交 OAuth Client Secret、token、管理密語。
- 帳號申請資料寫入 Google 試算表。
- 手機欄位需以文字格式保存，避免 Google Sheets 去掉開頭 0。
- Apps Script 已加入重複帳號與暱稱檢查邏輯。

## 未來可優先處理

- 清理或重新生成 `data/search-index.json`。
- 確認 `pages/download.html` 既有未提交變更是否需要上架。
- 整理文宣圖素材，建立固定文宣模板。
- 把常用外部連結集中進 `config.js`，減少散落在 HTML 內。
- 重新設計 Decap CMS 預覽區，讓後台更接近官方前台樣式。

## AI 交接文件

- 已新增 `AI_HANDOFF_曜舞天堂.md` 作為跨聊天室、跨 AI 的交接文件。
- 已新增 `AI_WORKFLOW.md` 作為所有 AI 的固定工作規範。
- 已新增 `CHANGELOG.md` 作為每次更新的固定紀錄檔。
- 新 AI 接手時建議先讀：
  - `AI_HANDOFF_曜舞天堂.md`
  - `PROJECT_MEMORY.md`
  - `AI_WORKFLOW.md`
  - `CHANGELOG.md`
  - 若要做影片，再讀 `影片處理skill/README.md` 與 `yaowu-remotion-video/src/Composition.tsx`。

## 更新紀錄制度

- 所有 AI 每次完成更新後，都要新增或補充紀錄。
- 一般更新寫入 `CHANGELOG.md`。
- 長期設定與專案狀態寫入 `PROJECT_MEMORY.md`。
- 跨 AI 交接規則、使用者偏好、風格規範、影片流程寫入 `AI_HANDOFF_曜舞天堂.md`。
- 寫完後回覆使用者時，需說明紀錄更新在哪裡。

## 影片與文宣製作紀錄

- 影片製作屬於後端行銷素材，預設不要推上 Git。
- 影片技能整理資料夾：`影片處理skill/`
- 後續影片企劃總表：`影片處理skill/yaowu-video-roadmap.md`
- Remotion 專案資料夾：`yaowu-remotion-video/`
- 主要影片程式：
  - `yaowu-remotion-video/src/Root.tsx`
  - `yaowu-remotion-video/src/Composition.tsx`
- 已建立的 Remotion compositions：
  - `YaowuPromo15`：15 秒橫式短版。
  - `YaowuPromo30`：30 秒橫式完整介紹版。
  - `YaowuOutro6`：6 秒片尾定格版。
  - `YaowuVertical18`：18 秒直式短影音版。
  - `YaowuRecruit15`：15 秒直式封測招募。
  - `YaowuForumGuide20`：20 秒直式官網導覽。
  - `YaowuClasses20`：20 秒直式七職業介紹。
  - `YaowuEpic30`：30 秒直式完整形象片。
- 已輸出檔案：
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
- 影片素材來源：
  - `曜舞LOGO橫式影片片頭.mp4`
  - `曜舞LOGO直視影片片頭.mp4`
  - `曜舞橫式影片片尾.mp4`
  - `曜舞天堂LOGO.png`
  - `曜舞官方LINE@QRCORD.png`
  - `assets/media/music/`
  - `文宣背景圖(無LOGO)/`
  - `完整文宣圖/`
  - `assets/media/classes/`
- 素材資料夾定位：
  - `文宣背景圖(無LOGO)`：空底圖、動態背景、B-roll、AI image-to-video 素材來源。
  - `完整文宣圖`：已完成文宣圖，適合資訊卡、CTA、片尾前重點卡，不建議丟 AI 動態模型。
- 影片動態化判斷：
  - Remotion 適合鏡頭推拉、視差、粒子、光效、字幕、Logo、QR、音樂後製。
  - 若要人物頭髮、臉部、披風、衣料、旗幟、煙霧、雲層真的連續動態，必須先用 AI image-to-video 生成 B-roll，再交給 Remotion 合成。
  - `QuickNavMotionDemo` 只是 Remotion 後製示範，不是完整 AI 影片替代品。
- 第一輪 I2V 測試素材包：
  - `影片處理skill/i2v素材庫/第一輪測試/`
  - `01-quick-nav-queen`：快速目錄新背景圖，測頭髮、披風、旗幟、雲層。
  - `02-ocean-elf`：文宣圖片8，測海浪、雷光、長髮、魔法光。
  - `03-battle-party`：文宣圖片5，測多角色戰場穩定度。
  - 每組已有 `source.png` 與 `prompt.md`。
- 後續優先建立 6 組動態背景素材包：
  - 黑金主視覺
  - 海潮魔法
  - 亞丁戰火
  - 快速資料庫
  - 伺服器設定
  - 超寬史詩橫幅
- 近期影片修正：
  - 直式影片職業圖已改成 7 職業完整展示，避免裁切半張。
  - 直式影片音樂已改用不同曲目，避免多支影片都同一首。
  - 申請帳號場景已調亮，降低暗角與遮罩。
  - YouTube 區塊截圖不穩時，以縮圖替代避免黑畫面。
  - 2026-06-30 已輸出四支直式社群短片，四支主畫面不重複，片尾統一可重複。
  - 官網導覽短片第二段已改用快速目錄/功能頁截圖，避免資料庫截圖過暗。
  - 官網導覽短片已全面改用手機版官網截圖，不再把桌機版硬裁成直式；素材為 `forum-home-mobile.png`、`forum-features-mobile.png`、`forum-register-mobile.png`。
  - 直式影片凡是呈現官方網站畫面，一律優先使用手機版截圖；`YaowuEpic30` 的官方論壇段落與 `YaowuVertical18` 的申請帳號段落也已同步改成手機版。
  - `YaowuPromo30` 是橫式 1920x1080 影片，官方網站畫面可以保留桌機版。
  - 已新增 `QuickNavMotionDemo`，可把靜態背景圖用 Remotion 做成後製動態示範，但無法達成人物頭髮、臉、披風真動態。
- 靜態圖動態化示範輸出：
  - `影片處理skill/exports/bg-motion-demo/quick-nav-motion-demo.mp4`
  - `影片處理skill/exports/bg-motion-demo/quick-nav-motion-frame-000.png`
  - `影片處理skill/exports/bg-motion-demo/quick-nav-motion-frame-120.png`
  - `影片處理skill/exports/bg-motion-demo/quick-nav-motion-frame-220.png`
