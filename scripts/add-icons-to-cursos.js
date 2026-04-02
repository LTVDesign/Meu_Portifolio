import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cursosPath = path.join(__dirname, '..', 'src', 'data', 'cursos.json');

// Ler o arquivo JSON
const rawData = fs.readFileSync(cursosPath, 'utf8');
const data = JSON.parse(rawData);

// Mapeamento de ícones baseado na plataforma
const getIconForCourse = (curso) => {
    const platform = curso.platform.toLowerCase();
    const title = curso.title.toLowerCase();

    if (platform.includes('alberta') || title.includes('alberta')) {
        return 'alberta';
    } else if (platform.includes('ibm')) {
        return 'ibm';
    } else if (platform.includes('johns')) {
        return 'johns';
    } else if (platform.includes('yonsei')) {
        return 'cate';
    } else if (platform.includes('google') || platform.includes('coursera')) {
        return 'google';
    } else if (platform.includes('anhanguera') || title.includes('anhanguera')) {
        return 'anhanguera';
    }

    return 'google'; // padrão
};

// Adicionar ícones a todos os cursos em ambas as línguas
['pt', 'en'].forEach((lang) => {
    if (data[lang]) {
        data[lang] = data[lang].map(curso => ({
            ...curso,
            icon: getIconForCourse(curso)
        }));
    }
});

// Escrever de volta ao arquivo
fs.writeFileSync(cursosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Ícones adicionados com sucesso aos dados de cursos!');
