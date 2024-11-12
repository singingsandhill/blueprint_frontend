export default [
    {
        path: "/subscription",
        name: "subscription",
        component: () => import("../views/subscription/HouseSubscriptionPage.vue"),
    },
    {
        path: "/realestate",
        name: "realestate",
        component: () => import("../views/subscription/RealEstatePage.vue"),
        props: true,
    },
];
