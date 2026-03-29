const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configurações de redimensionamento para cada imagem
const imageOptimizations = [
    {
        name: 'willy.webp (Foto principal)',
        inputPath: path.join(__dirname, '..', 'src', 'assets', 'willy.webp'),
        outputPath: path.join(__dirname, '..', 'src', 'assets', 'willy-optimized.webp'),
        width: 483,
        height: 483,
        quality: 80
    },
    {
        name: 'logo.webp',
        inputPath: path.join(__dirname, '..', 'src', 'assets', 'logo.webp'),
        outputPath: path.join(__dirname, '..', 'src', 'assets', 'logo-optimized.webp'),
        width: 150,
        height: 160,
        quality: 85
    },
    {
        name: 'facul.webp (Anhanguera)',
        inputPath: path.join(__dirname, '..', 'src', 'assets', 'facul.webp'),
        outputPath: path.join(__dirname, '..', 'src', 'assets', 'facul-optimized.webp'),
        width: 46,
        height: 46,
        quality: 85
    },
    {
        name: 'autonomo.webp',
        inputPath: path.join(__dirname, '..', 'public', 'empresas', 'autonomo.webp'),
        outputPath: path.join(__dirname, '..', 'public', 'empresas', 'autonomo-optimized.webp'),
        width: 48,
        height: 48,
        quality: 85
    },
    {
        name: 'terabyte.webp',
        inputPath: path.join(__dirname, '..', 'public', 'empresas', 'terabyte.webp'),
        outputPath: path.join(__dirname, '..', 'public', 'empresas', 'terabyte-optimized.webp'),
        width: 48,
        height: 48,
        quality: 85
    },
    {
        name: 'mercedito.webp',
        inputPath: path.join(__dirname, '..', 'public', 'empresas', 'mercedito.webp'),
        outputPath: path.join(__dirname, '..', 'public', 'empresas', 'mercedito-optimized.webp'),
        width: 48,
        height: 48,
        quality: 85
    }
];

async function optimizeImage(config) {
    try {
        if (!fs.existsSync(config.inputPath)) {
            console.log(`⚠ Arquivo não encontrado: ${config.inputPath}`);
            return null;
        }

        const originalStats = fs.statSync(config.inputPath);
        console.log(`\n🔄 Otimizando: ${config.name}`);
        console.log(`   Tamanho original: ${(originalStats.size / 1024).toFixed(2)} KB`);

        await sharp(config.inputPath)
            .resize(config.width, config.height, {
                fit: 'cover',
                position: 'center'
            })
            .webp({ quality: config.quality })
            .toFile(config.outputPath);

        const optimizedStats = fs.statSync(config.outputPath);
        const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(2);
        const savedKB = ((originalStats.size - optimizedStats.size) / 1024).toFixed(2);

        console.log(`   Dimensões: ${config.width}x${config.height}`);
        console.log(`   Tamanho otimizado: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
        console.log(`   Redução: ${reduction}% (${savedKB} KB economizados)`);

        return {
            name: config.name,
            original: originalStats.size,
            optimized: optimizedStats.size,
            reduction: parseFloat(reduction),
            savedKB: parseFloat(savedKB)
        };
    } catch (error) {
        console.error(`✗ Erro ao otimizar ${config.name}:`, error.message);
        return null;
    }
}

async function replaceOriginalWithOptimized(config) {
    try {
        if (!fs.existsSync(config.outputPath)) {
            return false;
        }

        // Fazer backup do original
        const backupPath = config.inputPath.replace('.webp', '.webp.backup');
        fs.copyFileSync(config.inputPath, backupPath);
        console.log(`   Backup criado: ${path.basename(backupPath)}`);

        // Substituir pelo otimizado
        fs.copyFileSync(config.outputPath, config.inputPath);

        // Remover arquivo temporário
        fs.unlinkSync(config.outputPath);

        console.log(`   ✓ Substituído com sucesso`);
        return true;
    } catch (error) {
        console.error(`   ✗ Erro ao substituir:`, error.message);
        return false;
    }
}

async function main() {
    console.log('🚀 Iniciando otimização de imagens para melhor performance...\n');
    console.log('Imagens a serem otimizadas:');
    imageOptimizations.forEach(config => {
        console.log(`  - ${config.name} → ${config.width}x${config.height}`);
    });

    const results = [];
    let totalSaved = 0;

    for (const config of imageOptimizations) {
        const result = await optimizeImage(config);
        if (result) {
            results.push(result);
            totalSaved += result.savedKB;
        }
    }

    console.log('\n📊 Resumo da Otimização:');
    console.log('='.repeat(50));

    if (results.length > 0) {
        results.forEach(result => {
            console.log(`✓ ${result.name}`);
            console.log(`  ${(result.original / 1024).toFixed(2)} KB → ${(result.optimized / 1024).toFixed(2)} KB (${result.reduction.toFixed(1)}%)`);
        });

        console.log('='.repeat(50));
        console.log(`💰 Economia total: ${totalSaved.toFixed(2)} KB (${(totalSaved / 1024).toFixed(2)} MB)`);

        console.log('\n🔄 Substituindo originais pelos otimizados...');
        for (const config of imageOptimizations) {
            await replaceOriginalWithOptimized(config);
        }

        console.log('\n✅ Otimização concluída!');
        console.log('\n📝 Próximos passos:');
        console.log('1. Teste o site para verificar se as imagens carregam corretamente');
        console.log('2. Verifique se não há problemas de qualidade visual');
        console.log('3. Se tudo estiver OK, você pode remover os arquivos .backup');
        console.log('4. Faça commit das mudanças');
    } else {
        console.log('Nenhuma imagem foi otimizada.');
    }
}

main().catch(console.error);