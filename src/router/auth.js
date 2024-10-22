export default [
    {
        path: "/auth/login",
        name: "login",
        component: () => import("../views/auth/LoginPage.vue"),
    },
    {
        path: "/auth/join",
        name: "join",
        component: () => import("../views/auth/JoinPage.vue"),
    },
    {
        path: "/auth/profile",
        name: "profile",
        component: () => import("../views/auth/ProfilePage.vue"),
    },
    {
        path: "/auth/changepassword",
        name: "changepassword",
        component: () => import("../views/auth/ChangePasswordPage.vue"),
    },
];
