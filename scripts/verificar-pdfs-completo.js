const fs = require('fs');
const path = require('path');

// Caminhos
const CURSOS_JSON = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const CERTIFICADOS_DIR = path.join(__dirname, '..', 'public', 'certificados');
const RELATORIO_PATH = path.join(__dirname, 'RELATORIO-VERIFICACAO-PDFS.md');

// Carregar dados
const cursosData = JSON.parse(fs.readFileSync(CURSOS_JSON, 'utf8'));

// Coletar todos os PDFs da pasta
const pdfsDisponiveis = new Set();
if (fs.existsSync(CERTIFICADOS_DIR)) {
    const arquivos = fs.readdirSync(CERTIFICADOS_DIR);
    arquivos.forEach(arquivo => {
        if (arquivo.toLowerCase().endsWith('.pdf')) {
            pdfsDisponiveis.add(arquivo);
        }
    });
}

// Resultados
const resultados = {
    totalCursos: 0,
    cursosComPdf: [],
    cursosSemPdf: [],
    cursosComLinkExterno: [],
    pdfsOrfaos: [],
    pdfsEncontrados: new Set(),
    estatisticas: {}
};

// Função para normalizar nome de arquivo
function normalizarNomeArquivo(nome) {
    return nome.replace(/\\/g, '/').split('/').pop();
}

// Função para extrair nome do PDF do link
function extrairNomePdf(link) {
    if (!link || typeof link !== 'string') return null;
    if (link.startsWith('http')) return null; // Link externo

    // Remove barra inicial e pega o nome do arquivo
    const caminho = link.startsWith('/') ? link.substring(1) : link;
    return normalizarNomeArquivo(caminho);
}

// Verificar cursos PT
cursosData.pt.forEach(curso => {
    resultados.totalCursos++;
    const id = curso.id;
    const titulo = curso.title;
    const link = curso.link;

    if (!link) {
        resultados.cursosSemPdf.push({ id, titulo, idioma: 'PT', motivo: 'Campo link ausente' });
        return;
    }

    const nomePdf = extrairNomePdf(link);

    if (!nomePdf) {
        // Link externo
        resultados.cursosComLinkExterno.push({ id, titulo, idioma: 'PT', link });
    } else {
        // PDF local
        const existe = pdfsDisponiveis.has(nomePdf);
        if (existe) {
            resultados.cursosComPdf.push({ id, titulo, idioma: 'PT', pdf: nomePdf });
            resultados.pdfsEncontrados.add(nomePdf);
        } else {
            resultados.cursosSemPdf.push({ id, titulo, idioma: 'PT', pdf: nomePdf, motivo: 'Arquivo não encontrado' });
        }
    }
});

// Verificar cursos EN
cursosData.en.forEach(curso => {
    resultados.totalCursos++;
    const id = curso.id;
    const titulo = curso.title;
    const link = curso.link;

    if (!link) {
        resultados.cursosSemPdf.push({ id, titulo, idioma: 'EN', motivo: 'Campo link ausente' });
        return;
    }

    const nomePdf = extrairNomePdf(link);

    if (!nomePdf) {
        // Link externo
        resultados.cursosComLinkExterno.push({ id, titulo, idioma: 'EN', link });
    } else {
        // PDF local
        const existe = pdfsDisponiveis.has(nomePdf);
        if (existe) {
            resultados.cursosComPdf.push({ id, titulo, idioma: 'EN', pdf: nomePdf });
            resultados.pdfsEncontrados.add(nomePdf);
        } else {
            resultados.cursosSemPdf.push({ id, titulo, idioma: 'EN', pdf: nomePdf, motivo: 'Arquivo não encontrado' });
        }
    }
});

// Identificar PDFs órfãos
pdfsDisponiveis.forEach(pdf => {
    if (!resultados.pdfsEncontrados.has(pdf)) {
        resultados.pdfsOrfaos.push(pdf);
    }
});

// Estatísticas
resultados.estatisticas = {
    totalCursosVerificados: resultados.totalCursos,
    totalCursosComPdf: resultados.cursosComPdf.length,
    totalCursosSemPdf: resultados.cursosSemPdf.length,
    totalCursosComLinkExterno: resultados.cursosComLinkExterno.length,
    totalPdfsDisponiveis: pdfsDisponiveis.size,
    totalPdfsUsados: resultados.pdfsEncontrados.size,
    totalPdfsOrfaos: resultados.pdfsOrfaos.length,
    taxaSucesso: ((resultados.pdfsEncontrados.size / resultados.cursosComPdf.length) * 100).toFixed(2) + '%'
};

