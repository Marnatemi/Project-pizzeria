import { templates} from '../settings.js';

class Home {
  constructor(wrapper){
    const thisHome = this;

    thisHome.render(wrapper);
  }

  render(wrapper) {
    const thisHome = this;

    const generatedHTML = templates.homePage();

    thisHome.dom = {};

    thisHome.dom.wrapper = wrapper;

    thisHome.dom.wrapper.innerHTML = generatedHTML;

  }
}

export default Home;