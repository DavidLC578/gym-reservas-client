import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Welcome',
        component: () => import('@/pages/WelcomePage.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/RegisterPage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
