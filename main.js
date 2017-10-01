window.onload = function () {
//conterá todos objetos disciplina instanciadas
APP.disciplinas = {};

//instancia todas disciplinas a partir do JSON
//e adiciona em APP.disciplinas
APP.tree.criarDisciplinas = function () {
    let that = this;
    Object.keys(that.nodes).forEach(function (node, id) {
        let novaDisciplina = new Disciplina(that.nodes[node], node, id);
        APP.disciplinas[node] = novaDisciplina;
    });
};

APP.tree.criarDisciplinas();

//cria grade e view
APP.grade = new Grade();
APP.view = new View(APP.largura + APP.margem, APP.altura + APP.margem);
APP.view.criarTodas();
APP.view.updateTodas();
APP.control = new Control();
APP.control.criarTodas();
};
