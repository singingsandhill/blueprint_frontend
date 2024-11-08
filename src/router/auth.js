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
        path: "/member/mypage",
        name: "mypage",
        component: () => import("../views/auth/MyPage.vue"),
    },
    {
        path: "/member/changepassword",
        name: "changepassword",
        component: () => import("../views/auth/ChangePasswordPage.vue"),
    },
    {
        path: "/member/find/memberId",
        name: "findMemberId",
        component: () => import("../views/auth/FindMemberId.vue"),
    },
    {
        path: "/member/find/password",
        name: "findPassword",
        component: () => import("../views/auth/FindPassword.vue"),
    },
];
