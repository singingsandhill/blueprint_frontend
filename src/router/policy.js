export default [
    {
        path: "/policy",
        name: "policy",
        component: () => import("../views/policy/PolicyRecommandPage.vue"),
    },
    {
        path: "/policy/detail/:idx",
        name: "PolicyDetail",
        component: () => import("../views/policy/PolicyDetailPage.vue"),
        props: true,
    },
];
