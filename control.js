/** Classe controle da aplicação. */
class Control {
	constructor() {}

    /**
     * Cria um botão para a disciplina.
     */
	criar(disciplina) {
        /** Elemento DOM da disciplina. */
		let discDOM = document.getElementById('disciplina' + disciplina.id);

		discDOM.style.cursor = 'pointer';

        /** Seleciona disciplina ao clicar. */
		discDOM.onclick = function () {
			disciplina.selecionar();
			APP.view.updateSidebar(disciplina);
            APP.view.updateTodas();
		}

		let that = this;

        /** Começa a arrastar no começo do clique */
		discDOM.onmousedown = function(event) {
            // Posição relativa do mouse ao elemento DOM deve ser constante
			that.posRelativaX = event.pageX - parseInt(discDOM.style.left, 10);
			that.posRelativaY = event.pageY - parseInt(discDOM.style.top);

			that.arrastando = true;
            
            // Disciplina arrastada deve ser visível acima de todas.
			discDOM.style["z-index"] = 10;

            /** Elemento DOM que está sendo arrastado */
			that.DOMarrastado = discDOM; 

            /** Disciplina sendo arrastada. */
			that.discArrastada = disciplina;

            that.discArrastada.arrastando = true;

            //APP.view.updateTodas();

		}

        /** Acaba de arrastar no fim do clique. */
		document.onmouseup = function() {
            that.arrastando = false;
            that.DOMarrastado.style["z-index"] = 0;

            /** Posição X em pixels do elemento arrastado. */
            let DOMX = parseInt(that.DOMarrastado.style.left, 10);

            /** Posição Y em pixels do elemento arrastado. */
            let DOMY = parseInt(that.DOMarrastado.style.top, 10);

            /** Remove disciplina sendo arrastada do modelo. */
            APP.grade.removerDisciplina(that.discArrastada.posX, that.discArrastada.posY);

            // Calcula coordenada no modelo e adiciona.
            let pos = APP.view.posViewParaModelo(DOMX, DOMY);
            APP.grade.adicionarDisciplina(that.discArrastada, pos.x, pos.y);
        
		}

        /** Atualiza posição quando mouse se mexe. */
		document.onmousemove = function(event) {
			if (that.arrastando) {
				that.DOMarrastado.style.left = event.clientX - that.posRelativaX;
				that.DOMarrastado.style.top = event.clientY - that.posRelativaY;
			}
		}
	}
		
    /**
     * Cria todos botões.
     */
	criarTodas() {
		Object.keys(APP.disciplinas).forEach(function (nomeDisciplina) {
			this.criar(APP.disciplinas[nomeDisciplina]);
		}, this);
	}
}

			
			
