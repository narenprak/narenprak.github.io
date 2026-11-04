// Hell/Dunkel-Schalter: folgt dem System, bis jemand selbst wählt.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var system = window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  function sync() {
    var current = root.getAttribute("data-theme");
    document.querySelectorAll("[data-set-theme]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set-theme") === current ? "true" : "false");
    });
  }

  root.setAttribute("data-theme", stored === "light" || stored === "dark" ? stored : system);

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set-theme]");
    if (!b) return;
    var next = b.getAttribute("data-set-theme");
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (err) {}
    sync();
  });
  document.addEventListener("DOMContentLoaded", sync);
  document.addEventListener("htmx:afterSettle", sync);
})();
