module.exports = {
    "extends": "standard",
    "env": {
      "node": true,
      "es6": true,
      "jest": true
    },
    "plugins": [
        "standard",
        "promise"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules":{
      "semi": "off"
    }
};