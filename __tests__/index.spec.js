import lessWrapperLoader from '../src/index';

describe('less-wrapper-loader:', () => {
  it('should return correct result when namespace is string', () => {
    const result = lessWrapperLoader.call({
      resourcePath: '/jest-mock-cases/src/chapter2/style.less',
      query: {
        nameSpace: 'test-space'
      }
    },
    '.test {color: red}');
    expect(result).toContain('.test-space');
  });

  describe('namespace is regex', () => {
    it('should return wrapped class name when dir path matched regex', () => {
      const result = lessWrapperLoader.call({
        resourcePath: '/jest-mock-cases/src/chapter2/style.less',
        query: {
          nameSpace: /cha/g
        }
      },
      '.test {color: red}');
      expect(result).toContain('.cha');
    });
    it('should not return wrapped class name when dir path not matched regex', () => {
      const result = lessWrapperLoader.call({
        resourcePath: '/jest-mock-cases/src/capter2/style.less',
        query: {
          nameSpace: /cha/g
        }
      },
      '.test {color: red}');
      expect(result).not.toContain('.cha');
    });
  });

  describe('whitePathList', () => {
    it('should return wrapped class name when dir path is in white list', () => {
      const result = lessWrapperLoader.call({
        resourcePath: '/jest-mock-cases/src/chapter2/style.less',
        query: {
          nameSpace: /cha/g,
          whitePathList: ['src']
        }
      },
      '.test {color: red}');
      expect(result).toContain('.cha');
    });
    it('should not return wrapped class name when dir path is not in white list', () => {
      const result = lessWrapperLoader.call({
        resourcePath: '/jest-mock-cases/src/chapter2/style.less',
        query: {
          nameSpace: /cha/g,
          whitePathList: ['test']
        }
      },
      '.test {color: red}');
      expect(result).not.toContain('.cha');
    });
  })
});
