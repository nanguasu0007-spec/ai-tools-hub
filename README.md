# aijuhe

国内 AI 工具导航（AI 聚合），收录 79 款主流 AI 工具，分类展示，一键直达官方网站。

## 在线访问

https://nanguasu0007-spec.github.io/aijuhe/

## 本地预览

```bash
npx serve .
```

浏览器打开 `http://localhost:3000`

## 更新工具数据

编辑 `build_data.js` 中的工具列表，然后运行：

```bash
node build_data.js
```

站点名称与 GitHub Pages 路径在 `build_data.js` 顶部配置：

- `SITE_NAME`：页面显示品牌名（当前 `aijuhe`）
- `SITE_SLUG`：GitHub 仓库名 / Pages 路径（当前 `aijuhe`）

## 技术栈

纯静态站点：HTML + CSS + JavaScript，无需后端。

## 自定义域名（可选）

若已购买如 `aijuhe.com` 的域名，在仓库根目录新建 `CNAME` 文件，内容为域名（仅一行），并在域名 DNS 添加 CNAME 指向 `nanguasu0007-spec.github.io`，最后在 GitHub 仓库 Settings → Pages 填写 Custom domain。

## 百度收录（SEO）

站点已提供 `robots.txt`、`sitemap.xml`、静态目录页 `map.html`（含全部工具名称与简介，便于百度爬虫抓取）。

1. 打开 [百度搜索资源平台](https://ziyuan.baidu.com/)，登录后「用户中心 → 站点管理」添加站点：`https://nanguasu0007-spec.github.io/aijuhe/`
2. 选择 **HTML 标签验证**，将平台给出的 `meta` 填入 `index.html` 中注释位置，保存后推送 GitHub，再在平台点击验证
3. 验证通过后，在「普通收录 → 资源提交 → sitemap」提交：`https://nanguasu0007-spec.github.io/aijuhe/sitemap.xml`
4. 可选：在「普通收录 → 资源提交 → 主动推送」提交首页与 `map.html` 地址，加快收录

说明：GitHub Pages 服务器在海外，百度收录可能较慢；若长期运营，建议使用国内服务器 + 已备案域名，收录与排名会更好。
