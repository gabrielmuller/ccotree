"use strict";

//objeto infoDisciplina padrão
APP.infoDisciplina = {
    "fase": -1,
    "linha": -1,
    "ementa": "",
    "horas": -1
};

//retorna novo objeto disciplina
APP.disciplina = function (info) {
    var that = {};

    //getters garantem privacidade
    that.getFase = function () {
        return info.fase;
    };
    that.getLinha = function () {
        return info.linha;
    };
    that.getEmenta = function () {
        return info.ementa;
    };
    that.getHoras = function () {
        return info.horas;
    };

    //retorna informações resumidas em string
    that.toString = function () {
        var output = "";

        output += "Fase: " + that.getFase() + "\n";
        output += "Linha: " + that.getLinha() + "\n";
        output += "Ementa: " + that.getEmenta() + "\n";
        output += "Horas-aula: " + that.getHoras() + "\n";

        return output;
    };

    return that;
};

//conterá todos objetos disciplina instanciadas
APP.disciplinas = {};

//instancia todas disciplinas a partir do JSON
//e adiciona em APP.disciplinas
APP.tree.criarDisciplinas = function () {
    var that = this;
    Object.keys(that.nodes).forEach(function (node) {
        var novaDisciplina = APP.disciplina(that.nodes[node]);
        APP.disciplinas[node] = novaDisciplina;
    });
};

APP.tree.criarDisciplinas();

//exemplo de teste
console.log(APP.disciplinas["Sistemas Digitais"].toString());
