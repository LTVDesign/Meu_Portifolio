const fs = require('fs');
const path = require('path');

const CURSOS_JSON = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const certificadosDir = path.join(__dirname, '..', 'public', 'certificados');

const cursosData = JSON.parse(fs.readFileSync(CURSOS_JSON, 'utf-8'));
const pdfsNaPasta = fs.readdirSync(certificadosDir);

console.log('🔍 MAPEAMENTO DETALHADO: IDs ↔ Arquivos PDF\n');
console.log('='.repeat(80));

// Extrair todos os IDs dos cursos que deveriam ter PDF
const idsComPdfEsperado = [];

cursosData.pt.forEach(curso => {
    if (curso.link && !curso.link.startsWith('http')) {
        const pdfNome = curso.link.split('/').pop();
        idsComPdfEsperado.push({
            id: curso.id,
            titulo: curso.title,
            pdfEsperado: pdfNome,
            idioma: 'pt'
        });
    }
});

cursosData.en.forEach(curso => {
    if (curso.link && !curso.link.startsWith('http')) {
        const pdfNome = curso.link.split('/').pop();
        // Só adicionar se não existir já (evitar duplicação PT/EN)
        if (!idsComPdfEsperado.find(i => i.id === curso.id)) {
            idsComPdfEsperado.push({
                id: curso.id,
                titulo: curso.title,
                pdfEsperado: pdfNome,
                idioma: 'en'
            });
        }
    }
});

console.log('\n📋 CURSOS QUE DEVEM TER PDF LOCAL (segundo o JSON):\n');
idsComPdfEsperado.sort((a, b) => parseInt(a.id) - parseInt(b.id)).forEach(item => {
    console.log(`ID ${item.id.padStart(2)}: ${item.titulo}`);
    console.log(`   PDF esperado: ${item.pdfEsperado}\n`);
});

console.log('='.repeat(80));
console.log('📁 ARQUIVOS PDF NA PASTA:\n');

// Agrupar arquivos por ID
const arquivosPorId = {};
const arquivosSemId = [];

pdfsNaPasta.forEach(pdf => {
    const match = pdf.match(/ID_(\d+)_/i);
    if (match) {
        const id = match[1];
        if (!arquivosPorId[id]) {
            arquivosPorId[id] = [];
        }
        arquivosPorId[id].push(pdf);
    } else {
        arquivosSemId.push(pdf);
    }
});

// Mostrar arquivos agrupados por ID
Object.keys(arquivosPorId).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
    const arquivos = arquivosPorId[id];
    const cursoInfo = idsComPdfEsperado.find(c => c.id === id);

    console.log(`\n📌 ID ${id}:`);
    if (cursoInfo) {
        console.log(`   Curso: ${cursoInfo.titulo}`);
        console.log(`   PDF esperado: ${cursoInfo.pdfEsperado}`);
    } else {
        console.log(`   ⚠️  NÃO HÁ CURSO CORRESPONDENTE NO JSON!`);
    }

    console.log(`   Arquivos encontrados (${arquivos.length}):`);
    arquivos.forEach(arq => {
        const ehEsperado = cursoInfo && arq.toLowerCase() === cursoInfo.pdfEsperado.toLowerCase();
        const status = ehEsperado ? '✅' : '⚠️';
        console.log(`     ${status} ${arq}${ehEsperado ? ' (correspondente)' : ''}`);
    });
});

console.log('\n' + '='.repeat(80));
console.log('📁 ARQUIVOS SEM ID NA NOMENCLATURA:\n');

if (arquivosSemId.length > 0) {
    arquivosSemId.forEach(pdf => {
        // Tentar adivinhar a qual curso pertence
        const nomeSemExt = pdf.toLowerCase().replace('.pdf', '');
        const possivelCurso = idsComPdfEsperado.find(c =>
            nomeSemExt.includes(c.id) ||
            c.titulo.toLowerCase().split(' ').some(palavra => palavra.length > 3 && nomeSemExt.includes(palavra.toLowerCase()))
        );

        if (possivelCurso) {
            console.log(`⚠️  ${pdf}`);
            console.log(`   👆 Possivelmente corresponde ao ID ${possivelCurso.id}: ${possivelCurso.titulo}`);
            console.log(`   🔄 Sugestão: renomear para ${possivelCurso.pdfEsperado}\n`);
        } else {
            console.log(`❓ ${pdf} - Não foi possível identificar\n`);
        }
    });
} else {
    console.log('✅ Todos os arquivos seguem o padrão ID_X\n');
}

