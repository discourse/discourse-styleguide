import Topic from 'discourse/models/topic';
import { sectionById } from 'discourse/plugins/discourse-styleguide/discourse/lib/styleguide';

export default Ember.Route.extend({

  model(params) {
    return sectionById(params.section);
  },

  setupController(controller, section) {
    const dummy = {
      options: [
        {id: 1, name: 'Orange'},
        {id: 2, name: 'Blue'},
        {id: 3, name: 'Red'},
        {id: 4, name: 'Yellow'},
      ],
      categories: this.site.get('categories').slice(0, 5),
      topic: Topic.create()
    };

    controller.setProperties({ section, dummy });
  },

  renderTemplate(controller, section) {
    this.render('styleguide.show');
    controller.set('section', section);
    this.render(`styleguide/${section.templateName}`, {into: 'styleguide.show'});
  }

});
