import { select, classNames } from '../settings.js';

class Carousel {
  constructor(wrapper) {
    const thisCarousel = this;

    thisCarousel.carousel = wrapper;
    thisCarousel.carouselCards = document.querySelectorAll(select.home.carouselCard);
    thisCarousel.carouselDots = document.querySelectorAll(select.home.carouselDot);
    thisCarousel.carouselTimer = 3000;
    thisCarousel.cardIndex = 0;


    thisCarousel.changeCard(1);

  }

  displayCard(n) {
    const thisCarousel = this;

    let i;

    if (n > thisCarousel.carouselCards.length) { thisCarousel.cardIndex = 1; }

    for (i = 0; i < thisCarousel.carouselCards.length; i++) {
      thisCarousel.carouselCards[i].classList.remove(classNames.nav.active);
      thisCarousel.carouselDots[i].classList.remove(classNames.nav.active);
    }

    thisCarousel.carouselCards[thisCarousel.cardIndex - 1].classList.add(classNames.nav.active);
    thisCarousel.carouselDots[thisCarousel.cardIndex - 1].classList.add(classNames.nav.active);
  }

  changeCard(n) {
    const thisCarousel = this;

    clearInterval(thisCarousel.carouselTimer);

    thisCarousel.displayCard(thisCarousel.cardIndex += 1);


    n = 0;

    thisCarousel.carouselTimer = setInterval(function () { thisCarousel.changeCard(n + 1); }, 3000);
  }
}

export default Carousel;
