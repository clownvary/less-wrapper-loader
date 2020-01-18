import path from 'path';
import find from 'lodash/find';
import isRegExp from 'lodash/isRegExp';

function wrapContent (content, nameSpace, dir) {
  let wrapName = '';
  let result = content;
  if (isRegExp(nameSpace)) {
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

function lessWrapperLoader (content) {
  const defaultOptions = {
    nameSpace: /less/g, // Determine what prefix name should be added at content, support string/regex,
    whitePathList: [] // Just prefix file which it's path contains one of the white list value
  };
  const { resourcePath, query } = this;
  const options = { ...defaultOptions, ...query };
  const { nameSpace, whitePathList } = options;
  const { dir } = path.parse(resourcePath);
  let result = content;

  if (whitePathList && whitePathList.length > 0) {
    const isWhitePath = !!find(whitePathList, (item) => {
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

export default lessWrapperLoader;
