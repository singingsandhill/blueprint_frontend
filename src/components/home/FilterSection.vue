<script setup>
import { ref } from 'vue';
import { usePolicyStore } from '@/stores/policy';
import { library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { faMapMarkerAlt, faBriefcase, faUser, faMoneyBillWave, faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faMapMarkerAlt, faBriefcase, faUser, faMoneyBillWave, faSearch);

const userData = ref({
    region: '',
    job: '',
    ageRange: '',
    income: '',
    policyName: '',
});

const emit = defineEmits(['filterChanged']);

const policyStore = usePolicyStore();

const getRecommendations = async () => {
    try {
        const filteredPolicies = policyStore.filterPolicies(userData.value);
        emit('filterChanged', filteredPolicies);
    } catch (error) {
        console.error("추천 정책 오류", error);
    }
};
</script>



<template>
    <section class="bg-gray-800 text-white p-4 rounded-lg mt-6 flex flex-col items-center gap-4 md:gap-2 shadow-md w-full md:flex-row md:flex-wrap md:justify-center">
        <!-- Title -->
        <div class="flex items-center space-x-2 bg-[#002842] text-white px-3 py-2 rounded-lg md:rounded-l-lg w-full md:w-auto">
            <i class="fas fa-users"></i>
            <strong class="text-lg font-semibold">나만의 정책</strong>
        </div>

        <!-- 지역 필터 -->
        <div class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto">
            <i class="fas fa-map-marker-alt text-gray-500"></i>
            <select v-model="userData.region" id="region" class="bg-transparent w-full focus:outline-none">
                <option value="">지역</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="부산">부산</option>
                <option value="인천">인천</option>
                <option value="대전">대전</option>
                <option value="대구">대구</option>
                <option value="광주">광주</option>
                <option value="울산">울산</option>
                <option value="세종">세종</option>
                <option value="강원">강원</option>
                <option value="충북">충북</option>
                <option value="충남">충남</option>
                <option value="전북">전북</option>
                <option value="전남">전남</option>
                <option value="경북">경북</option>
                <option value="경남">경남</option>
                <option value="제주">제주</option>
            </select>
        </div>

        <!-- 직업 필터 -->
        <div class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto">
            <i class="fas fa-briefcase text-gray-500"></i>
            <select v-model="userData.job" id="job" class="bg-transparent w-full focus:outline-none">
                <option value="">직업</option>
                <option value="학생">학생</option>
                <option value="무직">무직</option>
                <option value="직장인">직장인</option>
                <option value="자영업">자영업</option>
                <option value="프리랜서">프리랜서</option>
                <option value="(예비)창업자">(예비)창업자</option>
                <option value="일용근로자">일용근로자</option>
                <option value="단기근로자">단기근로자</option>
                <option value="영농종사자">영농종사자</option>
            </select>
        </div>

        <!-- 연령 필터 -->
        <div class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto">
            <i class="fas fa-user text-gray-500"></i>
            <select v-model="userData.ageRange" id="ageRange" class="bg-transparent w-full focus:outline-none">
                <option value="">연령</option>
                <option value="19-24">19~24</option>
                <option value="25-29">25~29</option>
                <option value="30-34">30~34</option>
                <option value="35-39">35~39</option>
                <option value="40">40세 이상</option>
            </select>
        </div>

        <!-- 소득 수준 필터 -->
        <div class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md w-full md:w-auto">
            <i class="fas fa-money-bill-wave text-gray-500"></i>
            <select v-model="userData.income" id="income" class="bg-transparent w-full focus:outline-none">
                <option value="">소득</option>
                <option value="저소득">저소득</option>
                <option value="중소득">중소득</option>
                <option value="고소득">고소득</option>
            </select>
        </div>

        <!-- 정책명 검색 필터 -->
        <div class="flex items-center space-x-2 bg-white text-black p-2 border border-gray-300 rounded-md flex-1 w-full">
            <i class="fas fa-search text-gray-500"></i>
            <input v-model="userData.policyName" type="text" id="policyName" placeholder="정책명을 입력해주세요." class="bg-transparent w-full focus:outline-none">
        </div>

        <!-- 검색 버튼 -->
        <button @click="getRecommendations" class="bg-[#002842] px-4 py-2 rounded-lg w-full md:w-auto flex items-center justify-center">
            <i class="fas fa-search"></i>
            <span class="ml-1">검색</span>
        </button>
    </section>
</template>

