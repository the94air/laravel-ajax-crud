import Vue from 'vue';
import App from './Main/App';
import router from './router';

require('./bootstrap');

const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
});

export default app;
