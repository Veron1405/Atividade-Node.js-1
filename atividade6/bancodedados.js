const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();

// Interface para leitura de linha
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Conexão com o banco de dados SQLite (cria o banco se não existir)
const db = new sqlite3.Database('todo_list.db');

// Cria a tabela de tarefas se não existir
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0
    )`);
});

// Função para adicionar uma nova tarefa
function addTask(description) {
    db.run(`INSERT INTO tasks (description) VALUES (?)`, [description], (err) => {
        if (err) {
            console.error('Erro ao adicionar a tarefa:', err);
        } else {
            console.log('Tarefa adicionada com sucesso!');
        }
    });
}

// Função para listar todas as tarefas
function listTasks() {
    db.all(`SELECT * FROM tasks`, (err, rows) => {
        if (err) {
            console.error('Erro ao listar as tarefas:', err);
        } else {
            console.log('=== Lista de Tarefas ===');
            rows.forEach(row => {
                console.log(`${row.id}. [${row.done ? '✔' : ' '}] ${row.description}`);
            });
        }
    });
}

// Função para marcar uma tarefa como concluída
function markTaskAsDone(id) {
    db.run(`UPDATE tasks SET done = 1 WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error('Erro ao marcar a tarefa como concluída:', err);
        } else {
            console.log('Tarefa marcada como concluída!');
        }
    });
}

// Função para remover uma tarefa
function removeTask(id) {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error('Erro ao remover a tarefa:', err);
        } else {
            console.log('Tarefa removida com sucesso!');
        }
    });
}

// Função principal
function main() {
    console.log('Bem-vindo à sua Lista de Tarefas!');

    rl.question('O que você gostaria de fazer? (adicionar/listar/concluir/remover/sair): ', (choice) => {
        switch (choice.toLowerCase()) {
            case 'adicionar':
                rl.question('Digite a descrição da nova tarefa: ', (description) => {
                    addTask(description);
                    main();
                });
                break;
            case 'listar':
                listTasks();
                main();
                break;
            case 'concluir':
                rl.question('Digite o ID da tarefa que você concluiu: ', (id) => {
                    markTaskAsDone(parseInt(id));
                    main();
                });
                break;
            case 'remover':
                rl.question('Digite o ID da tarefa que você deseja remover: ', (id) => {
                    removeTask(parseInt(id));
                    main();
                });
                break;
            case 'sair':
                rl.close();
                db.close(); // Fecha a conexão com o banco de dados
                break;
            default:
                console.log('Opção inválida.');
                main();
        }
    });
}

// Inicia o programa
main();
