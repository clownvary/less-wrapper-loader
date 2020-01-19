"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _find = _interopRequireDefault(require("lodash/find"));

var _isRegExp = _interopRequireDefault(require("lodash/isRegExp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapContent(content, nameSpace, dir) {
  let wrapName = '';
  let result = content;

  if ((0, _isRegExp.default)(nameSpace)) {
    if (nameSpace.test(dir)) {
      const matchResults = dir.match(nameSpace);
      wrapName = matchResults[matchResults.length - 1];
    }
  } else {
    wrapName = nameSpace;
  }

  result = `.${wrapName} {\n ${content} \n}`;
  return result;
}

function lessWrapperLoader(content) {
  const defaultOptions = {
    nameSpace: /less/g,
    // Determine what prefix name should be added at content, support string/regex,
    whitePathList: [] // Just prefix file which it's path contains one of the white list value

  };
  const {
    resourcePath,
    query
  } = this;
  const options = { ...defaultOptions,
    ...query
  };
  const {
    nameSpace,
    whitePathList
  } = options;

  const {
    dir
  } = _path.default.parse(resourcePath);

  let result = content;

  if (whitePathList && whitePathList.length > 0) {
    const isWhitePath = !!(0, _find.default)(whitePathList, item => {
      return dir.indexOf(item) !== -1;
    });

    if (isWhitePath) {
      result = wrapContent(content, nameSpace, dir);
    }
  } else {
    result = wrapContent(content, nameSpace, dir);
  }

  return result;
}

var _default = lessWrapperLoader;
exports.default = _default;