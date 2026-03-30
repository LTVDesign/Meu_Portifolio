/**
 * Script para atualizar referências de texturas no GLTF
 * 
 * Este script atualiza o modelo GLTF para usar as texturas WebP otimizadas
 * em vez das PNG originais.
 * 
 * Uso: npm run update-gltf
 */

import { readFile, writeFile, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const GLTF_PATH = 'public/desktop_pc/scene-compressed.compressed.gltf';
const OUTPUT_PATH = 'public/desktop_pc/scene-optimized.gltf';

async function updateGLTF() {
    console.log('🔄 Atualizando referências de texturas no GLTF...\n');

    if (!existsSync(GLTF_PATH)) {
        console.error('❌ Arquivo GLTF não encontrado:', GLTF_PATH);
        return;
    }

    try {
        // Lê o arquivo GLTF
        const content = await readFile(GLTF_PATH, 'utf-8');
        const gltf = JSON.parse(content);

        // Mapeamento de texturas PNG -> WebP
        const textureMap = new Map();

        // Atualiza referências no array images
        if (gltf.images) {
            let updatedCount = 0;

            gltf.images.forEach((image, index) => {
                if (image.uri) {
                    const originalUri = image.uri;
                    const webpUri = image.uri.replace('.png', '.webp');

                    // Verifica se o arquivo WebP existe
                    const webpPath = join('public/desktop_pc', webpUri);
                    if (existsSync(webpPath)) {
                        image.uri = webpUri;
                        textureMap.set(originalUri, webpUri);
                        updatedCount++;
                        console.log(`  ✅ [${index}] ${originalUri} → ${webpUri}`);
                    } else {
                        console.log(`  ⚠️ [${index}] ${originalUri} (WebP não encontrado, mantendo PNG)`);
                    }
                }
            });

            console.log(`\n📊 Resumo:`);
            console.log(`   Texturas atualizadas: ${updatedCount}`);
            console.log(`   Texturas mantidas (PNG): ${gltf.images.length - updatedCount}`);
        }

        // Salva o novo arquivo GLTF
        const outputContent = JSON.stringify(gltf, null, 2);
        await writeFile(OUTPUT_PATH, outputContent, 'utf-8');

        console.log(`\n✅ GLTF atualizado salvo em: ${OUTPUT_PATH}`);
        console.log('\n📝 Próximos passos:');
        console.log('   1. Teste o novo modelo no seu site');
        console.log('   2. Se estiver funcionando, substitua o arquivo original');
        console.log('   3. Ou atualize o componente Computers.tsx para usar o novo caminho');

    } catch (error) {
        console.error('❌ Erro ao atualizar GLTF:', error.message);
    }
}

updateGLTF();