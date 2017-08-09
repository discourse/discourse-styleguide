export default function() {
  const site = this.site;

  if (site && site.disabled_plugins.indexOf('discourse-styleguide') !== -1) {
    return;
  }

  this.route('styleguide', function() {
    this.route('show', { path: ':category/:section' });
  });
};
