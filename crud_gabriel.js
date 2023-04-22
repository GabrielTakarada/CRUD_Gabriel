const express = require("express");

const app = express();

app.use(express.json());

app.listen(8080, () => {
    console.log("O servidor está ativo na porta 8080");
});

let Tarefa = [];

//CREATE 
app.post('/includeTarefa', (req, res) => { 
    const { nome, descricao, status } = req.body;
    const id = Tarefa.length;
    const novaTarefa = { id, nome, descricao, status };
    Tarefa.push(novaTarefa);
    res.send(`A tarefa ${nome} foi adicionada com sucesso!`);
});

//READ
app.get('/getTarefa/:id', (req, res) => {
    const id = req.params.id;
    const task = Tarefa.find(tarefa => tarefa.id == id);
    if (task) {
        res.send(task);
    } else {
        res.status(404).send(`<h1> A tarefa com ID ${id} não existe </h1>`);
    }
});

app.get('/getAllTarefas', (req, res) => {
    res.send(Tarefa);
});

//UPDATE
app.put('/updateTarefa/:id', (req, res) => {
    const id = req.params.id;
    const { nome, descricao, status } = req.body;
    const index = Tarefa.findIndex(tarefa => tarefa.id == id);
    if (index >= 0) {
        Tarefa[index] = { id, nome, descricao, status };
        res.send(`A tarefa ${nome} foi atualizada com sucesso!`);
    } else {
        res.status(404).send(`<h1> A tarefa com ID ${id} não existe </h1>`);
    }
});

//DELETE
app.delete('/deleteTarefa/:id', (req, res) => {
    const id = req.params.id;
    const index = Tarefa.findIndex(tarefa => tarefa.id == id);
    if (index >= 0) {
        Tarefa.splice(index, 1);
        res.send(`A tarefa com ID ${id} foi excluída com sucesso!`);
    } else {
        res.status(404).send(`<h1> A tarefa com ID ${id} não existe </h1>`);
    }
});