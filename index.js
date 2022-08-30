'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const learnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContet = document.querySelectorAll('.operations__content ');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');
const nextBtn = document.querySelector('.next-step');
let currentSlide = 0;
const maxSlide = slides.length - 1;

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;
  const hovered = e.target;
  const siblings = nav.querySelectorAll('.nav__link');
  const logo = nav.querySelector('.nav__logo');
  siblings.forEach(s => {
    if (s === hovered) return;
    s.style.opacity = this;
    logo.style.opacity = this;
  });
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

learnMore.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContet.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

const sectionOvserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

headerObserver.observe(header);

sections.forEach(section => {
  sectionOvserver.observe(section);
  section.classList.add('section--hidden');
});

images.forEach(image => imageObserver.observe(image));

////////SLider/////

const goToSLide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

const nextSlide = function () {
  currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;
  goToSLide(currentSlide);
  activateDots(currentSlide);
};
const previousSlide = function () {
  currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;
  goToSLide(currentSlide);
  activateDots(currentSlide);
};

const createDots = function () {
  slides.forEach((_, i) =>
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;
  const clickedSlide = e.target.dataset.slide;
  goToSLide(clickedSlide);
  activateDots(clickedSlide);
});

const activateDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(d => d.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  goToSLide(0);
  createDots();
  activateDots(0);
};
init();

sliderBtnRight.addEventListener('click', nextSlide);
sliderBtnLeft.addEventListener('click', previousSlide);
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && previousSlide();
});

nextBtn.addEventListener('click', function (e) {
  e.preventDefault();
const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
const fields = document.querySelectorAll(".form__input");
const account = {
  owner: fields[0].value + " " + fields[1].value,
  movements: [1000],
  interestRate: 1.2,
  pin: fields[2].value.substr(0, 4),
  movementsDates: [new Date().toISOString()],
  currency: "EUR",
  locale: navigator.language,
};
accounts.push(account);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  window.location.href = "app.html";
  }
);
/////////////////////////////////////////////////
//////////////

// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');
// cookieMessage.innerHTML =
//   'We use cookies idiot <button class = "btn btn--close--cookie">Got it</button>';
// cookieMessage.style.backgroundColor = '#37383d';
// cookieMessage.style.width = '104%';
// header.prepend(cookieMessage);
// cookieMessage.style.height =
//   Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';
// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', () => cookieMessage.remove());

// learnMore.addEventListener('click', function () {
//   const s1coords = section1.getBoundingClientRect();
//   ES5;
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
//   ES6;
// });
