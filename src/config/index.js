export default {
  title: "청사진", // 메인 타이틀
  subtitle: "정책 추천 서비스", // 서브 타이틀
  menus: [
    // 메인 메뉴 구성 정보
    {
      title: "정책",
      url: "/policy",
      icon: "fa-solid fa-paste",
    },
    {
      title: "청약",
      url: "/subscription",
      icon: "fas fa-building",
    },
    {
      title: "금융",
      url: "/economy",
      icon: "fa-solid fa-money-bill-1",
    },
  ],
  accountMenus: {
    // 인증 관련 메뉴 정보
    login: {
      url: "/auth/login",
      title: "로그인",
      icon: "far fa-user",
    },
    join: {
      url: "/auth/join",
      title: "회원가입",
      icon: "fa-solid fa-user-plus",
    },
  },
};
