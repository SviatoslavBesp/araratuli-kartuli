/*
 * Проверка заданий без сервера.
 *
 * Внутри блока <section class="exercise"> поддерживаются:
 *   <input type="text" data-answer="вариант1|вариант2">  — ввод ответа;
 *       регистр, пробелы по краям и ё/е не учитываются.
 *   <label><input type="radio" name="q1" data-correct> ...</label> — выбор;
 *       правильный вариант помечается атрибутом data-correct.
 *   <span class="answer" hidden>...</span> — ответ, показывается кнопкой.
 *
 * Кнопки «Проверить», «Показать ответы», «Сбросить» добавляются автоматически
 * (в блоке без полей ввода — только «Показать ответы»).
 */
(function () {
  function normalize(s) {
    return s.trim().toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ");
  }

  function check(ex) {
    let total = 0, right = 0;

    ex.querySelectorAll('input[type="text"][data-answer]').forEach(function (inp) {
      total++;
      const ok = inp.dataset.answer.split("|").map(normalize).includes(normalize(inp.value));
      inp.classList.toggle("correct", ok);
      inp.classList.toggle("wrong", !ok);
      if (ok) right++;
    });

    const groups = new Set();
    ex.querySelectorAll('input[type="radio"]').forEach(function (r) { groups.add(r.name); });
    groups.forEach(function (name) {
      total++;
      const radios = ex.querySelectorAll('input[type="radio"][name="' + name + '"]');
      radios.forEach(function (r) { r.parentElement.classList.remove("correct", "wrong"); });
      const chosen = Array.from(radios).find(function (r) { return r.checked; });
      if (!chosen) return;
      const ok = chosen.hasAttribute("data-correct");
      chosen.parentElement.classList.add(ok ? "correct" : "wrong");
      if (ok) right++;
    });

    ex.querySelector(".result").textContent = "Правильно: " + right + " из " + total;
  }

  function show(ex) {
    ex.querySelectorAll(".answer").forEach(function (a) { a.hidden = false; });
    ex.querySelectorAll('input[type="text"][data-answer]').forEach(function (inp) {
      inp.placeholder = inp.dataset.answer.split("|")[0];
    });
    ex.querySelectorAll('input[type="radio"][data-correct]').forEach(function (r) {
      r.parentElement.classList.add("correct");
    });
  }

  function reset(ex) {
    ex.querySelectorAll("input").forEach(function (inp) {
      if (inp.type === "radio") inp.checked = false; else inp.value = "";
      inp.placeholder = "";
      inp.classList.remove("correct", "wrong");
    });
    ex.querySelectorAll("label").forEach(function (l) { l.classList.remove("correct", "wrong"); });
    ex.querySelectorAll(".answer").forEach(function (a) { a.hidden = true; });
    ex.querySelector(".result").textContent = "";
  }

  document.querySelectorAll(".exercise").forEach(function (ex) {
    const actions = document.createElement("div");
    actions.className = "actions";
    const hasInputs = ex.querySelector("input") !== null;
    [["Проверить", check, ""], ["Показать ответы", show, "secondary"], ["Сбросить", reset, "secondary"]]
      .filter(function (b) { return hasInputs || b[1] === show; })
      .forEach(function (b) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = b[0];
        btn.className = b[2];
        btn.addEventListener("click", function () { b[1](ex); });
        actions.appendChild(btn);
      });
    const result = document.createElement("div");
    result.className = "result";
    result.setAttribute("aria-live", "polite");
    ex.append(actions, result);
  });
})();
