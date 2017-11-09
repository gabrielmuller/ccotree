/*
 *  Dentro do function info e novaDisciplina funcionam
 */
class Mapeador {

    constructor() {}

    getdisciplina(codigo, callback) {
        var xmlhttp = new XMLHttpRequest();
        let novaDisciplina;
        let info;
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("map").innerHTML = this.responseText;
                info = JSON.parse(this.responseText);
                novaDisciplina = new Disciplina(info, info.nome, info.codigo, []);
                callback(null, [info]);
            }
        };
        xmlhttp.open("GET", "getdisc.php?codigo=" + codigo, true);
        xmlhttp.send();
    }

    insertdisciplina(codigo, nome, fase, linha, ementa, horas) {
        // Implementar
    }
}
