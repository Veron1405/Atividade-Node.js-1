const readline = require('readline');
const fs = require('fs');

// Interface para leitura de linha
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Nome do arquivo de estoque
const estoqueFile = 'estoque.json';

// Função para carregar o estoque do arquivo JSON
function carregarEstoque() {
    try {
        const data = fs.readFileSync(estoqueFile);
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao carregar o estoque:', err);
        return [];
    }
}

// Função para salvar o estoque no arquivo JSON
function salvarEstoque(estoque) {
    try {
        const data = JSON.stringify(estoque, null, 2);
        fs.writeFileSync(estoqueFile, data);
    } catch (err) {
        console.error('Erro ao salvar o estoque:', err);
    }
}

// Função para adicionar um novo produto ao estoque
function adicionarProduto() {
    rl.question('Digite o nome do produto: ', (nome) => {
        rl.question('Digite a quantidade do produto: ', (quantidade) => {
            const estoque = carregarEstoque();
            estoque.push({ nome, quantidade: parseInt(quantidade) });
            salvarEstoque(estoque);
            console.log('Produto adicionado com sucesso!');
            menuPrincipal();
        });
    });
}

// Função para listar todos os produtos no estoque
function listarProdutos() {
    const estoque = carregarEstoque();
    console.log('=== Produtos em Estoque ===');
    estoque.forEach((produto) => {
        console.log(`${produto.nome}: ${produto.quantidade}`);
    });
    menuPrincipal();
}

// Função para atualizar a quantidade de um produto no estoque
function atualizarQuantidade() {
    rl.question('Digite o nome do produto para atualizar a quantidade: ', (nome) => {
        rl.question('Digite a nova quantidade: ', (quantidade) => {
            const estoque = carregarEstoque();
            const index = estoque.findIndex((produto) => produto.nome === nome);
            if (index !== -1) {
                estoque[index].quantidade = parseInt(quantidade);
                salvarEstoque(estoque);
                console.log('Quantidade do produto atualizada com sucesso!');
            } else {
                console.log('Produto não encontrado no estoque.');
            }
            menuPrincipal();
        });
    });
}

// Função para verificar o estoque de um produto específico
function verificarEstoque() {
    rl.question('Digite o nome do produto para verificar o estoque: ', (nome) => {
        const estoque = carregarEstoque();
        const produto = estoque.find((p) => p.nome === nome);
        if (produto) {
            console.log(`Estoque de ${nome}: ${produto.quantidade}`);
        } else {
            console.log('Produto não encontrado no estoque.');
        }
        menuPrincipal();
    });
}

// Função para exibir o menu principal
function menuPrincipal() {
    console.log('\n=== Menu Principal ===');
    console.log('1. Adicionar Produto');
    console.log('2. Listar Produtos');
    console.log('3. Atualizar Quantidade');
    console.log('4. Verificar Estoque de um Produto');
    console.log('5. Sair');

    rl.question('Selecione uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                adicionarProduto();
                break;
            case '2':
                listarProdutos();
                break;
            case '3':
                atualizarQuantidade();
                break;
            case '4':
                verificarEstoque();
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Opção inválida. Por favor, selecione uma opção válida.');
                menuPrincipal();
        }
    });
}

// Inicia o programa
menuPrincipal();
