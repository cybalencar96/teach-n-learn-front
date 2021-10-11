const alertas = {
    loginFailed: {
        msg: "Login mal sucedido! Verifique seu usuário e senha.",
        className: "alerta",
    },
    deleteSuccess: {
        msg: "Aula deletada com sucesso!",
        className: "sucesso",
    },
    bookSuccess: {
        msg: "Registro feito com sucesso!",
        className: "sucesso",
    },
    unbookSuccess: {
        msg: "Descadastro feito com sucesso!",
        className: "sucesso",
    },
    maxStGr80: {
        msg: "Numero de estudantes deve ser maior que 0",
        className: "alerta"
    },
    lenGr80: {
        msg: "Deve haver ao menos um dia de aula",
        className: "alerta"
    },
    missingHour: {
        msg: "Os dias precisam tem uma hora de começo e de fim",
        className: "alerta"
    },
};

module.exports = alertas;