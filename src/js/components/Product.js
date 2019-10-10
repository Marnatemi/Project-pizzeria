import {select, classNames, templates} from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmountWidget.js';

class Product{
  constructor(id, data){
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();

    //console.log('new Product:', thisProduct);
  }

  renderInMenu(){
    const thisProduct = this;

    /* generate HTML based on templete */
    const generatedHTML = templates.menuProduct(thisProduct.data);
    ////console.log(generatedHTML);
    
    /* create element using utils.createElementfromHTML */
    thisProduct.element = utils.createDOMFromHTML(generatedHTML);

    /* find menu container */
    const menuContainer = document.querySelector(select.containerOf.menu);

    /* add element to menu */
    menuContainer.appendChild(thisProduct.element);


  }

  getElements(){
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
    thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
    thisProduct.formInputs = thisProduct.element.querySelectorAll(select.all.formInputs);
    thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
    thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
    thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    thisProduct.amountWidgetElem = thisProduct.element.querySelector(select.menuProduct.amountWidget);
  }

  initAccordion(){
    const thisProduct = this;

    /* START: click event listener to trigger */
    thisProduct.accordionTrigger.addEventListener('click', function(){
      ////console.log('class added on: ', thisProduct.element);

      /* prevent default action for event */
      event.preventDefault();

      /* toggle active class on element of thisProduct */
      thisProduct.element.classList.toggle('active');

      /* find all active products */
      const activeProducts = document.querySelectorAll('article.active');
      ////console.log(activeProducts);

      /* START LOOP: for each active product */
      for(let activeProduct of activeProducts){
        ////console.log(activeProduct);
        /* START: if the active product isn't the element of thisProduct */
        if(activeProduct != thisProduct.element){
          /* remove class active for the active product */
          activeProduct.classList.remove('active');
        /* END: if the active product isn't the element of thisProduct */
        }
      /* END LOOP: for each active product */
      }
    /* END: click event listener to trigger */
    });
  }

  initOrderForm(){
    const thisProduct = this;
    ////console.log(thisProduct.initOrerForm);

    thisProduct.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisProduct.processOrder();
    });
    
    for(let input of thisProduct.formInputs){
      input.addEventListener('change', function(){
        thisProduct.processOrder();
      });
    }
    
    thisProduct.cartButton.addEventListener('click', function(event){
      event.preventDefault();
      thisProduct.processOrder();
      thisProduct.addToCart();
    });
  }

  processOrder(){
    const thisProduct = this;
    ////console.log(thisProduct.processOrder);

    /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */
    const formData = utils.serializeFormToObject(thisProduct.form);
    ////console.log('formData', formData);
    ////console.log('obiekt: ', thisProduct.params);

    thisProduct.params = {};

    /* set variable price to equal thisProduct.data.price */
    let price = thisProduct.data.price;
    ////console.log('price', price);

    /* start loop - for each params element */
    for(let paramId in thisProduct.data.params){
      ////console.log('all params elements:', paramId);

      /* save the element in thisProduct.data.params with key paramId as const param */
      const param = thisProduct.data.params[paramId];
      ////console.log('param: ', param);

      /* start loop - for each param options */
      for(let optionId in param.options){

        /* save the element in param.options with key optionId as const option */
        const option = param.options[optionId];

        const selectedOption = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;

        /* if selected option is not default, raise product price */
        if (selectedOption && !option.default){
          price += option.price;
        }
        
        /* else if default option is not selected, lower product price */
        else if (option.default && !selectedOption){
          price -= option.price;
        }

        const productImages = thisProduct.imageWrapper.querySelectorAll('.' + paramId + '-' + optionId); 
        
        if(selectedOption){
          if(!thisProduct.params[paramId]){
            thisProduct.params[paramId] = {
              label: param.label,
              options: {},
            };
          }
          thisProduct.params[paramId].options[optionId] = option.label;

          for(let productImage of productImages){
            productImage.classList.add(classNames.menuProduct.imageVisible);
          }

        } else {

          for(let productImage of productImages){
            productImage.classList.remove(classNames.menuProduct.imageVisible);
          }
        }

      /* end loop - for each params options */
      }
    /* end loop - for each params elements */
    }
    ////console.log('total price is: ', price);

    /* multiply price by amount */
    thisProduct.priceSingle = price;
    thisProduct.price = thisProduct.priceSingle * thisProduct.amountWidget.value;

    /* set the contents of thisProduct.priceElem to be the value of variable price */
    thisProduct.priceElem.innerHTML = thisProduct.price;

    //console.log('thisProduct.params: ', thisProduct.params);
  }

  initAmountWidget(){
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);

    thisProduct.amountWidgetElem.addEventListener('updated', function(){
      thisProduct.processOrder();
    });
  }

  addToCart(){
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;

    // app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      },
    });

    thisProduct.element.dispatchEvent(event);
  }
}

export default Product;