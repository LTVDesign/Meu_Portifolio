const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'cursos.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Mapear ID antigo -> novo ID (baseado na ordem atual)
function buildIdMapping(oldArray, newArray) {
    // oldArray e newArray devem estar na mesma ordem (já ordenados)
    const mapping = {};
    for (let i = 0; i < newArray.length; i++) {
        const oldId = oldArray[i].id;
        const newId = newArray[i].id;
        mapping[oldId] = newId;
    }
    return mapping;
}

// Recuperar os arrays atuais (já com IDs novos)
const newPt = data.pt;
const newEn = data.en;

// Para reconstruir o mapeamento, precisamos dos arrays antigos antes da renumeração
// Como não temos mais os antigos, vamos inferir pela ordem e pelos links
// Vamos extrair o número do PDF do campo link, e mapear para o novo ID pela posição

function updateLinks(arr) {
    arr.forEach(course => {
        if (course.link && course.link.includes('ID_')) {
            // Extrair o número do ID do PDF: /certificados/ID_X_...
            const match = course.link.match(/ID_(\d+)_/);
            if (match) {
                const oldPdfId = match[1];
                // O novo ID deve ser o mesmo que já está no campo course.id?
                // Na verdade, o campo course.id já foi atualizado. O link deve refletir esse novo ID.
                // Então substituímos o número antigo pelo novo ID
                const newLink = course.link.replace(/ID_\d+_/, `ID_${course.id}_`);
                course.link = newLink;
            }
        }
    });
}

updateLinks(newPt);
updateLinks(newEn);

// Escrever de volta
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('Links dos PDFs atualizados para nova numeração de IDs.');
console.log(`Total de cursos PT: ${newPt.length}, EN: ${newEn.length}`);
