<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>less-wrapper-loader</h1>
</div>

[![npm](https://img.shields.io/npm/v/less-wrapper-loader.svg)](https://www.npmjs.com/package/less-wrapper-loader)
[![Build Status](https://travis-ci.com/clownvary/wrap-less-loader.svg?branch=master)](https://travis-ci.com/clownvary/wrap-less-loader)
[![codecov](https://codecov.io/gh/clownvary/less-wrapper-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/clownvary/less-wrapper-loader)

Generate a wrapped classname for less files automatically. It's a easy way to resolve style conflicts.

## example

Before :
```css
.name {
  color: red
}

.age {
  color: blue;
}
```

After :
```css
.wrapper .name {
  color: red
}

.wrapper .age {
  color: blue;
}
```

## Getting Started

To begin, you'll need to install `less-wrapper-loader`:

```console
npm install --save-dev less-wrapper-loader
```

1. add loader in webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
        ...
        'less-loader',
        {
          // must be placed before less-loader
          loader: 'less-wrapper-loader',
          options: {
            nameSpace: 'wrapper'
          }
        }
      ]
      },
    ],
  },
};
```

2. add a classname **samed with your less-wrapper-loader namespace** in root container component

```javascript
render() {
    return (
      <div className="wrapper">
        ...
      </div>
}
```

3. run webpack, all less files you used will be wrapped a classname `wrapper` 

## Options

| Name                | Type                    | Default   | Description                                                                                                                                                          |
|:-------------------:|:-----------------------:|:---------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`nameSpace`**     | `{string}` or `{regex}` | `/less/g` | **string:** value will as a namespace wrapped in less file<br/>**regex**: value will test less file path and return matched result as namespace wrapped in less file |
| **`whitePathList`** | `{array[string]}`       | `[]`      | just wrap less  file which it's path contains one of the white list value<br/> <br/>default value will wrap all less files                                                 |



