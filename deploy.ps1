# 部署到 GitHub Pages
# 用法：在 PowerShell 中运行 .\deploy.ps1

$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

Set-Location $PSScriptRoot

Write-Host "检查 GitHub 登录状态..." -ForegroundColor Cyan
gh auth status 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "尚未登录 GitHub，将打开浏览器完成授权..." -ForegroundColor Yellow
    gh auth login -h github.com -p https -w
}

$repoName = "ai-tools-hub"
$owner = (gh api user -q .login)
Write-Host "GitHub 用户: $owner" -ForegroundColor Green

if (-not (git remote get-url origin 2>$null)) {
    Write-Host "创建仓库并推送..." -ForegroundColor Cyan
    gh repo create $repoName --public --source=. --remote=origin --push
} else {
    Write-Host "推送到 origin/main..." -ForegroundColor Cyan
    git push -u origin main
}

Write-Host "启用 GitHub Pages (Actions)..." -ForegroundColor Cyan
gh api -X PUT "/repos/$owner/$repoName/pages" `
    -f "build_type=workflow" `
    -f "source[branch]=main" `
    -f "source[path]=/" 2>$null

Write-Host ""
Write-Host "部署已触发！约 1-2 分钟后可访问：" -ForegroundColor Green
Write-Host "https://$owner.github.io/$repoName/" -ForegroundColor Yellow
Write-Host ""
Write-Host "可在仓库 Actions 页查看部署进度。" -ForegroundColor Gray
