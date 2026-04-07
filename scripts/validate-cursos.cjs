const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function validate(arr, lang) {
    const ids = arr.map(c => c.id);
    const uniqueIds = new Set(ids);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    // Verificar títulos duplicados (normalizados)
    const titleMap = new Map();
    arr.forEach(course => {
        const key = course.title.toLowerCase().trim() + '|' + course.platform.toLowerCase().trim();
        if (titleMap.has(key)) {
            titleMap.get(key).push(course.id);
        } else {
            titleMap.set(key, [course.id]);
        }
    });
    const duplicateTitles = Array.from(titleMap.values()).filter(ids => ids.length > 1);

    // Verificar verificationLink duplicados
    const verificationMap = new Map();
    arr.forEach(course => {
        if (course.verificationLink) {
            if (verificationMap.has(course.verificationLink)) {
                verificationMap.get(course.verificationLink).push(course.id);
            } else {
                verificationMap.set(course.verificationLink, [course.id]);
            }
        }
    });
    const duplicateVerifications = Array.from(verificationMap.values()).filter(ids => ids.length > 1);

    // Verificar PDF duplicados
    const pdfMap = new Map();
    arr.forEach(course => {
        if (course.link) {
            if (pdfMap.has(course.link)) {
                pdfMap.get(course.link).push(course.id);
            } else {
                pdfMap.set(course.link, [course.id]);
            }
        }
    });
    const duplicatePdfs = Array.from(pdfMap.values()).filter(ids => ids.length > 1);

    console.log(`\n=== VALIDAÇÃO [${lang}] ===`);
    console.log(`Total de cursos: ${arr.length}`);
    console.log(`IDs únicos: ${uniqueIds.size}`);
    console.log(`IDs duplicados: ${duplicateIds.length > 0 ? duplicateIds.join(', ') : 'Nenhum'}`);
    console.log(`Títulos duplicados (mesmo título + plataforma): ${duplicateTitles.length}`);
    if (duplicateTitles.length > 0) {
        duplicateTitles.forEach(ids => console.log(`  - IDs: ${ids.join(', ')}`));
    }
    console.log(`VerificationLinks duplicados: ${duplicateVerifications.length}`);
    if (duplicateVerifications.length > 0) {
        duplicateVerifications.forEach(ids => console.log(`  - IDs: ${ids.join(', ')}`));
    }
    console.log(`PDF links duplicados: ${duplicatePdfs.length}`);
    if (duplicatePdfs.length > 0) {
        duplicatePdfs.forEach(ids => console.log(`  - IDs: ${ids.join(', ')}`));
    }

    // Verificar sequencialidade dos IDs
    const sortedIds = ids.map(Number).sort((a, b) => a - b);
    const expectedIds = Array.from({ length: arr.length }, (_, i) => i + 1);
    const isSequential = JSON.stringify(sortedIds) === JSON.stringify(expectedIds);
    console.log(`IDs sequenciais: ${isSequential ? 'Sim' : 'Não'}`);
    if (!isSequential) {
        console.log(`  Esperado: ${expectedIds.join(', ')}`);
        console.log(`  Encontrado: ${sortedIds.join(', ')}`);
    }

    return {
        total: arr.length,
        duplicateIds: duplicateIds.length,
        duplicateTitles: duplicateTitles.length,
        duplicateVerifications: duplicateVerifications.length,
        duplicatePdfs: duplicatePdfs.length,
        isSequential
    };
}

const valPt = validate(data.pt, 'PT');
const valEn = validate(data.en, 'EN');

// Verificar correspondência de IDs entre PT e EN
const ptIds = data.pt.map(c => c.id).sort();
const enIds = data.en.map(c => c.id).sort();
const idsMatch = JSON.stringify(ptIds) === JSON.stringify(enIds);

// Identificar IDs exclusivos
const ptOnly = ptIds.filter(id => !enIds.includes(id));
const enOnly = enIds.filter(id => !ptIds.includes(id));

// Criar mapas por ID para validação
const ptById = new Map(data.pt.map(c => [c.id, c]));
const enById = new Map(data.en.map(c => [c.id, c]));

console.log('\n=== CORRESPONDÊNCIA ENTRE IDIOMAS ===');
console.log(`PT IDs: ${ptIds.length} (${ptIds.join(', ')})`);
console.log(`EN IDs: ${enIds.length} (${enIds.join(', ')})`);
console.log(`IDs correspondentes: ${idsMatch ? 'Sim' : 'Não'}`);

// Verificar se os títulos correspondentes são equivalentes (por ID, não por posição)
const ptTitleById = new Map(data.pt.map(c => [c.id, c.title]));
const enTitleById = new Map(data.en.map(c => [c.id, c.title]));
let titlesMismatch = 0;
const commonIds = [...ptTitleById.keys()].filter(id => enTitleById.has(id));

commonIds.forEach(id => {
    if (ptTitleById.get(id) !== enTitleById.get(id)) {
        titlesMismatch++;
    }
});

console.log(`Títulos correspondentes (mesmo ID): ${titlesMismatch === 0 ? 'Sim' : 'Não'}`);
if (titlesMismatch > 0) {
    console.log(`  Mismatches (esperado para traduções): ${titlesMismatch}`);
}

// Verificar correspondência de plataformas por ID
const platformMismatches = [];
commonIds.forEach(id => {
    const ptCourse = ptById.get(id);
    const enCourse = enById.get(id);
    if (ptCourse.platform !== enCourse.platform) {
        platformMismatches.push(id);
    }
});

console.log('\n=== RESUMO FINAL ===');
console.log(`Cursos por idioma: ${valPt.total}`);
console.log(`Duplicatas removidas: ${26 - valPt.total} (IDs removidos: ${[...ptOnly, ...enOnly].join(', ')})`);
const allValid =
    valPt.duplicateIds === 0 &&
    valEn.duplicateIds === 0 &&
    valPt.duplicateTitles === 0 &&
    valEn.duplicateTitles === 0 &&
    valPt.duplicateVerifications === 0 &&
    valEn.duplicateVerifications === 0 &&
    valPt.duplicatePdfs === 0 &&
    valEn.duplicatePdfs === 0 &&
    valPt.isSequential &&
    valEn.isSequential &&
    idsMatch &&
    platformMismatches.length === 0;

console.log(`Estado: ${allValid ? '✅ VALIDADO COM SUCESSO' : '⚠️  PROBLEMAS ENCONTRADOS'}`);

if (platformMismatches.length > 0) {
    console.log(`  - Plataformas divergentes nos IDs: ${platformMismatches.join(', ')}`);
}
