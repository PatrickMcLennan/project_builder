## Generated with project_builder

##### To Run

`npm run install`

Use a VS-Code extension such as Live Server on `dist/index.html`.

---

`npm run watch` will start the TypeScript compiler on `./src/es6.ts`, and watch the SCSS within `./src/style.scss`. Their corresponding `./src/app.js` and `./src/style.css` will be updated on each save.

`npm run build` will minify all prefix + minify CSS & JS within `./dist`.

`npm run minify-html` will minify the html within `/dist/index.html` - _it is recommended you get a build tool such as `prettier`, or configure your editor to auto-format so that you can insert this into the `build` command._

---

You shouldn't need anything other than those 2 commands - `build` and `watch` but each step has been broken out into seperate scripts.
