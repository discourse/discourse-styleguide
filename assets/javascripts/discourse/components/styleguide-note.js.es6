export default Ember.Component.extend({
  classNames: ['styleguide-note'],

  init() {
    this._super();

    let note = this.get('note');
    if (note) {
      this.set('layoutName', `styleguide/${note}`);
    }
  }
});
