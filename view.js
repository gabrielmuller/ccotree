//atributos visuais
APP.largura = 140;
APP.altura = 70;
APP.margem = 60;
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
	"posterior": "#E1BEE7",
	"selecionado": "#64B5F6",
}



let sheet = window.document.styleSheets[0];
sheet.insertRule("div {width: "+APP.largura
+"; height: "+APP.altura+";}", 0);

class View {
	constructor(larguraDisciplina, alturaDisciplina) {
		this.larguraDisciplina = larguraDisciplina;
		this.alturaDisciplina = alturaDisciplina;
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
			let leftPos = (disciplina.posX - 1) * this.larguraDisciplina + APP.margem;
			let topPos = disciplina.posY * this.alturaDisciplina + APP.margem;
			discDOM.style.left = leftPos;
			discDOM.style.top = topPos;
			discDOM.style["border-color"] = APP.coresSelecao[disciplina.cor];
			//discDOM.style["border-width"] = (disciplina.cor == "padrao") ? 1 : APP.bordaSelecao;
		}
	}

	criar(disciplina) {
		let id = 'disciplina' + disciplina.id;
		let tag = '<div id="' + id + '">' + disciplina.nome;
		document.body.innerHTML += tag;

		let discDOM = document.getElementById(id);
		discDOM.innerHTML += '<hr id="' + id + 'cor"></div>';
		discDOM.innerHTML += '<img id="' + id + 'erro' + 
		'" src="erro.png" title="Erro de requisito"></div>';
		let colorDOM = document.getElementById(id + 'cor');
		colorDOM.style["border-color"] = APP.coresLinhas[disciplina.linha - 1];
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
	}

	checarTodas() {
		this.processarTodas(APP.grade.checarRequisitos);
	}
}
		


			
		
