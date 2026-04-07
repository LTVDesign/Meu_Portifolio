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

console.log('📋 RELATÓRIO FINAL - VERIFICAÇÃO DE PDFs DOS CURSOS\n');
console.log('='.repeat(80));
console.log('📊 RESUMO EXECUTIVO\n');
console.log('='.repeat(80));

const resumo = {
    totalCursos: 0,
    comPdfLocal: 0,
    comLinkExterno: 0,
    semPdf: 0,
    pdfsNaPasta: pdfsNaPasta.length,
    pdfsReferenciados: 0,
    pdfsOrfaos: 0
};

// Contagem por status
cursosData.pt.forEach(curso => {
    if (curso.link) {
        resumo.totalCursos++;
        if (curso.link.startsWith('http')) {
            resumo.comLinkExterno++;
        } else {
            resumo.comPdfLocal++;
            resumo.pdfsReferenciados++;
        }
    } else {
        resumo.semPdf++;
    }
});

cursosData.en.forEach(curso => {
    if (curso.link) {
        resumo.totalCursos++;
        if (curso.link.startsWith('http')) {
            resumo.comLinkExterno++;
        } else {
            resumo.comPdfLocal++;
        }
    } else {
        resumo.semPdf++;
    }
});

resumo.pdfsOrfaos = resumo.pdfsNaPasta - resumo.pdfsReferenciados;

console.log(`Total de cursos (PT + EN): ${resumo.totalCursos}`);
console.log(`Cursos com PDF local: ${resumo.comPdfLocal} ✅`);
console.log(`Cursos com link externo: ${resumo.comLinkExterno} 🔗`);
console.log(`Cursos sem PDF/link: ${resumo.semPdf} ❌`);
console.log(`\nArquivos PDF na pasta certificados/: ${resumo.pdfsNaPasta}`);
console.log(`PDFs referenciados no JSON: ${resumo.pdfsReferenciados} ✅`);
console.log(`PDFs órfãos (não referenciados): ${resumo.pdfsOrfaos} ⚠️`);

console.log('\n' + '='.repeat(80));
console.log('✅ CURSOS COM PDF LOCAL CORRETO\n');
console.log('='.repeat(80));

const pdfsReferenciadosSet = new Set();

cursosData.pt.forEach(curso => {
    if (curso.link && !curso.link.startsWith('http')) {
        const pdfNome = curso.link.split('/').pop();
        pdfsReferenciadosSet.add(pdfNome.toLowerCase());
        console.log(`[ID ${curso.id}] ${curso.title}`);
        console.log(`   PDF: ${pdfNome}\n`);
    }
});

console.log('\n' + '='.repeat(80));
console.log('🔗 CURSOS COM LINK EXTERNO (sem PDF local)\n');
console.log('='.repeat(80));

cursosData.pt.forEach(curso => {
    if (curso.link && curso.link.startsWith('http')) {
        console.log(`[ID ${curso.id}] ${curso.title}`);
        console.log(`   Link: ${curso.link}`);
        console.log(`   ℹ️  Curso usa link externo para verificação (Coursera)\n`);
    }
});

console.log('\n' + '='.repeat(80));
console.log('⚠️ ANÁLISE DOS PDFs ÓRFÃOS (na pasta mas não no JSON)\n');
console.log('='.repeat(80));

if (resumo.pdfsOrfaos > 0) {
    console.log(`\nForam encontrados ${resumo.pdfsOrfaos} arquivos PDF que não estão referenciados no cursos.json:\n`);

    // Agrupar por padrão de nome
    const comId = [];
    const semId = [];

    pdfsNaPasta.forEach(pdf => {
        if (!pdfsReferenciadosSet.has(pdf.toLowerCase())) {
            if (pdf.includes('ID_')) {
                comId.push(pdf);
            } else {
                semId.push(pdf);
            }
        }
    });

    if (comId.length > 0) {
        console.log('\n📁 Arquivos com padrão "ID_X" (provavelmente deveriam estar no JSON):\n');
        comId.forEach(pdf => {
            console.log(`   - ${pdf}`);
            // Extrair ID
            const match = pdf.match(/ID_(\d+)_/);
            if (match) {
                const id = match[1];
                console.log(`     👆 Contém ID ${id} - verificar se está no cursos.json`);
            }
        });
    }

    if (semId.length > 0) {
        console.log('\n📁 Arquivos sem padrão "ID_X" (nomes alternativos/antigos):\n');
        semId.forEach(pdf => {
            console.log(`   - ${pdf}`);
        });
    }

    console.log('\n💡 RECOMENDAÇÕES:\n');
    console.log('1. Verifique se os arquivos com "ID_X" correspondem a cursos existentes no JSON');
    console.log('2. Atualize os campos "link" dos cursos para apontar para os PDFs corretos');
    console.log('3. Considere remover PDFs órfãos que não são mais necessários');
    console.log('4. Padronize a nomenclatura dos arquivos PDF para evitar duplicações\n');
} else {
    console.log('✅ Não há PDFs órfãos - todos os arquivos estão referenciados!\n');
}

console.log('='.repeat(80));
console.log('📋 LISTA COMPLETA DE ARQUIVOS NA PASTA certificados/\n');
console.log('='.repeat(80));

pdfsNaPasta.forEach((pdf, i) => {
    const referenciado = pdfsReferenciadosSet.has(pdf.toLowerCase());
    const status = referenciado ? '✅' : '⚠️';
    console.log(`${status} ${pdf}`);
});

console.log('\n' + '='.repeat(80));
console.log('✅ VERIFICAÇÃO CONCLUÍDA!\n');
console.log('='.repeat(80));

// Status final
if (resumo.semPdf > 0 || resumo.pdfsOrfaos > 0) {
    console.log('⚠️  ATENÇÃO: Foram encontrados problemas que precisam de revisão.\n');
    process.exit(1);
} else {
    console.log('✅ TUDO OK: Todos os cursos com PDF local estão corretos!\n');
    process.exit(0);
}