console.log('='.repeat(80));
console.log('📊 ANÁLISE DE CONSISTÊNCIA\n');
console.log('='.repeat(80));

// Verificar IDs que estão no JSON mas não têm arquivo correspondente
console.log('\n🔴 IDs no JSON mas SEM arquivo correspondente na pasta:\n');
idsComPdfEsperado.forEach(item => {
    const arquivosDoId = arquivosPorId[item.id] || [];
    const temCorrespondente = arquivosDoId.some(arq =>
        arq.toLowerCase() === item.pdfEsperado.toLowerCase()
    );

    if (!temCorrespondente) {
        console.log(`ID ${item.id}: ${item.titulo}`);
        console.log(`   Esperado: ${item.pdfEsperado}`);
        if (arquivosDoId.length > 0) {
            console.log(`   ⚠️  Existem ${arquivosDoId.length} arquivo(s) com este ID mas com nome diferente:`);
            arquivosDoId.forEach(arq => console.log(`      - ${arq}`));
        } else {
            console.log(`   ❌ NENHUM arquivo encontrado com este ID`);
        }
        console.log('');
    }
});

// Verificar IDs que têm arquivos mas não estão no JSON
console.log('\n🟡 IDs com arquivos mas NÃO estão no JSON:\n');
Object.keys(arquivosPorId).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
    const cursoInfo = idsComPdfEsperado.find(c => c.id === id);
    if (!cursoInfo) {
        console.log(`⚠️  ID ${id}: Tem ${arquivosPorId[id].length} arquivo(s) mas não há curso no JSON`);
        arquivosPorId[id].forEach(arq => console.log(`      - ${arq}`));
        console.log('');
    }
});

console.log('\n' + '='.repeat(80));
console.log('💡 RESUMO DAS AÇÕES NECESSÁRIAS\n');
console.log('='.repeat(80));

const idsSemArquivo = idsComPdfEsperado.filter(item => {
    const arquivosDoId = arquivosPorId[item.id] || [];
    return !arquivosDoId.some(arq => arq.toLowerCase() === item.pdfEsperado.toLowerCase());
});

const idsComArquivosNaoCorrespondentes = idsComPdfEsperado.filter(item => {
    const arquivosDoId = arquivosPorId[item.id] || [];
    return arquivosDoId.length > 0 && !arquivosDoId.some(arq => arq.toLowerCase() === item.pdfEsperado.toLowerCase());
});

const idsNaoNoJson = Object.keys(arquivosPorId).filter(id =>
    !idsComPdfEsperado.find(c => c.id === id)
);

console.log(`\n1. IDs com PDF faltando (não há arquivo): ${idsSemArquivo.length}`);
idsSemArquivo.forEach(item => {
    console.log(`   - ID ${item.id}: ${item.titulo}`);
    console.log(`     📄 Esperado: ${item.pdfEsperado}`);
});

console.log(`\n2. IDs com arquivos mas nomes diferentes: ${idsComArquivosNaoCorrespondentes.length}`);
idsComArquivosNaoCorrespondentes.forEach(item => {
    console.log(`   - ID ${item.id}: ${item.titulo}`);
    console.log(`     📄 Esperado: ${item.pdfEsperado}`);
    const arquivos = arquivosPorId[item.id];
    if (arquivos) {
        arquivos.forEach(arq => console.log(`     🔄 Encontrado: ${arq}`));
    }
});

console.log(`\n3. IDs com arquivos mas não no JSON: ${idsNaoNoJson.length}`);
idsNaoNoJson.forEach(id => {
    console.log(`   - ID ${id}: ${arquivosPorId[id].join(', ')}`);
});

console.log('\n' + '='.repeat(80));
console.log('✅ Mapeamento concluído!\n');
