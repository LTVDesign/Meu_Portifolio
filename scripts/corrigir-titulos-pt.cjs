/**
 * Correção de Títulos em Português
 * Traduz títulos que estão em inglês no array PT para português
 */

const fs = require('fs');
const path = require('path');

const CURSOS_PATH = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const RELATORIO_PATH = path.join(__dirname, 'RELATORIO-CORRECAO-TITULOS.md');

function loadCursos() {
    const data = fs.readFileSync(CURSOS_PATH, 'utf8');
    return JSON.parse(data);
}

function saveCursos(data) {
    fs.writeFileSync(CURSOS_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Mapeamento de traduções de títulos EN -> PT
const titleTranslations = {
    // ID 3
    "Introduction to Software Product Management": "Introdução ao Gerenciamento de Produtos de Software",
    // ID 4
    "Introduction to Technical Support": "Introdução ao Suporte Técnico",
    // ID 8
    "Introduction to Scrum Master Profession": "Introdução à Profissão Scrum Master",
    // ID 9
    "Foundations of Cybersecurity": "Fundamentos de Cibersegurança",
    // ID 21
    "Conversion Optimization Certification Exam": "Exame de Certificação de Otimização de Conversão"
};

// Mapeamento de traduções de plataformas EN -> PT (se necessário)
const platformTranslations = {
    "IBM (via Coursera)": "IBM (via Coursera)", // já está em português
    "Google (via Coursera)": "Google (via Coursera)",
    "University of Alberta (via Coursera)": "University of Alberta (via Coursera)",
    "Johns Hopkins University (via Coursera)": "Johns Hopkins University (via Coursera)",
    "Yonsei University (via Coursera)": "Yonsei University (via Coursera)",
    "Hackers do Bem (SENAI/RNP)": "Hackers do Bem (SENAI/RNP)",
    "Fundação Bradesco": "Fundação Bradesco",
    "Google Skillshop": "Google Skillshop",
    "IPED": "IPED",
    "CATe": "CATe"
};

function generatePDFName(title, id, platform) {
    // Gera nome de PDF baseado no título em português
    const cleanTitle = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');

    const cleanPlatform = platform
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');

    return `/certificados/ID_${id}_${cleanTitle}_${cleanPlatform}.pdf`;
}

function main() {
    console.log('🔧 Iniciando correção de títulos em português...\n');

    const data = loadCursos();
    const { pt, en } = data;

    console.log(`📊 Estado original: ${pt.length} cursos PT, ${en.length} cursos EN`);

    const changes = [];

    // Processar cada curso PT
    pt.forEach((curso, index) => {
        const enCourse = en[index];
        if (!enCourse) {
            console.log(`⚠️  Aviso: PT[${index}] não tem correspondência em EN`);
            return;
        }

        // Verificar se o título PT está em inglês (comparando com o título EN)
        const ptTitle = curso.title;
        const enTitle = enCourse.title;

        // Se o título PT é igual ao EN (ignorando "(PT)" no final), precisa ser traduzido
        let normalizedPt = ptTitle.replace(/\s*\(pt\)\s*/i, '').trim();
        let normalizedEn = enTitle.replace(/\s*\(en\)\s*/i, '').trim();

        // Lista de termos técnicos universais que não precisam de tradução
        const universalTerms = ['tcp/ip', 'usb', 'wi-fi', 'bluetooth', 'html', 'css', 'javascript', 'python', 'java', 'c++', 'sql', 'nosql', 'api', 'rest', 'soap', 'json', 'xml', 'yaml', 'markdown', 'latex'];

        if (normalizedPt === normalizedEn && !universalTerms.includes(normalizedPt.toLowerCase())) {
            // Título PT está em inglês - precisa traduzir
            const originalTitle = ptTitle;
            const newTitle = titleTranslations[enTitle] || null;

            if (newTitle) {
                console.log(`✅ Traduzindo ID ${curso.id}:`);
                console.log(`   Antes: "${originalTitle}"`);
                console.log(`   Depois: "${newTitle}"`);

                changes.push({
                    id: curso.id,
                    index,
                    originalTitle,
                    newTitle,
                    originalPlatform: curso.platform,
                    newPlatform: curso.platform // manter mesma plataforma
                });

                curso.title = newTitle;

                // Atualizar link do PDF se necessário
                if (curso.link && curso.link.includes(`ID_${curso.id}_`)) {
                    const newPdfName = generatePDFName(newTitle, curso.id, curso.platform);
                    console.log(`   PDF: ${curso.link} -> ${newPdfName}`);
                    curso.link = newPdfName;
                }
            } else {
                console.log(`❌ ERRO: Não há tradução para ID ${curso.id} - "${enTitle}"`);
            }
        }
    });

    // Salvar alterações
    if (changes.length > 0) {
        saveCursos(data);
        console.log(`\n💾 Arquivo atualizado: ${CURSOS_PATH}`);
    } else {
        console.log('\n✅ Nenhuma alteração necessária.');
    }

    // Gerar relatório
    const report = generateReport(changes, pt, en);
    fs.writeFileSync(RELATORIO_PATH, report, 'utf8');
    console.log(`📝 Relatório salvo em: ${RELATORIO_PATH}`);

    // Resumo final
    console.log('\n' + '='.repeat(60));
    console.log('RESUMO DA CORREÇÃO');
    console.log('='.repeat(60));
    console.log(`Cursos analisados: ${pt.length}`);
    console.log(`Títulos corrigidos: ${changes.length}`);
    console.log(`Títulos restantes em inglês: ${pt.filter(c => c.title === en[pt.indexOf(c)].title.replace(/\s*\(en\)\s*/i, '')).length}`);
    console.log('='.repeat(60));

    process.exit(changes.length > 0 ? 1 : 0);
}

function generateReport(changes, pt, en) {
    const now = new Date().toLocaleString('pt-BR');
    let report = `# Relatório de Correção de Títulos - Cursos\n\n`;
    report += `**Data da correção:** ${now}\n\n`;

    report += `## Resumo\n\n`;
    report += `- Total de cursos PT: ${pt.length}\n`;
    report += `- Títulos corrigidos: ${changes.length}\n`;
    report += `- Títulos ainda em inglês: ${pt.filter((c, i) => c.title === en[i].title.replace(/\s*\(en\)\s*/i, '')).length}\n\n`;

    if (changes.length > 0) {
        report += `## Alterações Realizadas\n\n`;
        changes.forEach((change, idx) => {
            report += `### ${idx + 1}. ID ${change.id}\n\n`;
            report += `- **Título anterior:** ${change.originalTitle}\n`;
            report += `- **Título novo:** ${change.newTitle}\n`;
            report += `- **Plataforma:** ${change.newPlatform}\n`;
            report += `- **PDF atualizado:** ${generatePDFName(change.newTitle, change.id, change.newPlatform)}\n\n`;
        });
    } else {
        report += `## Status\n\n`;
        report += `✅ Nenhuma alteração foi necessária. Todos os títulos PT já estão em português.\n`;
    }

    report += `## Lista Final de Cursos PT\n\n`;
    report += `| ID | Título | Plataforma |\n`;
    report += `|----|--------|------------|\n`;
    pt.forEach(c => {
        const title = c.title.length > 50 ? c.title.substring(0, 47) + '...' : c.title;
        const platform = c.platform.length > 30 ? c.platform.substring(0, 27) + '...' : c.platform;
        report += `| ${c.id} | ${title} | ${platform} |\n`;
    });

    return report;
}

main();
