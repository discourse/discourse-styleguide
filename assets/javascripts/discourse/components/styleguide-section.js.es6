import computed from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['styleguide-section'],

  @computed('section', 'title')
  headingTitle(section, title) {
    if (section) {
      return I18n.t(`styleguide.${section}.title`);
    }
    return I18n.t(title);
  }
});
