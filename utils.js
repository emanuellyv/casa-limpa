// APIs de desenvolvimento e deploy
export const API = "http://localhost:3000/";
// export const API = "FUTURA_ROTA_DO_DEPLOY";

// Função para obter a hora atual no formato timestamp do postgres
export function obterHoraAtual() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    const timestampPostgres = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    return timestampPostgres;
}

// Função para validar se está no formato de e-mail
export function emailValido(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexEmail.test(email)) {
        return true;
    } else {
        return false;
    }
}

// Função para validar seja, se há no mínimo 8 caractéres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.
export function senhaValida(senha) {
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regexSenha.test(senha)) {
        return false;
    } else {
        return true;
    }
}

// Função para direcionar o usuário para a página principal
export function redirecionarParaPaginaPrincipal() {
    location.href = "/";
}
