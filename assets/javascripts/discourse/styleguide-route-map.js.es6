export default function() {
  this.route('styleguide', function() {
    this.route('show', { path: ':section' });
  });
};
