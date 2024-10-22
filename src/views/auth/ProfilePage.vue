<script setup>
import authApi from "@/api/authApi";
import { useAuthStore } from "@/stores/auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const auth = useAuthStore();
const avatar = ref(null);
const avatarPath = `/api/member/${auth.username}/avatar`;
const member = reactive({
    username: auth.username,
    email: auth.email,
    password: "",
    avatar: null,
});
const error = ref("");
const disableSubmit = computed(() => !member.email || !member.password);
const onSubmit = async () => {
    if (!confirm("수정하시겠습니까?")) return;
    if (avatar.value.files.length > 0) {
        member.avatar = avatar.value.files[0];
    }
    try {
        await authApi.update(member);
        error.value = "";
        auth.changeProfile(member);
        alert("정보를 수정하였습니다.");

        router.go();
    } catch (e) {
        error.value = e.response.data;
    }
};
</script>
<template>
    <div class="mt-5 mx-auto w-[500px]">
        <h1 class="my-3">
            <i class="fa-solid fa-user-gear"></i> 회원 정보
        </h1>
        <form @submit.prevent="onSubmit">
            <div class="mb-3 mt-3">
                <img :src="avatarPath" class="w-16 h-16 rounded-full mr-4" />
                {{ member.username }}
            </div>
            <div class="mb-3 mt-3">
                <label for="email" class="block mb-2">
                    <i class="fa-solid fa-envelope"></i>
                    email
                </label>
                <input
                    type="email"
                    class="w-full px-3 py-2 border rounded-md"
                    placeholder="Email"
                    id="email"
                    v-model="member.email"
                />
            </div>
            <div class="mb-3">
                <label for="password" class="block mb-2">
                    <i class="fa-solid fa-lock"></i>
                    비밀번호:
                </label>
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
                    <i class="fa-solid fa-user-plus"></i>
                    확인
                </button>
                <router-link
                    class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md inline-block"
                    to="/auth/changepassword"
                >
                    <i class="fa-solid fa-lock"></i>
                    비밀번호 변경
                </router-link>
            </div>
        </form>
    </div>
</template>
