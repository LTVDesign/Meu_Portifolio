const fs = require('fs');
const path = require('path');

// Caminhos
const CURSOS_JSON = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const certificadosDir = path.join(PUBLIC_DIR, 'certificados');

// Ler o arquivo de cursos
const cursosData = JSON.parse(fs.readFileSync(CURSOS_JSON, 'utf-8'));

// Coletar todos os PDFs disponíveis
const pdfsNaPasta = fs.readdirSync(certificadosDir);

console.log('🔍 ANÁLISE DETALHADA DE CORRESPONDÊNCIA DE PDFs\n');
console.log('='.repeat(80));

// Mapear todos os links esperados
const linksEsperados = [];

cursosData.pt.forEach(curso => {
    if (curso.link) {
        const pdfNome = curso.link.split('/').pop();
        linksEsperados.push({
            id: curso.id,
            titulo: curso.title,
            idioma: 'pt',
            esperado: pdfNome,
            arquivoReal: null
        });
    }
});

cursosData.en.forEach(curso => {
    if (curso.link) {
        const pdfNome = curso.link.split('/').pop();
        linksEsperados.push({
            id: curso.id,
            titulo: curso.title,
            idioma: 'en',
            esperado: pdfNome,
            arquivoReal: null
        });
    }
});

// Tentar encontrar correspondências (case-insensitive)
linksEsperados.forEach(link => {
    const encontrado = pdfsNaPasta.find(pdf =>
        pdf.toLowerCase() === link.esperado.toLowerCase()
    );
    if (encontrado) {
        link.arquivoReal = encontrado;
    }
});

// Agrupar por ID para ver diferenças entre PT/EN
const porId = {};
linksEsperados.forEach(link => {
    if (!porId[link.id]) {
        porId[link.id] = {};
    }
    porId[link.id][link.idioma] = link;
});

console.log('\n📊 COMPARAÇÃO POR CURSO (ID):\n');
Object.keys(porId).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
    const data = porId[id];
    const pt = data.pt;
    const en = data.en;

    console.log(`\n${'='.repeat(80)}`);
    console.log(`ID: ${id}`);

    if (pt) {
        console.log(`\n🇧🇷 PT: ${pt.titulo}`);
        console.log(`   Link esperado: ${pt.esperado}`);
        if (pt.arquivoReal) {
            console.log(`   ✅ Arquivo encontrado: ${pt.arquivoReal}`);
        } else {
            console.log(`   ❌ Arquivo NÃO encontrado`);
            // Procurar por arquivos similares
            const similares = pdfsNaPasta.filter(pdf =>
                pdf.toLowerCase().includes(pt.esperado.toLowerCase().replace('.pdf', '')) ||
                pt.esperado.toLowerCase().includes(pdf.toLowerCase().replace('.pdf', ''))
            );
            if (similares.length > 0) {
                console.log(`   🔍 Possíveis correspondências:`);
                similares.forEach(s => console.log(`      - ${s}`));
            }
        }
    }

    if (en) {
        console.log(`\n🇺🇸 EN: ${en.titulo}`);
        console.log(`   Link esperado: ${en.esperado}`);
        if (en.arquivoReal) {
            console.log(`   ✅ Arquivo encontrado: ${en.arquivoReal}`);
        } else {
            console.log(`   ❌ Arquivo NÃO encontrado`);
            // Procurar por arquivos similares
            const similares = pdfsNaPasta.filter(pdf =>
                pdf.toLowerCase().includes(en.esperado.toLowerCase().replace('.pdf', '')) ||
                en.esperado.toLowerCase().includes(pdf.toLowerCase().replace('.pdf', ''))
            );
            if (similares.length > 0) {
                console.log(`   🔍 Possíveis correspondências:`);
                similares.forEach(s => console.log(`      - ${s}`));
            }
        }
    }
});

// Listar arquivos que parecem ser certificados mas não estão sendo usados
console.log('\n\n' + '='.repeat(80));
console.log('📁 ARQUIVOS PDF NA PASTA certificados/:\n');
pdfsNaPasta.forEach((pdf, i) => {
    const link = linksEsperados.find(l => l.arquivoReal === pdf);
    if (link) {
        console.log(`✅ ${pdf} -> Usado pelo curso ID ${link.id} (${link.idioma})`);
    } else {
        console.log(`⚠️ ${pdf} -> Não referenciado`);
    }
});

// Sugestões de correção
console.log('\n\n' + '='.repeat(80));
console.log('💡 SUGESTÕES DE CORREÇÃO PARA OS LINKS NO cursos.json:\n');

const linksComProblema = linksEsperados.filter(l => !l.arquivoReal);
if (linksComProblema.length > 0) {
    linksComProblema.forEach(link => {
        console.log(`\n[ID ${link.id}] ${link.titulo} (${link.idioma})`);
        console.log(`   Link atual: ${link.esperado}`);
        console.log(`   Status: ❌ Arquivo não encontrado`);

        // Procurar por arquivos que possam corresponder
        const possiveis = pdfsNaPasta.filter(pdf => {
            const nomeCurso = link.titulo.toLowerCase();
            const nomeArquivo = pdf.toLowerCase().replace('.pdf', '');

            // Verificar se o nome do arquivo contém palavras-chave do curso
            const palavrasCurso = nomeCurso.split(' ').filter(p => p.length > 3);
            return palavrasCurso.some(palavra => nomeArquivo.includes(palavra));
        });

        if (possiveis.length > 0) {
            console.log(`   🔍 Possíveis arquivos correspondentes:`);
            possiveis.forEach(p => {
                console.log(`      - ${p}`);
                // Verificar se é uma correspondência exata por ID
                if (p.includes(`ID_${link.id}`)) {
                    console.log(`         👆 Este arquivo contém o ID ${link.id} - provavelmente é o correto!`);
                }
            });
        }
    });
} else {
    console.log('✅ Todos os links têm correspondência na pasta!');
}

console.log('\n' + '='.repeat(80));
