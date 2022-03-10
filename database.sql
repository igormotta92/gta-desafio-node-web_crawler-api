CREATE TABLE notices (
    id INT NOT NULL AUTO_INCREMENT,
    imagem TEXT NULL,
    subTitle VARCHAR(255) NULL,
    title VARCHAR(255) NOT NULL,
    titleURL VARCHAR(255) NOT NULL,
    subItens TEXT NULL,
    metadata VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);