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
const pdfsDisponiveis = new Set(pdfsNaPasta.map(f => f.toLowerCase()));

console.log('📋 VERIFICAÇÃO COMPLETA DE PDFs DOS CURSOS\n');
console.log('='.repeat(80));

let totalCursos = 0;
let cursosComPdfCorreto = 0;
let cursosComPdfFaltando = 0;
let cursosSemPdfLocal = 0; // Cursos com link externo
let cursosSemCampoPdf = 0;

const resultados = {
    corretos: [],
    faltando: [],
    semCampo: [],
    comLinkExterno: []
};

// Função para verificar se é URL externa
function isExternalUrl(link) {
    return link.startsWith('http://') || link.startsWith('https://');
}

// Verificar cursos em português (pt)
console.log('\n🇧🇷 CURSOS EM PORTUGUÊS (pt):\n');
cursosData.pt.forEach((curso) => {
    totalCursos++;
    const id = curso.id;
    const titulo = curso.title;

    if (!curso.link || !curso.link.trim()) {
        cursosSemCampoPdf++;
        resultados.semCampo.push({ id, titulo, idioma: 'pt' });
        console.log(`❌ [ID ${id}] ${titulo}`);
        console.log(`   ⚠️ Campo 'link' (PDF) não preenchido\n`);
        return;
    }

    // Verificar se é URL externa
    if (isExternalUrl(curso.link)) {
        cursosSemPdfLocal++;
        resultados.comLinkExterno.push({ id, titulo, idioma: 'pt', link: curso.link });
        console.log(`🔗 [ID ${id}] ${titulo}`);
        console.log(`   🌐 Link externo: ${curso.link}`);
        console.log(`   ⚠️ Este curso usa link externo em vez de PDF local\n`);
        return;
    }

    // Extrair nome do arquivo do caminho
    const pdfPath = curso.link.startsWith('/') ? curso.link.slice(1) : curso.link;
    const pdfNome = pdfPath.split('/').pop();

    // Verificar se o arquivo existe (case-insensitive)
    const existe = pdfsDisponiveis.has(pdfNome.toLowerCase());

    if (existe) {
        cursosComPdfCorreto++;
        resultados.corretos.push({ id, titulo, idioma: 'pt', pdf: pdfNome });
        console.log(`✅ [ID ${id}] ${titulo}`);
        console.log(`   📄 ${pdfNome}\n`);
    } else {
        cursosComPdfFaltando++;
        resultados.faltando.push({ id, titulo, idioma: 'pt', pdfEsperado: pdfNome });
        console.log(`❌ [ID ${id}] ${titulo}`);
        console.log(`   📄 Esperado: ${pdfNome}`);
        console.log(`   ⚠️ Arquivo não encontrado em public/certificados/\n`);
    }
});

// Verificar cursos em inglês (en)
console.log('\n🇺🇸 CURSOS EM INGLÊS (en):\n');
cursosData.en.forEach((curso) => {
    totalCursos++;
    const id = curso.id;
    const titulo = curso.title;

    if (!curso.link || !curso.link.trim()) {
        cursosSemCampoPdf++;
        resultados.semCampo.push({ id, titulo, idioma: 'en' });
        console.log(`❌ [ID ${id}] ${titulo}`);
        console.log(`   ⚠️ Campo 'link' (PDF) não preenchido\n`);
        return;
    }

    // Verificar se é URL externa
    if (isExternalUrl(curso.link)) {
        cursosSemPdfLocal++;
        resultados.comLinkExterno.push({ id, titulo, idioma: 'en', link: curso.link });
        console.log(`🔗 [ID ${id}] ${titulo}`);
        console.log(`   🌐 Link externo: ${curso.link}`);
        console.log(`   ⚠️ Este curso usa link externo em vez de PDF local\n`);
        return;
    }

    // Extrair nome do arquivo do caminho
    const pdfPath = curso.link.startsWith('/') ? curso.link.slice(1) : curso.link;
    const pdfNome = pdfPath.split('/').pop();

    // Verificar se o arquivo existe (case-insensitive)
    const existe = pdfsDisponiveis.has(pdfNome.toLowerCase());

    if (existe) {
        cursosComPdfCorreto++;
        resultados.corretos.push({ id, titulo, idioma: 'en', pdf: pdfNome });
        console.log(`✅ [ID ${id}] ${titulo}`);
        console.log(`   📄 ${pdfNome}\n`);
    } else {
        cursosComPdfFaltando++;
        resultados.faltando.push({ id, titulo, idioma: 'en', pdfEsperado: pdfNome });
        console.log(`❌ [ID ${id}] ${titulo}`);
        console.log(`   📄 Esperado: ${pdfNome}`);
        console.log(`   ⚠️ Arquivo não encontrado em public/certificados/\n`);
    }
});

