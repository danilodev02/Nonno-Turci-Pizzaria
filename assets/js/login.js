function Login () {
    let verify = false;

    const emailInput = document.querySelector('input[type="email"], #email');
    const passwordInput = document.querySelector('input[type="password"], #password');

    if (!Verificação(emailInput, passwordInput)) {
        return false; // cancela o envio/login se inválido
    }

    const emailVal = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const passVal = passwordInput ? passwordInput.value : '';

    if ((emailVal == "usuario@gmail.com") || (emailVal == "usuario@outlook.com")) {
        verify = true;
    }

    if ((passVal == 123456) && (verify == true)) {
        window.location.href = "compra.html";
    }
}



function Verificação(emailInput, passwordInput) {
    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const password = passwordInput ? passwordInput.value : '';

    const emailValido = email.endsWith('@gmail.com') || email.endsWith('@outlook.com');
    const senhaValida = password.length >= 6; // ajuste mínimo conforme desejar

    if (!emailValido) {
        alert('O e‑mail precisa terminar com @gmail.com ou @outlook.com (ex: usuario@gmail.com).');
        return false;
    }

    if (!senhaValida) {
        alert('A senha precisa ter pelo menos 6 caracteres.');
        return false;
    }

    return true;
}