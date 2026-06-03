# 官方文章後台設定

這個網站目前採用 Decap CMS 作為免費文章後台，正式登入建議使用 Netlify Identity + Git Gateway。

## 使用方式

前台文章資料存在：

```text
data/posts.json
```

後台入口是：

```text
/admin/
```

管理者登入後，可以用表單新增、編輯、刪除官方文章，不需要手寫 HTML。

排版範例請看：

```text
CMS_FORMATTING.md
```

## Netlify 免費部署與後台登入

1. 到 Netlify 註冊/登入：

```text
https://app.netlify.com/
```

2. 選 `Add new project`，再選 `Import an existing project`。

3. 選 GitHub，授權 Netlify 存取你的 GitHub。

4. 選 repo：

```text
otian1434-star/my-gas-link
```

5. 部署設定：

```text
Build command：留空
Publish directory：/
```

6. 按 `Deploy site`。

7. 部署完成後，進入該 Netlify 專案：

```text
Project configuration > Identity
```

啟用 Identity。

8. 到：

```text
Project configuration > Identity > Services > Git Gateway
```

按 `Enable Git Gateway`。

9. 到：

```text
Project configuration > Identity > Registration
```

建議設定成 `Invite only`，避免外人註冊。

10. 邀請管理者：

```text
Identity > Invite users
```

輸入你的管理者 Email。

11. 從 Netlify 給你的網站網址進後台：

```text
https://你的站名.netlify.app/admin/
```

## 管理者權限

管理者權限由 Netlify Identity 控制。建議使用 `Invite only`，只邀請你信任的人登入後台。

## 注意

直接用瀏覽器開本機 HTML 檔時，文章 JSON 可能會因瀏覽器限制讀不到。
測試時請用本機伺服器或部署到 GitHub Pages。
