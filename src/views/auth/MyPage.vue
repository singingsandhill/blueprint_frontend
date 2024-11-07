<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/util/axiosInstance";

const router = useRouter();
const auth = useAuthStore();

const member = reactive({
  memberName: auth.member?.memberName || "",
  email: auth.member?.email || "",
  password: "",
});

const error = ref("");
const disableSubmit = computed(() => !member.email || !member.password);

const onSubmit = async () => {
  if (!confirm("수정하시겠습니까?")) return;

  try {
    const formData = new FormData();
    formData.append("email", member.email);
    formData.append("password", member.password);

    const response = await axiosInstance.put("/member/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (response.data.success) {
      error.value = "";
      auth.member.email = member.email;
      alert("정보를 수정하였습니다.");
      router.go();
    } else {
      error.value = response.data.message;
    }
  } catch (e) {
    error.value = e.response?.data?.message || "회원 정보 수정 중 오류가 발생했습니다.";
  }
};
</script>

<template>
  <div class="mt-5 mx-auto w-[500px]">
    <h1 class="my-3">회원 정보</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3 mt-3">
        <span>{{ member.memberName }}</span>
      </div>
      <div class="mb-3 mt-3">
        <label for="email" class="block mb-2"> 이메일 </label>
        <input
          type="email"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="Email"
          id="email"
          v-model="member.email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="block mb-2"> 비밀번호 </label>
        <input
          type="password"
          class="w-full px-3 py-2 border rounded-md"
          placeholder="비밀번호"
          id="password"
          v-model="member.password"
        />
      </div>
      <div v-if="error" class="text-red-600">{{ error }}</div>
      <div class="text-center">
        <button
          type="submit"
          class="mt-4 mr-3 px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="disableSubmit"
        >
          확인
        </button>
        <router-link
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md inline-block"
          to="/member/changepassword"
        >
          비밀번호 변경
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
input {
  transition: border-color 0.2s;
}
input:focus {
  border-color: #3b82f6;
}
.disabled:opacity-50 {
  opacity: 0.5;
}
.disabled:cursor-not-allowed {
  cursor: not-allowed;
}
</style>
