document.addEventListener("DOMContentLoaded", () => {
  // Элементы мобильного меню
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  // Открытие и закрытие мобильного меню
  if (menuToggle && mainNav) {
    const closeMenu = () => {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
    };

    const openMenu = () => {
      menuToggle.classList.add("active");
      mainNav.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Закрыть меню");
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Закрываем меню после перехода по ссылке
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Закрываем меню клавишей Escape
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuToggle.getAttribute("aria-expanded") === "true"
      ) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Закрываем меню при переходе на десктопную ширину
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }

  // Плавная прокрутка к секциям страницы
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      // Обновляем адрес страницы без резкого прыжка
      if (window.location.hash !== targetId) {
        history.pushState(null, "", targetId);
      }
    });
  });

  // Актуальный год в футере
  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Появление элементов при прокрутке
  const revealElements = document.querySelectorAll(
    ".feature-card, .pricing-card, .workflow-step",
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Демо-обработка кнопок тарифов
  const pricingButtons = document.querySelectorAll(".pricing-card .pricing-button");

  pricingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const planCard = button.closest(".pricing-card");
      const planName =
        planCard?.querySelector("h3")?.textContent.trim() || "выбранный тариф";

      console.info(`Выбран ${planName}. Это демонстрационная функция.`);
    });
  });

  // Демо-обработка основной CTA-кнопки
  const ctaLinks = document.querySelectorAll('.cta-section a[href="#pricing"]');

  ctaLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.info(
        "CTA нажата.",
      );
    });
  });
});
