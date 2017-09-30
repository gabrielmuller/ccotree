"use strict";
class Disciplina {
	constructor (info, nome) {
		this.info = info;
        this.nomeInterno = nome;
        this.posX = this.info.fase;
        this.posY = -1;
	}

    get nome() {
        return this.nomeInterno;
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
    get requisitos() {
        return this.info.requisitos;
    }
    get posteriores() {
        let post = [];
        let discOriginal = this;
        Object.keys(APP.disciplinas).forEach(function(nomeDisciplina) {
            let discComparada = APP.disciplinas[nomeDisciplina];
            discComparada.requisitos.forEach(function(requisito) {
                if (discOriginal.nome === requisito) {
                    post.push(discComparada);
                }
            });
        });
        return post;
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

    moverPara(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
}

class Grade {
    constructor () {
        this.matriz = [];
        Object.keys(APP.disciplinas).forEach(function(nomeDisciplina) {
            let disciplina = APP.disciplinas[nomeDisciplina];
            this.adicionarDisciplina(disciplina, disciplina.fase);
        }, this);
    }

    adicionarDisciplina(disciplina, fase) {
        let semestre = this.matriz[fase];
        if (typeof semestre === 'undefined') {
            semestre = [];
        }
        disciplina.moverPara(fase, semestre.length);
        semestre[semestre.length] = disciplina;
        this.matriz[fase] = semestre;
    }

    removerDisciplina(posX, posY) {
        let semestre = this.matriz[posX];
        semestre.splice(posY, 1);
    }

    horasAula(fase) {
        let soma = 0;
        this.matriz[fase].forEach(function(disciplina) {
            soma += disciplina.horas;
        });
        return soma;
    }
    
    get horasTotal() {
        let soma = 0;
        this.matriz.forEach(function(semestre, fase) {
            soma += this.horasAula(fase);
        }, this);
        return soma;
    }
}



//conterá todos objetos disciplina instanciadas
APP.disciplinas = {};

//instancia todas disciplinas a partir do JSON
//e adiciona em APP.disciplinas
APP.tree.criarDisciplinas = function () {
    let that = this;
    Object.keys(that.nodes).forEach(function (node) {
        let novaDisciplina = new Disciplina(that.nodes[node], node);
        APP.disciplinas[node] = novaDisciplina;
    });
};

APP.tree.criarDisciplinas();

//exemplo de teste
console.log(APP.disciplinas["Sistemas Digitais"].string);

let grade = new Grade();
console.log(grade.horasTotal);

