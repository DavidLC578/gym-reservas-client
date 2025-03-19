import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('@/pages/WelcomePage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
