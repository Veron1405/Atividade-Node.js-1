const readline = require('readline');

// Interface para leitura de linha
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função principal
function main() {
    rl.question('Digite seu nome: ', (name) => {
        console.log(`Olá, ${name}! Bem-vindo ao programa em Node.js.`);
        rl.close(); // Fecha a interface de leitura de linha após a interação com o usuário
    });
}

// Inicia o programa
main();
