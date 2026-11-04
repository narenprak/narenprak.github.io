// Hell/Dunkel-Schalter: folgt dem System, bis jemand selbst wählt.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var system = window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

  function sync() {
    var dark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-toggle-theme]").forEach(function (b) {
      b.setAttribute("aria-checked", dark ? "true" : "false");
    });
  }

  root.setAttribute("data-theme", stored === "light" || stored === "dark" ? stored : system);

  document.addEventListener("click", function (e) {
    if (!e.target.closest || !e.target.closest("[data-toggle-theme]")) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (err) {}
    sync();
  });
  document.addEventListener("DOMContentLoaded", sync);
  document.addEventListener("htmx:afterSettle", sync);
})();
