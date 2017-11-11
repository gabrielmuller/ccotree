class Mapeador {

    constructor() {}

    getDisciplina(codigo, callback) {
        let xmlhttp = new XMLHttpRequest();
        let novaDisciplina;
        let info = {};
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                info = JSON.parse(this.responseText);
                novaDisciplina = new Disciplina(info, info.nome, info.codigo, info.requisitos); 
                callback(novaDisciplina);
            }
        };
        xmlhttp.open("GET", "getdisc.php?codigo=" + codigo, true);
        xmlhttp.send();
    }

    getTodas(callback) {
        let xmlhttp = new XMLHttpRequest();
        let novaDisciplina;
        let disciplinas = {};
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let infos = JSON.parse(this.responseText);
                Object.keys(infos).forEach(function(codigo, id) {
                    let info = infos[codigo]
                    let requisitos = [];
                    info.requisitos.forEach(function(requisito) {
                        requisitos.push(infos[requisito].nome);
                    });
                    info.requisitos = requisitos;
                    info.horas = parseInt(info.horas, 10);
                    info.fase = parseInt(info.fase, 10);
                    novaDisciplina = new Disciplina(info, info.nome, id, disciplinas); 
                    disciplinas[novaDisciplina.nome] = novaDisciplina;
                });
                callback(disciplinas);
            }
        };
        xmlhttp.open("GET", "gettodas.php", true);
        xmlhttp.send();
    }


    inserirDisciplina(disciplina, callback) {
        let requ = disciplina.requisitos;
        let requString = "";
        requ.forEach(function(requisito) {
            requString += requisito.codigo + " ";
        });
        requString = requString.slice(0, -1);
        let xmlhttp = new XMLHttpRequest();
        let url = "insdisc.php?codigo=" + disciplina.codigo +
            "&nome=" + disciplina.nome +
            "&fase=" + disciplina.fase+
            "&linha=" + disciplina.linha +
            "&ementa=" + disciplina.ementa +
            "&horas=" + disciplina.horas +
            "&requisitos=" + requString;
        url = encodeURI(url);
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                callback();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}
