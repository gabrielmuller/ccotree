﻿// linhas: 1 = SW, 2 = HW, 3 = MTM, 4 = TC, 5 = INTRO, 6 = REDES

/** Container de constantes globais. */
let APP = {};

// Aspectos gráficos

APP.largura = 100;
APP.altura = 80;
APP.margemX = 60;
APP.margemY = 30;
APP.margemExterna = 40;
APP.bordaSelecao = 1;

// Aspectos de animação
APP.tempoAnimacao = 0.15;
APP.periodoFrame = 16;



/** Cor de cada linha de disciplinas. */
APP.coresLinhas = [
"#E57373",
"#BA68C8",
"#64B5F6",
"#81C784",
"#FFF176",
"#FF8A65",
"#90A4AE"];

/** Cores de seleção. */
APP.coresSelecao = {
	"padrao": "#FFFFFF",
	"requisito": "#F8BBD0",
	"posterior": "#FFE082",
	"selecionado": "#42A5F5",
}

/** Máximo e mínimo de horas/aula em cada semestre. */
APP.intervaloHA = {
    min: 15,
    max: 30
}

/** Todas disciplinas, informações das mesmas e os requisitos. */
APP.grafo = {
"nodes": {
	"Programação Orientada a Objetos I": {
		"codigo": "INE5402",
		"fase": 1,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2597",
		"horas": 6,
		"requisitos": []
	},
	"Matemática Discreta para Computação": {
		"codigo": "INE5403",
		"fase": 1,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2560",
		"horas": 6,
		"requisitos": []
	},
	"Cálculo 1": {
		"codigo": "MTM3100",
		"fase": 1,
		"linha": 3,
		"ementa": "http://mtm.ufsc.br/planos/2017-2/MTM3100.pdf",
		"horas": 4,
		"requisitos": []
	},
	"Circuitos e Técnicas Digitais": {
		"codigo": "EEL5105",
		"fase": 1,
		"linha": 2,
		"ementa": "indisponível",
		"horas": 5,
		"requisitos": []
	},
	"Introdução à Computação": {
		"codigo": "INE5401",
		"fase": 1,
		"linha": 5,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2669",
		"horas": 2,
		"requisitos": []
	},
	"Programação Orientada a Objetos II": {
		"codigo": "INE5404",
		"fase": 2,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2660",
		"horas": 6,
		"requisitos": ["Programação Orientada a Objetos I"]
	},
	"Probabilidade e Estatística": {
		"codigo": "INE5405",
		"fase": 2,
		"linha": 3,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2639",
		"horas": 5,
		"requisitos": ["Cálculo 1"]
	},
	"Cálculo 2": {
		"codigo": "MTM3102",
		"fase": 2,
		"linha": 3,
		"ementa": "http://mtm.ufsc.br/planos/2017-2/MTM3102.pdf",
		"horas": 4,
		"requisitos": ["Cálculo 1"]
	},
	"Geometria Analítica": {
		"codigo": "MTM5512",
		"fase": 2,
		"linha": 3,
		"ementa": "http://mtm.ufsc.br/planos/2017-2/MTM5512.pdf",
		"horas": 4,
		"requisitos": []
	},
	"Sistemas Digitais": {
		"codigo": "INE5406",
		"fase": 2,
		"linha": 2,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2680",
		"horas": 5,
		"requisitos": ["Circuitos e Técnicas Digitais"]
	},
	"Ciência, Tecnologia e Sociedade": {
		"codigo": "INE5407",
		"fase": 2,
		"linha": 5,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2666",
		"horas": 3,
		"requisitos": []
	},
	"Estruturas de Dados": {
		"codigo": "INE5408",
		"fase": 3,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2581",
		"horas": 6,
		"requisitos": ["Programação Orientada a Objetos II"]
	},
	"Programação Concorrente": {
		"codigo": "INE5410",
		"fase": 3,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2650",
		"horas": 4,
		"requisitos": ["Programação Orientada a Objetos II"]
	},
	"Cálculo Numérico para Computação": {
		"codigo": "INE5409",
		"fase": 3,
		"linha": 3,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2579",
		"horas": 4,
		"requisitos": ["Cálculo 2", "Geometria Analítica"]
	},
	"Álgebra Linear": {
		"codigo": "MTM5245",
		"fase": 3,
		"linha": 3,
		"ementa": "http://mtm.ufsc.br/planos/2017-2/MTM5245.pdf",
		"horas": 4,
		"requisitos": ["Geometria Analítica"]
	},
	"Organização de Computadores": {
		"codigo": "INE5411",
		"fase": 3,
		"linha": 2,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2618",
		"horas": 6,
		"requisitos": ["Sistemas Digitais"]
	},
	"Engenharia de Software I": {
		"codigo": "INE5417",
		"fase": 4,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2609",
		"horas": 5,
		"requisitos": ["Estruturas de Dados"]
	},
	"Grafos": {
		"codigo": "INE5413",
		"fase": 4,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2621",
		"horas": 4,
		"requisitos": ["Estruturas de Dados", "Matemática Discreta para Computação"]
	},
	"Teoria da Computação": {
		"codigo": "INE5415",
		"fase": 4,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2658",
		"horas": 4,
		"requisitos": ["Estruturas de Dados", "Matemática Discreta para Computação"]
	},
	"Paradigmas de Programação": {
		"codigo": "INE5416",
		"fase": 4,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2565",
		"horas": 5,
		"requisitos": ["Estruturas de Dados"]
	},
	"Sistemas Operacionais I": {
		"codigo": "INE5412",
		"fase": 4,
		"linha": 2,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2611",
		"horas": 4,
		"requisitos": ["Programação Concorrente", "Organização de Computadores"]
	},
	"Redes de Computadores I": {
		"codigo": "INE5414",
		"fase": 4,
		"linha": 6,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2679",
		"horas": 4,
		"requisitos": ["Programação Orientada a Objetos II"]
	},
	"Engenharia de Software II": {
		"codigo": "INE5419",
		"fase": 5,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2557",
		"horas": 4,
		"requisitos": ["Engenharia de Software I"]
	},
	"Banco de Dados I": {
		"codigo": "INE5423",
		"fase": 5,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2664",
		"horas": 4,
		"requisitos": ["Estruturas de Dados"]
	},
	"Linguagens Formais e Compiladores": {
		"codigo": "INE5421",
		"fase": 5,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2651",
		"horas": 4,
		"requisitos": ["Teoria da Computação"]
	},
	"Computação Gráfica": {
		"codigo": "INE5420",
		"fase": 5,
		"linha": 3,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2667",
		"horas": 4,
		"requisitos": ["Estruturas de Dados", "Cálculo 2", "Álgebra Linear"]
	},
	"Computação Distribuída": {
		"codigo": "INE5418",
		"fase": 5,
		"linha": 2,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2632",
		"horas": 4,
		"requisitos": ["Sistemas Operacionais I", "Redes de Computadores I"]
	},
	"Redes de Computadores II": {
		"codigo": "INE5422",
		"fase": 5,
		"linha": 6,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2555",
		"horas": 4,
		"requisitos": ["Redes de Computadores I"]
	},
	"Introdução ao TCC": {
		"codigo": "INE5453",
		"fase": 6,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2583",
		"horas": 1,
		"requisitos": ["Engenharia de Software I"]
	},
	"Planejamento e Gestão de Projetos": {
		"codigo": "INE5427",
		"fase": 6,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2604",
		"horas": 4,
		"requisitos": ["Engenharia de Software I"]
	},
	"Construção de Compiladores": {
		"codigo": "INE5426",
		"fase": 6,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2640",
		"horas": 4,
		"requisitos": ["Linguagens Formais e Compiladores"]
	},
	"Modelagem e Simulação": {
		"codigo": "INE5425",
		"fase": 6,
		"linha": 3,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2631",
		"horas": 4,
		"requisitos": ["Probabilidade e Estatística"]
	},
	"Inteligência Artificial": {
		"codigo": "INE5430",
		"fase": 6,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2617",
		"horas": 4,
		"requisitos": ["Probabilidade e Estatística", "Grafos", "Paradigmas de Programação"]
	},
	"Sistemas Operacionais II": {
		"codigo": "INE5424",
		"fase": 6,
		"linha": 2,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2552",
		"horas": 4,
		"requisitos": ["Sistemas Operacionais I"]
	},
	"Trabalho de Conclusão de Curso I (TCC)": {
		"codigo": "INE5433",
		"fase": 7,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2584",
		"horas": 6,
		"requisitos": ["Introdução ao TCC", "Planejamento e Gestão de Projetos"]
	},
	"Banco de Dados II": {
		"codigo": "INE5432",
		"fase": 7,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2594",
		"horas": 4,
		"requisitos": ["Banco de Dados I"]
	},
	"Segurança em Computação": {
		"codigo": "INE5429",
		"fase": 7,
		"linha": 4,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2636",
		"horas": 4,
		"requisitos": ["Matemática Discreta para Computação", "Redes de Computadores I"]
	},
	"Sistemas Multimídia": {
		"codigo": "INE5431",
		"fase": 7,
		"linha": 6,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2554",
		"horas": 4,
		"requisitos": ["Redes de Computadores I"]
	},
	"Informática e Sociedade": {
		"codigo": "INE5428",
		"fase": 7,
		"linha": 5,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2561",
		"horas": 4,
		"requisitos": ["Ciência, Tecnologia e Sociedade"]
	},
	"Trabalho de Conclusão de Curso II (TCC)": {
		"codigo": "INE5434",
		"fase": 8,
		"linha": 1,
		"ementa": "https://planos.inf.ufsc.br/modulos/planos/visualizar.php?id=2585",
		"horas": 9,
		"requisitos": ["Trabalho de Conclusão de Curso I (TCC)"]
	}
}
}
