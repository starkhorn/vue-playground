### Vue.js
* [Vue.js Official Guide](https://vuejs.org/v2/guide/) - as Vue is really simple, I find that the official guide alone is enough to learn it
* [Awesome Vue](https://github.com/vuejs/awesome-vue) - a curated list of awesome things related to Vue.js

### Vuex
Vuex is a state management library for Vue, as our application might contain multiple Vue components, I believe this will be really useful.
* [Vuex Official Guide](http://vuex.vuejs.org/en/intro.html)

### Vue Router
Vue Router is a routing management for Vue.

### Fabric.js
Fabric.js is a HTML5 canvas library, I find it likely that our application will need it since we need to display and edit an image. There are also other alternatives but I find Fabric.js is the right tool for us as it provides object interactivity out of the box.
* [Fabric.js Official Website](http://fabricjs.com/)

### EcmaScript 2015/2016
For modern JavaScript application, we will be using many new features from EcmaScript 2015/2016. To save the headache when seeing some unfamilar syntax such as the following code, please take some time to become familiar with it.
```javascript
methods: {
  fetchFoo(option = {}) {
    const payload = {
      ...options,
      {
        cache: false
      }
    }

    this.$store.dispatch('FETCH_FOO', payload)
      .then(({ foo }) => {
        console.log(`Foo = ${foo}`)
      })
  }
}
```
### CSS Framework
Managing web application layout without a CSS framework is a pain, there are many good CSS frameworks available today. Here are some that I think could be our candidate:
* [Bulma](http://bulma.io/) - Bulma is good for responsive app, as it is based on CSS3 flexbox.
* [Bootstrap](http://getbootstrap.com/) - good old Bootstrap
* [Meterial Design Lite](https://getmdl.io/) - Google-ish material design

### SASS (Optional)
SASS is optional as we might not need complex CSS but since SASS is a CSS superset (normal CSS syntax works with SASS) so if we want to use it, we can simply use it without changing our existing CSS stylesheets.

### Unit Testing Library and Framework
Though we have a very little time window to deliver, we should not neglect our software quality :smirk:

Below are JS unit test libraries that I believe we might use:
* [Karma](http://karma-runner.github.io/)
* [Mocha](https://mochajs.org/)
* [Chai.js](http://chaijs.com/)
* [Sinon.js](http://sinonjs.org/)

### End-to-end Testing Library (Optional)
[Nightwatch.js](http://nightwatchjs.org/) is the recommended library for e2e testing (assumed from the e2e tests generated with vue-cli webpack)
