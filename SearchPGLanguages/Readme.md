## https://programmers.co.kr/skill_check_assignments/29

---

- 1. npm install -g express-generator
- 2. express (project)
- 3. npm install
- 4. npm install nodemon --save-dev
- 5. -> "start": "nodemon ./bin/www"
- 6. npm install ejs

---

If you want typescript ↓

- 7. npm install typescript
- 8. npm install ts-node @types/node @types/express --save-dev
- 9. npx tsc --init

> Add option in tsconfig.json :

```js
{
  "compilerOptions": {
    "outDir": "./build/",
    "moduleResolution": "node",
    // ...
    "module": "commonjs",
    "target": "ESNext"
  },
  "exclude": ["node_modules"],
  "include": ["types/*.ts"]
}
```

---

> Let's start server with Typescript

```js
{
  // pacakage.json
  // ...
  "scripts": {
    "start": "nodemon --exec ts-node ./bin/www"
  },
  // ...
}
```

> Issue where Extension(ts) in Browser is not referenced in Express.js server
>
> > [Solution Source](https://www.reddit.com/r/typescript/comments/svv6kt/serving_static_typescript_files_via_express/)  
> > The browser doesn’t understand typescript, you can’t just point it at your index.ts, it needs compiling to JavaScript first. use webpack to compile to js and then serve that. you cant serve raw ts to browser because it wont take it.  
> > <img width="450" alt="180637840-8f586670-130f-4d1f-aacf-a4d2c3f85f6f" src="https://user-images.githubusercontent.com/75498045/205319430-3ade147c-d2d5-491e-8628-72d64051f449.png">

---

> Let's install the webpack

https://webpack.js.org/guides/typescript/

- 10. npm i install -D webpack webpack-cli webpack-dev-server
- 11. npm i install -D clean-webpack-plugin html-webpack-plugin ts-loader
- 12. npm i install -D eslint (If you need this)

---

> Setup config

```js
{
  // pacakage.json
  // ...
  "scripts": {
    "start": "nodemon --exec ts-node ./bin/www",
    "build": "webpack"
  },
  // ...
}
```

```js
{
  // tsconfig.json (must)
  "compilerOptions": {
    "scripts": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "node",
    "esModuleInterop": true,
  },
  "exclude": ["node_modules"],
  "include": ["src/**/*.ts"]
  // ...
}
```

```js
// webpack.config.js (must)
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new CleanWebpackPlugin(),
  ],
};
```

- 13. npm run build

---

> Change script src in index.html to bundle file

```html
<!-- index.html -->
<script src="../dist/bundle.js" type="module"></script>
```
