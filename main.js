window.onload = function () {

// Cria um objeto que mapeia os nomes das disciplinas aos objetos Disciplina.
//Isso carrega as disciplinas a partir de user.js como era antes.
/*let disciplinas = {};
Object.keys(APP.grafo.nodes).forEach(function (node, id) {
    let novaDisciplina = new Disciplina(APP.grafo.nodes[node], node, id, disciplinas);
    disciplinas[node] = novaDisciplina;
});*/

// Carrega as disciplinas da base de dados.
let mapeador = new Mapeador();
let disciplinas = {};
mapeador.getTodas(function(d) {
    disciplinas = d;
    // Cria grade, view, control e inicializa
    let grade = new Grade(disciplinas);
    let view = new View(grade, disciplinas);

    view.criarTodas();
    view.updateTodas();

    let control = new Control(grade, view);

    // Cria todos botões
    view.processarTodas(control.criar, control);
});


//Isso adiciona as disciplinas do user.js na base de dados.
/*Object.keys(disciplinas).forEach(function(disciplina) {
    mapeador.inserirDisciplina(disciplinas[disciplina], function() {});
});*/
};

var teste = function() {
    let disciplina = {
        "codigo": "MTM0420",
        "nome": "Trigonometria Estatística",
        "fase": 4,
        "linha": 2,
        "ementa": "xuxa.com.br",
        "horas": 6,
        "requisitos": [{"codigo": "INE5405"}]
    };
    let m = new Mapeador();
    m.inserirDisciplina(disciplina, function() {});
};
    

