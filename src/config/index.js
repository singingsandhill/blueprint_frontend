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
      icon: ["fas", "scroll"],
    },
    {
      title: "부동산",
      url: "/realestate",
      icon: ["fas", "building"],},
    {
      title: "금융",
      url: "/finance",
      icon: ["fas", "money-bill"],
    },
  ],
  accountMenus: {
    login: {
      url: "/member/login",
      title: "로그인",
      icon: ["far", "user"],
    },
    register: {
      url: "/member/register",
      title: "회원가입",
      icon: ["fas", "user-plus"],
    },
  },
};
