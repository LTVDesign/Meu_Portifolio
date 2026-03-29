const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Diretórios a serem processados
const directories = [
    'public/desktop_pc',
    'public/empresas',
    'public/formacao',
    'public/planet/textures',
    'src/assets',
    'src/assets/company',
    'src/assets/tech',
    'src/logos'
];

// Arquivos que NÃO devem ser convertidos (favicons, ícones com transparência específica)
const excludeFiles = [
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'logo.svg',
    'close.svg',
    'menu.svg',
    'threejs.svg',
    'apple.svg',
    'arduino.svg',
    'esp32.svg',
    'kali.svg',
    'microsoft365.svg',
    'python.svg',
    'reactjs.svg',
    'redux.svg',
    'seo.svg',
    'sql.svg',
    'tailwind.svg',
    'windows.svg',
    'tripguide.webp' // Já é WebP
];

// Qualidade de conversão (80-90% para bom balanceamento)
const WEBP_QUALITY = 85;

async function convertPngToWebp(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(outputPath);

        const originalStats = fs.statSync(inputPath);
        const webpStats = fs.statSync(outputPath);

        const reduction = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(2);

        console.log(`✓ Convertido: ${path.basename(inputPath)}`);
        console.log(`  Tamanho original: ${(originalStats.size / 1024).toFixed(2)} KB`);
        console.log(`  Tamanho WebP: ${(webpStats.size / 1024).toFixed(2)} KB`);
        console.log(`  Redução: ${reduction}%`);

        return { original: originalStats.size, webp: webpStats.size, reduction: parseFloat(reduction) };
    } catch (error) {
        console.error(`✗ Erro ao converter ${inputPath}:`, error.message);
        return null;
    }
}

async function processDirectory(dir) {
    const fullDir = path.join(__dirname, '..', dir);

    if (!fs.existsSync(fullDir)) {
        console.log(`⚠ Diretório não encontrado: ${dir}`);
        return;
    }

    console.log(`\n📁 Processando diretório: ${dir}`);

    const files = fs.readdirSync(fullDir);
    let converted = 0;
    let skipped = 0;
    let totalReduction = 0;

    for (const file of files) {
        const filePath = path.join(fullDir, file);
        const stat = fs.statSync(filePath);

        // Pular diretórios
        if (stat.isDirectory()) {
            continue;
        }

        // Verificar se é PNG e não está na lista de exclusão
        if (file.toLowerCase().endsWith('.png') && !excludeFiles.includes(file)) {
            const webpFile = file.replace(/\.png$/i, '.webp');
            const webpPath = path.join(fullDir, webpFile);

            // Se já existe WebP, pular
            if (fs.existsSync(webpPath)) {
                console.log(`⊘ Já existe WebP: ${file} → ${webpFile}`);
                skipped++;
                continue;
            }

            const result = await convertPngToWebp(filePath, webpPath);
            if (result) {
                converted++;
                totalReduction += result.reduction;
            }
        } else {
            skipped++;
        }
    }

    if (converted > 0) {
        console.log(`📊 Resumo de ${dir}:`);
        console.log(`   Convertidos: ${converted}`);
        console.log(`   Ignorados: ${skipped}`);
        console.log(`   Redução média: ${(totalReduction / converted).toFixed(2)}%`);
    } else {
        console.log(`  Nenhum PNG convertido (${skipped} arquivos ignorados)`);
    }
}

async function main() {
    console.log('🚀 Iniciando conversão de PNG para WebP...\n');
    console.log(`Qualidade WebP: ${WEBP_QUALITY}%`);
    console.log('Arquivos excluídos da conversão:', excludeFiles.join(', '));

    let totalConverted = 0;
    let totalSkipped = 0;

    for (const dir of directories) {
        await processDirectory(dir);
    }

    console.log('\n✅ Conversão concluída!');
    console.log('📝 Próximos passos:');
    console.log('1. Atualize as importações no código de .png para .webp');
    console.log('2. Teste se as imagens carregam corretamente');
    console.log('3. Execute o build para verificar erros');
    console.log('4. Após confirmar que tudo funciona, você pode remover os PNGs originais');
}

main().catch(console.error);
