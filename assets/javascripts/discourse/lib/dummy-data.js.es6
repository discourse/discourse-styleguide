import NavItem from 'discourse/models/nav-item';

let topicId = 0;

function createTopic(store, attrs) {
  return store.createRecord('topic', $.extend({
    id: topicId++,
    title: `Example Topic Title ${topicId}`,
    fancyTitle: `Example Topic Title ${topicId}`,
    slug: `example-topic-title-${topicId}`,
    posts_count: ((topicId * 1234) % 100) + 1,
    views: ((topicId * 123) % 1000) + 1,
    like_count: topicId % 3,
    created_at: `2017-03-${topicId}`,
    invisible: false
  }, attrs || {}));
}

let _data;

export function createData(store) {
  if (_data) { return _data; }

  let categories = [
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
  ].map(c => store.createRecord('category', c));

  let topic = createTopic(store);
  topic.set('category', categories[0]);
  let invisibleTopic = createTopic(store, { invisible: true });
  let closedTopic = createTopic(store, { closed: true });
  closedTopic.set('category', categories[1]);
  let archivedTopic = createTopic(store, { archived: true });
  let pinnedTopic = createTopic(store, { pinned: true });
  pinnedTopic.set('category', categories[2]);
  let unpinnedTopic = createTopic(store, { unpinned: true });
  let warningTopic = createTopic(store, { is_warning: true });

  console.log(topic.get('category_id'));
  console.log(topic.get('category'));

  _data = {
    options: [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Blue'},
      {id: 3, name: 'Red'},
      {id: 4, name: 'Yellow'},
    ],

    categories,

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
    }),

    topic,
    invisibleTopic,
    closedTopic,
    archivedTopic,
    pinnedTopic,
    unpinnedTopic,
    warningTopic,

    topics: [
      topic,
      invisibleTopic,
      closedTopic,
      archivedTopic,
      pinnedTopic,
      unpinnedTopic,
      warningTopic
    ]
  };

  return _data;
}
