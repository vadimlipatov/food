document.addEventListener("DOMContentLoaded", () => {
  //TABS
  const tabsParent = document.querySelector(".tabheader__items");
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => item.classList.remove("tabheader__item_active"));
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //TIMER
  // const deadline = "2022-09-30 20:29:22";
  //отсчет от текущего времени + 9999999сек
  const deadline = new Date(new Date().getTime() + 99999999);

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    let intId = setInterval(updateClock, 1000);
    updateClock();

    function getZero(el) {
      if (el >= 0 && el < 10) {
        return `0${el}`;
      }
      return el;
    }

    function updateClock() {
      const t = getTimeRemaining(deadline);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(intId);
      }
    }
  }

  setClock(".timer", deadline);

  //MODAL
  const openModalBtns = document.querySelectorAll("[data-modal]");
  const closeModalBtn = document.querySelector("[modal-close]");
  const modal = document.querySelector(".modal");

  function showModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(timerId);
    window.removeEventListener("scroll", showModalByScroll);
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "scroll";
  }

  openModalBtns.forEach((item) => {
    item.addEventListener("click", showModal);
  });

  closeModalBtn.addEventListener("click", closeModal);

  //Fade click -> close modal
  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });
  //Escape click -> close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // const timerId = setTimeout(showModal, 15000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //CARDS OOP
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.classes = classes;
      this.changeToUAH();
      this.parent = document.querySelector(parentSelector);
    }

    changeToUAH() {
      return this.price * this.transfer;
    }

    render() {
      const el = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        el.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => el.classList.add(className));
      }
      el.innerHTML = `
          <img src="${this.src}" alt="${this.alt}">
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
    `;
      this.parent.append(el);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    550,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    430,
    ".menu .container"
  ).render();
}); //end DOMContentLoaded
