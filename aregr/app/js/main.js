$(function () {
  // slider
  $('.reviews__slider').slick({
    infinite: false,
    responsive: [
      {
        breakpoint: 876,
        settings: {
          adaptiveHeigt: true
        }
      }
    ]
  });

  // fixed header
  let header = $('#header');
  let top = $('#top');
  let topH = top.innerHeight();
  let scrollPos = $(window).scrollTop();

  $(window).on('scroll load resize', function () {
    topH = top.innerHeight();
    scrollPos = $(this).scrollTop();

    if (scrollPos > topH) {
      header.addClass('fixed');
    } else {
      header.removeClass('fixed');
    }
  });

  // open/close menu {
    $('.header__burger').on('click', function(e) {
      e.preventDefault();
      $('.header__menu').toggleClass('open');
    });
  // close click outside
    $(document).on('click', function(e) {
      if (!$(e.target).closest('.header').length) {
        $('.header__menu').removeClass('open');
      }
      e.stopPropagation();
    });
});

// smooth scroll
const menuLinks = document.querySelectorAll('.header__menu-link[data-scroll]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.scroll && document.querySelector(menuLink.dataset.scroll)) {
      const scrollToBlock = document.querySelector(menuLink.dataset.scroll);
      const scrollToBlockValue = scrollToBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: scrollToBlockValue,
        behavior: 'smooth'
      })
      e.preventDefault();
      document.querySelector('.header__menu').classList.remove('open');
    }
  }
};


