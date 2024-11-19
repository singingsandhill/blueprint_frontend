<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import TermsAgreement from '@/components/terms/TermsAgreement.vue';

const router = useRouter();
const auth = useAuthStore();

const member = reactive({
  memberId: '',
  password: '',
  confirmPassword: '',
  memberName: '',
  email: '',
  emailVerificationCode: '',
  gender: '',
  birth: ''
});

const isStrongPassword = ref(false);
const isIdChecked = ref(false);
const isEmailVerified = ref(false);
const disableSubmit = ref(true);
const emailVerificationSent = ref(false);
const passwordStrengthMessage = ref('비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.');
const agreedToTerms = reactive({
  service: false,
  info: false,
});

watch(
  () => ({
    memberId: member.memberId,
    password: member.password,
    confirmPassword: member.confirmPassword,
    memberName: member.memberName,
    email: member.email,
    gender: member.gender,
    birth: member.birth,
    isIdChecked: isIdChecked.value,
    isEmailVerified: isEmailVerified.value,
    agreementService: agreedToTerms.service,
    agreementInfo: agreedToTerms.info,
  }),
  (newValues) => {
    disableSubmit.value = !(
      newValues.memberId &&
      newValues.password &&
      newValues.confirmPassword &&
      newValues.memberName &&
      newValues.email &&
      newValues.gender &&
      newValues.birth &&
      newValues.isIdChecked &&
      newValues.isEmailVerified &&
      newValues.agreementService &&
      newValues.agreementInfo
    );
  },
  { deep: true }
);

