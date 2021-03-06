const walk = require('babylon-walk');
const t = require('babel-types');

/**
 * This parser doesn't support constructions like
 * export default const Foo = class extends Component or similar
 * If you want to help this project - please, submit a PR
 */

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

  if (t.isCallExpression(defaultExportNode)) {
    if (defaultExportNode.callee.callee.name === 'connect') {
      return defaultExportNode.arguments[0].name;
    }
  }

  if (t.isArrowFunctionExpression(defaultExportNode)) {
    return '';
  }

  return defaultExportNode.id.name;
};
