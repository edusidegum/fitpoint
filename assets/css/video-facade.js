/* FITPoint — interações de página.
   1) Fachada de vídeo: nenhuma requisição ao YouTube antes do clique.
   2) Rastreamento de luz (spotlight): composição, sem repaint.
   3) Revelação progressiva com fallback.
   Página do Distribuidor Independente Herbalife. */
(function () {
  "use strict";

  /* ---------- 1. Fachada de vídeo ---------- */
  var blocosVideo = document.querySelectorAll("[data-video-id]");

  function carregarVideo(bloco) {
    var id = bloco.getAttribute("data-video-id");
    var titulo = bloco.getAttribute("data-video-titulo") || "Vídeo";
    if (!id) { return; }

    var iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1"
    );
    iframe.setAttribute("title", titulo);
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");

    bloco.innerHTML = "";
    bloco.appendChild(iframe);
  }

  Array.prototype.forEach.call(blocosVideo, function (bloco) {
    var botao = bloco.querySelector("[data-video-play]");
    if (!botao) { return; }
    botao.addEventListener("click", function () { carregarVideo(bloco); });
  });

  /* ---------- 2. Rastreamento de luz ---------- */
  var apontaFino = window.matchMedia("(hover: hover) and (pointer: fine)");
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (apontaFino.matches && !reduzMovimento.matches) {
    var celulas = document.querySelectorAll(".celula");

    if (celulas.length) {
      var pendente = false;
      var ultimoEvento = null;

      var aplicar = function () {
        pendente = false;
        if (!ultimoEvento || !ultimoEvento.target.closest) { return; }

        var alvo = ultimoEvento.target.closest(".celula");
        if (!alvo) { return; }

        var caixa = alvo.getBoundingClientRect();
        alvo.style.setProperty("--mx", (ultimoEvento.clientX - caixa.left) + "px");
        alvo.style.setProperty("--my", (ultimoEvento.clientY - caixa.top) + "px");
      };

      document.addEventListener("pointermove", function (evento) {
        ultimoEvento = evento;
        if (pendente) { return; }
        pendente = true;
        requestAnimationFrame(aplicar);
      }, { passive: true });

      document.addEventListener("pointerleave", function () {
        Array.prototype.forEach.call(celulas, function (celula) {
          celula.style.removeProperty("--mx");
          celula.style.removeProperty("--my");
        });
      }, { passive: true });
    }
  }

    /* ---------- 3. Revelação progressiva ---------- */
  var alvos = document.querySelectorAll(".revelar");
  if (!alvos.length) { return; }

  var mostrarTudo = function () {
    Array.prototype.forEach.call(alvos, function (el) {
      el.classList.add("em-vista");
    });
  };

  if (!("IntersectionObserver" in window)) {
    mostrarTudo();
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("em-vista");
        observador.unobserve(entrada.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.15 });

  Array.prototype.forEach.call(alvos, function (el) { observador.observe(el); });

  /* Rede de segurança: se algo falhar no observer, libera o conteúdo */
  window.setTimeout(function () {
    var travados = 0;
    Array.prototype.forEach.call(alvos, function (el) {
      if (!el.classList.contains("em-vista")) { travados++; }
    });
    if (travados === alvos.length) { mostrarTudo(); }
  }, 2500);