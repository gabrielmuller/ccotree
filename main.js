window.onload = function () {

// Cria um objeto que mapeia os nomes das disciplinas aos objetos Disciplina.
let disciplinas = {};
Object.keys(APP.grafo.nodes).forEach(function (node, id) {
    let novaDisciplina = new Disciplina(APP.grafo.nodes[node], node, id, disciplinas);
    disciplinas[node] = novaDisciplina;
});


// Cria grade, view, control e inicializa
let grade = new Grade(disciplinas);
let view = new View(grade, disciplinas);

view.criarTodas();
view.updateTodas();

let control = new Control(grade, view);

// Cria todos botões
view.processarTodas(control.criar, control);

};
