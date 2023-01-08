- https://school.programmers.co.kr/skill_check_assignments/100

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
    "target": "ES5"
  },
  "exclude": ["node_modules"],
  "include": [
    "./routes/util/*.ts",
  ]
}
```
