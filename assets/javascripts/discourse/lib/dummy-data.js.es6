import NavItem from 'discourse/models/nav-item';

let topicId = 2000000;
let userId = 1000000;

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
      slug: 'beverages',
      read_restricted: true
    },
  ].map(c => store.createRecord('category', c));

  let createUser = attrs => {
    userId++;

    let userData = {
      id: userId,
      username: `user_${userId}`,
      name: 'John Doe',
      avatar_template: '/images/avatar.png',
      website: 'discourse.com',
      website_name: 'My Website is Discourse',
      location: 'Toronto',
      suspend_reason: 'Some reason',
      displayGroups: [
        {name: 'Group 1'},
        {name: 'Group 2'}
      ],
      created_at: moment().subtract(10, 'days'),
      last_posted_at: moment().subtract(3, 'days'),
      last_seen_at: moment().subtract(1, 'days'),
      profile_view_count: 378,
      invited_by: {
        username: 'user_2'
      },
      trustLevel: {name: 'Dummy'},
      publicUserFields: [
        {
          field: {
            dasherized_name: 'puf_1',
            name: 'Public User Field 1'
          },
          value: 'Some value 1'
        },
        {
          field: {
            dasherized_name: 'puf_2',
            name: 'Public User Field 2'
          },
          value: 'Some value 2'
        }
      ]
    };

    Object.assign(userData, attrs || {});

    return store.createRecord('user', userData);
  };

  // This bg image is public domain: http://hubblesite.org/image/3999/gallery
  let user = createUser({
    profile_background: '/plugins/discourse-styleguide/images/hubble-orion-nebula-bg.jpg',
    has_profile_background: true,
  });

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
        { extras: 'latest', user},
        { user: createUser() },
        { user: createUser() },
        { user: createUser() },
        { user: createUser() }
      ],
    }, attrs || {}));
  };

  let topic = createTopic();
  topic.set('category', categories[0]);
  topic.get('details').setProperties({
    can_create_post: true,
    suggested_topics: [ topic, topic, topic ]
  });

  let invisibleTopic = createTopic({ invisible: true });
  let closedTopic = createTopic({ closed: true });
  closedTopic.set('category', categories[1]);
  let archivedTopic = createTopic({ archived: true });
  let pinnedTopic = createTopic({ pinned: true });
  pinnedTopic.set("clearPin", () => pinnedTopic.set("pinned", "unpinned") );
  pinnedTopic.set("rePin", () => pinnedTopic.set("pinned", "pinned") );
  pinnedTopic.set('category', categories[2]);
  let unpinnedTopic = createTopic({ unpinned: true });
  let warningTopic = createTopic({ is_warning: true });

  const bunchOfTopics = [
    topic,
    invisibleTopic,
    closedTopic,
    archivedTopic,
    pinnedTopic,
    unpinnedTopic,
    warningTopic
  ];

  let sentence = "Donec viverra lacus id sapien aliquam, tempus tincidunt urna porttitor.";

  let cooked = `<p>Lorem ipsum dolor sit amet, et nec quis viderer prompta, ex omnium ponderum insolens eos, sed discere invenire principes in. Fuisset constituto per ad. Est no scripta propriae facilisis, viderer impedit deserunt in mel. Quot debet facilisis ne vix, nam in detracto tacimates. At quidam petentium vulputate pro. Alia iudico repudiandae ad vel, erat omnis epicuri eos id. Et illum dolor graeci vel, quo feugiat consulatu ei.</p>

    <p>Case everti equidem ius ea, ubique veritus vim id. Eros omnium conclusionemque qui te, usu error alienum imperdiet ut, ex ius meis adipisci. Libris reprehendunt eos ex, mea at nisl suavitate. Altera virtute democritum pro cu, melius latine in ius.</p>`;

  let transformedPost = {
    id: 1234,
    cooked,
    created_at: moment().subtract(3, 'days'),
    user_id: user.get('id'),
    username: user.get('username'),
    avatar_template: user.get('avatar_template'),
    showLike: true,
    canToggleLike: true,
    canFlag: true,
    canEdit: true,
    canCreatePost: true,
    canBookmark: true,
    canManage: true,
    canDelete: true,
    createdByUsername: user.get('username'),
    createdByAvatarTemplate: user.get('avatar_template'),
    lastPostUsername: user.get('username'),
    lastPostAvatarTemplate: user.get('avatar_template'),
    topicReplyCount: 123,
    topicViews: 3456,
    participantCount: 10,
    topicLikeCount: 14,
    topicLinkLength: 5,
    topicPostsCount: 4,
    participants: [
      createUser(),
      createUser(),
      createUser(),
      createUser()
    ],
    topicLinks: [{
      title: "Evil Trout",
      url: "https://eviltrout.com",
      domain: "eviltrout.com",
      clicks: 1024,
    },
    {
      title: "Cool Site",
      url: "http://coolsite.example.com",
      domain: "coolsite.example.com",
      clicks: 512,
    }]
  };

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

      if (name === 'categories') {
        item.set('styleGuideActive', true);
      }

      return item;
    }),

    topic,
    invisibleTopic,
    closedTopic,
    archivedTopic,
    pinnedTopic,
    unpinnedTopic,
    warningTopic,

    topics: bunchOfTopics,

    sentence,
    short_sentence: "Lorem ipsum dolor sit amet.",
    soon: moment().add(2, 'days'),

    transformedPost,

    user,

    userWithUnread: createUser({
      unread_notifications: 3,
      unread_private_messages: 7
    }),

    lorem: cooked,

    topicTimerUpdateDate: "2017-10-18 18:00",

    categoryNames: categories.map((c) => c.name),

    groups: [
      {name:"staff", id: 1, automatic: false},
      {name:"lounge", id: 2, automatic: true},
      {name:"admin", id: 3, automatic: false},
    ],

    selectedGroups: [1, 2],

    settings: "bold|italic|strike|underline",

    colors: "f49|c89|564897",
  };

  return _data;
}
