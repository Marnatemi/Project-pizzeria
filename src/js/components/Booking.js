import { select, templates } from '../settings.js';
import utils from '../utils.js';
import AmountWidget from './AmoutWidget.js';
import DatePicker from './DatePicker.js';

class Booking {
	constructor(element) {

		const thisBooking = this;

		thisBooking.render(element);
		thisBooking.initWidgets();
	}

	render(element) {
		const thisBooking = this;

		const generatedHTML = templates.bookingWidget();

		thisBooking.element = utils.createDOMFromHTML(generatedHTML);

		const generatedDOM = thisBooking.element;

		thisBooking.dom = {};

		thisBooking.dom.wrapper = element;

		thisBooking.dom.wrapper.appendChild(generatedDOM);

		thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
		thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
		thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
	}

	initWidgets() {
		const thisBooking = this;

		thisBooking.dom.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
		thisBooking.dom.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
		thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
	}
}

export default Booking;