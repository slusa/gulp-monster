# gulp-monster
Great gulp monster file with tools such as: sass, autoprefixer, livereload, webserver and other.
Here is the whole default project structure. So just what you have to do, it's go step by step these below points.

1. **npm init**

2. **install all needed packages which are included in package.json or gulpfile.js file**

3. **add .jshintrc file near to the gulpfile.js because it's needed by js gulp task**

4. **general files and directories view:**

```
  - project-name/
  - node_modules/
  - src/
    - styles/
    - styles-opt/ <- created by gulp task
    - scripts/
    - scripts-opt/ <- created by gulp task
    - images/
    - images-opt/ <- created by gulp task
    - index.html
  - gulpfile.js
  - .jshintrc
  - package.json
```  
  
5. **gulp watch**
    