// Resumo final
console.log('\n' + '='.repeat(80));
console.log('📊 RESUMO DA VERIFICAÇÃO:\n');
console.log(`Total de cursos verificados: ${totalCursos}`);
console.log(`✅ Cursos com PDF local correto: ${cursosComPdfCorreto}`);
console.log(`❌ Cursos com PDF faltando: ${cursosComPdfFaltando}`);
console.log(`🔗 Cursos com link externo (sem PDF local): ${cursosSemPdfLocal}`);
console.log(`⚠️ Cursos sem campo PDF: ${cursosSemCampoPdf}`);
console.log('\n' + '='.repeat(80));

// Detalhamento dos problemas
if (resultados.faltando.length > 0) {
    console.log('\n❌ CURSOS COM PDF FALTANDO:\n');
    resultados.faltando.forEach(item => {
        console.log(`  [ID ${item.id}] ${item.titulo} (${item.idioma})`);
        console.log(`     📄 PDF esperado: ${item.pdfEsperado}`);
        console.log(`     🔍 Verifique se o arquivo existe em: public/certificados/${item.pdfEsperado}`);
        console.log(`     📝 Ou atualize o campo 'link' no cursos.json para apontar para o arquivo correto.\n`);
    });
}

if (resultados.comLinkExterno.length > 0) {
    console.log('\n🔗 CURSOS COM LINK EXTERNO (sem PDF local):\n');
    resultados.comLinkExterno.forEach(item => {
        console.log(`  [ID ${item.id}] ${item.titulo} (${item.idioma})`);
        console.log(`     🌐 ${item.link}`);
        console.log(`     ℹ️  Este curso não possui PDF local, apenas link externo para verificação.\n`);
    });
}

if (resultados.semCampo.length > 0) {
    console.log('\n⚠️ CURSOS SEM CAMPO PDF:\n');
    resultados.semCampo.forEach(item => {
        console.log(`  [ID ${item.id}] ${item.titulo} (${item.idioma})`);
        console.log(`     ⚠️ O campo 'link' não está preenchido. Adicione o caminho do PDF ou link externo.\n`);
    });
}

// Verificar PDFs duplicados ou não utilizados
console.log('\n' + '='.repeat(80));
console.log('🔍 ANÁLISE DE ARQUIVOS PDF NA PASTA certificados/:\n');
const pdfsReferenciados = new Set();

resultados.corretos.forEach(item => {
    pdfsReferenciados.add(item.pdf.toLowerCase());
});

const pdfsNaoUtilizados = pdfsNaPasta.filter(pdf => !pdfsReferenciados.has(pdf.toLowerCase()));

if (pdfsNaoUtilizados.length > 0) {
    console.log(`⚠️ ${pdfsNaoUtilizados.length} arquivo(s) na pasta mas não referenciado(s) no cursos.json:\n`);
    pdfsNaoUtilizados.forEach(pdf => {
        console.log(`   - ${pdf}`);
    });
} else {
    console.log('✅ Todos os arquivos PDF na pasta são referenciados no cursos.json');
}

console.log('\n' + '='.repeat(80));
console.log('✅ Verificação concluída!\n');

// Exit code para CI/CD
if (cursosComPdfFaltando > 0 || cursosSemCampoPdf > 0) {
    console.log('❌ Erro: Alguns cursos estão com problemas de PDF.\n');
    process.exit(1);
} else {
    console.log('✅ Todos os cursos com PDF local estão corretos!\n');
    if (cursosSemPdfLocal > 0) {
        console.log('ℹ️  Nota: Alguns cursos usam links externos em vez de PDFs locais (isso pode ser intencional).\n');
    }
    process.exit(0);
}
