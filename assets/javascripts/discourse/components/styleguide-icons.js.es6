export default Ember.Component.extend({
  tagName: "section",
  classNames: ["styleguide-icons"],
  iconIDs: [],
  didInsertElement() {
    this._super(...arguments);

    Ember.run.later(() => {
      var IDs = $("#svg-sprites symbol")
        .map(function() {
          return this.id;
        })
        .get();

      this.set("iconIDs", IDs);
    }, 2000);
  }
});
