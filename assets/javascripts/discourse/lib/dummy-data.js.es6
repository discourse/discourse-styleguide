import NavItem from 'discourse/models/nav-item';

let topicId = 0;
let userId = 0;

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

  let createUser = () => {
    userId++;
    return store.createRecord('user', {
      username: `user_${userId}`,
      avatar_template: '/images/avatar.png'
    });
  };

  let createTopic = (attrs) => {
    topicId++;
    return store.createRecord('topic', $.extend({
      id: topicId,
      title: `Example Topic Title ${topicId}`,
      fancyTitle: `Example Topic Title ${topicId}`,
      slug: `example-topic-title-${topicId}`,
      posts_count: ((topicId * 1234) % 100) + 1,
      views: ((topicId * 123) % 1000) + 1,
      like_count: topicId % 3,
      created_at: `2017-03-${topicId}`,
      invisible: false,
      posters: [
        { extras: 'latest', user: createUser() },
        { user: createUser() },
        { user: createUser() },
        { user: createUser() },
        { user: createUser() }
      ],
    }, attrs || {}));
  };

  let topic = createTopic();
  topic.set('category', categories[0]);
  topic.get('details').set('can_create_post', true);


  let invisibleTopic = createTopic({ invisible: true });
  let closedTopic = createTopic({ closed: true });
  closedTopic.set('category', categories[1]);
  let archivedTopic = createTopic({ archived: true });
  let pinnedTopic = createTopic({ pinned: true });
  pinnedTopic.set('category', categories[2]);
  let unpinnedTopic = createTopic({ unpinned: true });
  let warningTopic = createTopic({ is_warning: true });

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
    ],

    buttonStates: [
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
    ],

    sentence: "Donec viverra lacus id sapien aliquam, tempus tincidunt urna porttitor.",
    short_sentence: "Lorem ipsum dolor sit amet.",
    soon: new Date(new Date().getTime() + 100000)
  };

  return _data;
}
