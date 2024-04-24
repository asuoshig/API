const express = require('express');
const fs = require('fs');

const app = express();
const PORT =  3000; 

app.use(express.json());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-orign', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-Type, Authorization');
    next();
});

app.get('/alunos', (req, res)=> {
    fs.readFile('alunos.json', 'utf8' , (err, data) => {
        if (err){
            console.error('Erro ao  ler o arquivo JSON: ', err);
            res.status(500).send('erro interno do servidor');
            return;
        }

        const alunos = JSON.parse(data);

        res.json(alunos);
    });
});

app.post('/alunos', (req, res) => {
    const novoAluno = req.body;

    fs.readFile('alunos.json', 'utf8', (err, data) =>{
        if (err){
            console.error('erro ao  ler arquivo JSON: ', err);
            res.status(500).send('erro interno ao servidor');
            return;
        }

        const alunos = JSON.parse(data);

        alunos.push(novoAluno);

        fs.writeFile('alunos.json', JSON.stringify(alunos), (err) => {
            if (err){
                console.error('erro ao escrever no arquivo JSON: ', err);
                res.status(500).send('erro interno do servidor');
                return;
            }
            res.status(201).send('aluno adicionado com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log('servidor rodando na porta ${PORT}');
});