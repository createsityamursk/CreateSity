(() => {
  const config = window.SITE_CONFIG || {};
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  menuButton?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.textContent = opened ? "×" : "☰";
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) menuButton.textContent = "☰";
  }));

  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => {
      const select = document.querySelector("#service-select");
      if (select) select.value = link.dataset.service;
    });
  });

  const form = document.querySelector("#lead-form");
  const status = document.querySelector("#form-status");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const service = String(data.get("service") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = [
      "Здравствуйте! Хочу обсудить проект на CreateSity.",
      "",
      `Имя: ${name}`,
      `Услуга: ${service}`,
      `Контакт для связи: ${contact}`,
      message ? `Задача: ${message}` : ""
    ].filter(Boolean).join("\n");
    const username = String(config.telegramUsername || "").replace(/^@/, "").trim();
    const url = username
      ? `https://t.me/${encodeURIComponent(username)}?text=${encodeURIComponent(text)}`
      : `https://t.me/share/url?url=${encodeURIComponent(location.href.split("#")[0])}&text=${encodeURIComponent(text)}`;
    status.textContent = username
      ? "Открываем Telegram. Проверьте сообщение и отправьте его."
      : "Открываем Telegram. Выберите чат получателя и отправьте подготовленное сообщение.";
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
})();
