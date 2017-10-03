// Aspectos gráficos

APP.largura = 100;
APP.altura = 80;
APP.margemX = 60;
APP.margemY = 30;
APP.margemExterna = 40;
APP.bordaSelecao = 1;

// Inserir dimensões das disciplinas no stylesheet
APP.sheet = window.document.styleSheets[0];

APP.sheet.insertRule(".fase {width: "+APP.largura
+"; height: "+(APP.altura/2)+";}", 0);

APP.sheet.insertRule(".disc {width: "+APP.largura
+"; height: "+APP.altura+";}", 0);

// Aspectos de animação
APP.tempoAnimacao = 0.15;
APP.periodoFrame = 16;

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

        /** Disciplinas participando de uma animação no momento. */
        this.animados = [];
        this.animando = false;
	}

    /**
     * Converte coordenadas do modelo para pixels.
     * @param {number} posX posição X no modelo.
     * @param {number} posY posição Y no modelo.
     * @returns {object} coordenadas em pixels x, y.
     */
	posModeloParaView(posX, posY) {
		let resultado = {};
		resultado.x = (posX - 1) * this.larguraDisciplina + APP.margemExterna;
		resultado.y = (posY + 0.5) * this.alturaDisciplina + APP.margemExterna;
		return resultado;
	}

    /**
     * Converte coordenadas em pixels para coordenadas do modelo.
     * @param {number} posX posição X em pixels.
     * @param {number} posY posição Y em pixels.
     * @returns {Object} coordenadas do modelo x, y.
     */
	posViewParaModelo(posX, posY) {
		let resultado = {};
		resultado.x = Math.round((posX - APP.margemExterna) / this.larguraDisciplina + 1);
		resultado.y = Math.round((posY - APP.margemExterna) / this.alturaDisciplina - 0.5);
		return resultado;
	}
		

    /**
     * Atualiza a posição do elemento DOM da disciplina
     * de acordo com o modelo.
     * @param {Disciplina} disciplina disciplina a atualizar.
     */
	update(disciplina) {
        // Atualizar oldX e oldY da disciplina
        let mudou = disciplina.oldX != disciplina.posX ||
        disciplina.oldY != disciplina.posY ||
        disciplina.arrastando;


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
			//discDOM.style.left = pos.x;
			//discDOM.style.top = pos.y;

            // Atualiza a cor da borda do DOM disciplina.
			discDOM.style["border-left-color"] = APP.coresSelecao[disciplina.cor];

            // Adiciona um elemento animado a cada disciplina que mudou de posição.
            if (mudou) {
                // Shorthand
                let d = disciplina;

                // Cria novo Animado e adiciona
                let animado = new Animado(discDOM, d.oldX, d.oldY, d.posX, d.posY, disciplina.arrastando);
                this.animados.push(animado);

                disciplina.oldX = disciplina.posX;
                disciplina.oldY = disciplina.posY;

                disciplina.arrastando = false;
            }
        }

        
	}

    /**
     * Começa uma animação.
     */
    animar() {
        if (this.animados.length > 0) {
            this.animando = true;
            let decorrido = 0;
            let totalFrames = (APP.tempoAnimacao / APP.periodoFrame) * 1000;
            this.intervalo = setInterval(frame, APP.periodoFrame);
            let that = this;
            function frame () {
                if (decorrido >= totalFrames) {
                    that.finalizarAnimacao();
                } else {
                    decorrido++;
                    let progresso = decorrido / totalFrames;
                    that.animados.forEach(function (animado) {
                        animado.updatePos(progresso);
                    });
                }
            }
        }
    }

    /**
     * Encerra animação.
     */
    finalizarAnimacao() {
        // Para de executar frame.
        clearInterval(this.intervalo);

        // Finaliza todos elementos animados.
        this.animados.forEach(function (animado) {
            animado.finalizar();
        });

        // Reseta status de animação.
        this.animados = [];
        this.animando = false;
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
		infoHTML += '<p>Aulas por semana: ' + disciplina.horas + '</p>';  
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
		faseDOM.style.top = pos.y - APP.margemY / 2; 
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
        this.finalizarAnimacao();
		this.processarTodas(this.update);
		this.updateFases();
        this.animar();
	}

    /**
     * Checa os requisitos de cada disciplina.
     */
	checarTodas() {
		this.processarTodas(APP.grade.checarRequisitos);
	}
}
		
/** Elemento animado, com o DOM, posições inicial e final. */
class Animado {
    /**
     * Cria novo animado.
     * @param {DOM} discDOM elemento DOM sendo animado.
     * @param {number} oldX posição X inicial em pixels.
     * @param {number} oldY posição Y inicial em pixels.
     * @param {number} posX posição X inicial em pixels.
     * @param {number} posY posição Y inicial em pixels.
     * @param {bool} arrastando o elemento animado estava
     * sendo arrastado e foi solto?
     */
    constructor(discDOM, oldX, oldY, posX, posY, arrastando) {
        this.discDOM = discDOM;
        this.old = APP.view.posModeloParaView(oldX, oldY);
        this.pos = APP.view.posModeloParaView(posX, posY);

        // Se foi solto, pos inicial é a pos do próprio DOM
        if (arrastando) {
            this.old.x = parseInt(this.discDOM.style.left, 10);
            this.old.y = parseInt(this.discDOM.style.top, 10);
        }
    }

    /**
     * Atualiza a posição do elemento DOM.
     * @param {number} progresso entre 0 e 1, onde
     * 0 é a posição inicial
     * 1 é a posição final
     */
    updatePos(progresso) {
        this.discDOM.style.left = this.interpolar(this.old.x, this.pos.x, progresso);
        this.discDOM.style.top = this.interpolar(this.old.y, this.pos.y, progresso);
    }

    /**
     * Interpolação com smoothing.
     * Retorna valor entre a e b, depende de p.
     * @param {number} a p = 0
     * @param {number} b p = 1
     * @param {number} p entre 0 e 1
     */
    interpolar(a, b, p) {
        p = 1-p;
        p = p*p;
        p = 1-p;
        return a + (b-a)*p;
    }

    /**
     * Posiciona o elemento adequadamente no final.
     */
    finalizar() {
        this.discDOM.style.left = this.pos.x;
        this.discDOM.style.top = this.pos.y;
    }
}


			
		
