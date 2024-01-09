// Importando funções utilitárias
import {
    obterHoraAtual,
    emailValido,
    redirecionarParaPaginaPrincipal,
    API,
    senhaValida,
    nomeValido,
}
from "./utils.js";

// Coletando variáveis do DOM
const botaoRegistrar = document.getElementById('botao-registro');
const fecharModal = document.getElementById('fechar-modal');
const mensagemDeErro = document.querySelector('dialog');

// Evento para fechar o modal ao clicar no botão
fecharModal.addEventListener('click', () => {
    mensagemDeErro.close()
})

// Evento para realizar as operações do registro
botaoRegistrar.addEventListener('click', async () => {
    // Coletando inputs do DOM
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    mensagemDeErro.showModal();

    // Informações do usuário
    const nome = nomeInput.value.trim();
    const email = emailInput.value.toLowerCase().trim();
    const senha = senhaInput.value.trim();

    // Caso o nome, e-mail e a senha sejam válidos
    if(emailValido(email) && senhaValida(senha) && nomeValido(nome)) {
        // Operações para fazer registro
        try {
            const response = await fetch(`${API}registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    criado_em: obterHoraAtual(),
                }),
            });

            const data = await response.json();

            if (data.error === "USER_ALREADY_EXISTS") {
                // Tratando erro de usuário não encontrado
                exibirMensagemDeErro('USER_ALREADY_EXISTS');
            } else if(data.error) {
                // Tratando caso aconteça algum outro erro
                console.error("Erro não identificado");
            } else {
                // Registro realizado com sucesso
                if (data.token) {
                    emailInput.value = '';
                    senhaInput.value = '';
                    nomeInput.value = '';

                    // Definindo o token no localstorage
                    localStorage.setItem('jwtToken', data.token);

                    // Redirecionando para a tela inicial
                    redirecionarParaPaginaPrincipal();
                } else {
                    console.error('Token não encontrado na resposta do servidor');
                }
            }
        } catch (error) {
            // Erro não identificado de login
            console.error('Erro ao realizar o login:', error);
        }
        return;
    } else if(!nomeValido(nome)) {
        exibirMensagemDeErro('INVALID_NAME')
    } else if(!emailValido(email)) {
        exibirMensagemDeErro('INVALID_EMAIL');
    } else if(!senhaValida(senha)) {
        exibirMensagemDeErro('INVALID_PASSWORD_PLUS');
    } else {
        console.error("Erro não identificado");
    }
});

// Função para mostrar na tela a mensagem de erro com base no tipo de erro fornecido
function exibirMensagemDeErro(tipoErro) {
    // Coletando DOM das mensagens de erro
    const mensagemDeErroEditavel = document.querySelector('.tipo-de-erro');

    switch(tipoErro) {
        case 'USER_ALREADY_EXISTS':
            mensagemDeErroEditavel.textContent = "Esse e-mail já existe na nossa base dados.";
            break;

        case 'INVALID_PASSWORD':
            mensagemDeErroEditavel.textContent = "Senha inválida.";
            break;

        case 'INVALID_EMAIL':
            mensagemDeErroEditavel.textContent = "Campo do e-mail inválido.";
            break;

        case 'INVALID_PASSWORD_PLUS':
            mensagemDeErroEditavel.textContent = "A senha deve conter no mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.";
            break;

        case 'INVALID_NAME':
            mensagemDeErroEditavel.textContent = "Nome deve conter apenas letras, espaços, hífens e apóstrofos.";
            break;
    }

    mensagemDeErro.showModal();
}
