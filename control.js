class Control {
	constructor() {}
	criar(disciplina) {
		let discDOM = document.getElementById('disciplina' + disciplina.id);
		discDOM.style.cursor = 'pointer';
		discDOM.onclick = function () {
			disciplina.selecionar();
			APP.view.updateTodas();
		}

		let that = this;

		discDOM.onmousedown = function(event) {
			that.posRelativaX = event.pageX - parseInt(discDOM.style.left, 10);
			that.posRelativaY = event.pageY - parseInt(discDOM.style.top);
			that.arrastando = true;
			discDOM.style["z-index"] = 10;
			that.DOMarrastado = discDOM; 
			APP.grade.removerDisciplina(disciplina.posX, disciplina.posY);
			that.discArrastada = disciplina;
		}

		document.onmouseup = function() {
			if(that.arrastando) {
				that.arrastando = false;
				that.DOMarrastado.style["z-index"] = 0;
				let DOMX = parseInt(that.DOMarrastado.style.left, 10);
				let DOMY = parseInt(that.DOMarrastado.style.top, 10);
				let pos = APP.view.posViewParaModelo(DOMX, DOMY);
				APP.grade.adicionarDisciplina(that.discArrastada, pos.x, pos.y);
			}
		}

		document.onmousemove = function(event) {
			if (that.arrastando) {
				that.DOMarrastado.style.left = event.clientX - that.posRelativaX;
				that.DOMarrastado.style.top = event.clientY - that.posRelativaY;
			}
		}
	}
		
	criarTodas() {
		Object.keys(APP.disciplinas).forEach(function (nomeDisciplina) {
			this.criar(APP.disciplinas[nomeDisciplina]);
		}, this);
	}
}

			
			
