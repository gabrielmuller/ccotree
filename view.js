// Aspectos gráficos

APP.largura = 100;
APP.altura = 80;
APP.margem = 46;
APP.bordaSelecao = 1;

// Inserir dimensões das disciplinas no stylesheet
APP.sheet = window.document.styleSheets[0];

APP.sheet.insertRule(".fase {width: "+APP.largura
+"; height: "+(APP.altura/2)+";}", 0);

APP.sheet.insertRule(".disc {width: "+APP.largura
+"; height: "+APP.altura+";}", 0);

/** View da aplicação. */
class View {

    /**
     * Inicia o View.
     * @param {number} larguraDisciplina largura do DOM das disciplinas.
     * @param {number} alturaDisciplina altura do DOM das disciplinas.
     */
	constructor(larguraDisciplina, alturaDisciplina) {
		this.larguraDisciplina = larguraDisciplina;
		this.alturaDisciplina = alturaDisciplina;

        /** Número de fases no View */
		this.fases = 1;
	}

    /**
     * Converte coordenadas do modelo para pixels.
     * @param {number} posX posição X no modelo.
     * @param {number} posY posição Y no modelo.
     * @return {object} coordenadas em pixels x, y.
     */
	posModeloParaView(posX, posY) {
		let resultado = {};
		resultado.x = (posX - 1) * this.larguraDisciplina + APP.margem;
		resultado.y = (posY + 0.5) * this.alturaDisciplina + APP.margem;
		return resultado;
	}

    /**
     * Converte coordenadas em pixels para coordenadas do modelo.
     * @param {number} posX posição X em pixels.
     * @param {number} posY posição Y em pixels.
     * @return {Object} coordenadas do modelo x, y.
     */
	posViewParaModelo(posX, posY) {
		let resultado = {};
		resultado.x = Math.round((posX - APP.margem) / this.larguraDisciplina + 1);
		resultado.y = Math.round((posY - APP.margem) / this.alturaDisciplina - 0.5);
		return resultado;
	}
		

    /**
     * Atualiza a posição do elemento DOM da disciplina
     * de acordo com o modelo.
     * @param {Disciplina} disciplina disciplina a atualizar.
     */
	update(disciplina) {
		this.checarTodas();
		let id = "disciplina" + disciplina.id;

        /** Elemento DOM da disciplina. */
		let discDOM = document.getElementById(id);

		if (discDOM === null) {
			console.log("Aviso: update chamado antes da criação de uma disciplina.");
		} else {
            /** Elemento DOM do ícone de erro da disciplina. */
			let imgDOM = document.getElementById(id + "erro");
			imgDOM.style.visibility = disciplina.errada ? 'visible' : 'hidden';

            // Atualiza a posição do DOM disciplina.
			let pos = this.posModeloParaView(disciplina.posX, disciplina.posY);
			discDOM.style.left = pos.x;
			discDOM.style.top = pos.y;

            // Atualiza a cor da borda do DOM disciplina.
			discDOM.style["border-color"] = APP.coresSelecao[disciplina.cor];
		}
	}

    /**
     * Atualiza o elemento DOM de uma fase de acordo com o modelo.
     * @param {number} fase número da fase.
     */
	updateFase(fase) {
		let id = 'ha' + fase;

        /** Elemento DOM do número de horas/aula. */
		let haDOM = document.getElementById(id);
		haDOM.innerHTML = APP.grade.horasAula(fase) + ' H/A';

        // Mostra erro se nro de horas/aula está fora do intervalo
		haDOM.innerHTML += '<img id="' + id + 'erro' + 
	    '" src="erro.png" title="H/A deve ser entre ['+
            APP.intervaloHA.min + ', ' + APP.intervaloHA.max + 
            ']"></div>';
	    let imgDOM = document.getElementById(id + "erro");
	    if (APP.grade.horasAula(fase) > APP.intervaloHA.max) {
	     	imgDOM.style.visibility = 'visible';
	    } else if (APP.grade.horasAula(fase) < APP.intervaloHA.min) {
	    	imgDOM.style.visibility = 'visible';
	    } else {
	    	imgDOM.style.visibility = 'hidden';
	    }
	}

