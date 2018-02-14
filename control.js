/** Classe controle da aplicação. */
class Control {

    /**
     * Cria o controle.
     * @param {Grade} grade grade do modelo.
     * @param {View} view view da aplicação.
     */
	constructor(grade, view) {
        this.grade = grade;
        this.view = view;
    }

    /**
     * Cria um botão para a disciplina.
     * @param {Disciplina} disciplina disciplina cujo botão será criado.
     */
	criar(disciplina) {
        /** Elemento DOM da disciplina. */
		let discDOM = document.getElementById('disciplina' + disciplina.id);

		discDOM.style.cursor = 'pointer';

		let that = this;

        /** Seleciona disciplina ao clicar. */
		discDOM.onclick = function () {
			disciplina.selecionar();
			that.view.updateSidebar(disciplina);
            that.view.updateTodas();
		}

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
		}

        /** Acaba de arrastar no fim do clique. */
		document.onmouseup = function() {
            if (that.arrastando) {
                that.arrastando = false;
                that.DOMarrastado.style["z-index"] = 0;

                /** Posição X em pixels do elemento arrastado. */
                let DOMX = parseInt(that.DOMarrastado.style.left, 10);

                /** Posição Y em pixels do elemento arrastado. */
                let DOMY = parseInt(that.DOMarrastado.style.top, 10);

                /** Remove disciplina sendo arrastada do modelo. */
                that.grade.removerDisciplina(that.discArrastada.posX, that.discArrastada.posY);

                // Calcula coordenada no modelo e adiciona.
                let pos = View.posViewParaModelo(DOMX, DOMY);
                that.grade.adicionarDisciplina(that.discArrastada, pos.x, pos.y);
            }
        
		}

        /** Atualiza posição quando mouse se mexe. */
		document.onmousemove = function(event) {
			if (that.arrastando) {
                View.posicionar(that.DOMarrastado,
                event.clientX - that.posRelativaX,
                event.clientY - that.posRelativaY);
			}
		}
	}
}
			
