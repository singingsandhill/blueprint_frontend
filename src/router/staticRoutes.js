export default [
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: () => import('../views/terms/PrivacyPolicy.vue'),
    },
    {
      path: '/terms-of-service',
      name: 'TermsOfService',
      component: () => import('../views/terms/TermsOfService.vue'),
    },
  ];
  