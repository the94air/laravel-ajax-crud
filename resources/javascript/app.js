import Vue from 'vue';
import App from './App/App';
import router from './router';

require('./bootstrap');

const app = new Vue({
    el: '#app',
    router,
    render: h => h(App),
});

export default app;
