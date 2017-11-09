DROP TABLE Disciplina

CREATE TABLE Disciplina
(Codigo VARCHAR(7) NOT NULL,
 Nome VARCHAR(64),
 Fase INTEGER,
 Linha INTEGER,
 Ementa VARCHAR(64),
 Horas INTEGER,
 PRIMARY KEY (Codigo)
)
