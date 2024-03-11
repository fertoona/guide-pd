import routes from './routes.js';
import { show, hide, createElement } from './helpers.js';

const navigationConstants = {
  navigationListId: 'navigationList',
  navigationResultsId: 'navigationResults',
};

class Navigation {
  constructor(routes, constants) {
    this.routes = routes;
    this.constants = constants;
  }

  init() {
    this.attachCategoryEvents();
  }

  handleCategoryChoose(event, links) {
    const element = event.target;
    const route = element.getAttribute('aria-category');

    if (!route) {
      return;
    }

    links.forEach((link) => {
      link.classList.remove('navigation-list__element_active');
    });

    element.classList.add('navigation-list__element_active');

    const result = routes[route].map((element) => {
      const anchor = createElement('a', element.title, {
        href: element.href,
        target: '_blank',
      });

      const li = createElement('li');

      li.appendChild(anchor);

      return li;
    });

    this.showNavigationResults(result);
  }

  attachCategoryEvents() {
    const list = document.getElementById(this.constants.navigationListId);

    if (!list) {
      return;
    }

    const links = list.querySelectorAll('li');

    if (!links || links.length === 0) {
      return;
    }

    links.forEach((link) => {
      link.onmouseenter = (event) => this.handleCategoryChoose(event, links);
      link.onclick = (event) => this.handleCategoryChoose(event, links);
    });
  }

  showNavigationResults(elements) {
    const list = document.getElementById(this.constants.navigationResultsId);

    if (!list) {
      return;
    }

    if (!list.classList.contains('hide')) {
      hide(list);
    }

    list.innerHTML = '';

    elements.forEach((element) => {
      list.appendChild(element);
    });

    show(list);
  }
}

const navigation = new Navigation(routes, navigationConstants);

navigation.init();
