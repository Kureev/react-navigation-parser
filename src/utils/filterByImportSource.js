module.exports = function filterByImportSource(sourceName) {
  return node => node.source.value === sourceName;
};
