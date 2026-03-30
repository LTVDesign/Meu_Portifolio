/**
 * Script de Otimização de Texturas 3D
 * 
 * Este script otimiza as texturas PNG usadas nos modelos 3D,
 * reduzindo significativamente o tamanho dos arquivos sem perder qualidade visual.
 * 
 * Uso: npm run optimize:textures
 */

import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

// Configurações de otimização
const CONFIG = {
    // Qualidade para PNG (0-100)
    pngQuality: 80,
    // Redimensionar se for maior que este tamanho
    maxDimension: 2048,
    // Usar webp como fallback
    useWebp: true,
};

// Diretórios de texturas
const TEXTURE_DIRS = [
    { input: 'public/desktop_pc', output: 'public/desktop_pc/optimized' },
    { input: 'planet/textures', output: 'planet/textures/optimized' },
];

/**
 * Otimiza uma única imagem PNG
 */
async function optimizeImage(inputPath, outputPath, quality = CONFIG.pngQuality) {
    try {
        const metadata = await sharp(inputPath).metadata();
        const { width, height, format } = metadata;

        // Calcula nova dimensão se necessário
        let pipeline = sharp(inputPath);

        if (width > CONFIG.maxDimension || height > CONFIG.maxDimension) {
            const newWidth = width > height ? CONFIG.maxDimension : Math.round((CONFIG.maxDimension / height) * width);
            const newHeight = height > width ? CONFIG.maxDimension : Math.round((CONFIG.maxDimension / width) * height);
            pipeline = pipeline.resize(newWidth, newHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }

        // Otimiza PNG
        pipeline = pipeline.png({
            quality: quality,
            compressionLevel: 9,
            adaptiveFiltering: true,
            palette: false,
        });

        await pipeline.toFile(outputPath);

        // Calcula economia
        const originalSize = (await stat(inputPath)).size;
        const optimizedSize = (await stat(outputPath)).size;
        const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

        return {
            input: inputPath,
            output: outputPath,
            originalSize: (originalSize / 1024).toFixed(1) + ' KB',
            optimizedSize: (optimizedSize / 1024).toFixed(1) + ' KB',
            savings: savings + '%',
            dimensions: `${width}x${height}`,
        };
    } catch (error) {
        console.error(`Erro ao otimizar ${inputPath}:`, error.message);
        return null;
    }
}

/**
 * Processa todas as texturas em um diretório
 */
async function processDirectory(inputDir, outputDir) {
    console.log(`\n📁 Processando: ${inputDir}`);

    if (!existsSync(inputDir)) {
        console.log(`⚠️ Diretório não encontrado: ${inputDir}`);
        return [];
    }

    // Cria diretório de saída se não existir
    if (!existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
    }

    const files = await readdir(inputDir);
    const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png') && !f.includes('_optimized'));

    const results = [];

    for (const file of pngFiles) {
        const inputPath = join(inputDir, file);
        const outputName = file.replace('.png', '_optimized.png');
        const outputPath = join(outputDir, outputName);

        console.log(`  🖼️  Otimizando: ${file}`);
        const result = await optimizeImage(inputPath, outputPath);
        if (result) {
            results.push(result);
            console.log(`     ${result.originalSize} → ${result.optimizedSize} (${result.savings} economia)`);
        }
    }

    return results;
}

/**
 * Gera relatório de otimização
 */
function generateReport(allResults) {
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE OTIMIZAÇÃO');
    console.log('='.repeat(60));

    for (const result of allResults) {
        const origSize = parseFloat(result.originalSize);
        const optSize = parseFloat(result.optimizedSize);
        totalOriginalSize += origSize;
        totalOptimizedSize += optSize;
    }

    const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

    console.log(`\n📈 Resumo:`);
    console.log(`   Total original: ${totalOriginalSize.toFixed(1)} KB`);
    console.log(`   Total otimizado: ${totalOptimizedSize.toFixed(1)} KB`);
    console.log(`   Economia total: ${totalSavings}% (${(totalOriginalSize - totalOptimizedSize).toFixed(1)} KB)`);
    console.log(`   Arquivos processados: ${allResults.length}`);

    console.log('\n💡 Próximos passos:');
    console.log('   1. Teste as texturas otimizadas no seu modelo 3D');
    console.log('   2. Se estiverem boas, substitua as originais pelas otimizadas');
    console.log('   3. Execute o build do projeto para ver a melhoria no performance');
    console.log('='.repeat(60));
}

/**
 * Função principal
 */
async function main() {
    console.log('🚀 Iniciando otimização de texturas 3D...\n');

    const allResults = [];

    for (const dir of TEXTURE_DIRS) {
        const results = await processDirectory(dir.input, dir.output);
        allResults.push(...results);
    }

    if (allResults.length === 0) {
        console.log('\n⚠️ Nenhuma textura PNG encontrada para otimizar.');
        return;
    }

    generateReport(allResults);
    console.log('\n✅ Otimização concluída! Arquivos salvos em:');
    for (const dir of TEXTURE_DIRS) {
        console.log(`   - ${dir.output}/`);
    }
}

// Executa o script
main().catch(console.error);