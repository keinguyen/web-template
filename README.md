WEB TEMPLATE
===================

Web template use es6, pug, scss

## 1. Installation
```bash
npm i
```

## 2. Configuration
- Every configuration is stored in `./gulpfile.js/config/**`

## 3. Constructor
```bash
src/
|   assets/
|   |   # All files and folders (except site folder) will be copied to /dist
|   |   favicon/
|   |    # All content in this folder will be copied direct to /dist
|   |
|   |
|   scrips/
|   |   _lib/
|   |   |   # Store custom libraries,
|   |   |   #   which cannot be downloaded through npm
|   |   |
|   |   |
|   |   |
|   |   *.js # These files is the entry file to compile with webpack
|   |
|   |
|   styles/
|   |   _*/
|   |   |   # Every files in folders have start name, is _,
|   |   |   #   won't be compiled.
|   |   |   # It only use to store many libraries or variables
|   |   |
|   |   |
|   |   $*/
|   |   |   # Every files in folders have start name, is $,
|   |   |   #   won't be compiled.
|   |   |   # It only use to merge into apps.css
|   |   |
|   |   |
|   |   ... # Others will be compiled to /dist/css/
|   |
|   |
|   views/
|       _*/
|       |   # Every files in folders have start name, is _,
|       |   #   won't be compiled.
|       |   # It only use to store many reusable components
|       |
|       |
|       $*/
|       |   # Every files in folders have start name, is $,
|       |   #   won't be compiled.
|       |   # It only use to store many main/page components
|       |
|       |
|       ... # Others will be compiled to /dist/
|
|
gulpfile.js/
|   .... # Manage build tasks and configuration
|
|
server/
|   .... # Manage server side render views
|
|
dist/
|   # Store compiled html, css, js (production build)
|
|
static/
|   # Store compiled css, js (work on dev)
|
|
.browserslistrc
.eslintrc.js
.gitignore
.gitattributes
index.html
package.json
README.md
```


## 4. Tasks
- `npm start`: Shorthand for `npm run dev`
- `npm run dev`: Build Project + Watch + Node Server
- `npm run build`: Build Project (min)
- `npm run serve`: Run production local server


## 5. Pug global variables
- `$translator`: object variable get value from `app/locales/#{lang}.json`
- `$localeName`: variable get value equal name of current using locale json


## 6. JS Dynamic import path (chunks files)
At `src/views/_layouts/layout.pug`, there is a script with variable `staticJsAssetsPath`, update that variable to server js path, and it will load correctly chunks files


## 7. Single language mode
Just remove folder `src/locales`


## 8. Site favicon
Use this online tool: https://realfavicongenerator.net/ to get the site favicon package and put it in `app/assets/site`
