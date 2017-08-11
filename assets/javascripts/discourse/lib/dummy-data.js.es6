import NavItem from 'discourse/models/nav-item';

export function createData(store) {
  return {
    options: [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Blue'},
      {id: 3, name: 'Red'},
      {id: 4, name: 'Yellow'},
    ],

    categories: [
      {
        id: 1234,
        name: 'Fruit',
        description_excerpt: "All about various kinds of fruit",
        color: 'ff0',
        slug: 'fruit'
      },
      {
        id: 2345,
        name: 'Vegetables',
        description_excerpt: "Full of delicious vitamins",
        color: 'f00',
        slug: 'vegetables'
      },
      {
        id: 3456,
        name: 'Beverages',
        description_excerpt: "Thirsty?",
        color: '99f',
        slug: 'beverages'
      },
    ].map(c => store.createRecord('category', c)),

    topic: store.createRecord('topic'),

    buttonSizes: [
      { class: 'btn-large', text: 'large'},
      { class: 'btn-medium', text: 'medium'},
      { text: 'small (default)'},
      { class: 'btn-xsmall', text: 'xsmall'},
      { class: 'btn-hover', text: 'hover'},
      { class: 'btn-active', text: 'active'},
      { disabled: true, text: 'disabled'}
    ],

    navItems: ['latest', 'categories', 'top'].map(name => {
      let item = NavItem.fromText(name);
      item.set('href', '#');
      return item;
    })

  };
}
