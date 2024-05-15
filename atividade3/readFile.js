const fs = require('fs');

// Nome do arquivo que queremos ler
const fileName = 'texto.txt';

// Leitura do arquivo
fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
    }
    console.log('Conteúdo do arquivo:');
    console.log(data);
});
