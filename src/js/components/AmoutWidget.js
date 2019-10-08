import { select, settings } from '../settings.js';
import BaseWidget from './BaseWidget.js';


class AmountWidget extends BaseWidget{
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);

    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.initActions();

    //console.log('AmountWidget:', thisWidget);
    //console.log('constructor arguments:', element);
  }

  getElements() {
    const thisWidget = this;

    
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.input.hoursAmount = thisWidget.dom.input.querySelector(select.booking.hoursAmount);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  parseValue(value) {
    return parseFloat(value);
  }

  isValid(value){
    return !isNaN(value)
    && value >= settings.amountWidget.defaultMin 
    && value <= settings.amountWidget.defaultMax;
  }

  renderValue() {
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value;
    //console.log(thisWidget.dom.input.value );

  }

  initActions() {
    const thisWidget = this;
    let set = settings.amountWidget.defaultSet;

    if (thisWidget.dom.input.getAttribute(select.widgets.amount.name) == settings.amountWidget.hoursAmountName) {
      set = settings.amountWidget.hoursSet;
    }
       
    thisWidget.dom.input.addEventListener('change', function () {
      //thisWidget.setValue(thisWidget.dom.input.value);
      thisWidget.value = thisWidget.dom.input.value;
      //console.log(thisWidget.value)
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function () {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - set);
      //console.log(thisWidget.value)
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function () {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value + set);
      //console.log(thisWidget.value)
    });
  }
}

export default AmountWidget;