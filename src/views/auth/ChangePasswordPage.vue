<script setup>
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import authApi from "@/api/authApi";
const router = useRouter();
const auth = useAuthStore();
const changePassword = reactive({
  username: auth.username,
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
});
const disableSubmit = computed(
  () =>
    !changePassword.oldPassword ||
    !changePassword.newPassword ||
    !changePassword.newPassword2
);
const error = ref("");
const inputPassword = () => (error.value = "");
const resetError = () => (error.value = "");
const onSubmit = async () => {
  if (changePassword.newPassword != changePassword.newPassword2) {
    error.value = "새 비밀번호가 일치하지 않습니다.";
    return;
  }
  try {
    await authApi.changePassword(changePassword);
    alert("비밀번호를 수정했습니다.");
    router.push({ name: "mypage" });
  } catch (e) {
    console.log(error);
    console.log(e);
    error.value = e.response.data;
  }
};
</script>
<template>
  <div class="mt-5 mx-auto w-[500px]">
    <h1 class="my-5">비밀번호 변경</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="password" class="block mb-2"> 이전 비밀번호: </label>
        <input
          type="password"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="이전 비밀번호"
          v-model="changePassword.oldPassword"
          @input="inputPassword"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="block mb-2"> 새 비밀번호: </label>
        <input
          type="password"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="새 비밀번호"
          v-model="changePassword.newPassword"
          @input="resetError"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="block mb-2"> 새 비밀번호 확인: </label>
        <input
          type="password"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="새 비밀번호 확인"
          v-model="changePassword.newPassword2"
          @input="resetError"
        />
      </div>
      <div v-if="error" class="text-red-600">{{ error }}</div>
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="disableSubmit"
      >
        확인
      </button>
    </form>
  </div>
</template>
