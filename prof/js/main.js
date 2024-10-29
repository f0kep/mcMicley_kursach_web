window.onload = function () {
  setTimeout(function () {
    document.body.classList.add("loaded");
  }, 200);
};

setGuestInLocalStorage();
checkUser();
//Бургер-меню
document.addEventListener("click", documentClick);

function documentClick(e) {
  const targItem = e.target;
  if (targItem.closest(".icon-menu")) {
    document.documentElement.classList.toggle("menu-open");
    document.querySelector("body").classList.toggle("body-scroll");
  }
}

//Свайпер
if (document.querySelector(".body-main__swiper")) {
  var swiper = new Swiper(".body-main__swiper", {
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    speed: 600,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: {
        el: ".swiper-mini",
        slidesPerView: 3,
        spaceBetween: 30,

        // simulateTouch: false,
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
    },
  });

  var swiper = new Swiper(".trend-swiper", {
    slidesPerView: 1,
    speed: 600,
    pagination: {
      el: ".trend-pagination",
      clickable: true,
    },
  });
  var swiper = new Swiper(".customer-swiper", {
    slidesPerView: 1,
    speed: 600,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

//Пагинация
window.addEventListener("load", windowLoad);
function windowLoad() {
  document.addEventListener("click", documentActions);
  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest(".trend__tab")) {
      const tabNavItem = targetElement.closest(".trend__tab");
      if (!tabNavItem.classList.contains("active")) {
        const activeTabNavItem = document.querySelector(".trend__tab.active");
        activeTabNavItem.classList.remove("active");
        tabNavItem.classList.add("active");
        const tabItems = document.querySelectorAll(".trend__content");
        const activeTabItem = document.querySelector(".trend__content.active");
        activeTabItem.classList.remove("active");
        tabItems[getIndex(tabNavItem)].classList.add("active");
      }
    }
  }
  function getIndex(el) {
    return Array.from(el.parentNode.children).indexOf(el);
  }
}
document.addEventListener("click", documentActions);
function documentActions(e) {
  const targetElement2 = e.target;
  if (targetElement2.closest(".our__tab")) {
    const tabNavItem2 = targetElement2.closest(".our__tab");
    if (!tabNavItem2.classList.contains("active")) {
      const activeTabNavItem2 = document.querySelector(".our__tab.active");
      activeTabNavItem2.classList.remove("active");
      tabNavItem2.classList.add("active");
      const tabItems2 = document.querySelectorAll(".our__content");
      const activeTabItem2 = document.querySelector(".our__content.active");
      activeTabItem2.classList.remove("active");
      tabItems2[getIndex2(tabNavItem2)].classList.add("active");
    }
  }
}
function getIndex2(el) {
  return Array.from(el.parentNode.children).indexOf(el);
}

//плавный переход
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

//реакция на скролл
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;

  // Изменение фона при прокрутке до раздела с классом "page__category"
  if (scrollTop > document.querySelector(".header").offsetTop) {
    document.querySelector(".to-top").classList.add("hidden");
    // Изменение фона при прокрутке до раздела с классом "page__trend"
    if (scrollTop > document.querySelector(".advantages").offsetTop) {
      document.querySelector(".to-top").classList.remove("hidden");
    }
  } else {
  }
});

//карты
if (document.getElementById("map-button")) {
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("map-button")
      .addEventListener("click", function () {
        document
          .getElementById("footer-map")
          .classList.toggle("footer-map-visible");
        document.querySelector("body").classList.toggle("body-scroll");
        document.getElementById("cover").classList.toggle("cover-button");
      });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cover").addEventListener("click", function () {
      document
        .getElementById("footer-map")
        .classList.toggle("footer-map-visible");
      document.querySelector("body").classList.toggle("body-scroll");
      document.getElementById("cover").classList.toggle("cover-button");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("button-close")
      .addEventListener("click", function () {
        document
          .getElementById("footer-map")
          .classList.toggle("footer-map-visible");
        document.querySelector("body").classList.toggle("body-scroll");
        document.getElementById("cover").classList.toggle("cover-button");
      });
  });
}

//Гость
async function getCurrentUserData() {
  try {
    const data = localStorage.getItem("currUser");
    if (!data) {
      throw new Error("No data found in localStorage");
    }
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function setGuestInLocalStorage() {
  let currUserData = await getCurrentUserData();
  if (currUserData != null || currUserData != undefined) {
    return;
  }
  localStorage.setItem("currUser", "guest");
}

//Чек пользователя
function checkUser() {
  const data = localStorage.getItem("currUser");
  if (document.querySelector(".page__trend")) {
    if (data == "user") {
      document.querySelector(".page__trend").classList.remove("hidden");
      document.querySelector(".page__our").classList.remove("hidden");
      document.querySelector(".page__customer").classList.add("hidden");
      document.querySelector(".top-header__exits").classList.add("hidden");
      document.querySelector(".top-header__exits2").classList.remove("hidden");
    } else if (data == "admin") {
      document.querySelector(".page__trend").classList.remove("hidden");
      document.querySelector(".page__our").classList.remove("hidden");
      document.querySelector(".page__customer").classList.remove("hidden");
      document.querySelector(".top-header__exits").classList.add("hidden");
      document.querySelector(".top-header__exits2").classList.remove("hidden");
      document.querySelector(".top-header__exits2").classList.remove("hidden");
    } else {
      return;
    }
  }
  if (data == "user") {
  } else if (data == "admin") {
    document.querySelector(".lng-adminmenu").classList.remove("hidden");
  } else {
    return;
  }
}

//логаут
if (document.getElementById("exit")) {
  document.getElementById("exit").addEventListener("click", function () {
    localStorage.setItem("currUser", "guest");
    localStorage.setItem("language", "en");
    location.href = window.location.pathname + "#en";
    localStorage.setItem("theme", "");
    window.location.href = "../../index.html";
  });
}
