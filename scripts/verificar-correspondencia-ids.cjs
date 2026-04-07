/**
 * Verifica se os cursos PT e EN com mesmos IDs são equivalentes (títulos traduzidos)
 */

const fs = require('fs');
const path = require('path');

const CURSOS_PATH = path.join(__dirname, '..', 'src', 'data', 'cursos.json');

function loadCursos() {
    const data = fs.readFileSync(CURSOS_PATH, 'utf8');
    return JSON.parse(data);
}

function normalizeTitle(title) {
    return title.toLowerCase().trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function main() {
    const data = loadCursos();
    const { pt, en } = data;

    console.log('🔍 Verificando correspondência PT/EN por ID...\n');

    // Criar mapas por ID
    const ptById = new Map();
    const enById = new Map();

    pt.forEach(c => ptById.set(c.id, c));
    en.forEach(c => enById.set(c.id, c));

    // Verificar se todos os IDs PT têm correspondência em EN
    const allIds = new Set([...ptById.keys(), ...enById.keys()]);
    const ptOnly = [...ptById.keys()].filter(id => !enById.has(id));
    const enOnly = [...enById.keys()].filter(id => !ptById.has(id));

    if (ptOnly.length > 0) {
        console.log('⚠️  IDs apenas em PT:', ptOnly);
    }
    if (enOnly.length > 0) {
        console.log('⚠️  IDs apenas em EN:', enOnly);
    }

    // Verificar títulos correspondentes
    let matches = 0;
    let mismatches = 0;
    const mismatchDetails = [];

    allIds.forEach(id => {
        const ptCourse = ptById.get(id);
        const enCourse = enById.get(id);

        if (ptCourse && enCourse) {
            const ptNorm = normalizeTitle(ptCourse.title);
            const enNorm = normalizeTitle(enCourse.title);

            // Remover sufixos comuns como "(PT)" ou "(EN)"
            const ptClean = ptNorm.replace(/\s*\(pt\)$/, '').trim();
            const enClean = enNorm.replace(/\s*\(en\)$/, '').trim();

            // Verificar se os títulos são similares (um é tradução do outro)
            // Para cursos que não são exatamente iguais, vamos verificar se contêm as mesmas palavras-chave
            const areEqual = ptClean === enClean;

            if (areEqual) {
                matches++;
            } else {
                mismatches++;
                mismatchDetails.push({
                    id,
                    pt: ptCourse.title,
                    en: enCourse.title
                });
            }
        }
    });

    console.log(`✅ Cursos com títulos idênticos (normalizados): ${matches}`);
    console.log(`⚠️  Cursos com títulos diferentes: ${mismatches}`);
    console.log(`📊 Total de IDs correspondentes: ${allIds.size - ptOnly.length - enOnly.length}`);

    if (mismatches > 0) {
        console.log('\n📋 Detalhes das diferenças (por ID):');
        mismatchDetails.forEach(d => {
            console.log(`\nID ${d.id}:`);
            console.log(`  PT: ${d.pt}`);
            console.log(`  EN: ${d.en}`);
        });
    }

    // Verificar se as plataformas também correspondem
    console.log('\n🔍 Verificando correspondência de plataformas...');
    let platformMatches = 0;
    let platformMismatches = 0;

    allIds.forEach(id => {
        const ptCourse = ptById.get(id);
        const enCourse = enById.get(id);

        if (ptCourse && enCourse) {
            if (ptCourse.platform === enCourse.platform) {
                platformMatches++;
            } else {
                platformMismatches++;
                console.log(`ID ${id}: Plataformas diferentes`);
                console.log(`  PT: ${ptCourse.platform}`);
                console.log(`  EN: ${enCourse.platform}`);
            }
        }
    });

    console.log(`\n📊 Plataformas correspondentes: ${platformMatches}/${matches + mismatches}`);

    // Conclusão
    console.log('\n' + '='.repeat(60));
    if (mismatches === 0 && platformMismatches === 0) {
        console.log('✅ CORRESPONDÊNCIA PERFEITA: Todos os cursos com mesmos IDs têm títulos e plataformas equivalentes.');
    } else {
        console.log('⚠️  CORRESPONDÊNCIA IMPERFEITA: Alguns cursos com mesmos IDs têm títulos ou plataformas diferentes.');
        console.log(`   - Títulos diferentes: ${mismatches}`);
        console.log(`   - Plataformas diferentes: ${platformMismatches}`);
    }
    console.log('='.repeat(60));
}

main();
