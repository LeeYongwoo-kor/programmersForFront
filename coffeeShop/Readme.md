## https://programmers.co.kr/skill_check_assignments/199

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
    "moduleResolution": "node",
    // ...
    "module": "commonjs",
    "target": "ESNext"
  },
  "exclude": ["node_modules"],
  "include": ["./routes/mock/products/*.ts"]
}
```

---

If you want to use fetch in server(nodejs) ↓

- 10. npm install node-fetch@2.6.7
- 11. npm install @types/node-fetch --save-dev

> Instead change the require of index.js, to a dynamic import() which is available in all CommonJS modules
>
> > [Solution Source](https://stackoverflow.com/questions/70541068/instead-change-the-require-of-index-js-to-a-dynamic-import-which-is-available)  
> > It is because of the node-fetch package. As recent versions of this package only support ESM, you have to downgrade it to an older version node-fetch@2.6.7 or lower.
