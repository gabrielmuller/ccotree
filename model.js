/** Modelo de uma disciplina. */
class Disciplina {
    /**
     * Cria uma disciplina.
     * @param {object} info informação do arquivo de usuário
     * @param {string} nome nome da disciplina
     * @param {number} id índice da disciplina
     * @param {object} disciplinas todas as disciplinas.
     */
	constructor (info, nome, id, disciplinas) {
		this.info = info;
        this._nome = nome;
		this._id = id;
        this.disciplinas = disciplinas;
        this.posX = this.info.fase;
        this.posY = -1;
        this.oldX = this.posX;
        this.oldY = this.posY;
		this.cor = "padrao";
        this.arrastando = false;
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

    /**
     * Get requisitos
     * @returns {Array<Disciplina>} requisitos.
     */
    get requisitos() {
		let requ = [];
		this.info.requisitos.forEach(function (nomeDisciplina) {
			requ.push(this.disciplinas[nomeDisciplina]);
		}, this);
		return requ;
    }

    /**
     * Get disciplinas que têm essa como requisito.
     * @returns {Array<Disciplina>} posteriores.
     */
    get posteriores() {
        let post = [];
        let discOriginal = this;
        Object.keys(this.disciplinas).forEach(function(nomeDisciplina) {
            let discComparada = this.disciplinas[nomeDisciplina];
            discComparada.requisitos.forEach(function(requisito) {
                if (discOriginal === requisito) {
                    post.push(discComparada);
                }
            });
        }, this);
        return post;
    }

    /**
     * Set posição na grade.
     * @param {number} posX qual fase está
     * @param {number} posY posição na fase
     */
    moverPara(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * Muda o modelo a fim de representar a seleção.
     */
	selecionar() {
		this.deselecionar();
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

    /**
     * Deseleciona a disciplina.
     */
    deselecionar() {
        Object.keys(this.disciplinas).forEach(function (nomeDisciplina) {
            this.disciplinas[nomeDisciplina].cor = "padrao";
        }, this);
    }
}

/** Grade de disciplinas. */
class Grade {

    /**
     * Cria matriz vazia e adiciona todas disciplinas existentes.
     * @param {object} disciplinas todas disciplinas instanciadas.
     */
    constructor(disciplinas) {
        this.matriz = [];
        Object.keys(disciplinas).forEach(function(nomeDisciplina) {
            let disciplina = disciplinas[nomeDisciplina];
            this.adicionarDisciplina(disciplina, disciplina.fase);
        }, this);
    }

    /**
     * Adiciona disciplina na grade.
     * @param {Disciplina} disciplina disciplina a adicionar.
     * @param {number} fase índice da fase onde adicionar.
     * @param {number} posY posição dentro da fase onde adicionar.
     */
    adicionarDisciplina(disciplina, fase, posY) {
        // Assegura um valor válido de fase.
		fase = (fase < 1) ? 1 : fase;
		fase = (fase > this.matriz.length) ? this.matriz.length : fase;
		fase = (this.matriz.length == 0) ? 1 : fase;

        /** Semestre a adicionar. */
        let semestre = this.matriz[fase];

        // Cria semestre se não existir.
        if (typeof semestre === 'undefined') {
            semestre = [];
        }

        // Se não for passado o parâmetro posY,
        // adicionar no final do semestre.
		if (typeof posY === 'undefined') {
			posY = semestre.length;
		}

        // Assegura um valor válido para posY.
		posY = (posY < 0) ? 0 : posY;
		posY = (posY > semestre.length) ? semestre.length : posY;

        // Desloca disciplinas para abrir espaço.
		for (let i = semestre.length; i > posY; i--) {
			semestre[i] = semestre[i-1];
			semestre[i].moverPara(fase, i);
		}

        // Adiciona disciplina.
		disciplina.moverPara(fase, posY);
		semestre[posY] = disciplina;

        // Atualiza grade.
        this.matriz[fase] = semestre;
		this.limpar();
    }

    /**
     * Remove disciplina nas coordenadas.
     * @param {number} posX posição X.
     * @param {number} posY posição Y.
     * @returns {Disciplina} disciplina removida.
     */
    removerDisciplina(posX, posY) {
        /** Semestre a remover. */
        let semestre = this.matriz[posX];

        /** Disciplina a remover. */
		let disciplina = semestre[posY];

        // Desloca disciplinas para preencher o vazio.
		for (let i = posY; i < semestre.length-1; i++) {
			semestre[i] = semestre[i+1];
			semestre[i].moverPara(posX, i);
		}
		semestre.pop();

        // Atualiza grade.
		this.matriz[posX] = semestre;

		return disciplina;
    }

    /**
     * Remove todos últimos semestres vazios.
     */
	limpar() {
		for (let i = this.matriz.length-1; i >= 1; i--){
			if (this.matriz[i].length === 0) {
				this.matriz.pop();
			} else {
				break;
			}
		}
	}

    /**
     * Total de horas/aula de uma fase.
     * @param {number} fase índice da fase.
     * @returns {number} soma.
     */
    horasAula(fase) {
        let soma = 0;
        this.matriz[fase].forEach(function(disciplina) {
            soma += disciplina.horas;
        });
        return soma;
    }

    /**
     * Checa se uma disciplina tem erro de requisito
     * e atualiza o atributo 'errada' nela e nas relacionadas.
     */
	checarRequisitos(disciplina) {
		disciplina.errada = false;
		let requ = disciplina.requisitos;
		let fase = disciplina.posX;
		requ.forEach(function(disciplinaComparada) {
			if (disciplinaComparada.posX >= fase) {
				disciplina.errada = true;
				disciplinaComparada.errada = true;
			}
		});
	}
			

    /**
     * Get horas/aula total de todas fases.
     */
    get horasTotal() {
        let soma = 0;
        this.matriz.forEach(function(semestre, fase) {
            soma += this.horasAula(fase);
        }, this);
        return soma;
    }

}



