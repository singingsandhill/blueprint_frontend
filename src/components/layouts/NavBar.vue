<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import config from "@/config";
import MenuGroup from "./menu/MenuGroup.vue";
import AccountMenuGroup from "./menu/AccountMenuGroup.vue";

let state = reactive({ isNavShow: false });
let navClass = computed(() =>
    state.isNavShow
        ? "flex justify-center"
        : "hidden"
);
const toggleNavShow = () => (state.isNavShow = !state.isNavShow);

// 햄버거 버튼의 위치를 참조하기 위한 ref 설정
const burgerButton = ref(null);
const sidebarTop = ref("0px");

// 화면 크기를 감지하여 모바일 메뉴가 닫힐 때 배너 위치 초기화
onMounted(() => {
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            state.isNavShow = false;
        }
    });
    
    // 햄버거 버튼 위치 계산
    if (burgerButton.value) {
        const rect = burgerButton.value.getBoundingClientRect();
        sidebarTop.value = `${rect.bottom}px`;  // 버튼 아래쪽 위치로 설정
    }
});
</script>

<template>
    <nav class="bg-[#002842] text-white shadow-lg rounded-xl z-50 relative">
        <div class="container mx-auto px-6 rounded-xl bg-[#002842]">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <!-- 좌측: 로고와 메뉴그룹 -->
                    <router-link 
                        class="text-white py-4 text-2xl font-semibold flex items-center hover:text-gray-200 transition-colors duration-200 mr-8" 
                        to="/"
                    >
                        <i class="fab fa-windows text-white mr-3 text-3xl"></i>
                        청사진
                    </router-link>
     
                    <!-- MenuGroup을 로고 옆으로 -->
                    <div class="hidden md:block">
                        <MenuGroup :menus="config.menus" />
                    </div>
                </div>
     
                <!-- 우측: AccountMenuGroup -->
                <div class="flex items-center">
                    <div class="hidden md:block">
                        <AccountMenuGroup />
                    </div>
                    
                    <!-- 모바일 메뉴 버튼 -->
                    <button
                        ref="burgerButton" 
                        class="md:hidden p-3 hover:bg-[#002842] rounded-lg transition-colors duration-200"
                        type="button"
                        @click="toggleNavShow"
                    >
                        <span class="block w-7 h-0.5 bg-white mb-1.5"></span>
                        <span class="block w-7 h-0.5 bg-white mb-1.5"></span>
                        <span class="block w-7 h-0.5 bg-white"></span>
                    </button>
                </div>
            </div>
        </div>

        <!-- 사이드바 메뉴 (햄버거 버튼 바로 아래에 위치) -->
        <div 
            :class="[navClass, 'md:hidden fixed right-0 bg-[#002842] w-1/3 max-h-64 h-auto shadow-lg z-50 transition-transform transform rounded-lg', state.isNavShow ? 'translate-x-0' : 'translate-x-full']"
            :style="{ top: sidebarTop }"
            id="collapsibleNavbar"
        >
            <div class="flex flex-col py-4 space-y-2 overflow-y-auto">
                <MenuGroup :menus="config.menus" />
                <AccountMenuGroup />
            </div>
        </div>
    </nav>
</template>
