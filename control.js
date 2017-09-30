class Control {
	constructor() {}
	criar(disciplina) {
		let discDOM = document.getElementById('disciplina' + disciplina.id);
		discDOM.style.cursor = 'pointer';
		discDOM.onclick = function () {
			disciplina.selecionar();
			APP.view.updateTodas();
		}
	}
		
	criarTodas() {
		Object.keys(APP.disciplinas).forEach(function (nomeDisciplina) {
			this.criar(APP.disciplinas[nomeDisciplina]);
		}, this);
	}
}

			
			