    /**
     * Atualiza o DOM de todas fases.
     */
	updateFases() {
        /** Número de fases no modelo. */
		let len = APP.grade.matriz.length;

        // Se o View tem mais fases que modelo,
        // remove fases sobrando no View.
		if (this.fases > len) {
			for (let i = this.fases; i > len; i--) {
				this.removerFase(i-1);
			}
        // Se o modelo tem mais fases que o View,
        // cria DOM fases que faltam no View.
		} else if (this.fases < len) {
			for (let i = this.fases; i < len; i++) {
				this.criarFase(i);
			}
		}

        // De qualquer forma, o resultado final é que
        // View tem a mesma quantidade de fases que o modelo
		this.fases = len;

        // Update o View de cada fase.
		for (let i = 1; i < this.fases; i++) {
			this.updateFase(i);
		}
    }

    /**
     * Atualiza a barra lateral com a info de uma disciplina
     * @param {Disciplina} disciplina disciplina que possui a info
     */
	updateSidebar(disciplina) {
        /** Código HTML da informação */
		let infoHTML = "";
		infoHTML += '<p class="titulo">' + disciplina.codigo 
		+ ' - ' + disciplina.nome + '</p>';
		infoHTML += '<p>Fase padrão: ' + disciplina.fase + '</p>';  
		infoHTML += '<p>Hora/Aula: ' + disciplina.horas + '</p>';  
		infoHTML += '<a href="' + disciplina.ementa + '">Ementa</a>';
		document.getElementById('info').innerHTML = infoHTML;
	}

    /**
     * Cria um elemento DOM para a disciplina.
     * @param {Disciplina} disciplina a criar
     */
	criar(disciplina) {
        // Adiciona <div> da disciplina
		let id = 'disciplina' + disciplina.id;
		let tag = '<div class="disc" id="' + id + '">' + disciplina.nome;
		document.body.insertAdjacentHTML('beforeend', tag);

        /** Elemento DOM da disciplina */
		let discDOM = document.getElementById(id);

        // Adiciona barra que representa a linha da disciplina.
        discDOM.insertAdjacentHTML('beforeend', '<hr id="' + id + 'cor"></div>');

        // Adiciona código da disciplina.
        discDOM.insertAdjacentHTML('beforeend', disciplina.codigo);

        // Adiciona ícone de erro da disciplina.
		discDOM.insertAdjacentHTML('beforeend', '<img id="' + id + 'erro' + 
		'" src="erro.png" title="Erro de requisito"></div>');

        /** Elemento DOM da barra de linha. */
		let colorDOM = document.getElementById(id + 'cor');

		colorDOM.style["border-color"] = APP.coresLinhas[disciplina.linha - 1];
	}

    /**
     * Cria um elemento DOM para a fase.
     * @param {number} fase índice da fase a criar.
     */
	criarFase(fase) {
		let id = 'fase' + fase;

        /** Código HTML da fase */
		let tag = '<div class="disc fase" id="' + id + '">Fase ' + fase + 
		'<p id="ha' + fase + '"></p></div>';

		document.body.insertAdjacentHTML('beforeend', tag);

        /** Elemento DOM da fase. */
		let faseDOM = document.getElementById(id);
		let pos = this.posModeloParaView(fase, -0.5);
		faseDOM.style.left = pos.x;

        /** Ajuste da altura do DOM fase */
		faseDOM.style.top = pos.y - APP.margem/2;
	}

    /**
     * Remove o elemento DOM da fase.
     * @param {number} fase índice da fase a remover.
     */
	removerFase(fase) {
		let id = 'fase' + fase;
		let faseDOM = document.getElementById(id);
		faseDOM.remove();
	}

    /**
     * Realiza um processo em todas disciplinas existentes.
     * @param {function} processo função a ser chamada em cada disciplina.
     */
	processarTodas(processo) {
		Object.keys(APP.disciplinas).forEach(function (nomeDisciplina) {
			let disciplina = APP.disciplinas[nomeDisciplina];
			processo.call(this, disciplina);
		}, this);
	}
	
    /**
     * Cria um elemento DOM para cada disciplina.
     */
	criarTodas() {
		this.processarTodas(this.criar);
	}

    /**
     * Atualiza o elemento DOM de cada disciplina.
     */
	updateTodas() {
		this.processarTodas(this.update);
		this.updateFases();
	}

    /**
     * Checa os requisitos de cada disciplina.
     */
	checarTodas() {
		this.processarTodas(APP.grade.checarRequisitos);
	}
}
		


			
		
