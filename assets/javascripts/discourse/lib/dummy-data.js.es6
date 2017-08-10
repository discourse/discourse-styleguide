import Topic from 'discourse/models/topic';
import NavItem from 'discourse/models/nav-item';

export function createData(site) {
  return {
    options: [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Blue'},
      {id: 3, name: 'Red'},
      {id: 4, name: 'Yellow'},
    ],
    categories: site.get('categories').slice(0, 5),
    topic: Topic.create(),

    buttonSizes: [
      { class: 'btn-large', text: 'large'},
      { class: 'btn-medium', text: 'medium'},
      { text: 'small (default)'},
      { class: 'btn-xsmall', text: 'xsmall'},
      { class: 'btn-hover', text: 'hover'},
      { class: 'btn-active', text: 'active'},
      { disabled: true, text: 'disabled'}
    ],

    navItems: ['latest', 'categories', 'bookmarks', 'read', 'top'].map(name => {
      let item = NavItem.fromText(name);
      item.set('href', '#');
      return item;
    })

  };
}