// Gerar relatório
function gerarRelatorio() {
    let markdown = '# 📋 Relatório de Verificação de PDFs dos Cursos\n\n';
    markdown += `**Data da verificação:** ${new Date().toLocaleString('pt-BR')}\n\n`;

    // Estatísticas gerais
    markdown += '## 📊 Estatísticas Gerais\n\n';
    markdown += `- **Total de cursos verificados:** ${resultados.estatisticas.totalCursosVerificados}\n`;
    markdown += `- **Cursos com PDF local:** ${resultados.estatisticas.totalCursosComPdf}\n`;
    markdown += `- **Cursos sem PDF:** ${resultados.estatisticas.totalCursosSemPdf}\n`;
    markdown += `- **Cursos com link externo:** ${resultados.estatisticas.totalCursosComLinkExterno}\n`;
    markdown += `- **PDFs disponíveis na pasta:** ${resultados.estatisticas.totalPdfsDisponiveis}\n`;
    markdown += `- **PDFs usados pelos cursos:** ${resultados.estatisticas.totalPdfsUsados}\n`;
    markdown += `- **PDFs órfãos:** ${resultados.estatisticas.totalPdfsOrfaos}\n`;
    markdown += `- **Taxa de sucesso:** ${resultados.estatisticas.taxaSucesso}\n\n`;

    // Cursos com PDF correto
    markdown += '## ✅ Cursos com PDF Correto\n\n';
    if (resultados.cursosComPdf.length > 0) {
        markdown += '| ID | Idioma | Curso | PDF |\n';
        markdown += '|----|--------|-------|-----|\n';
        resultados.cursosComPdf.forEach(curso => {
            markdown += `| ${curso.id} | ${curso.idioma} | ${curso.titulo} | \`${curso.pdf}\` |\n`;
        });
    } else {
        markdown += 'Nenhum curso com PDF encontrado.\n';
    }
    markdown += '\n';

    // Cursos sem PDF ou com problema
    markdown += '## ❌ Cursos com PDF Faltando ou Problemas\n\n';
    if (resultados.cursosSemPdf.length > 0) {
        markdown += '| ID | Idioma | Curso | PDF | Motivo |\n';
        markdown += '|----|--------|-------|-----|--------|\n';
        resultados.cursosSemPdf.forEach(curso => {
            const pdfDisplay = curso.pdf ? `\`${curso.pdf}\`` : 'N/A';
            markdown += `| ${curso.id} | ${curso.idioma} | ${curso.titulo} | ${pdfDisplay} | ${curso.motivo} |\n`;
        });
    } else {
        markdown += 'Nenhum curso com problema encontrado.\n';
    }
    markdown += '\n';

    // Cursos com link externo
    markdown += '## 🔗 Cursos com Link Externo (sem PDF local)\n\n';
    if (resultados.cursosComLinkExterno.length > 0) {
        markdown += '| ID | Idioma | Curso | Link Externo |\n';
        markdown += '|----|--------|-------|--------------|\n';
        resultados.cursosComLinkExterno.forEach(curso => {
            markdown += `| ${curso.id} | ${curso.idioma} | ${curso.titulo} | [Link](${curso.link}) |\n`;
        });
    } else {
        markdown += 'Nenhum curso com link externo encontrado.\n';
    }
    markdown += '\n';

    // PDFs órfãos
    markdown += '## 🗑️ PDFs Órfãos (não usados por nenhum curso)\n\n';
    if (resultados.pdfsOrfaos.length > 0) {
        markdown += '| PDF |\n';
        markdown += '|-----|\n';
        resultados.pdfsOrfaos.sort().forEach(pdf => {
            markdown += `| \`${pdf}\` |\n`;
        });
    } else {
        markdown += 'Nenhum PDF órfão encontrado.\n';
    }
    markdown += '\n';

    // Lista completa de PDFs disponíveis
    markdown += '## 📁 Lista Completa de PDFs em `public/certificados/`\n\n';
    markdown += `**Total:** ${pdfsDisponiveis.size} arquivos\n\n`;
    markdown += '```\n';
    Array.from(pdfsDisponiveis).sort().forEach(pdf => {
        markdown += `- ${pdf}\n`;
    });
    markdown += '```\n\n';

    // Recomendações
    markdown += '## 💡 Recomendações\n\n';
    const recomendacoes = [];

    if (resultados.cursosSemPdf.length > 0) {
        recomendacoes.push(`- **Corrigir ${resultados.cursosSemPdf.length} cursos** que estão com PDFs faltando ou caminhos incorretos`);
    }

    if (resultados.pdfsOrfaos.length > 0) {
        recomendacoes.push(`- **Revisar ${resultados.pdfsOrfaos.length} PDFs órfãos** que não são usados em nenhum curso (considere remover se não forem necessários)`);
    }

    if (resultados.cursosComLinkExterno.length > 0) {
        recomendacoes.push(`- **${resultados.cursosComLinkExterno.length} cursos** usam links externos em vez de PDFs locais`);
    }

    if (recomendacoes.length === 0) {
        recomendacoes.push('- ✅ **Todos os PDFs estão corretos!** Não há problemas a serem resolvidos.');
    }

    markdown += recomendacoes.join('\n') + '\n\n';

    // Detalhes técnicos
    markdown += '---\n';
    markdown += '## 🔧 Detalhes Técnicos\n\n';
    markdown += '- **Caminho do JSON:** `src/data/cursos.json`\n';
    markdown += '- **Pasta de certificados:** `public/certificados/`\n';
    markdown += '- **Formato de link no JSON:** Pode ser caminho local (ex: `/certificados/arquivo.pdf`) ou link externo (URL completa)\n';
    markdown += '- **Critérios de verificação:**\n';
    markdown += '  - PDF local: arquivo deve existir em `public/certificados/`\n';
    markdown += '  - Link externo: considerado válido (não requer arquivo local)\n';
    markdown += '  - Campo `link` ausente: considerado erro\n\n';

    return markdown;
}

// Executar e salvar
const relatorio = gerarRelatorio();
fs.writeFileSync(RELATORIO_PATH, relatorio, 'utf8');

console.log('✅ Relatório gerado com sucesso!');
console.log(`📊 Total de cursos: ${resultados.totalCursos}`);
console.log(`✅ Cursos com PDF: ${resultados.cursosComPdf.length}`);
console.log(`❌ Cursos sem PDF: ${resultados.cursosSemPdf.length}`);
console.log(`🔗 Cursos com link externo: ${resultados.cursosComLinkExterno.length}`);
console.log(`🗑️ PDFs órfãos: ${resultados.pdfsOrfaos.length}`);
console.log(`\n📄 Relatório salvo em: ${RELATORIO_PATH}`);
