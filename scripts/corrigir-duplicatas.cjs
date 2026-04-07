/**
 * Correção de Duplicatas em cursos.json
 * Remove cursos com verificationLink duplicado e renomeia IDs
 */

const fs = require('fs');
const path = require('path');

const CURSOS_PATH = path.join(__dirname, '..', 'src', 'data', 'cursos.json');

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

/**
 * Encontra cursos com verificationLink duplicado
 * Retorna um Map onde a chave é o verificationLink e o valor é o índice do primeiro curso com aquele link
 */
function findDuplicateVerificationLinks(cursos) {
    const linkMap = new Map();
    const duplicatesToRemove = new Set();

    cursos.forEach((curso, index) => {
        const link = curso.verificationLink;
        if (link) {
            if (linkMap.has(link)) {
                // Marcar este índice para remoção (é um duplicado)
                duplicatesToRemove.add(index);
            } else {
                linkMap.set(link, index);
            }
        }
    });

    return duplicatesToRemove;
}

/**
 * Remove cursos marcados e renumeria IDs sequencialmente
 */
function removeAndRenumber(data) {
    const { pt, en } = data;

    // Encontrar índices a remover em PT
    const removePt = findDuplicateVerificationLinks(pt);
    console.log(`\n🔍 Cursos PT a remover (verificationLink duplicado):`);
    removePt.forEach(idx => {
        console.log(`  - Índice ${idx}: ID ${pt[idx].id} - ${pt[idx].title}`);
    });

    // Encontrar índices a remover em EN
    const removeEn = findDuplicateVerificationLinks(en);
    console.log(`\n🔍 Cursos EN a remover (verificationLink duplicado):`);
    removeEn.forEach(idx => {
        console.log(`  - Índice ${idx}: ID ${en[idx].id} - ${en[idx].title}`);
    });

    // Criar novos arrays sem os duplicados
    const newPt = [];
    const newEn = [];

    // Processar PT
    pt.forEach((curso, index) => {
        if (!removePt.has(index)) {
            newPt.push(curso);
        }
    });

    // Processar EN
    en.forEach((curso, index) => {
        if (!removeEn.has(index)) {
            newEn.push(curso);
        }
    });

    // Renumerar IDs sequencialmente
    console.log(`\n🔢 Renumerando IDs sequencialmente...`);
    const idMappingPt = new Map(); // Map<oldId, newId>
    const idMappingEn = new Map();

    newPt.forEach((curso, index) => {
        const oldId = curso.id;
        const newId = (index + 1).toString();
        idMappingPt.set(oldId, newId);
        curso.id = newId;

        // Atualizar link do PDF se contiver o ID antigo
        if (curso.link) {
            const oldPdfPattern = new RegExp(`ID_${oldId}_`, 'g');
            const newPdfName = `ID_${newId}_${curso.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            curso.link = curso.link.replace(oldPdfPattern, `ID_${newId}_`);
        }
    });

    newEn.forEach((curso, index) => {
        const oldId = curso.id;
        const newId = (index + 1).toString();
        idMappingEn.set(oldId, newId);
        curso.id = newId;

        // Atualizar link do PDF se contiver o ID antigo
        if (curso.link) {
            const oldPdfPattern = new RegExp(`ID_${oldId}_`, 'g');
            const newPdfName = `ID_${newId}_${curso.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            curso.link = curso.link.replace(oldPdfPattern, `ID_${newId}_`);
        }
    });

    console.log(`\n📊 Mapeamento de IDs PT:`);
    idMappingPt.forEach((newId, oldId) => {
        console.log(`  ${oldId} -> ${newId}`);
    });

    console.log(`\n📊 Mapeamento de IDs EN:`);
    idMappingEn.forEach((newId, oldId) => {
        console.log(`  ${oldId} -> ${newId}`);
    });

    return { pt: newPt, en: newEn };
}

function main() {
    console.log('🔧 Iniciando correção de duplicatas...\n');

    const data = loadCursos();
    const originalPtCount = data.pt.length;
    const originalEnCount = data.en.length;

    console.log(`📊 Estado original: ${originalPtCount} cursos PT, ${originalEnCount} cursos EN`);

    // Remover duplicatas e renumerar
    const newData = removeAndRenumber(data);

    const removedPt = originalPtCount - newData.pt.length;
    const removedEn = originalEnCount - newData.en.length;

    console.log(`\n✅ Correção concluída:`);
    console.log(`   - Removidos: ${removedPt} cursos PT, ${removedEn} cursos EN`);
    console.log(`   - Novos totais: ${newData.pt.length} cursos PT, ${newData.en.length} cursos EN`);

    // Salvar
    const result = { pt: newData.pt, en: newData.en };
    saveCursos(result);

    console.log(`\n💾 Arquivo atualizado: ${CURSOS_PATH}`);

    // Verificar se ainda há duplicatas
    console.log(`\n🔎 Verificando se ainda há duplicatas...`);
    const remainingPt = findDuplicateVerificationLinks(newData.pt);
    const remainingEn = findDuplicateVerificationLinks(newData.en);

    if (remainingPt.size === 0 && remainingEn.size === 0) {
        console.log(`✅ Nenhuma duplicata de verificationLink restante!`);
    } else {
        console.log(`⚠️  Ainda há duplicatas:`);
        console.log(`   PT: ${remainingPt.size}, EN: ${remainingEn.size}`);
    }

    console.log(`\n🎉 Correção finalizada!`);
    console.log(`   Execute 'npm run validate-cursos' para validar o resultado.`);
}

main();
