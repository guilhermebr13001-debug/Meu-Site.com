/* ============================================================
   Aurora Café — script principal
   1) Menu mobile (hambúrguer)
   2) Sanfona do FAQ
   3) Validação do formulário de contato
   ============================================================ */

/* ------------------------------------------------------------
   1) MENU MOBILE — alterna a classe "aberto" no menu e troca
      o estado acessível do botão (aria-expanded)
   ------------------------------------------------------------ */
const botaoMenu = document.getElementById("botaoMenu");
const menuMobile = document.getElementById("menuMobile");

botaoMenu.addEventListener("click", () => {
  const aberto = menuMobile.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

/* Fecha o menu mobile quando um link é clicado */
menuMobile.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuMobile.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

/* ------------------------------------------------------------
   2) FAQ — ao clicar em uma pergunta, abre a resposta e fecha
      as outras (comportamento de sanfona)
   ------------------------------------------------------------ */
const itensFaq = document.querySelectorAll(".faq__item");

itensFaq.forEach((item) => {
  const pergunta = item.querySelector(".faq__pergunta");

  pergunta.addEventListener("click", () => {
    const jaAberto = item.classList.contains("aberto");

    // Fecha todos os itens primeiro
    itensFaq.forEach((outro) => {
      outro.classList.remove("aberto");
      outro.querySelector(".faq__pergunta").setAttribute("aria-expanded", "false");
    });

    // Se o item clicado estava fechado, abre agora
    if (!jaAberto) {
      item.classList.add("aberto");
      pergunta.setAttribute("aria-expanded", "true");
    }
  });
});

/* ------------------------------------------------------------
   3) VALIDAÇÃO DO FORMULÁRIO
      Regras:
      - Nome: obrigatório, mínimo de 3 letras
      - E-mail: obrigatório e precisa seguir o padrão texto@texto.dominio
      - Mensagem: obrigatória, mínimo de 10 caracteres
      Os erros aparecem abaixo de cada campo; só quando não há
      erros a mensagem de sucesso é exibida.
   ------------------------------------------------------------ */
const formulario = document.getElementById("formContato");
const mensagemSucesso = document.getElementById("mensagemSucesso");

function exibirErro(idCampo, idErro, mensagem) {
  const campo = document.getElementById(idCampo);
  const erro = document.getElementById(idErro);
  erro.textContent = mensagem;
  campo.classList.toggle("invalido", mensagem !== "");
}

function validarFormulario() {
  let valido = true;

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Nome: pelo menos 3 caracteres
  if (nome.length < 3) {
    exibirErro("nome", "erroNome", "Informe seu nome completo (mínimo de 3 letras).");
    valido = false;
  } else {
    exibirErro("nome", "erroNome", "");
  }

  // E-mail: expressão regular simples (texto@texto.dominio)
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!padraoEmail.test(email)) {
    exibirErro("email", "erroEmail", "Informe um e-mail válido, por exemplo: nome@exemplo.com");
    valido = false;
  } else {
    exibirErro("email", "erroEmail", "");
  }

  // Mensagem: pelo menos 10 caracteres
  if (mensagem.length < 10) {
    exibirErro("mensagem", "erroMensagem", "Escreva uma mensagem com pelo menos 10 caracteres.");
    valido = false;
  } else {
    exibirErro("mensagem", "erroMensagem", "");
  }

  return valido;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // impede o recarregamento da página

  if (validarFormulario()) {
    // Tudo certo: mostra a confirmação e limpa os campos
    mensagemSucesso.hidden = false;
    formulario.reset();
    exibirErro("nome", "erroNome", "");
    exibirErro("email", "erroEmail", "");
    exibirErro("mensagem", "erroMensagem", "");
  } else {
    // Há erros: esconde a confirmação até o envio ser válido
    mensagemSucesso.hidden = true;
  }
});
