/**
 * Análise aprofundada dos títulos dos cursos
 * Identifica cursos PT com títulos em inglês (que deveriam estar em português)
 */

const fs = require('fs');
const path = require('path');

const CURSOS_PATH = path.join(__dirname, '..', 'src', 'data', 'cursos.json');

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

function isEnglishText(text) {
    // Heurística simples: se contém palavras comuns em inglês
    const englishWords = ['the', 'and', 'for', 'with', 'from', 'this', 'that', 'introduction', 'fundamentals', 'systems', 'security', 'support', 'technical'];
    const normalized = normalizeString(text);
    const words = normalized.split(/\s+/);
    const englishWordCount = words.filter(w => englishWords.includes(w)).length;
    return englishWordCount >= 1;
}

function main() {
    const data = loadCursos();
    const { pt, en } = data;

    console.log('🔍 Análise de Títulos dos Cursos\n');
    console.log(`Total: ${pt.length} cursos PT, ${en.length} cursos EN\n`);

    // Verificar correspondência de IDs
    console.log('📊 Correspondência de IDs PT/EN:');
    let pairingProblems = 0;
    for (let i = 0; i < Math.max(pt.length, en.length); i++) {
        const ptCourse = pt[i];
        const enCourse = en[i];
        if (ptCourse && enCourse) {
            if (ptCourse.id !== enCourse.id) {
                console.log(`  ❌ Posição ${i}: PT ID ${ptCourse.id} != EN ID ${enCourse.id}`);
                pairingProblems++;
            }
        }
    }
    if (pairingProblems === 0) {
        console.log('  ✅ Todos os IDs correspondem perfeitamente\n');
    }

    // Analisar cada par
    console.log('📋 Análise detalhada de cada curso:\n');
    console.log('| Pos | ID | Título PT (tem inglês?) | Título EN | Platform PT == EN? |');
    console.log('|-----|----|------------------------|-----------|-------------------|');

    for (let i = 0; i < Math.max(pt.length, en.length); i++) {
        const ptCourse = pt[i];
        const enCourse = en[i];

        if (ptCourse && enCourse) {
            const ptTitle = ptCourse.title;
            const enTitle = enCourse.title;
            const ptIsEnglish = isEnglishText(ptTitle);
            const platformsMatch = ptCourse.platform === enCourse.platform;

            const ptLangIndicator = ptIsEnglish ? '❌INGLÊS' : '✅PT';
            const platformStatus = platformsMatch ? '✅' : '❌';

            console.log(`| ${i.toString().padStart(3)} | ${ptCourse.id.padStart(2)} | ${ptLangIndicator.padEnd(22)} | ${enTitle.substring(0, 20).padEnd(9)} | ${platformStatus.padEnd(17)} |`);

            if (ptIsEnglish) {
                console.log(`      ⚠️  PT ID ${ptCourse.id} está em inglês! Deveria ser traduzido.`);
            }
            if (!platformsMatch) {
                console.log(`      ⚠️  Plataformas diferentes: PT="${ptCourse.platform}" vs EN="${enCourse.platform}"`);
            }
        }
    }

    console.log('\n\n🔎 Cursos PT que provavelmente estão em inglês (precisam de tradução):');
    const ptEnglishTitles = pt.filter(c => isEnglishText(c.title));
    ptEnglishTitles.forEach(c => {
        console.log(`  ID ${c.id}: "${c.title}"`);
    });

    console.log('\n📊 Estatísticas:');
    console.log(`  Total de cursos PT: ${pt.length}`);
    console.log(`  Cursos PT em inglês: ${ptEnglishTitles.length}`);
    console.log(`  Percentual: ${(ptEnglishTitles.length / pt.length * 100).toFixed(1)}%`);

    // Verificar se há títulos duplicados DENTRO de cada idioma
    console.log('\n🔍 Verificação de duplicatas DENTRO de cada idioma:');

    function checkDuplicatesInLang(arr, lang) {
        const seen = new Map();
        const duplicates = [];

        arr.forEach((curso, idx) => {
            const key = normalizeString(curso.title);
            if (seen.has(key)) {
                const firstIdx = seen.get(key);
                if (!duplicates.find(d => d.positions.includes(firstIdx))) {
                    duplicates.push({
                        type: 'Título duplicado',
                        lang,
                        positions: [firstIdx, idx],
                        titles: [arr[firstIdx].title, curso.title]
                    });
                }
            } else {
                seen.set(key, idx);
            }
        });

        return duplicates;
    }

    const ptDups = checkDuplicatesInLang(pt, 'PT');
    const enDups = checkDuplicatesInLang(en, 'EN');

    if (ptDups.length === 0 && enDups.length === 0) {
        console.log('  ✅ Nenhuma duplicata dentro dos idiomas');
    } else {
        if (ptDups.length > 0) {
            console.log(`  ⚠️  PT: ${ptDups.length} duplicata(s)`);
            ptDups.forEach(d => {
                console.log(`    - Posições ${d.positions.join(', ')}: "${d.titles[0]}" == "${d.titles[1]}"`);
            });
        }
        if (enDups.length > 0) {
            console.log(`  ⚠️  EN: ${enDups.length} duplicata(s)`);
            enDups.forEach(d => {
                console.log(`    - Posições ${d.positions.join(', ')}: "${d.titles[0]}" == "${d.titles[1]}"`);
            });
        }
    }

    console.log('\n✅ Análise concluída!');
}

main();
