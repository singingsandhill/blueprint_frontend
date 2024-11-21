<template>
  <!-- Onboarding Popup -->
  <div v-if="isPopupVisible" class="popup">
    <div class="popup-content">
      <button class="close-btn" @click="closePopup">✖</button>
      <h2 class="text-lg font-bold">환영합니다! 🎉</h2>
      <p>맞춤형 정책 추천과 알림 서비스를 통해 원하는 혜택을 놓치지 마세요!</p>

      <div class="features">
        <div class="feature-card">
          <h3 class="font-bold text-gray-500">맞춤형 추천</h3>
          <p>사용자 정보를 바탕으로 적합한 정책을 추천합니다.</p>
        </div>
        <div class="feature-card">
          <h3 class="font-bold text-gray-500">찜한 정책 알림</h3>
          <p>
            마감 3일 전 이메일 발송, 하루 전 알림으로 중요한 기회를 놓치지
            마세요.
          </p>
        </div>
        <div class="feature-card">
          <h3 class="font-bold text-gray-500">효율적인 정보 관리</h3>
          <p>관심 있는 정보를 한눈에 관리하세요.</p>
        </div>
      </div>

      <div class="actions">
        <!-- 나만의 서비스로 이동 -->
        <button class="cta-btn" @click="goToMyService">지금 시작하기</button>
        <!-- 마이페이지 알림 설정 -->
        <button class="cta-btn secondary" @click="goToMyPage">
          알림 설정 활성화
        </button>
      </div>

      <div class="footer">
        <label>
          <input
            type="checkbox"
            v-model="dontShowAgain"
            @change="handleDontShowAgain"
          />
          그만 보기
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Vue Router 설정
const router = useRouter();

// 상태 관리
const isPopupVisible = ref(true); // 팝업 표시 상태
const dontShowAgain = ref(false); // "다신 안 보기" 상태

// 로컬 스토리지 확인
if (localStorage.getItem("dontShowPopup") === "true") {
  isPopupVisible.value = false;
}

// 팝업 닫기
const closePopup = () => {
  isPopupVisible.value = false;
};

// "다신 안 보기" 처리
const handleDontShowAgain = () => {
  if (dontShowAgain.value) {
    localStorage.setItem("dontShowPopup", "true");
  } else {
    localStorage.removeItem("dontShowPopup");
  }
};

// "지금 시작하기" 버튼 액션
const goToMyService = () => {
  router.push("/member/myService"); // 나만의 서비스 페이지로 이동
};

// "알림 설정 활성화" 버튼 액션
const goToMyPage = () => {
  router.push("/member/myPage"); // 마이페이지 알림 설정 페이지로 이동
};
</script>

<style scoped>
/* 팝업 전체 배경 */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 팝업 컨텐츠 */
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

/* 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* 기능 카드 */
.features {
  margin: 20px 0;
  display: grid;
  gap: 15px;
}

.feature-card {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}

/* 액션 버튼 */
.actions {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cta-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.cta-btn.secondary {
  background: #6c757d;
}

/* 푸터 */
.footer {
  margin-top: 15px;
  font-size: 14px;
}
</style>
