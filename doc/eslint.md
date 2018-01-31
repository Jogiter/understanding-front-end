## [eslint](http://eslint.org/)

## install

>$ npm install -g eslint
>$ eslint --init
>$ eslint yourfile.js


## links

+	[eslint:recommended](http://eslint.org/docs/rules/)
+	[standard](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)


##	[Integrating with prettier](https://prettier.io/docs/en/eslint.html)

1.安装依赖

```sh
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier
```

2.修改`.eslintrc.js`

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

