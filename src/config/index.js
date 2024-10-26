export default {
  title: "청사진",
  subtitle: "정책 추천 서비스",
  menus: [
    {
      title: "정책",
      url: "/policy",
      icon: ["fas", "paste"],
    },
    {
      title: "청약",
      url: "/subscription",
      icon: ["fas", "building"],
    },
    {
      title: "금융",
      url: "/economy",
      icon: ["fas", "money-bill"],
    },
  ],
  accountMenus: {
    login: {
      url: "/auth/login",
      title: "로그인",
      icon: ["far", "user"],
    },
    join: {
      url: "/auth/join",
      title: "회원가입",
      icon: ["fas", "user-plus"],
    },
  },
};
