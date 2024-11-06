<script setup>
import { ref } from 'vue'

const agreementInfo = ref(false)
const agreementService = ref(false)

const emit = defineEmits(['agreementChanged'])

const updateAgreement = () => {
  emit('agreementChanged', {
    agreementInfo: agreementInfo.value,
    agreementService: agreementService.value
  })
}

const viewTerms = () => {
  alert("여기에 전체 약관 내용을 모달로 보여주거나, 별도의 페이지로 이동하도록 구현할 수 있습니다.")
}
</script>

<template>
  <div class="border p-4 rounded-md bg-gray-100">
    <h3 class="text-lg font-semibold mb-2">이용 약관</h3>
    <p class="text-sm mb-4">
      여기에 약관 내용이 들어갑니다. 사용자가 이 내용을 읽고 동의해야 합니다...
    </p>
    <div class="flex items-center space-x-4">
      <label class="flex items-center">
        <input type="checkbox" v-model="agreementService" @change="updateAgreement" />
        <span class="ml-2 text-sm">서비스 약관에 동의합니다.</span>
      </label>
      <label class="flex items-center">
        <input type="checkbox" v-model="agreementInfo" @change="updateAgreement" />
        <span class="ml-2 text-sm">정보 제공 약관에 동의합니다.</span>
      </label>
      <button @click="viewTerms" class="text-blue-500 underline text-sm">자세히 보기</button>
    </div>
  </div>
</template>
