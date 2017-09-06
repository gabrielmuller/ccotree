"use strict";
class Disciplina {
	constructor (info) {
		this.info = info;
	}

	get codigo() {
		return this.info.codigo;
	}
	get fase() {
		return this.info.fase;
	}
	get linha() {
		return this.info.linha;
	}
	get ementa() {
		return this.info.ementa;
	}
	get horas() {
		return this.info.horas;
	}

	get string() {
		let output = "";
		output += "Código: " + this.info.codigo + "\n";
		output += "Fase: " + this.info.fase + "\n";
		output += "Linha: " + this.info.linha + "\n";
		output += "Ementa: " + this.info.ementa + "\n";
		output += "Horas-aula: " + this.info.horas + "\n";
		return output;
	}
}

//conterá todos objetos disciplina instanciadas
APP.disciplinas = {};

//instancia todas disciplinas a partir do JSON
//e adiciona em APP.disciplinas
APP.tree.criarDisciplinas = function () {
    let that = this;
    Object.keys(that.nodes).forEach(function (node) {
        let novaDisciplina = new Disciplina(that.nodes[node]);
        APP.disciplinas[node] = novaDisciplina;
    });
};

APP.tree.criarDisciplinas();

//exemplo de teste
console.log(APP.disciplinas["Sistemas Digitais"].string);
