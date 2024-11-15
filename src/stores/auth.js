import { defineStore } from "pinia";
import axiosInstance from "@/util/axiosInstance";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    member: null,
    isLoggedIn: !!localStorage.getItem("token"),
  }),

  actions: {
    async login(memberId, password) {
      try {
        const response = await axiosInstance.post("/member/login", {
          memberId,
          password,
        });
        console.log("login API 응답: ", response);
        if (response.data.success) {
          this.token = response.data.response.data.accessToken;
          this.isLoggedIn = true;

          localStorage.setItem("token", this.token);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;

          this.initializeMemberFromToken();

          console.log("로그인 후 member 상태: ", this.member);

          return { success: true };
        } else {
          return { success: false, error: response.data.message };
        }
      } catch (error) {
        console.error("로그인 요청 오류:", error);
        return { success: false, error: "로그인 실패" };
      }
    },

    async register(memberToSend) {
      try {
        const response = await axiosInstance.post(
          "/member/register",
          memberToSend
        );
        console.log("register API 응답: ", response);
        if (response.data.success) {
          this.token = response.data.response.data.accessToken;
          this.isLoggedIn = true;

          localStorage.setItem("token", this.token);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.token}`;

          this.initializeMemberFromToken();

          return { success: true };
        } else {
          return { success: false, error: response.data.message };
        }
      } catch (error) {
        console.error("회원가입 요청 오류:", error);
        return { success: false, error: "회원가입 실패" };
      }
    },

    
    initializeMemberFromToken() {
      if (this.token) {
        try {
          const decoded = jwtDecode(this.token);
          console.log("디코딩된 토큰 내용: ", decoded);
          if (decoded) {
            this.member = {
              uid: decoded.uid,
              memberName: decoded.memberName,
            };
            this.isLoggedIn = true;
            console.log("authStore에 설정된 member: ", this.member);
          } else {
            console.warn("디코딩된 토큰에 사용자 정보가 없습니다.");
          }
        } catch (error) {
          console.error("토큰 디코딩 중 오류:", error);
          this.isLoggedIn = false;
        }
      }
    },

    async fetchMyPage() {
      if (this.token) {
        try {
          const { data } = await axiosInstance.get("/member/mypage", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.member = data.response.data;
          this.isLoggedIn = true;
        } catch (error) {
          console.error("프로필을 가져오는 데 실패했습니다:", error);
          this.isLoggedIn = false;
        }
      }
    },

    async checkMemberId(memberId) {
      try {
        const response = await axiosInstance.get(
          `/member/checkMemberId?memberId=${memberId}`
        );
        return response.data === false;
      } catch (error) {
        console.error("아이디 확인 중 오류 발생:", error);
        return false;
      }
    },

    async checkEmailDuplicate(email) {
      try {
        const response = await axiosInstance.get(
          `/member/checkEmail?email=${email}`
        );
        return response.data === false;
      } catch (error) {
        console.error("이메일 확인 중 오류 발생:", error);
        return false;
      }
    },

    async sendEmailVerification(email) {
      try {
        const response = await axiosInstance.post(
          "/member/email/sendVerification",
          { email }
        );
        return response.data && response.data.success;
      } catch (error) {
        console.error("이메일 인증 코드 전송 중 오류 발생:", error);
        return false;
      }
    },

    async verifyEmailCode(email, code) {
      try {
        const response = await axiosInstance.post(
          "/member/email/verifyEmailCode",
          { email, code }
        );
        return response.data && response.data === true;
      } catch (error) {
        console.error("이메일 인증 코드 확인 중 오류 발생:", error);
        return false;
      }
    },

    logout() {
      this.token = null;
      this.member = null;
      this.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("selectedCity");
      localStorage.removeItem("district");
      localStorage.removeItem("selectedPolicyType");
      localStorage.removeItem("selectedAge");
      localStorage.removeItem("selectedJob");
      localStorage.removeItem("selectedName");
      localStorage.removeItem("page");
      delete axiosInstance.defaults.headers.common["Authorization"];
    },
  },

  getters: {
    isUserLoggedIn() {
      return this.isLoggedIn;
    },
    getMemberName() {
      return this.member ? this.member.memberName : null;
    },
    getUid() {
      return this.member ? this.member.uid : null;
    },
  },
});
