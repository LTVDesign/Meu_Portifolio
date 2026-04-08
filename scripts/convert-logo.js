import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [192, 512];
const sourceFile = 'public/logo-transparent.svg';

async function convertLogo() {
    try {
        // Verificar se o arquivo fonte existe
        if (!fs.existsSync(sourceFile)) {
            console.error(`Erro: Arquivo ${sourceFile} não encontrado`);
            process.exit(1);
        }

        console.log(`Convertendo ${sourceFile} para PNG com transparência...`);

        // Ler o arquivo SVG
        const svgBuffer = fs.readFileSync(sourceFile);

        for (const size of sizes) {
            const outputFile = `public/android-chrome-${size}x${size}.png`;

            await sharp(svgBuffer)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparente
                })
                .png()
                .toFile(outputFile);

            console.log(`✓ Criado: ${outputFile}`);
        }

        // Também criar os ícones adicionais necessários
        const iconSizes = [16, 32, 196];
        for (const size of iconSizes) {
            const outputFile = `public/favicon-${size}.png`;

            await sharp(svgBuffer)
                .resize(size, size, {
                    fit: 'contain',
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .png()
                .toFile(outputFile);

            console.log(`✓ Criado: ${outputFile}`);
        }

        // Criar apple-touch-icon (180x180)
        await sharp(svgBuffer)
            .resize(180, 180, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile('public/apple-touch-icon.png');
        console.log('✓ Criado: public/apple-touch-icon.png');

        console.log('\n✅ Conversão concluída com sucesso!');
        console.log('Todos os ícones agora têm fundo transparente.');

    } catch (error) {
        console.error('Erro durante a conversão:', error);
        process.exit(1);
    }
}

convertLogo();
