# Cloudflare Worker 後台登入設定

這份文件是用 Cloudflare Worker 取代 Netlify Identity，讓 `/admin/` 可以用 GitHub OAuth 登入，並保留原本的文章美化工具。

## 1. GitHub OAuth App

GitHub OAuth App 設定：

```text
Application name:
曜舞天堂 CMS 後台

Homepage URL:
https://otian1434-star.github.io/my-gas-link/

Authorization callback URL:
https://yaowu-cms-oauth.otian1434.workers.dev/callback
```

Client ID 可以公開放在 Cloudflare 變數，Client Secret 不要寫進 GitHub。

## 2. Cloudflare Worker 程式碼

到 Cloudflare Worker 的編輯器，把預設 Hello World 程式整份換成：

```text
CLOUDFLARE_WORKER_CMS_OAUTH.js
```

也就是把本專案這個檔案的內容完整貼到 Worker。

## 3. Cloudflare Worker Variables

到 Worker 的 `Settings` > `Variables` 新增：

```text
GITHUB_OAUTH_ID = Ov23litjNx6I9XWp84sj
GITHUB_REPO_PRIVATE = 0
```

再新增 Secret：

```text
GITHUB_OAUTH_SECRET = 你的 GitHub OAuth Client Secret
```

注意：剛剛貼到聊天裡的 Client Secret 建議到 GitHub OAuth App 重新產生一組，舊的刪掉，新的直接放進 Cloudflare Secret。

## 4. 後台位置

GitHub Pages 啟用後，後台會在：

```text
https://otian1434-star.github.io/my-gas-link/admin/
```

登入 GitHub 後，文章會直接 commit 回：

```text
otian1434-star/my-gas-link
```

## 5. 權限

只有對 `otian1434-star/my-gas-link` 有寫入權限的 GitHub 帳號才能成功儲存文章。
