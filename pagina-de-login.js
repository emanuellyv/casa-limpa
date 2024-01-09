// Importando funções utilitárias
import {
    obterHoraAtual,
    emailValido,
    redirecionarParaPaginaPrincipal,
    API
}
from "./utils.js";

// Coletando variáveis do DOM
const botaoLogin = document.getElementById('botao-logar');
const fecharModal = document.getElementById('fechar-modal');
const mensagemDeErro = document.querySelector('dialog');

// Evento para fechar o modal ao clicar no botão
fecharModal.addEventListener('click', () => {
    mensagemDeErro.close()
})

// Evento para realizar as operações do login
botaoLogin.addEventListener('click', async () => {
    // Coletando inputs do DOM
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    mensagemDeErro.showModal();

    // Informações do usuário
    const email = emailInput.value.toLowerCase().trim();
    const senha = senhaInput.value.trim();

    // Caso o e-mail e a senha sejam válidos
    if(emailValido(email) && senha.length >= 3) {
        // Operações para fazer login
        try {
            const response = await fetch(`${API}logar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    senha,
                }),
            });
    
            const data = await response.json();
    
            if (data.error === "USER_NOT_FOUND") {
                // Tratando erro de usuário não encontrado
                exibirMensagemDeErro('USER_NOT_FOUND');
            } else if (data.error === "INVALID_PASSWORD") {
                // Tratando erro de senha inválida
                exibirMensagemDeErro('INVALID_PASSWORD');
            } else if(data.error) {
                // Tratando caso aconteça algum outro erro
                console.error("Erro não identificado");
            } else {
                // Login realizado com sucesso
                if (data.token) {
                    emailInput.value = ''
                    senhaInput.value = ''

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
    } else if(!emailValido(email)) {
        exibirMensagemDeErro('INVALID_EMAIL')
    } else if(senha.length <= 3) {
        exibirMensagemDeErro('INVALID_PASSWORD_PLUS');
    } else {
        console.error("Erro não identificado")
    }
});

// Função para mostrar na tela a mensagem de erro com base no tipo de erro fornecido
function exibirMensagemDeErro(tipoErro) {
    // Coletando DOM das mensagens de erro
    const mensagemDeErroEditavel = document.querySelector('.tipo-de-erro');

    switch(tipoErro) {
        case 'USER_NOT_FOUND':
            mensagemDeErroEditavel.textContent = "Usuário não encontrado!";
            break;

        case 'INVALID_PASSWORD':
            mensagemDeErroEditavel.textContent = "Senha inválida!";
            break;

        case 'INVALID_EMAIL':
            mensagemDeErroEditavel.textContent = "E-mail inválido!";
            break;

        case 'INVALID_PASSWORD_PLUS':
            mensagemDeErroEditavel.textContent = "A senha deve conter no mínimo 8 caractéres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.";
            break;
    }

    mensagemDeErro.showModal();
}