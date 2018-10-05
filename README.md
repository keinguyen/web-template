WEB TEMPLATE
===================

Web template use es6, pug, scss, bootstrap

## 1. Installation
```bash
npm i -g gulp-cli
npm i
```

## 2. Configuration
- Every configuration is stored in `./config/**`

## 3. Constructor
```bash
app/
|   assets/
|   |   # All files and folders (except site folder) will be copied to /dist
|   |   site/
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
|   |   apps.js # This file is the entry file to compile with webpack
|   |   polyfill.js # This file is the polyfill for IE
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
build/
|   .... # Manage build tasks
|
|
server/
|   .... # Manage server side render views
|
|
dist/
|   # Store compiled html, css, js
|
.gitignore
.gitattributes
gulpfile.js # Run tasks/scripts
package-lock.json
package.json
README.md
```


## 4. Tasks
- `npm start`: Shorthand for `npm run dev`
- `npm run dev`: Build Project + Watch + Node Server
- `npm run build`: Build Project (min)
- `npm run deploy`: Build Project + Deploy to FTP
- `npm run upload`: Build Project + Deploy to gh-pages


## 5. Pug global variables
- `translate`: object variable get value from `app/locales/#{lang}.json`
- `$localeName`: variable get value equal name of current using locale json


## 6. Site favicon
Use this online tool: https://realfavicongenerator.net/ to get the site favicon package and put it in `app/assets/site`
