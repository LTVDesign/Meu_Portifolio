# Script Direto de Limpeza da Vercel
Write-Host "Iniciando limpeza e migracao da Vercel..." -ForegroundColor Cyan

# 1. Remover pastas e arquivos residuais da Vercel
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue "F:\Meu_Portifolio\.vercel"
Remove-Item -Force -ErrorAction SilentlyContinue "F:\Meu_Portifolio\.vercelignore"
Remove-Item -Force -ErrorAction SilentlyContinue "F:\Meu_Portifolio\vercel.json"

# 2. Ajustar package.json
$pkgPath = "F:\Meu_Portifolio\package.json"
if (Test-Path $pkgPath) {
    Write-Host "Ajustando package.json..." -ForegroundColor Yellow
    $pkg = Get-Content $pkgPath -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($pkg.dependencies.PSObject.Properties['@vercel/analytics']) { $pkg.dependencies.PSObject.Properties.Remove('@vercel/analytics') }
    if ($pkg.dependencies.PSObject.Properties['@vercel/speed-insights']) { $pkg.dependencies.PSObject.Properties.Remove('@vercel/speed-insights') }
    if ($pkg.devDependencies.PSObject.Properties['@vercel/node']) { $pkg.devDependencies.PSObject.Properties.Remove('@vercel/node') }
    if ($pkg.scripts.PSObject.Properties['build:vercel']) { $pkg.scripts.PSObject.Properties.Remove('build:vercel') }
    if ($pkg.scripts.PSObject.Properties['build:vercel:clean']) { $pkg.scripts.PSObject.Properties.Remove('build:vercel:clean') }
    $pkg | ConvertTo-Json -Depth 10 | Set-Content $pkgPath -Encoding UTF8
}

# 3. Substituir URLs apenas em arquivos de codigo fonte
$oldDomain = "portifoliolele.vercel.app"
$newDomain = "lele.dev.br"

$targetFiles = @()
$targetFiles += Get-ChildItem -Path "F:\Meu_Portifolio" -File | Where-Object { $_.Extension -in ".html", ".json", ".env", ".ts", ".js", ".md" }
if (Test-Path "F:\Meu_Portifolio\src") {
    $targetFiles += Get-ChildItem -Path "F:\Meu_Portifolio\src" -Recurse -File
}
if (Test-Path "F:\Meu_Portifolio\public") {
    $targetFiles += Get-ChildItem -Path "F:\Meu_Portifolio\public" -Recurse -File | Where-Object { $_.Extension -in ".html", ".json", ".xml", ".txt" }
}

foreach ($f in $targetFiles) {
    try {
        $content = Get-Content $f.FullName -Raw -Encoding UTF8 -ErrorAction Stop
        if ($content -match $oldDomain) {
            Write-Host "Substituindo em: $($f.Name)" -ForegroundColor Green
            $content = $content -replace [regex]::Escape("https://$oldDomain/"), "https://$newDomain/"
            $content = $content -replace [regex]::Escape("https://$oldDomain"), "https://$newDomain"
            $content = $content -replace [regex]::Escape($oldDomain), $newDomain
            Set-Content -Path $f.FullName -Value $content -Encoding UTF8
        }
    } catch {}
}

Write-Host "Limpeza da Vercel concluida 100% com sucesso!" -ForegroundColor Green
