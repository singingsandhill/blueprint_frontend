<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const isLogin = computed(() => authStore.isLoggedIn);
const memberName = computed(() =>
  authStore.member ? authStore.member.memberName : ""
);

const isNavShow = ref(false);
const toggleNavShow = () => (isNavShow.value = !isNavShow.value);

const handleLogout = () => {
  authStore.logout();
  isNavShow.value = false;
};
</script>

<template>
  <nav class="bg-[#002842] text-white shadow-lg rounded-xl z-50 relative">
    <div class="container mx-auto px-8 flex justify-between items-center h-16">
      <!-- 로고와 메뉴 (좌측 정렬) -->
      <div class="flex items-center space-x-4">
        <router-link to="/" class="flex items-center mr-8">
          <img src="@/assets/003_1.png" alt="청사진 로고" class="w-48 h-auto" />
        </router-link>

        <ul
          class="hidden lg:flex space-x-12 md:space-x-12 md:text-base py-2"
        >
          <li class="list-none py-2">
            <router-link
              to="/policy"
              class="text-white hover:text-gray-300 transition-colors duration-200 py-2"
            >
              정책
            </router-link>
          </li>
          <li class="list-none py-2">
            <router-link
              to="/subscription"
              class="text-white hover:text-gray-300 transition-colors duration-200 py-2"
            >
              청약
            </router-link>
          </li>
          <li class="list-none py-2">
            <router-link
              to="/realestate"
              class="text-white hover:text-gray-300 transition-colors duration-200 py-2"
            >
              부동산
            </router-link>
          </li>
          <li class="list-none py-2">
            <router-link
              to="/finance"
              class="text-white hover:text-gray-300 transition-colors duration-200 py-2"
            >
              금융
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 우측: 계정 메뉴 -->
      <div
        class="hidden lg:flex space-x-8 md:space-x-12 items-center md:text-base py-2"
      >
        <li class="list-none py-2">
          <router-link
            to="/member/myService"
            class="text-white hover:text-gray-200 transition-colors duration-200 py-4"
          >
            나만의 서비스
          </router-link>
        </li>
        <template v-if="isLogin">
          <router-link
            to="/member/mypage"
            class="text-white hover:text-gray-200 py-4"
          >
            {{ memberName }}
          </router-link>
          <router-link
            to="/"
            @click.prevent="handleLogout"
            class="text-white hover:text-gray-300 py-4"
          >
            로그아웃
          </router-link>
        </template>
        <template v-else>
          <router-link
            to="/member/login"
            class="text-white hover:text-gray-300 py-4"
          >
            로그인
          </router-link>
          <router-link
            to="/member/register"
            class="text-white hover:text-gray-300 py-4"
          >
            회원가입
          </router-link>
        </template>
      </div>

      <!-- 모바일 햄버거 메뉴 버튼 -->
      <button
        class="lg:hidden p-3 hover:bg-[#002842] rounded-lg transition-colors duration-200"
        type="button"
        @click="toggleNavShow"
      >
        <span class="block w-7 h-0.5 bg-white mb-1.5"></span>
        <span class="block w-7 h-0.5 bg-white mb-1.5"></span>
        <span class="block w-7 h-0.5 bg-white"></span>
      </button>
    </div>

    <!-- 모바일 전체 화면 메뉴 -->
    <div
      v-if="isNavShow"
      class="fixed inset-0 bg-[#002842] text-white z-50 flex flex-col p-6 space-y-4 overflow-hidden"
    >
      <div class="w-full flex flex-col items-center space-y-4 mb-4">
        <!-- Close Button -->
        <button
          class="text-white text-2xl self-end"
          @click="toggleNavShow"
          aria-label="Close menu"
        >
          <span aria-hidden="true">×</span> <!-- 닫기 아이콘 -->
        </button>

        <router-link to="/" class="flex items-center" @click="toggleNavShow">
          <img src="@/assets/003_1.png" alt="청사진 로고" class="w-56 h-auto mb-2" />
        </router-link>

        <router-link
          v-if="!isLogin"
          to="/member/login"
          class="text-white hover:text-gray-300 mb-8 text-base"
          @click="toggleNavShow"
        >
          <strong>로그인을 해 주세요</strong>
        </router-link>
        <span v-else class="text-white mb-8">
          <router-link to="/member/mypage" class="text-white text-base"
            @click="toggleNavShow">
            <strong>{{ memberName }} 님</strong>
          </router-link>
        </span>
      </div>

      <!-- 모바일 메뉴 항목 리스트 -->
      <ul class="w-full space-y-6 text-center">
        <li class="border-b border-gray-600 py-2">
          <br>
          <router-link
            to="/member/myService"
            class="text-white hover:text-gray-300 transition-colors duration-200 text-base"
            @click="toggleNavShow"
          >
            나만의 서비스
          </router-link>
        </li>
        <br>
        <li class="border-b border-gray-500 py-2">
          <router-link
            to="/policy"
            class="text-white hover:text-gray-300 transition-colors duration-200 text-base"
            @click="toggleNavShow"
          >
            정책
          </router-link>
        </li>
        <li class="border-b border-gray-600 py-2">
          <router-link
            to="/subscription"
            class="text-white hover:text-gray-300 text-base transition-colors duration-200"
            @click="toggleNavShow"
          >
            청약
          </router-link>
        </li>
        <li class="border-b border-gray-600 py-2">
          <router-link
            to="/realestate"
            class="text-white hover:text-gray-300 text-base transition-colors duration-200"
            @click="toggleNavShow"
          >
            부동산
          </router-link>
        </li>
        <li class="border-b border-gray-600 py-2">
          <router-link
            to="/finance"
            class="text-white hover:text-gray-300 text-base transition-colors duration-200"
            @click="toggleNavShow"
          >
            금융
          </router-link>
        </li>
      </ul>

      <div class="flex flex-col text-center space-y-6">
        <template v-if="isLogin">
          <div class="border-b border-gray-600 py-2">
            <router-link
              to="/"
              @click.prevent="handleLogout"
              class="text-white hover:text-gray-300 text-base transition-colors duration-200"
            >
              로그아웃
            </router-link>
          </div>
        </template>
        <template v-else>
          <div class="border-b border-gray-600 py-2">
            <router-link
              to="/member/register"
              class="text-white hover:text-gray-200 transition-colors duration-200"
              @click="toggleNavShow"
            >
              회원가입
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #002842;
}
</style>
