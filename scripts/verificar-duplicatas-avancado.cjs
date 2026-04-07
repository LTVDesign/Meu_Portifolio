/**
 * Verificação AVANÇADA de Duplicatas em cursos.json
 * Usa normalização de strings (case-insensitive, sem acentos) e múltiplos critérios
 */

const fs = require('fs');
const path = require('path');

const CURSOS_PATH = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const RELATORIO_PATH = path.join(__dirname, 'RELATORIO-COMPLETO-DUPLICATAS.md');

function loadCursos() {
    const data = fs.readFileSync(CURSOS_PATH, 'utf8');
    return JSON.parse(data);
}

function normalizeString(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, ' ');
}

function findDuplicateIds(cursos, lang) {
    const idMap = new Map();
    const duplicates = [];

    cursos.forEach((curso, index) => {
        const id = curso.id;
        if (idMap.has(id)) {
            const firstIndex = idMap.get(id);
            duplicates.push({
                type: 'ID duplicado',
                lang,
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

function findDuplicateTitleNormalized(cursos, lang) {
    const titleMap = new Map();
    const duplicates = [];
    const seen = new Set();

    cursos.forEach((curso, index) => {
        const normalizedTitle = normalizeString(curso.title);
        if (titleMap.has(normalizedTitle)) {
            const firstIndex = titleMap.get(normalizedTitle);
            const dupKey = `${firstIndex}-${index}`;
            if (!seen.has(dupKey)) {
                duplicates.push({
                    type: 'Título duplicado (normalizado)',
                    lang,
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
            titleMap.set(normalizedTitle, index);
        }
    });

    return duplicates;
}

function findDuplicateVerificationLink(cursos, lang) {
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
                    lang,
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

function findDuplicatePDF(cursos, lang) {
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
                    lang,
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

function findDuplicateTitlePlatform(cursos, lang) {
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
                    lang,
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

function findDuplicateTitleDuration(cursos, lang) {
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
                    lang,
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

function findCrossLanguageDuplicates(pt, en) {
    const duplicates = [];
    const ptMap = new Map();

    // Mapear títulos normalizados PT
    pt.forEach((curso, index) => {
        const normalizedTitle = normalizeString(curso.title);
        ptMap.set(normalizedTitle, { index, id: curso.id, title: curso.title });
    });

    // Verificar se há títulos EN que são duplicados de PT (não deveria!)
    const seen = new Set();
    en.forEach((curso, index) => {
        const normalizedTitle = normalizeString(curso.title);
        if (ptMap.has(normalizedTitle)) {
            const ptData = ptMap.get(normalizedTitle);
            const dupKey = `${ptData.index}-${index}`;
            if (!seen.has(dupKey)) {
                duplicates.push({
                    type: 'Título duplicado entre PT e EN',
                    ids: [ptData.id, curso.id],
                    positions: [ptData.index, index],
                    details: [
                        { index: ptData.index, title: ptData.title, lang: 'PT', id: ptData.id },
                        { index, title: curso.title, lang: 'EN', id: curso.id }
                    ]
                });
                seen.add(dupKey);
            }
        }
    });

    return duplicates;
}

function checkPTPairing(pt, en) {
    const issues = [];
    const maxLen = Math.max(pt.length, en.length);

    for (let i = 0; i < maxLen; i++) {
        const ptCourse = pt[i];
        const enCourse = en[i];

        if (!ptCourse && enCourse) {
            issues.push(`EN tem curso sem correspondência em PT: ID ${enCourse.id} - ${enCourse.title}`);
        } else if (ptCourse && !enCourse) {
            issues.push(`PT tem curso sem correspondência em EN: ID ${ptCourse.id} - ${ptCourse.title}`);
        } else if (ptCourse && enCourse) {
            const ptId = parseInt(ptCourse.id);
            const enId = parseInt(enCourse.id);
            if (ptId !== enId) {
                issues.push(`IDs não correspondem na posição ${i}: PT ID ${ptId} vs EN ID ${enId}`);
            }
            // Verificar se os títulos são correspondentes (normalizados)
            const ptTitle = normalizeString(ptCourse.title);
            const enTitle = normalizeString(enCourse.title);
            // Remover sufixos comuns como "(PT)" e "(EN)"
            const cleanPtTitle = ptTitle.replace(/\s*\(pt\)\s*/i, '');
            const cleanEnTitle = enTitle.replace(/\s*\(en\)\s*/i, '');
            if (cleanPtTitle !== cleanEnTitle && cleanPtTitle !== ptTitle && cleanEnTitle !== enTitle) {
                issues.push(`Títulos não correspondem na posição ${i}: PT "${ptCourse.title.substring(0, 50)}..." vs EN "${enCourse.title.substring(0, 50)}..."`);
            }
        }
    }

    return issues;
}

function validateRequiredFields(cursos, lang) {
    const issues = [];
    const requiredFields = ['id', 'title', 'platform', 'link'];

    cursos.forEach((curso, index) => {
        const missing = requiredFields.filter(field => !curso[field]);
        if (missing.length > 0) {
            issues.push({
                lang,
                index,
                id: curso.id,
                title: curso.title,
                missingFields: missing
            });
        }
    });

    return issues;
}

function generateReport(allDuplicates, pairingIssues, missingFields, stats) {
    const now = new Date().toLocaleString('pt-BR');
    let report = `# Relatório COMPLETO de Verificação de Duplicatas - Cursos\n\n`;
    report += `**Data da verificação:** ${now}\n\n`;

    report += `## Resumo Executivo\n\n`;
    report += `- Total de cursos PT: ${stats.ptCount}\n`;
    report += `- Total de cursos EN: ${stats.enCount}\n`;
    report += `- Total de duplicatas encontradas: ${allDuplicates.length}\n`;
    report += `- Problemas de correspondência PT/EN: ${pairingIssues.length}\n`;
    report += `- Campos obrigatórios faltando: ${missingFields.length}\n\n`;

    if (allDuplicates.length === 0 && pairingIssues.length === 0 && missingFields.length === 0) {
        report += `## ✅ Status: SISTEMA LIMPO\n\n`;
        report += `Nenhuma duplicata, inconsistência ou campo obrigatório faltando foi encontrado. O sistema está em conformidade.\n`;
    } else {
        report += `## ⚠️ Status: INCONSISTÊNCIAS ENCONTRADAS\n\n`;

        if (allDuplicates.length > 0) {
            report += `### Duplicatas Detectadas\n\n`;

            allDuplicates.forEach((dup, idx) => {
                report += `#### ${idx + 1}. ${dup.type} (${dup.lang})\n\n`;
                report += `- **IDs envolvidos:** ${dup.ids.join(', ')}\n`;
                report += `- **Posições no array:** ${dup.positions.join(', ')}\n\n`;

                report += `**Detalhes:**\n\n`;
                dup.details.forEach((det, dIdx) => {
                    report += `**Curso ${dIdx + 1}** (índice ${det.index}${det.lang ? ', ' + det.lang : ''}):\n`;
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

        if (missingFields.length > 0) {
            report += `### Campos Obrigatórios Faltando\n\n`;
            missingFields.forEach((issue, idx) => {
                report += `${idx + 1}. [${issue.lang}] Índice ${issue.index}, ID ${issue.id}: ${issue.title.substring(0, 50)}...\n`;
                report += `   Campos faltando: ${issue.missingFields.join(', ')}\n`;
            });
            report += `\n`;
        }
    }

    report += `## Estatísticas Detalhadas\n\n`;
    report += `\`\`\`json\n${JSON.stringify(stats, null, 2)}\n\`\`\`\n\n`;

    report += `## Lista Completa de Cursos (PT)\n\n`;
    report += `| ID | Título | Plataforma | Verification Link | PDF |\n`;
    report += `|----|--------|------------|-------------------|-----|\n`;
    stats.ptCursos.forEach(c => {
        const title = c.title.length > 40 ? c.title.substring(0, 37) + '...' : c.title;
        const platform = c.platform.length > 25 ? c.platform.substring(0, 22) + '...' : c.platform;
        const link = c.verificationLink ? '✅' : '❌';
        const pdf = c.link ? '✅' : '❌';
        report += `| ${c.id} | ${title} | ${platform} | ${link} | ${pdf} |\n`;
    });

    report += `\n## Lista Completa de Cursos (EN)\n\n`;
    report += `| ID | Título | Plataforma | Verification Link | PDF |\n`;
    report += `|----|--------|------------|-------------------|-----|\n`;
    stats.enCursos.forEach(c => {
        const title = c.title.length > 40 ? c.title.substring(0, 37) + '...' : c.title;
        const platform = c.platform.length > 25 ? c.platform.substring(0, 22) + '...' : c.platform;
        const link = c.verificationLink ? '✅' : '❌';
        const pdf = c.link ? '✅' : '❌';
        report += `| ${c.id} | ${title} | ${platform} | ${link} | ${pdf} |\n`;
    });

    report += `\n## Recomendações\n\n`;
    if (allDuplicates.length > 0) {
        report += `1. **Remover duplicatas** identificadas acima\n`;
        report += `2. **Renumerar IDs** sequencialmente a partir de 1\n`;
        report += `3. **Atualizar referências** de PDFs se necessário\n`;
        report += `4. **Garantir espelhamento** perfeito entre PT e EN\n`;
        report += `5. **Validar** com 'npm run validate-cursos' após correções\n`;
    } else if (missingFields.length > 0) {
        report += `1. **Corrigir campos obrigatórios faltantes** nos cursos listados\n`;
        report += `2. Garantir que todos os cursos tenham: id, title, platform, link\n`;
    } else {
        report += `Nenhuma ação necessária. O sistema está validado.\n`;
    }

    return report;
}

function main() {
    console.log('🔍 Iniciando verificação AVANÇADA de duplicatas...\n');

    const data = loadCursos();
    const { pt, en } = data;

    console.log(`📊 Carregados: ${pt.length} cursos PT, ${en.length} cursos EN`);

    // Coletar todas as duplicatas
    const allDuplicates = [];

    // Verificar PT
    console.log('\n🔎 Verificando array PT (com normalização)...');
    allDuplicates.push(...findDuplicateIds(pt, 'PT'));
    allDuplicates.push(...findDuplicateTitleNormalized(pt, 'PT'));
    allDuplicates.push(...findDuplicateTitlePlatform(pt, 'PT'));
    allDuplicates.push(...findDuplicateVerificationLink(pt, 'PT'));
    allDuplicates.push(...findDuplicatePDF(pt, 'PT'));
    allDuplicates.push(...findDuplicateTitleDuration(pt, 'PT'));

    // Verificar EN
    console.log('🔎 Verificando array EN (com normalização)...');
    allDuplicates.push(...findDuplicateIds(en, 'EN'));
    allDuplicates.push(...findDuplicateTitleNormalized(en, 'EN'));
    allDuplicates.push(...findDuplicateTitlePlatform(en, 'EN'));
    allDuplicates.push(...findDuplicateVerificationLink(en, 'EN'));
    allDuplicates.push(...findDuplicatePDF(en, 'EN'));
    allDuplicates.push(...findDuplicateTitleDuration(en, 'EN'));

    // Verificar correspondência PT/EN
    console.log('🔎 Verificando correspondência PT/EN...');
    const pairingIssues = checkPTPairing(pt, en);

    // Verificar campos obrigatórios
    console.log('🔎 Verificando campos obrigatórios...');
    const missingFieldsPt = validateRequiredFields(pt, 'PT');
    const missingFieldsEn = validateRequiredFields(en, 'EN');
    const missingFields = [...missingFieldsPt, ...missingFieldsEn];

    // Estatísticas
    const stats = {
        ptCount: pt.length,
        enCount: en.length,
        duplicateCount: allDuplicates.length,
        duplicateTypes: {},
        pairingIssuesCount: pairingIssues.length,
        missingFieldsCount: missingFields.length,
        ptCursos: pt.map(c => ({ id: c.id, title: c.title, platform: c.platform, verificationLink: !!c.verificationLink, link: !!c.link })),
        enCursos: en.map(c => ({ id: c.id, title: c.title, platform: c.platform, verificationLink: !!c.verificationLink, link: !!c.link }))
    };

    allDuplicates.forEach(dup => {
        const key = `${dup.type} (${dup.lang})`;
        stats.duplicateTypes[key] = (stats.duplicateTypes[key] || 0) + 1;
    });

    // Gerar relatório
    console.log('📝 Gerando relatório completo...');
    const report = generateReport(allDuplicates, pairingIssues, missingFields, stats);

    fs.writeFileSync(RELATORIO_PATH, report, 'utf8');
    console.log(`✅ Relatório salvo em: ${RELATORIO_PATH}`);

    // Exibir resumo
    console.log('\n' + '='.repeat(60));
    console.log('RESUMO DA VERIFICAÇÃO AVANÇADA');
    console.log('='.repeat(60));
    console.log(`Cursos PT: ${pt.length}`);
    console.log(`Cursos EN: ${en.length}`);
    console.log(`Duplicatas encontradas: ${allDuplicates.length}`);
    console.log(`Problemas PT/EN: ${pairingIssues.length}`);
    console.log(`Campos faltando: ${missingFields.length}`);

    if (allDuplicates.length > 0) {
        console.log('\n⚠️  FORAM ENCONTRADAS DUPLICATAS!');
        allDuplicates.forEach(dup => {
            console.log(`\n- ${dup.type} (${dup.lang}):`);
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

    if (missingFields.length > 0) {
        console.log('\n⚠️  Campos obrigatórios faltando:');
        missingFields.forEach(issue => {
            console.log(`  - [${issue.lang}] ID ${issue.id}: ${issue.missingFields.join(', ')}`);
        });
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Relatório completo: ${RELATORIO_PATH}`);
    console.log('='.repeat(60));

    process.exit(allDuplicates.length > 0 || pairingIssues.length > 0 || missingFields.length > 0 ? 1 : 0);
}

main();
