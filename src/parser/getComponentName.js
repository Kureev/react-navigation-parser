const walk = require('babylon-walk');
const t = require('babel-types');

module.exports = function getComponents(ast) {
  let defaultExportNode;
  let importsReact = false;
  let hasExport = false;
  let isStatefulComponent = false;

  const visitors = {
    ExportDefaultDeclaration({ declaration }) {
      hasExport = true;
      defaultExportNode = declaration;
    },
    ImportDeclaration({ source }) {
      if (source.value === 'react' || source.value === 'react-native') {
        importsReact = true;
      }
    },
    ImportSpecifier({ imported }) {
      if (imported.name === 'Component') {
        isStatefulComponent = true;
      }
    },
    ClassDeclaration({ superClass }) {
      if (t.isIdentifier(superClass)) {
        if (['PureComponent', 'Component'].indexOf(superClass.name) > -1) {
          isStatefulComponent = true;
        }
      } else if (t.isMemberExpression(superClass)) {
        if (
          superClass.object.name === 'React' &&
          superClass.property.name === 'Component'
        ) {
          isStatefulComponent = true;
        }
      }
    },
  };

  walk.simple(ast, visitors);
  const isReactComponent = importsReact && hasExport;

  if (!isReactComponent) {
    return null;
  }

  if (isStatefulComponent && t.isIdentifier(defaultExportNode)) {
    return defaultExportNode.name;
  }

  return defaultExportNode.id.name;
};
