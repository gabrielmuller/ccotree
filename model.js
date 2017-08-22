
APP.infoDisciplina = {
	"fase": -1,
	"linha": -1,
	"ementa": "",
	"horas": -1
}

APP.disciplina = function (info) {
	var that = {};

	that.get_fase = function () {
		return info.fase;
	};
	that.get_linha = function () {
		return info.linha;
	};
	that.get_ementa = function () {
		return info.ementa;
	};
	that.get_horas = function () {
		return info.horas;
	};

	return that;
};

APP.disciplinas = {};
APP.tree.criarDisciplinas = function () {
	for (node in this.nodes) {
		if (this.nodes.hasOwnProperty(node)) {
			var novaDisciplina = APP.disciplina(this.nodes[node]);
			APP.disciplinas[node] = novaDisciplina;
		}
	}
};

APP.tree.criarDisciplinas();

for (disc in APP.disciplinas) {
	console.log(APP.disciplinas[disc].get_ementa());
}


			
