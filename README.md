# badminton_app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Test compile app with the package npm serve
```
// install package 
npm install -g serve

// lunch server 
serve -s path_to_dist_folder
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Installer sass :
```bash
npm install -D sass-loader sass
```

### Install font-awesome
```bash
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/vue-fontawesome@latest-3
```
See [Documentation 1](https://blog.fontawesome.com/how-to-use-vue-js-with-font-awesome/) [Documentation 2](https://fontawesome.com/docs/web/use-with/vue/)
[Icons library](https://fontawesome.com/search?o=r&s=solid%2Cregular&f=classic)

### Install pinia
```bash
npm install pinia
```
### Deploy on github pages
Cf in ```package.json```
```
"deploy": "npm run build ; git add . ; git commit -m 'Deploy'",
"postdeploy": "git push ; git subtree push --prefix dist origin gh-pages"
```

Or run the commands :
```bash
npm run build ; git add . ; git commit -m 'Deploy'
git push ; git subtree push --prefix dist origin gh-pages
```

```;``` is for windows powershell, for Linux, replace by ```&&```