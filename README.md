SAPIENT MAF
===================

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
|   |   # All files and folders will be copied to /dist
|   |
|   |
|   scrips/
|   |   _lib/
|   |   |   # Store custom libraries,
|   |   |   #   which cannot be downloaded through npm
|   |   |
|   |   |
|   |   $*/
|   |   |   # Every files in folders have start name, is $,
|   |   |   #   will be compiled & merged to /dist/js/app.js
|   |   |
|   |   |
|   |   ... # Others will be compiled to /dist/js/
|   |
|   |
|   styles/
|   |   _*/
|   |   |   # Every files in folders have start name, is _,
|   |   |   #   won't be compiled.
|   |   |   # It only use to store many reusable components
|   |   |
|   |   |
|   |   $*/
|   |   |   # Every files in folders have start name, is $,
|   |   |   #   will be compiled & merged to /dist/css/app.css
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
config/
|   ...
|   js-lib.js # Define JS library need to be included
|   ...
|
|
dist/
|   # Store compiled html, css, js
|
.gitignore
.npmrc
gulpfile.js # Run tasks/scripts
package.json
README.md
server.js # Run node server
```


## 4. Tasks
- `npm run dev`: Build Project + Watch + Node Server
- `npm run build`: Build Project (min)
- `npm run deploy`: Build Project + Deploy to FTP
- `npm run upload`: Build Project + Deploy to gh-pages


## Pug global variables
- `translate`: object variable get value from `app/locales/#{lang}.json`
- `$localeName`: variable get value equal name of current using locale json
