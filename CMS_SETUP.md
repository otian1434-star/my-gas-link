# 官方文章後台設定

這個網站目前採用 Decap CMS 作為免費文章後台。

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

## 上線前要修改

請打開：

```text
admin/config.yml
```

把這一行改成你的 GitHub repo：

```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME
```

例如：

```yaml
repo: myname/yao-forum
```

## 管理者權限

這種免費後台的管理者權限由 GitHub 控制。

把可以發文的人加入 GitHub repo 協作者後，他就能透過後台登入並修改文章。

## 注意

直接用瀏覽器開本機 HTML 檔時，文章 JSON 可能會因瀏覽器限制讀不到。
測試時請用本機伺服器或部署到 GitHub Pages。
