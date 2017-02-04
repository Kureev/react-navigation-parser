module.exports = function filterByCallee(calleeName) {
  return node => node.callee.name === calleeName;
};