const enhancedSecurityPassword = (password) => {
  const minLength = 8;
  const specialChars = /[~!@#$%^&*]/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;

  return (
    password.length >= minLength &&
    specialChars.test(password) &&
    upperCase.test(password) &&
    lowerCase.test(password)
  );
};

const checkPasswordStrength = () => {
  isStrongPassword.value = enhancedSecurityPassword(member.password);
  passwordStrengthMessage.value = isStrongPassword.value
    ? '비밀번호가 강합니다.'
    : member.password.length > 0
      ? '비밀번호가 약합니다.'
      : '대소문자, 숫자, 특수문자를 모두 포함한 8글자 이상이어야 합니다.';
};

const checkId = async () => {
  if (!member.memberId.trim()) {
    alert('아이디를 입력하세요.');
    return;
  }

  const isAvailable = await auth.checkMemberId(member.memberId);
  isIdChecked.value = isAvailable;
  alert(isAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.');
};

const sendEmailVerification = async () => {
  if (!member.email.trim()) {
    alert('이메일을 입력하세요.');
    return;
  }

  const isDuplicate = await auth.checkEmailDuplicate(member.email);
  if (isDuplicate) {
    alert('이미 존재하는 이메일입니다.');
    return;
  }

  const result = await auth.sendEmailVerification(member.email);
  if (result) {
    emailVerificationSent.value = true;
    alert('인증 코드가 발송되었습니다.');
  }
};

const verifyEmailCode = async () => {
  if (!member.emailVerificationCode.trim()) {
    alert('인증 코드를 입력하세요.');
    return;
  }

  const isValidCode = await auth.verifyEmailCode(member.email, member.emailVerificationCode);
  isEmailVerified.value = isValidCode;
  alert(isValidCode ? '이메일 인증 완료' : '인증 코드가 올바르지 않습니다.');
};

const setAgreement = (agreement) => {
  agreedToTerms.service = agreement.agreementService;
  agreedToTerms.info = agreement.agreementInfo;
};

const register = async () => {
  if (member.password !== member.confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  if (!agreedToTerms.service || !agreedToTerms.info) {
    alert('모든 약관에 동의해야 합니다.');
    return;
  }

  if (disableSubmit.value) {
    alert('모든 필드를 작성해 주세요.');
    return;
  }

  const birthYear = member.birth.split('-')[0];
  const birthDate = member.birth;

  const memberToSend = {
    memberId: member.memberId,
    password: member.password,
    memberName: member.memberName,
    email: member.email,
    gender: member.gender,
    birthYear: parseInt(birthYear),
    birth: birthDate,
    agreementService: agreedToTerms.service,
    agreementInfo: agreedToTerms.info,
  };

  try {
    const registerResponse = await auth.register(memberToSend);
    if (registerResponse.success) {
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    } else {
      alert(registerResponse.error || '회원가입에 실패했습니다. 다시 시도하세요.');
    }
  } catch (error) {
    alert('회원가입에 실패했습니다. 다시 시도하세요.');
    console.error('Signup error:', error);
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50 p-4 font-pretendard-regular">
    <div class="w-full max-w-2xl p-8 bg-white border rounded-lg shadow">
      <h2 class="text-2xl font-semibold text-center mb-6 text-[#002842]">회원가입</h2>

      <form @submit.prevent="register" class="space-y-6">
        <div class="flex flex-col space-y-1">
          <div class="flex items-center space-x-4">
            <label for="memberName" class="w-24 text-sm font-medium text-gray-700">이름</label>
            <input
              type="text"
              v-model="member.memberName"
              id="memberName"
              class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
        </div>

        <!-- 아이디 입력 필드 -->
        <div class="flex flex-col  md:flex-row items-center md:space-x-4 mt-4">
          <div class="flex items-center space-x-4 w-full md:w-3/4">
            <label for="memberId" class="w-24 text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              v-model="member.memberId"
              id="memberId"
              class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div class="flex justify-end w-full">
            <button 
              @click="checkId" 
              type="button" 
              class="responsive-button px-4 py-2 bg-[#002842] text-white rounded hover:bg-[#0E429D] text-sm mt-2 md:mt-0 md:ml-auto md:w-auto">
              ID 중복 확인
            </button>
          </div>
        </div>

        <!-- 비밀번호 입력 필드 -->
        <div class="flex flex-col space-y-1">
          <div class="flex items-center space-x-4">
            <label for="password" class="w-24 text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              v-model="member.password"
              id="password"
              class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
              placeholder="비밀번호를 입력하세요"
              required
              @input="checkPasswordStrength"
            />
          </div>
          <p v-if="passwordStrengthMessage && member.password.length > 0" 
             :class="isStrongPassword ? 'text-green-500' : 'text-red-500'" 
             class="text-sm mt-1 ml-28">
            {{ passwordStrengthMessage }}
          </p>
        </div>

        <!-- 비밀번호 확인 필드 -->
        <div class="flex flex-col space-y-1">
          <div class="flex items-center space-x-4">
            <label for="confirmPassword" class="w-24 text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input
              type="password"
              v-model="member.confirmPassword"
              id="confirmPassword"
              class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>
          <p v-if="member.password !== member.confirmPassword && member.confirmPassword.length > 0" 
             class="text-red-500 text-sm mt-1 ml-28">
            비밀번호가 일치하지 않습니다.
          </p>
        </div>

        <!-- 이메일 입력 필드 -->
<div class="flex flex-col md:flex-row items-center md:space-x-4 mt-4">
  <!-- 이메일 입력 -->
  <div class="flex items-center space-x-4 w-full md:w-auto">
    <label for="email" class="w-24 text-sm font-medium text-gray-700">이메일</label>
    <input
      type="email"
      v-model="member.email"
      id="email"
      class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
      placeholder="이메일을 입력하세요"
      required
    />
  </div>
  <!-- 인증 코드 발송 버튼 -->
  <div class="flex justify-end w-full mt-2">
    <button 
      @click="sendEmailVerification" 
      type="button" 
      class="responsive-button px-4 py-2 bg-[#002842] text-white rounded hover:bg-[#0E429D] text-sm w-auto">
      인증 코드 발송
    </button>
  </div>
</div>

<!-- 인증 코드 입력 및 확인 -->
<div v-if="emailVerificationSent" class="flex flex-col md:flex-row items-center md:space-x-4 mt-4">
  <!-- 인증 코드 입력 -->
  <div class="flex items-center space-x-4 w-full md:w-auto">
    <label for="emailVerificationCode" class="w-24 text-sm font-medium text-gray-700">인증 코드</label>
    <input
      type="text"
      v-model="member.emailVerificationCode"
      id="emailVerificationCode"
      class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
      placeholder="인증 코드를 입력하세요"
      required
    />
  </div>
  <!-- 인증 확인 버튼 -->
  <div class="flex justify-end w-full mt-2">
    <button 
      @click="verifyEmailCode" 
      type="button" 
      class="responsive-button px-4 py-2 bg-[#002842] text-white rounded hover:bg-[#0E429D] text-sm w-auto">
      인증 확인
    </button>
  </div>
</div>



        <!-- 성별 선택 필드 -->
        <div class="flex items-center space-x-4">
          <label class="w-24 text-sm font-medium text-gray-700">성별</label>
          <div class="flex space-x-6">
            <label class="inline-flex items-center">
              <input type="radio" v-model="member.gender" value="M" required />
              <span class="ml-2">남성</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="member.gender" value="F" required />
              <span class="ml-2">여성</span>
            </label>
          </div>
        </div>

        <!-- 생년월일 입력 필드 -->
        <div class="flex items-center space-x-4">
          <label for="birth" class="w-24 text-sm font-medium text-gray-700">생년월일</label>
          <input
            type="date"
            v-model="member.birth"
            id="birth"
            class="flex-grow px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#C1D5F9]"
            required
          />
        </div>

        <TermsAgreement @agreementChanged="setAgreement" />

        <!-- 회원가입 버튼 -->
        <div class="mt-8">
          <button
            type="submit"
            :disabled="disableSubmit"
            class="w-full py-3 bg-[#002842] text-white font-semibold rounded hover:bg-[#0E429D] disabled:bg-gray-400"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'pretendard', sans-serif;
}
button {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: inherit;
}
::placeholder {
  color: #999999;
  opacity: 1;
}

</style>


