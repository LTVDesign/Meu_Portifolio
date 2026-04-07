/**
 * Verificação Completa de Duplicatas em cursos.json
 * Analisa múltiplos critérios para detectar cursos duplicados
 */

const fs = require('fs');
const path = require('path');

const CURSOS_PATH = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const RELATORIO_PATH = path.join(__dirname, 'RELATORIO-DUPLICATAS.md');

function loadCursos() {
    const data = fs.readFileSync(CURSOS_PATH, 'utf8');
    return JSON.parse(data);
}

function saveCursos(data) {
    fs.writeFileSync(CURSOS_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function normalizeString(str) {
    return str.toLowerCase().trim();
}

function findDuplicateIds(cursos) {
    const idMap = new Map();
    const duplicates = [];

    cursos.forEach((curso, index) => {
        const id = curso.id;
        if (idMap.has(id)) {
            const firstIndex = idMap.get(id);
            duplicates.push({
                type: 'ID duplicado',
                ids: [id],
                positions: [firstIndex, index],
                details: [
                    { index: firstIndex, title: cursos[firstIndex].title, platform: cursos[firstIndex].platform },
                    { index: index, title: curso.title, platform: curso.platform }
                ]
            });
        } else {
            idMap.set(id, index);
        }
    });

    return duplicates;
}

function findDuplicateTitlePlatform(cursos) {
    const tpMap = new Map();
    const duplicates = [];
    const seen = new Set();

    cursos.forEach((curso, index) => {
        const key = `${normalizeString(curso.title)}|${normalizeString(curso.platform)}`;
        if (tpMap.has(key)) {
            const firstIndex = tpMap.get(key);
            const dupKey = `${firstIndex}-${index}`;
            if (!seen.has(dupKey)) {
                duplicates.push({
                    type: 'Título + Plataforma duplicados',
                    ids: [cursos[firstIndex].id, curso.id],
                    positions: [firstIndex, index],
                    details: [
                        { index: firstIndex, title: cursos[firstIndex].title, platform: cursos[firstIndex].platform, id: cursos[firstIndex].id },
                        { index: index, title: curso.title, platform: curso.platform, id: curso.id }
                    ]
                });
                seen.add(dupKey);
            }
        } else {
            tpMap.set(key, index);
        }
    });

    return duplicates;
}

function findDuplicateVerificationLink(cursos) {
    const linkMap = new Map();
    const duplicates = [];
    const seen = new Set();

    cursos.forEach((curso, index) => {
        const link = curso.verificationLink;
        if (link && linkMap.has(link)) {
            const firstIndex = linkMap.get(link);
            const dupKey = `${firstIndex}-${index}`;
            if (!seen.has(dupKey)) {
                duplicates.push({
                    type: 'VerificationLink duplicado',
                    ids: [cursos[firstIndex].id, curso.id],
                    positions: [firstIndex, index],
                    details: [
                        { index: firstIndex, title: cursos[firstIndex].title, link: cursos[firstIndex].verificationLink, id: cursos[firstIndex].id },
                        { index: index, title: curso.title, link: curso.verificationLink, id: curso.id }
                    ]
                });
                seen.add(dupKey);
            }
        } else if (link) {
            linkMap.set(link, index);
        }
    });

    return duplicates;
}

function findDuplicatePDF(cursos) {
    const pdfMap = new Map();
    const duplicates = [];
    const seen = new Set();

    cursos.forEach((curso, index) => {
        const link = curso.link;
        if (link && pdfMap.has(link)) {
            const firstIndex = pdfMap.get(link);
            const dupKey = `${firstIndex}-${index}`;
            if (!seen.has(dupKey)) {
                duplicates.push({
                    type: 'PDF duplicado',
                    ids: [cursos[firstIndex].id, curso.id],
                    positions: [firstIndex, index],
                    details: [
                        { index: firstIndex, title: cursos[firstIndex].title, pdf: cursos[firstIndex].link, id: cursos[firstIndex].id },
                        { index: index, title: curso.title, pdf: curso.link, id: curso.id }
                    ]
                });
                seen.add(dupKey);
            }
        } else if (link) {
            pdfMap.set(link, index);
        }
    });

    return duplicates;
}

function findDuplicateTitleDuration(cursos) {
    const tdMap = new Map();
    const duplicates = [];
    const seen = new Set();

    cursos.forEach((curso, index) => {
        const duration = curso.duration || '';
        const key = `${normalizeString(curso.title)}|${normalizeString(duration)}`;
        if (tdMap.has(key)) {
            const firstIndex = tdMap.get(key);
            const dupKey = `${firstIndex}-${index}`;
            if (!seen.has(dupKey)) {
                duplicates.push({
                    type: 'Título + Duração duplicados',
                    ids: [cursos[firstIndex].id, curso.id],
                    positions: [firstIndex, index],
                    details: [
                        { index: firstIndex, title: cursos[firstIndex].title, duration: cursos[firstIndex].duration, id: cursos[firstIndex].id },
                        { index: index, title: curso.title, duration: curso.duration, id: curso.id }
                    ]
                });
                seen.add(dupKey);
            }
        } else {
            tdMap.set(key, index);
        }
    });

    return duplicates;
}

function checkPTPairing(cursosPt, cursosEn) {
    const issues = [];
    const maxLen = Math.max(cursosPt.length, cursosEn.length);

    for (let i = 0; i < maxLen; i++) {
        const pt = cursosPt[i];
        const en = cursosEn[i];

        if (!pt && en) {
            issues.push(`EN tem curso sem correspondência em PT: ID ${en.id} - ${en.title}`);
        } else if (pt && !en) {
            issues.push(`PT tem curso sem correspondência em EN: ID ${pt.id} - ${pt.title}`);
        } else if (pt && en) {
            const ptId = parseInt(pt.id);
            const enId = parseInt(en.id);
            if (ptId !== enId) {
                issues.push(`IDs não correspondem na posição ${i}: PT ID ${ptId} vs EN ID ${enId}`);
            }
        }
    }

    return issues;
}

function generateReport(allDuplicates, pairingIssues, stats) {
    const now = new Date().toLocaleString('pt-BR');
    let report = `# Relatório de Verificação de Duplicatas - Cursos\n\n`;
    report += `**Data da verificação:** ${now}\n\n`;

    report += `## Resumo Executivo\n\n`;
    report += `- Total de cursos PT: ${stats.ptCount}\n`;
    report += `- Total de cursos EN: ${stats.enCount}\n`;
    report += `- Total de duplicatas encontradas: ${allDuplicates.length}\n`;
    report += `- Problemas de correspondência PT/EN: ${pairingIssues.length}\n\n`;

    if (allDuplicates.length === 0 && pairingIssues.length === 0) {
        report += `## ✅ Status: SISTEMA LIMPO\n\n`;
        report += `Nenhuma duplicata ou inconsistência foi encontrada. O sistema está em conformidade.\n`;
    } else {
        report += `## ⚠️ Status: INCONSISTÊNCIAS ENCONTRADAS\n\n`;

        if (allDuplicates.length > 0) {
            report += `### Duplicatas Detectadas\n\n`;

            allDuplicates.forEach((dup, idx) => {
                report += `#### ${idx + 1}. ${dup.type}\n\n`;
                report += `- **IDs envolvidos:** ${dup.ids.join(', ')}\n`;
                report += `- **Posições no array:** ${dup.positions.join(', ')}\n\n`;

                report += `**Detalhes:**\n\n`;
                dup.details.forEach((det, dIdx) => {
                    report += `**Curso ${dIdx + 1}** (índice ${det.index}):\n`;
                    report += `- ID: ${det.id}\n`;
                    report += `- Título: ${det.title}\n`;
                    if (det.platform) report += `- Plataforma: ${det.platform}\n`;
                    if (det.duration) report += `- Duração: ${det.duration}\n`;
                    if (det.link) report += `- PDF: ${det.link}\n`;
                    if (det.pdf) report += `- PDF: ${det.pdf}\n`;
                    if (det.verificationLink) report += `- Verification: ${det.verificationLink}\n`;
                    report += `\n`;
                });

                report += `**Sugestão:** Manter o curso com mais informações completas (com modules, description, etc.) e remover o duplicado.\n\n---\n\n`;
            });
        }

        if (pairingIssues.length > 0) {
            report += `### Problemas de Correspondência PT/EN\n\n`;
            pairingIssues.forEach((issue, idx) => {
                report += `${idx + 1}. ${issue}\n`;
            });
            report += `\n`;
        }
    }

    report += `## Estatísticas Detalhadas\n\n`;
    report += `\`\`\`json\n${JSON.stringify(stats, null, 2)}\n\`\`\`\n\n`;

    report += `## Recomendações\n\n`;
    if (allDuplicates.length > 0) {
        report += `1. **Remover duplicatas** identificadas acima\n`;
        report += `2. **Renumerar IDs** sequencialmente a partir de 1\n`;
        report += `3. **Atualizar referências** de PDFs se necessário\n`;
        report += `4. **Garantir espelhamento** perfeito entre PT e EN\n`;
        report += `5. **Validar** com \`npm run validate-cursos\` após correções\n`;
    } else {
        report += `Nenhuma ação necessária. O sistema está validado.\n`;
    }

    return report;
}

function main() {
    console.log('🔍 Iniciando verificação completa de duplicatas...\n');

    const data = loadCursos();
    const { pt, en } = data;

    console.log(`📊 Carregados: ${pt.length} cursos PT, ${en.length} cursos EN`);

    // Coletar todas as duplicatas
    const allDuplicates = [];

    // Verificar PT
    console.log('\n🔎 Verificando array PT...');
    allDuplicates.push(...findDuplicateIds(pt));
    allDuplicates.push(...findDuplicateTitlePlatform(pt));
    allDuplicates.push(...findDuplicateVerificationLink(pt));
    allDuplicates.push(...findDuplicatePDF(pt));
    allDuplicates.push(...findDuplicateTitleDuration(pt));

    // Verificar EN
    console.log('🔎 Verificando array EN...');
    allDuplicates.push(...findDuplicateIds(en));
    allDuplicates.push(...findDuplicateTitlePlatform(en));
    allDuplicates.push(...findDuplicateVerificationLink(en));
    allDuplicates.push(...findDuplicatePDF(en));
    allDuplicates.push(...findDuplicateTitleDuration(en));

    // Verificar correspondência PT/EN
    console.log('🔎 Verificando correspondência PT/EN...');
    const pairingIssues = checkPTPairing(pt, en);

    // Estatísticas
    const stats = {
        ptCount: pt.length,
        enCount: en.length,
        duplicateCount: allDuplicates.length,
        duplicateTypes: {},
        pairingIssuesCount: pairingIssues.length
    };

    allDuplicates.forEach(dup => {
        stats.duplicateTypes[dup.type] = (stats.duplicateTypes[dup.type] || 0) + 1;
    });

    // Gerar relatório
    console.log('📝 Gerando relatório...');
    const report = generateReport(allDuplicates, pairingIssues, stats);

    fs.writeFileSync(RELATORIO_PATH, report, 'utf8');
    console.log(`✅ Relatório salvo em: ${RELATORIO_PATH}`);

    // Exibir resumo
    console.log('\n' + '='.repeat(60));
    console.log('RESUMO DA VERIFICAÇÃO');
    console.log('='.repeat(60));
    console.log(`Cursos PT: ${pt.length}`);
    console.log(`Cursos EN: ${en.length}`);
    console.log(`Duplicatas encontradas: ${allDuplicates.length}`);
    console.log(`Problemas PT/EN: ${pairingIssues.length}`);

    if (allDuplicates.length > 0) {
        console.log('\n⚠️  FORAM ENCONTRADAS DUPLICATAS!');
        allDuplicates.forEach(dup => {
            console.log(`\n- ${dup.type}:`);
            dup.details.forEach(det => {
                console.log(`  * ID ${det.id}: ${det.title.substring(0, 50)}...`);
            });
        });
    } else {
        console.log('\n✅ Nenhuma duplicata encontrada.');
    }

    if (pairingIssues.length > 0) {
        console.log('\n⚠️  Problemas de correspondência PT/EN:');
        pairingIssues.forEach(issue => console.log(`  - ${issue}`));
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Relatório completo: ${RELATORIO_PATH}`);
    console.log('='.repeat(60));

    // Retornar resultado para uso programático
    process.exit(allDuplicates.length > 0 || pairingIssues.length > 0 ? 1 : 0);
}

main();
