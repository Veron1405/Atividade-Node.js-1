var http = require("http");

http.createServer(function(requisicao,resposta){
    resposta.end("<h1>Bem vindo ao 3 A!</h1><h4>Turma: Desenvolvimento de Sistemas</h4>");
}).listen(3000);

console.log("Meu servidor está rodando!");