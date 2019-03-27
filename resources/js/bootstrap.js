import Vue from 'vue';
import { dom, config, library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar, faSyncAlt, faArrowLeft, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import Loading from './Components/Loading';
import Notifications from 'vue-notification';
import form from './form';

library.add(faGithub, faTwitter, faStar, faSyncAlt, faArrowLeft, faCircleNotch, faTimes);
Vue.component('Fa', FontAwesomeIcon);
config.searchPseudoElements = true;
dom.watch();

Vue.use(Notifications);

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response === undefined || error.request.status === 500) {
        form.fail();
    }
    return Promise.reject(error);
});

Vue.component('Loading', Loading);