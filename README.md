# badminton_app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

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
### Install Vue Router
```bash
npm install vue-router@4
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

### Base de données : Supabase
#### Install Supabase
```bash
npm install @supabase/supabase-js
```

[Supabase Documentation](https://supabase.com/docs)

Sending mail for user manager (sign up, forget password,...) with Brevo SMTP 
[Brevo SMTP Documentation](https://developers.brevo.com/docs/smtp-integration)
[Supabase custom SMTP Documentation](https://supabase.com/docs/guides/auth/auth-smtp)