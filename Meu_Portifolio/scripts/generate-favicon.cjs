const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');

// Usar o apple-touch-icon.png como fonte (maior resolução)
const inputPath = path.join(__dirname, '../public/apple-touch-icon.png');
const outputPath = path.join(__dirname, '../public/favicon.ico');

pngToIco(inputPath)
    .then(buf => {
        fs.writeFileSync(outputPath, buf);
        console.log('favicon.ico gerado com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao gerar favicon.ico:', err);
        process.exit(1);
    });
