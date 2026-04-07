const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function getFieldCount(obj) {
    return Object.keys(obj).length;
}

// Função para obter o conjunto de IDs a manter para um array, baseado em duplicatas de verificationLink
function getKeepIds(arr) {
    const groups = {};
    const noVerificationIds = [];
    arr.forEach(course => {
        if (course.verificationLink) {
            const key = course.verificationLink;
            if (!groups[key]) groups[key] = [];
            groups[key].push(course);
        } else {
            noVerificationIds.push(course.id);
        }
    });
    const keepIds = new Set(noVerificationIds);
    Object.values(groups).forEach(group => {
        if (group.length > 1) {
            // Ordenar por número de campos (decrescente) e depois por ID (crescente)
            group.sort((a, b) => {
                const countA = getFieldCount(a);
                const countB = getFieldCount(b);
                if (countB !== countA) return countB - countA;
                return parseInt(a.id) - parseInt(b.id);
            });
            keepIds.add(group[0].id);
        } else {
            keepIds.add(group[0].id);
        }
    });
    return keepIds;
}

// Obter IDs a manter para PT e EN
const keepIdsPt = getKeepIds(data.pt);
const keepIdsEn = getKeepIds(data.en);

// Interseção: manter apenas IDs que são mantidos em ambos os idiomas
const finalKeepIds = new Set([...keepIdsPt].filter(id => keepIdsEn.has(id)));

// Coletar informações sobre cursos removidos
const removedInfo = [];
data.pt.forEach(ptCourse => {
    if (!finalKeepIds.has(ptCourse.id)) {
        const enCourse = data.en.find(e => e.id === ptCourse.id);
        removedInfo.push({
            id: ptCourse.id,
            ptTitle: ptCourse.title,
            enTitle: enCourse ? enCourse.title : null,
            verificationLinkPt: ptCourse.verificationLink,
            verificationLinkEn: enCourse ? enCourse.verificationLink : null
        });
    }
});

// Filtrar, ordenar e renumerar PT e EN
function processLang(arr) {
    const filtered = arr.filter(course => finalKeepIds.has(course.id));
    // Ordenar por ID antigo (numérico)
    filtered.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    // Renumerar
    let newId = 1;
    filtered.forEach(course => {
        course.id = newId.toString();
        newId++;
    });
    return filtered;
}

const newPt = processLang(data.pt);
const newEn = processLang(data.en);

// Construir novo objeto
const newData = { pt: newPt, en: newEn };

// Escrever de volta no arquivo
fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf8');

// Gerar relatório
console.log('=== RELATÓRIO DE DEDUPLICAÇÃO DE CURSOS ===\n');
console.log(`Cursos removidos (IDs): ${removedInfo.length}`);
console.log(`Total de entradas removidas (considerando ambos idiomas): ${removedInfo.length * 2}\n`);
removedInfo.forEach(r => {
    console.log(`ID ${r.id}:`);
    console.log(`  PT: ${r.ptTitle}`);
    console.log(`  EN: ${r.enTitle}`);
    console.log(`  VerificationLink PT: ${r.verificationLinkPt || 'N/A'}`);
    console.log(`  VerificationLink EN: ${r.verificationLinkEn || 'N/A'}`);
    console.log('');
});
console.log(`Nova contagem de cursos por idioma: ${newPt.length}`);
console.log(`IDs após reorganização: 1 a ${newPt.length}\n`);
console.log('Lista de cursos após reorganização (PT):');
newPt.forEach((c, idx) => {
    console.log(`  ${c.id}. ${c.title}`);
});
