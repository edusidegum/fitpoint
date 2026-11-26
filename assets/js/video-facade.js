/* FITPoint — interações de página.
   1) Fachada de vídeo: nenhuma requisição ao YouTube antes do clique.
   2) Rastreamento de luz (spotlight): custo de composição, sem repaint.
   Página do Distribuidor Independente Herbalife. */
(function () {
  "use strict";

  /* ---------- 1. Fachada de vídeo ----------
     A fachada é um <a href="watch"> no HTML. Com JS, o clique é
     interceptado e o player carrega inline. Sem JS, o link é o
     fallback — único caso em que o visitante sai do site.
     autoplay removido: bloqueado sem mute, deixava a moldura preta. */
  var blocosVideo = document.querySelectorAll("[data-video-id]");

  Array.prototype.forEach.call(blocosVideo, function (bloco) {
    var gatilho = bloco.querySelector("[data-video-play]");
    if (!gatilho) { return; }

    gatilho.addEventListener("click", function (evento) {
      var id = bloco.getAttribute("data-video-id");
      if (!id) { return; }

      evento.preventDefault();

      var titulo = bloco.getAttribute("data-video-titulo") || "Vídeo";

      var iframe = document.createElement("iframe");
      iframe.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + encodeURIComponent(id) +
        "?rel=0&playsinline=1"
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
    });
  });

  /* ---------- 2. Rastreamento de luz ---------- */
  var apontaFino = window.matchMedia("(hover: hover) and (pointer: fine)");
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!apontaFino.matches || reduzMovimento.matches) { return; }

  var celulas = document.querySelectorAll(".celula");
  if (!celulas.length) { return; }

  var pendente = false;
  var ultimoEvento = null;

  function aplicar() {
    pendente = false;
    if (!ultimoEvento) { return; }

    var alvo = ultimoEvento.target && ultimoEvento.target.closest
      ? ultimoEvento.target.closest(".celula")
      : null;
    if (!alvo) { return; }

    var caixa = alvo.getBoundingClientRect();
    alvo.style.setProperty("--mx", (ultimoEvento.clientX - caixa.left) + "px");
    alvo.style.setProperty("--my", (ultimoEvento.clientY - caixa.top) + "px");
  }

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

  /* ---------- 3. Revelação progressiva com fallback ---------- */
  var alvos = document.querySelectorAll(".revelar");
  if (!alvos.length) { return; }

  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(alvos, function (el) {
      el.classList.add("em-vista");
    });
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
})();