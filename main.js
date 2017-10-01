window.onload = function () {

/** Um map do nome da disciplina a objetos disciplina. */
APP.disciplinas = {};

//instancia todas disciplinas a partir do JSON
//e adiciona em APP.disciplinas
APP.grafo.criarDisciplinas = function () {
    let that = this;
    Object.keys(that.nodes).forEach(function (node, id) {
        let novaDisciplina = new Disciplina(that.nodes[node], node, id);
        APP.disciplinas[node] = novaDisciplina;
    });
};

APP.grafo.criarDisciplinas();

//cria grade e view
APP.view = new View(APP.largura + APP.margem, APP.altura + APP.margem);
APP.grade = new Grade();
APP.view.criarTodas();
APP.view.updateTodas();
APP.control = new Control();
APP.control.criarTodas();
};
