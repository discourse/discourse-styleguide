import computed from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  tagName: 'section',
  classNameBindings: [':styleguide-section', 'sectionClass'],

  @computed('section')
  sectionClass(section) {
    if (section) {
      return `${section.id}-examples`;
    }
  }
});
