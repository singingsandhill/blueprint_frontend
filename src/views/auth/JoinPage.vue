<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import authApi from "@/api/authApi";
const auth = useAuthStore();
const router = useRouter();
const avatar = ref(null);
const checkError = ref("");
const member = reactive({
  // 테스트용 초기화
  username: "",
  email: "",
  password: "",
  password2: "",
  avatar: null,
});
const disableSubmit = ref(true);
// username 중복 체크
const checkUsername = async () => {
  if (!member.username) {
    return alert("사용자 ID를 입력하세요.");
  }
  disableSubmit.value = await authApi.checkUsername(member.username);
  console.log(disableSubmit.value, typeof disableSubmit.value);
  checkError.value = disableSubmit.value
    ? "이미 사용중인 ID입니다."
    : "사용가능한 ID입니다.";
};
// username 입력 핸들러
const changeUsername = () => {
  disableSubmit.value = true;
  if (member.username) {
    checkError.value = "ID 중복 체크를 하셔야 합니다.";
  } else {
    checkError.value = "";
  }
};
const join = async () => {
  if (member.password != member.password2) {
    return alert("비밀번호가 일치하지 않습니다.");
  }
  if (avatar.value.files.length > 0) {
    member.avatar = avatar.value.files[0];
  }
  try {
    await authApi.create(member); // 회원가입
    // 로그인 api 호출
    const login_member = {
      username: member.username,
      password: member.password,
    };
    await auth.login(login_member);
    router.push({ name: "home" }); // 회원 가입 성공 시, 첫 페이지로 이동 또는 로그인 페이지로 이동
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <div class="mt-5 mx-auto w-[500px]">
    <h1 class="my-5">
      <i class="fa-solid fa-user-plus"></i>
      회원 가입
    </h1>
    <form @submit.prevent="join">
      <div class="mb-3 mt-3">
        <label for="username" class="block mb-2">
          <i class="fa-solid fa-user"></i>
          사용자 ID:
          <button
            type="button"
            class="px-2 py-0 ml-2 bg-green-600 text-white rounded-md text-sm"
            @click="checkUsername"
          >
            ID 중복 확인
          </button>
          <span :class="disableSubmit ? 'text-blue-600' : 'text-red-600'">{{
            checkError
          }}</span>
        </label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="아이디를 입력해주세요."
          id="username"
          @input="changeUsername"
          v-model="member.username"
        />
      </div>
      <div class="mb-3 mt-3">
        <label for="email" class="block mb-2">
          <i class="fa-solid fa-envelope"></i>
          email
        </label>
        <input
          type="email"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="이메일을 입력해주세요."
          id="email"
          v-model="member.email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="block mb-2">
          <i class="fa-solid fa-lock"></i> 비밀번호:
        </label>
        <input
          type="password"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="비밀번호를 입력해주세요."
          id="password"
          v-model="member.password"
        />
      </div>
      <div class="mb-3">
        <label for="password2" class="block mb-2">
          <i class="fa-solid fa-lock"></i> 비밀번호 확인:
        </label>
        <input
          type="password"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="비밀번호를 확인해주세요."
          id="password2"
          v-model="member.password2"
        />
      </div>
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="disableSubmit"
      >
        <i class="fa-solid fa-user-plus"></i>
        확인
      </button>
    </form>
  </div>
</template>
