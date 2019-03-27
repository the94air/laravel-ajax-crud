import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './Components/Items/Index';
import Create from './Components/Items/Create';
import Show from './Components/Items/Show';
import Edit from './Components/Items/Edit';
import Delete from './Components/Items/Delete';
import NotFound from './Components/NotFound';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index, name: 'items.index', },
    { path: '/create', component: Create, name: 'items.create', },
    { path: '/:id', component: Show, name: 'items.show', },
    { path: '/:id/edit', component: Edit, name: 'items.edit', },
    { path: '/:id/delete', component: Delete, name: 'items.delete', },
    { path: '*', component: NotFound, name: '404', },
];

const router = new VueRouter({
    routes
});

export default router;
