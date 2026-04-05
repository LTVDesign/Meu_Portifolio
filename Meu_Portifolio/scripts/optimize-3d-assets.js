/**
 * Script de Otimização de Assets 3D
 * 
 * Este script otimiza os assets 3D convertendo texturas para WebP
 * e analisando o modelo GLTF para identificar oportunidades de otimização.
 * 
 * Uso: npm run optimize:3d
 */

import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, stat, copyFile } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync, createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

// Configurações de otimização
const CONFIG = {
    // Qualidade para WebP (0-100)
    webpQuality: 75,
    // Redimensionar se for maior que este tamanho
    maxDimension: 1024,
    // Texturas que NÃO devem ser redimensionadas (mapas de normais, roughness, etc.)
    noResizePatterns: ['metallic', 'roughness', 'normal', 'ao', 'emissive'],
};

// Diretórios de texturas
const TEXTURE_DIRS = [
    { input: 'public/desktop_pc', output: 'public/desktop_pc/webp' },
    { input: 'planet/textures', output: 'planet/textures/webp' },
];

/**
 * Verifica se o arquivo deve ser redimensionado
 */
function shouldResize(filename) {
    const lowerName = filename.toLowerCase();
    return !CONFIG.noResizePatterns.some(pattern => lowerName.includes(pattern));
}

/**
 * Converte uma imagem PNG para WebP
 */
