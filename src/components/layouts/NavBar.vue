<script setup>
import { reactive, computed } from "vue";
import config from "@/config";
import MenuGroup from "./menu/MenuGroup.vue";
import AccountMenuGroup from "./menu/AccountMenuGroup.vue";

let state = reactive({ isNavShow: false });
let navClass = computed(() =>
    state.isNavShow
        ? "block"
        : "hidden"
);
const toggleNavShow = () => (state.isNavShow = !state.isNavShow);
</script>

<template>
    <nav class="bg-blue-600 text-white shadow-lg rounded-xl">
        <div class="container mx-auto px-6 rounded-xl bg-blue-700">
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
                        class="md:hidden p-3 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                        type="button"
                        @click="toggleNavShow"
                    >
                        <span class="block w-7 h-0.5 bg-white mb-1.5"></span>
                        <span class="block w-7 h-0.5 bg-white mb-1.5"></span>
                        <span class="block w-7 h-0.5 bg-white"></span>
                    </button>
                </div>
 
                <!-- 모바일 메뉴 -->
                <div 
                    :class="[navClass, 'md:hidden absolute top-16 left-0 right-0 bg-blue-600 w-full shadow-lg z-50']"
                    id="collapsibleNavbar"
                >
                    <div class="flex flex-col py-2">
                        <MenuGroup :menus="config.menus" />
                        <AccountMenuGroup />
                    </div>
                </div>
            </div>
        </div>
    </nav>
 </template>

<style></style>