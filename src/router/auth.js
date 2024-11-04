export default [
    {
        path: "/member/login",
        name: "login",
        component: () => import("../views/auth/LoginPage.vue"),
    },
    {
        path: "/member/register",
        name: "register",
        component: () => import("../views/auth/RegisterPage.vue"),
    },
    {
        path: "/member/profile",
        name: "profile",
        component: () => import("../views/auth/MyPage.vue"),
    },
    {
        path: "/member/changepassword",
        name: "changepassword",
        component: () => import("../views/auth/ChangePasswordPage.vue"),
    },
];
