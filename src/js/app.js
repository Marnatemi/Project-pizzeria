import { settings, select, classNames } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Carousel from './components/Carousel.js';


export const app = {

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;
    //console.log(pageMatchingHash);

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const cilckedElement = this;
        event.preventDefault();

        /* get page id from href attribute */
        const id = cilckedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;
    //console.log('works');
    /* add class "active" to matching pages, remove from non-matching */

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links, remove from non-matching */

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }

    thisApp.initHeader();
  },

  initHeader: function () {
    const thisApp = this;

    thisApp.cartWrapper = document.querySelector(select.containerOf.cart);
    thisApp.nav = document.querySelector(select.nav.linksWrapper);
    thisApp.home = thisApp.pages[0].getAttribute('class');
    //console.log(thisApp.home);

    thisApp.nav.classList.toggle(classNames.nav.hidden, thisApp.home == classNames.pages.active);
    thisApp.cartWrapper.classList.toggle(classNames.cart.hidden, thisApp.home == classNames.pages.active);
  },

  initCarousel: function () {
    const thisApp = this;

    const carousel = document.querySelector(select.home.carouselWrapper);
    thisApp.carousel = new Carousel(carousel);

  },

  initMenu: function () {
    const thisApp = this;

    //console.log('thisApp.data:', thisApp.data);

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(rawResponse => rawResponse.json())
      .then(parsedResponse => {
        console.log('parsedResponse', parsedResponse);

        thisApp.data.products = parsedResponse;

        thisApp.initMenu();
      });



    //console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  init: function () {
    const thisApp = this;
    //console.log('*** App starting ***');
    //console.log('thisApp:', thisApp);
    //console.log('classNames:', classNames);
    //console.log('settings:', settings);
    //console.log('templates:', templates);

    thisApp.initPages();
    thisApp.initCarousel();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = thisApp.cartWrapper;
    thisApp.cart = new Cart(cartElem);

    thisApp.productLst = document.querySelector(select.containerOf.menu);

    thisApp.productLst.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

  initBooking: function () {
    const thisApp = this;

    const bookingElem = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(bookingElem);
  }
};




app.init();

