// Função para detectar se estamos em mobile (ajuste o breakpoint se necessário)
function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Referências aos elementos do DOM
  const prevBtn = document.querySelector('#prev-btn');
  const nextBtn = document.querySelector('#next-btn');
  const book = document.querySelector('#book');
  
  // Número total de páginas (papers)
  const numOfPapers = 7;
  
  /* ====================================================
     Lógica para Desktop (mantém o efeito de virar página)
  ======================================================= */
  
  // Variáveis para o estado do desktop
  let currentDesktopState = 1;
  let maxDesktopState = numOfPapers + 1; // 8 estados para o efeito do livro
  
  // Abre o livro (move o container para o centro)
  function openBook() {
    book.style.transform = "translateX(50%)";
  }
  
  // Fecha o livro (move o container para a extremidade)
  function closeBook(isFirstPage) {
    if (isFirstPage) {
      book.style.transform = "translateX(0%)";
    } else {
      book.style.transform = "translateX(100%)";
    }
  }
  
  // Função para avançar no desktop (com efeitos de flip)
  function goNextDesktop() {
    if (currentDesktopState < maxDesktopState) {
      switch (currentDesktopState) {
        case 1:
          openBook();
          document.getElementById("p1").classList.add("flipped");
          document.getElementById("p1").style.zIndex = 1;
          break;
        case 2:
          document.getElementById("p2").classList.add("flipped");
          document.getElementById("p2").style.zIndex = 2;
          break;
        case 3:
          document.getElementById("p3").classList.add("flipped");
          document.getElementById("p3").style.zIndex = 3;
          break;
        case 4:
          document.getElementById("p4").classList.add("flipped");
          document.getElementById("p4").style.zIndex = 4;
          break;
        case 5:
          document.getElementById("p5").classList.add("flipped");
          document.getElementById("p5").style.zIndex = 5;
          break;
        case 6:
          document.getElementById("p6").classList.add("flipped");
          document.getElementById("p6").style.zIndex = 6;
          break;
        case 7:
          closeBook(false);
          document.getElementById("p7").classList.add("flipped");
          document.getElementById("p7").style.zIndex = 7;
          break;
        default:
          console.error("Estado desconhecido no desktop");
      }
      currentDesktopState++;
    }
  }
  
  // Função para retroceder no desktop (com efeitos de flip)
  function goPreviousDesktop() {
    if (currentDesktopState > 1) {
      switch (currentDesktopState) {
        case 2:
          closeBook(true);
          document.getElementById("p1").classList.remove("flipped");
          document.getElementById("p1").style.zIndex = 7;
          break;
        case 3:
          document.getElementById("p2").classList.remove("flipped");
          document.getElementById("p2").style.zIndex = 6;
          break;
        case 4:
          openBook();
          document.getElementById("p3").classList.remove("flipped");
          document.getElementById("p3").style.zIndex = 5;
          break;
        case 5:
          openBook();
          document.getElementById("p4").classList.remove("flipped");
          document.getElementById("p4").style.zIndex = 4;
          break;
        case 6:
          openBook();
          document.getElementById("p5").classList.remove("flipped");
          document.getElementById("p5").style.zIndex = 3;
          break;
        case 7:
          openBook();
          document.getElementById("p6").classList.remove("flipped");
          document.getElementById("p6").style.zIndex = 2;
          break;
        case 8:
          openBook();
          document.getElementById("p7").classList.remove("flipped");
          document.getElementById("p7").style.zIndex = 1;
          break;
        default:
          console.error("Estado desconhecido no desktop");
      }
      currentDesktopState--;
    }
  }
  
  /* ====================================================
     Lógica para Mobile (exibe uma página por vez)
  ======================================================= */
  
  // Variável para controlar a página atual no mobile (conta de 1 a numOfPapers)
  let currentMobilePage = 1;
  
  // Função para inicializar o modo mobile:
  // - Remove qualquer transformação do container do livro
  // - Reseta o estado para 1 (exibindo a página p1)
  // - Remove efeitos de flip e garante que somente p1 esteja visível
  function initializeMobile() {
    book.style.transform = "none";
    currentMobilePage = 1;
    for (let i = 1; i <= numOfPapers; i++) {
      let paper = document.getElementById("p" + i);
      if (paper) {
        // Remove qualquer classe ou estilo que possa interferir
        paper.classList.remove("flipped");
        paper.style.zIndex = "";
        // Exibe somente a página 1; as demais ficam ocultas
        paper.style.display = (i === 1) ? "block" : "none";
      }
    }
  }
  
  // Função para ir para a próxima página em mobile
  function goNextMobile() {
    if (currentMobilePage < numOfPapers) {
      let currentPaper = document.getElementById("p" + currentMobilePage);
      let nextPaper = document.getElementById("p" + (currentMobilePage + 1));
      if (currentPaper) {
        currentPaper.style.display = "none";
      }
      if (nextPaper) {
        nextPaper.style.display = "block";
      }
      currentMobilePage++;
    }
  }
  
  // Função para ir para a página anterior em mobile
  function goPreviousMobile() {
    if (currentMobilePage > 1) {
      let currentPaper = document.getElementById("p" + currentMobilePage);
      let previousPaper = document.getElementById("p" + (currentMobilePage - 1));
      if (currentPaper) {
        currentPaper.style.display = "none";
      }
      if (previousPaper) {
        previousPaper.style.display = "block";
      }
      currentMobilePage--;
    }
  }
  
  /* ====================================================
     Funções Unificadas para os Botões
  ======================================================= */
  
  function goNext() {
    if (isMobile()) {
      goNextMobile();
    } else {
      goNextDesktop();
    }
  }
  
  function goPrevious() {
    if (isMobile()) {
      goPreviousMobile();
    } else {
      goPreviousDesktop();
    }
  }
  
  // Atribui os eventos aos botões "Anterior" e "Próximo"
  prevBtn.addEventListener("click", goPrevious);
  nextBtn.addEventListener("click", goNext);
  
  // Na carga da página, se estivermos em mobile, inicializa o modo mobile
  if (isMobile()) {
    initializeMobile();
  }

  
