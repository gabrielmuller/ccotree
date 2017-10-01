//atributos visuais
APP.largura = 100;
APP.altura = 80;
APP.margem = 46;
APP.bordaSelecao = 1;
APP.coresLinhas = [
"#E57373",
"#BA68C8",
"#64B5F6",
"#81C784",
"#FFF176",
"#FF8A65",
"#90A4AE"];

APP.coresSelecao = {
	"padrao": "#FFFFFF",
	"requisito": "#F8BBD0",
	"posterior": "#FFE082",
	"selecionado": "#42A5F5",
}



APP.sheet = window.document.styleSheets[0];

APP.sheet.insertRule(".fase {width: "+APP.largura
+"; height: "+(APP.altura/2)+";}", 0);

APP.sheet.insertRule(".disc {width: "+APP.largura
+"; height: "+APP.altura+";}", 0);


class View {
	constructor(larguraDisciplina, alturaDisciplina) {
		this.larguraDisciplina = larguraDisciplina;
		this.alturaDisciplina = alturaDisciplina;
		this.fases = 1;
	}

	posModeloParaView(posX, posY) {
		let resultado = {};
		resultado.x = (posX - 1) * this.larguraDisciplina + APP.margem;
		resultado.y = (posY + 0.5) * this.alturaDisciplina + APP.margem;
		return resultado;
	}

	posViewParaModelo(posX, posY) {
		let resultado = {};
		resultado.x = Math.round((posX - APP.margem) / this.larguraDisciplina + 1);
		resultado.y = Math.round((posY - APP.margem) / this.alturaDisciplina - 0.5);
		return resultado;
	}
		

	update(disciplina) {
		this.checarTodas();
		let id = "disciplina" + disciplina.id;
		let discDOM = document.getElementById(id);
		if (discDOM === null) {
			console.log("Aviso: update chamado antes da criação de uma disciplina.");
		} else {
			let imgDOM = document.getElementById(id + "erro");
			imgDOM.style.visibility = disciplina.errada ? 'visible' : 'hidden';

			let pos = this.posModeloParaView(disciplina.posX, disciplina.posY);
			discDOM.style.left = pos.x;
			discDOM.style.top = pos.y;
			discDOM.style["border-color"] = APP.coresSelecao[disciplina.cor];
		}
	}

	updateFase(fase) {
		let id = 'ha' + fase;
		let haDOM = document.getElementById(id);
		haDOM.innerHTML = APP.grade.horasAula(fase) + ' H/A';

		haDOM.innerHTML += '<img id="' + id + 'erro' + 
	    '" src="erro.png" title="H/A deve ser entre [15, 30]"></div>';
	    let imgDOM = document.getElementById(id + "erro");
	    if (APP.grade.horasAula(fase) > 30) {
	     	imgDOM.style.visibility = 'visible';
	    } else if (APP.grade.horasAula(fase) < 15) {
	    	imgDOM.style.visibility = 'visible';
	    } else {
	    	imgDOM.style.visibility = 'hidden';
	    }
	}

	updateFases() {
		let len = APP.grade.matriz.length;
		if (this.fases > len) {
			for (let i = this.fases; i > len; i--) {
				this.removerFase(i-1);
			}
		} else if (this.fases < len) {
			for (let i = this.fases; i < len; i++) {
				this.criarFase(i);
			}
		}
		this.fases = len;
		for (let i = 1; i < this.fases; i++) {
			this.updateFase(i);
		}
	}


	updateSidebar(disciplina) {
		let infoHTML = "";

		infoHTML += '<p class="titulo">' + disciplina.codigo 
		+ ' - ' + disciplina.nome + '</p>';

		infoHTML += '<p>Fase padrão: ' + disciplina.fase + '</p>';  

		infoHTML += '<a href="' + disciplina.ementa + '">Ementa</a>';
		document.getElementById('info').innerHTML = infoHTML;
	}

	criar(disciplina) {
		let id = 'disciplina' + disciplina.id;
		let tag = '<div class="disc" id="' + id + '">' + disciplina.nome;
		document.body.innerHTML += tag;

		let discDOM = document.getElementById(id); discDOM.innerHTML += '<hr id="' + id + 'cor"></div>';
		discDOM.innerHTML += disciplina.codigo;
		discDOM.innerHTML += '<img id="' + id + 'erro' + 
		'" src="erro.png" title="Erro de requisito"></div>';
		let colorDOM = document.getElementById(id + 'cor');
		colorDOM.style["border-color"] = APP.coresLinhas[disciplina.linha - 1];
	}

	criarFase(fase) {
		let id = 'fase' + fase;
		let tag = '<div class="disc fase" id="' + id + '">Fase ' + fase + 
		'<p id="ha' + fase + '"></p></div>';
		document.body.insertAdjacentHTML('beforeend', tag);

		let faseDOM = document.getElementById(id);
		let pos = this.posModeloParaView(fase, -0.5);
		faseDOM.style.left = pos.x;
		faseDOM.style.top = pos.y - APP.margem/2;
	}

	removerFase(fase) {
		let id = 'fase' + fase;
		let faseDOM = document.getElementById(id);
		faseDOM.remove();
	}

	processarTodas(processo) {
		Object.keys(APP.disciplinas).forEach(function (nomeDisciplina) {
			let disciplina = APP.disciplinas[nomeDisciplina];
			processo.call(this, disciplina);
		}, this);
	}
	
	criarTodas() {
		this.processarTodas(this.criar);
	}

	updateTodas() {
		this.processarTodas(this.update);
		this.updateFases();
	}

	checarTodas() {
		this.processarTodas(APP.grade.checarRequisitos);
	}
}
		


			
		
