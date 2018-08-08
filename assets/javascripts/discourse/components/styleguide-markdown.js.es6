import { cookAsync } from "discourse/lib/text";

export default Ember.Component.extend({
  didInsertElement() {
    let contents = this.$().html();
    cookAsync(contents).then(cooked => {
      this.$().html(cooked.string);
    });
  }
});
