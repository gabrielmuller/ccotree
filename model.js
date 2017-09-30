"use strict";
class Disciplina {
	constructor (info, nome, id) {
		this.info = info;
        this._nome = nome;
		this._id = id;
        this.posX = this.info.fase;
        this.posY = -1;
		this.cor = "padrao";
	}

	get nome() {
		return this._nome;
	}
	get id() {
		return this._id;
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
		let requ = [];
		this.info.requisitos.forEach(function (nomeDisciplina) {
			requ.push(APP.disciplinas[nomeDisciplina]);
		});
		return requ;
    }
    get posteriores() {
        let post = [];
        let discOriginal = this;
        Object.keys(APP.disciplinas).forEach(function(nomeDisciplina) {
            let discComparada = APP.disciplinas[nomeDisciplina];
            discComparada.requisitos.forEach(function(requisito) {
                if (discOriginal === requisito) {
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

	selecionar() {
		APP.deselecionar();
		let requ = this.requisitos;
		let post = this.posteriores;
		requ.forEach(function(disciplina) {
			disciplina.cor = "requisito";
		});
		post.forEach(function(disciplina) {
			disciplina.cor = "posterior";
		});
		this.cor = "selecionado";
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

    adicionarDisciplina(disciplina, fase, posY) {
        let semestre = this.matriz[fase];

        if (typeof semestre === 'undefined') {
            semestre = [];
        }
		if (typeof posY === 'undefined') {
			posY = semestre.length;
		}
		for (let i = semestre.length; i > posY; i--) {
			semestre[i] = semestre[i-1];
			semestre[i].moverPara(fase, i);
		}
		disciplina.moverPara(fase, posY);
		semestre[posY] = disciplina;
        this.matriz[fase] = semestre;
    }

    removerDisciplina(posX, posY) {
        let semestre = this.matriz[posX];
		let disciplina = semestre[posY];
		for (let i = posY; i < semestre.length-1; i++) {
			semestre[i] = semestre[i+1];
			semestre[i].moverPara(posX, i);
		}
		semestre.pop();
		this.matriz[posX] = semestre;
		return disciplina;
    }

    horasAula(fase) {
        let soma = 0;
        this.matriz[fase].forEach(function(disciplina) {
            soma += disciplina.horas;
        });
        return soma;
    }

	checarRequisitos(disciplina) {
		let requ = disciplina.requisitos;
		let fase = disciplina.posX;
		requ.forEach(function(disciplinaComparada) {
			if (disciplinaComparada.posX >= fase) {
				disciplina.errada = true;
				disciplinaComparada.errada = true;
			}
		});
	}
			

    get horasTotal() {
        let soma = 0;
        this.matriz.forEach(function(semestre, fase) {
            soma += this.horasAula(fase);
        }, this);
        return soma;
    }

}

APP.deselecionar = function () {
	Object.keys(APP.disciplinas).forEach(function (nomeDisciplina) {
		APP.disciplinas[nomeDisciplina].cor = "padrao";
	});
}



