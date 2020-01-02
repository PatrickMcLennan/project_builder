## Generated with project_builder

##### To Run

`npm run install`

Use a VS-Code extension such as Live Server on `dist/index.html`.

---

`npm run watch` will watch `src/es6.ts`, `src/style.scss` and `./src/index.pug` for any changes. On save, each will compile into `dist/app.js` with es5, `dist/style.css` with CSS and `dist/index.html` with HTML respectively.

`npm run build` will minify, prefix and es5 everything within `./dist`.

---

You shouldn't need anything other than those 2 commands - `build` and `watch` but each step has been broken out into seperate scripts.
