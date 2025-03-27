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
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/LoginPage.vue')
    },
    {
        path: '/create-class',
        name: 'create-class',
        component: () => import('@/pages/CreateClass.vue')
    },
    {
        path: '/classes',
        name: 'classes',
        component: () => import('@/pages/ClassPage.vue')
    },
    {
        path: '/edit-class/:id',
        name: 'edit-class',
        component: () => import('@/pages/EditClass.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
