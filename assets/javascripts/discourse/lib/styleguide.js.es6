let _allCategories = null;
let _sectionsById = {};

export function sectionById(id) {
  // prime cache
  allCategories();

  return _sectionsById[id];
}

function sortSections(a, b) {
  let result = a.priority - b.priority;
  if (result === 0) {
    return a.id < b.id ? -1 : 1;
  }
  return result;
}

export function allCategories() {
  if (_allCategories) { return _allCategories; }

  let categories = {};

  // Find a list of sections based on what templates are available
  Object.keys(Ember.TEMPLATES).forEach(e => {
    let matches = e.match(/styleguide\/(atoms|molecules)\/(\d+\-)?([^\/]+)$/);
    if (matches) {
      let section = {
        id: matches[3],
        priority: parseInt(matches[2] || '100'),
        category: matches[1],
        templateName: e.replace(/^.*styleguide\//, '')
      };
      if (!categories[section.category]) {
        categories[section.category] = [];
      }
      categories[section.category].push(section);
      _sectionsById[section.id] = section;
    }
  });

  _allCategories = [];
  Object.keys(categories).forEach(c => {
    _allCategories.push({
      id: c,
      sections: categories[c].sort(sortSections)
    });
  });

  return _allCategories;
};
