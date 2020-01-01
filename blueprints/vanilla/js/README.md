## Generated with project_builder

##### To Run

`npm run install`

Use a VS-Code extension such as Live Server on `dist/index.html`.

---

`npm run watch` will watch both `src/es6.js` and `src/style.scss` for any changes and compile into es5 for `dist/app.js` and css for `dist/style.css`.

`npm run build` will minify all prefix + minify CSS & JS within `./dist`.
`npm run minify-html` will minify the html within `/dist/index.html` - _it is recommended you get a build tool such as `prettier`, or configure your editor to auto-format so that you can insert this into the `build` command._

---

You shouldn't need anything other than those 2 commands - `build` and `watch` but each step has been broken out into seperate scripts.
