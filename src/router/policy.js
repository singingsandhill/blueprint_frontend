export default [
  {
    path: "/policy",
    name: "policy",
    component: () => import("../views/policy/PolicyRecommandPage.vue"),
  },

  {
    path: "/policy/:idx",
    name: "policyDetail",
    component: () => import("../views/policy/PolicyDetail.vue"),
  },
];
