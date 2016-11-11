### Git
Nothing to say here... as it is clear why we need this one. One thing to note when you develop with the app on _Windows_, please ensure linebreaking conversion is enabled.

```
git config --global core.autocrlf true
```

### Node.js
Please ensure you have the updated version of Node.js (currently, the LTS version is 6.9.1). For fresh installation, please refer to [Node.js website](https://nodejs.org/en/download/package-manager)

### Java
While developing, we probably need to deploy the API app on our local environment. The API app is written in Java so please ensure you have Java installed.

### Editor / IDE
You can use any text editor or IDE of your choice, however, the recommended editor is the one that can:

  * read and respect _.editorconfig_ to maintain consistent coding styles between different editors. (see [EditorConfig](http://editorconfig.org/))

  * (optional) lint the file when changed, the project will use ESLint to maintain coding practices so any editor that can automatically run ESLint rules will improve the development experience.

  * (optional) highlight Vue single file component (file.vue) (see [Vue Syntax Highlighting](https://github.com/vuejs/awesome-vue#syntax-highlighting))

Here are some editors I tried out with Vue.js and found quite them quite good:

  * [Atom](https://atom.io/) - Atom currently, in my opinion, provides best support for Vue.js development. It also passes all of the above editor criteria.

  * [Sublime Text](https://www.sublimetext.com/) - Sublime Text is really fast compared to Atom, it also provides lots of customization options through its package manager.

  * [WebStorm](https://www.jetbrains.com/webstorm/) - I only heard that it works with .vue file but linting does not work.

  * [Visual Studio Code](https://code.visualstudio.com/) - the youngest tool developed, I really like it but as of currently it does not fully support Vue.js (could not lint JavaScript on .vue file)
