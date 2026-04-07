const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function getFieldCount(obj) {
    return Object.keys(obj).length;
}

// Agrupar cursos em PT por título normalizado + plataforma normalizada
const groups = {};
data.pt.forEach(course => {
    const key = normalize(course.title) + '|' + normalize(course.platform);
    if (!groups[key]) groups[key] = [];
    groups[key].push(course);
});

// Determinar IDs a remover
const idsToRemove = new Set();
Object.values(groups).forEach(group => {
    if (group.length > 1) {
        // Ordenar por número de campos (decrescente) e depois por ID (crescente)
        group.sort((a, b) => {
            const countA = getFieldCount(a);
            const countB = getFieldCount(b);
            if (countB !== countA) return countB - countA;
            return parseInt(a.id) - parseInt(b.id);
        });
        // Manter o primeiro, remover os demais
        for (let i = 1; i < group.length; i++) {
            idsToRemove.add(group[i].id);
        }
    }
});

// Coletar informações sobre cursos removidos
const removedInfo = [];
data.pt.forEach(ptCourse => {
    if (idsToRemove.has(ptCourse.id)) {
        const enCourse = data.en.find(e => e.id === ptCourse.id);
        removedInfo.push({
            id: ptCourse.id,
            ptTitle: ptCourse.title,
            enTitle: enCourse ? enCourse.title : null,
            platform: ptCourse.platform
        });
    }
});

// Filtrar, ordenar e renumerar PT e EN
function processLang(arr) {
    const filtered = arr.filter(course => !idsToRemove.has(course.id));
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
    console.log(`  Plataforma: ${r.platform}`);
    console.log('');
});
console.log(`Nova contagem de cursos por idioma: ${newPt.length}`);
console.log(`IDs após reorganização: 1 a ${newPt.length}\n`);
console.log('Lista de cursos após reorganização (PT):');
newPt.forEach((c, idx) => {
    console.log(`  ${c.id}. ${c.title} (${c.platform})`);
});
