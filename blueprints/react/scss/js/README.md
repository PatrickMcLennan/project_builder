## Generated with project_builder

#### To Run

_IMPORTANT_ - This assumes you have an entry level grasp of both React and Webpack. There is nothing at all you need to tweak with the set up you have here, but to get the absoulte best results out of this it is advised to build upon the configuration provided. If you are brand new to React or Webpack, you might have an easier time with a tool such a Create React App. Otherwise, the React and Webpack docs each provide fantastic insights into each step of the process that `project_builder` has laid out here.

`npm start` will start the Webpack Dev server on port 8080 and open a new Chrome tab pointed to that location. This has hot-reloading baked in, so anytime you make a change to a `js`, `jsx` or `scss` file _that has been imported into main bundle_ the Dev Server will reload and you will see the changes.

`npm run build` will bundle and minify your code. JS will be transpiled to ES5, css will be autoprefixed to the last 10 versions and everything will be minified. project_builder utilizes Webpacks hashing system, meaning that on build only changed files will rebuild their bundles. This allows you to keep files cached in Users browsers longer and ultimately deliver changes faster.

project_builder has already seperated out `react`'s source code for you into its own bundle. It is advised that you do so for each package you install that is needed during your applications runtime.

---

You shouldn't need anything other than the 2 commands provided.