async function convertToWebP(inputPath, outputPath, quality = CONFIG.webpQuality) {
    try {
        const filename = basename(inputPath);
        const metadata = await sharp(inputPath).metadata();
        const { width, height } = metadata;

        let pipeline = sharp(inputPath);

        // Redimensiona se necessário (apenas para texturas base color)
        if (shouldResize(filename) && (width > CONFIG.maxDimension || height > CONFIG.maxDimension)) {
            const newWidth = width > height ? CONFIG.maxDimension : Math.round((CONFIG.maxDimension / height) * width);
            const newHeight = height > width ? CONFIG.maxDimension : Math.round((CONFIG.maxDimension / width) * height);
            pipeline = pipeline.resize(newWidth, newHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            });
        }

        // Converte para WebP
        pipeline = pipeline.webp({
            quality: quality,
            effort: 6, // Máximo esforço de compressão
            nearLossless: false,
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
        console.error(`Erro ao converter ${inputPath}:`, error.message);
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
    const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

    const results = [];

    for (const file of pngFiles) {
        const inputPath = join(inputDir, file);
        const outputName = file.replace('.png', '.webp');
        const outputPath = join(outputDir, outputName);

        console.log(`  🖼️  Convertendo: ${file}`);
        const result = await convertToWebP(inputPath, outputPath);
        if (result) {
            results.push(result);
            console.log(`     ${result.originalSize} → ${result.optimizedSize} (${result.savings} economia)`);
        }
    }

    return results;
}

/**
 * Analisa o arquivo buffer.bin
 */
async function analyzeBufferBin() {
    const bufferPath = 'public/desktop_pc/buffer.bin';

    if (!existsSync(bufferPath)) {
        console.log('\n⚠️ buffer.bin não encontrado');
        return null;
    }

    const stats = await stat(bufferPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log('\n📦 Análise do buffer.bin:');
    console.log(`   Tamanho: ${sizeKB} KB (${sizeMB} MB)`);
    console.log(`   ⚠️ ESTE É O PRINCIPAL VILÃO DO PERFORMANCE!`);
    console.log(`   `);
    console.log(`   O buffer.bin contém dados de geometria e UV do modelo 3D.`);
    console.log(`   Para reduzir este arquivo, você precisa:`);
    console.log(`   1. Reduzir o número de polígonos do modelo no Blender`);
    console.log(`   2. Usar modificadores Decimate no Blender`);
    console.log(`   3. Exportar com configurações de compressão mais agressivas`);
    console.log(`   4. Considerar usar Draco compression no GLTF`);

    return { size: stats.size, sizeKB, sizeMB };
}

/**
 * Analisa o modelo GLTF
 */
async function analyzeGLTF() {
    const gltfPath = 'public/desktop_pc/scene-compressed.compressed.gltf';

    if (!existsSync(gltfPath)) {
        console.log('\n⚠️ Modelo GLTF não encontrado');
        return null;
    }

    try {
        const content = await readFile(gltfPath, 'utf-8');
        const gltf = JSON.parse(content);

        console.log('\n📋 Análise do modelo GLTF:');
        console.log(`   Versão: ${gltf.asset?.version || 'N/A'}`);
        console.log(`   Generator: ${gltf.asset?.generator || 'N/A'}`);

        if (gltf.scenes?.length > 0) {
            console.log(`   Scenes: ${gltf.scenes.length}`);
        }

        if (gltf.nodes?.length > 0) {
            console.log(`   Nodes: ${gltf.nodes.length}`);
        }

        if (gltf.meshes?.length > 0) {
            console.log(`   Meshes: ${gltf.meshes.length}`);
        }

        if (gltf.materials?.length > 0) {
            console.log(`   Materials: ${gltf.materials.length}`);
        }

        if (gltf.textures?.length > 0) {
            console.log(`   Textures: ${gltf.textures.length}`);
        }

        if (gltf.images?.length > 0) {
            console.log(`   Images: ${gltf.images.length}`);
            console.log(`   `);
            console.log(`   📝 Imagens referenciadas no modelo:`);
            gltf.images.forEach((img, i) => {
                console.log(`      [${i}] ${img.uri || img.name || 'sem nome'}`);
            });
        }

        return gltf;
    } catch (error) {
        console.error(`Erro ao analisar GLTF: ${error.message}`);
        return null;
    }
}

/**
 * Gera relatório de otimização
 */
function generateReport(textureResults, bufferInfo) {
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE OTIMIZAÇÃO');
    console.log('='.repeat(60));

    for (const result of textureResults) {
        const origSize = parseFloat(result.originalSize);
        const optSize = parseFloat(result.optimizedSize);
        totalOriginalSize += origSize;
        totalOptimizedSize += optSize;
    }

    // Adiciona buffer.bin ao total original
    if (bufferInfo) {
        totalOriginalSize += parseFloat(bufferInfo.sizeKB);
    }

    const totalSavings = totalOriginalSize > 0
        ? ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)
        : '0';

    console.log(`\n📈 Resumo das texturas:`);
    console.log(`   Total original (texturas): ${totalOriginalSize.toFixed(1)} KB`);
    console.log(`   Total otimizado (texturas): ${totalOptimizedSize.toFixed(1)} KB`);
    console.log(`   Economia: ${totalSavings}% (${(totalOriginalSize - totalOptimizedSize).toFixed(1)} KB)`);
    console.log(`   Arquivos processados: ${textureResults.length}`);

    if (bufferInfo) {
        console.log(`\n⚠️ buffer.bin: ${bufferInfo.sizeMB} MB (NÃO OTIMIZADO)`);
        console.log(`   Este arquivo representa ${(bufferInfo.sizeKB / totalOriginalSize * 100).toFixed(1)}% do total!`);
    }

    console.log('\n💡 Recomendações:');
    console.log('   1. ✅ Texturas WebP criadas - atualize o modelo GLTF para usá-las');
    console.log('   2. ⚠️ buffer.bin precisa ser otimizado no Blender');
    console.log('   3. 📦 Considere usar Draco compression para geometria');
    console.log('   4. 🔄 Implemente LOD (Level of Detail) para o modelo 3D');
    console.log('='.repeat(60));
}

/**
 * Gera script de atualização do GLTF
 */
function generateGLTFUpdateScript() {
    console.log('\n📝 Para atualizar o modelo GLTF para usar as texturas WebP:');
    console.log('   ');
    console.log('   1. No Blender, re-exporte o modelo apontando para as texturas WebP');
    console.log('   2. OU use o script abaixo para atualizar o GLTF manualmente:');
    console.log('   ');
    console.log('   npm run update-gltf-textures');
}

/**
 * Função principal
 */
async function main() {
    console.log('🚀 Iniciando otimização de assets 3D...\n');

    const allTextureResults = [];
    let bufferInfo = null;

    // Analisa buffer.bin
    bufferInfo = await analyzeBufferBin();

    // Analisa GLTF
    await analyzeGLTF();

    // Converte texturas para WebP
    for (const dir of TEXTURE_DIRS) {
        const results = await processDirectory(dir.input, dir.output);
        allTextureResults.push(...results);
    }

    if (allTextureResults.length === 0) {
        console.log('\n⚠️ Nenhuma textura PNG encontrada para converter.');
        return;
    }

    generateReport(allTextureResults, bufferInfo);
    generateGLTFUpdateScript();

    console.log('\n✅ Otimização concluída! Arquivos WebP salvos em:');
    for (const dir of TEXTURE_DIRS) {
        console.log(`   - ${dir.output}/`);
    }
}

// Executa o script
main().catch(console.error);