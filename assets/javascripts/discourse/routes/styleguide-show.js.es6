import Topic from 'discourse/models/topic';

export default Ember.Route.extend({

  model(params) {
    return params.section;
  },

  setupController(controller, section) {
    controller.set('section', section);

    controller.set('options', [
      {id: 1, name: 'Orange'},
      {id: 2, name: 'Blue'},
      {id: 3, name: 'Red'},
      {id: 4, name: 'Yellow'},
    ]);

    controller.set('topic', Topic.create());
  },

  renderTemplate(controller, section) {
    this.render('styleguide.show');
    this.render(`styleguide/${section}`, {into: 'styleguide.show'});
  }

});
