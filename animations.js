document.addEventListener("DOMContentLoaded", function () {
  // Função para animação de elementos visíveis na rolagem
  const animatedElements = document.querySelectorAll(".animated");

  function checkIfInView() {
    const triggerBottom = (window.innerHeight / 5) * 4;

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add("in-view");
      } else {
        element.classList.remove("in-view");
      }
    });
  }

  window.addEventListener("scroll", checkIfInView);
  checkIfInView(); // Trigger the function on page load

  // Função para iniciar a animação de digitação e apagamento
  function typeWriter(
    element,
    textArray,
    typeSpeed = 100,
    eraseSpeed = 50,
    delayBetweenWords = 2000
  ) {
    let index = 0;
    let textIndex = 0;
    let isErasing = false;

    function type() {
      if (!isErasing && index < textArray[textIndex].length) {
        element.textContent += textArray[textIndex].charAt(index);
        index++;
        setTimeout(type, typeSpeed);
      } else if (isErasing && index >= 0) {
        element.textContent = textArray[textIndex].substring(0, index);
        index--;
        setTimeout(type, eraseSpeed);
      } else {
        isErasing = !isErasing;
        if (!isErasing) {
          textIndex = (textIndex + 1) % textArray.length;
          setTimeout(type, delayBetweenWords);
        } else {
          setTimeout(type, 500);
        }
      }
    }

    type();
  }

  // Selecionar o elemento com a classe 'especialidade'
  const especialidadeElement = document.querySelector(".especialidade");
  const textArray = [
    "UI / UX DESIGNER",
    "DESENVOLVEDOR FRONT-END",
    "PUBLICITÁRIO",
  ];

  if (especialidadeElement) {
    typeWriter(especialidadeElement, textArray);
  }
});

function showThankYouMessage(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Desabilita o botão de envio e muda o texto para "Enviando..."
  const submitButton = event.target.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  // Envia o formulário via fetch para evitar redirecionamento
  fetch(event.target.action, {
    method: "POST",
    body: new FormData(event.target),
  })
    .then((response) => {
      if (response.ok) {
        // Mostra a mensagem de agradecimento
        document.getElementById("thank-you-message").style.display = "block";
        // Esconde o formulário
        event.target.style.display = "none";
      } else {
        throw new Error("Erro ao enviar o formulário");
      }
    })
    .catch((error) => {
      console.error("Erro ao enviar o formulário:", error);
      alert(
        "Houve um problema ao enviar o formulário. Por favor, tente novamente."
      );
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "CONTATE-ME";
    });
}
