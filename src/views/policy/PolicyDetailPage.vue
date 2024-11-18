<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { usePolicyStore } from "@/stores/policy";
import ShareButton from "@/components/kakao/ShareButton.vue";
import UrlCopyIcon from "@/assets/url_copy.svg";
import MemberNotification from '@/components/notification/MemberNotification.vue';

const route = useRoute();
const policyStore = usePolicyStore();
const policyDetail = ref(null);
const policyListItem = ref(null);
const loading = ref(true);
const shareUrl = ref("");
const headerHeight = ref(0);
const isFixed = ref(false);
const activeSection = ref(null);

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const copyUrl = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => alert("URL이 복사되었습니다."));
};

onMounted(async () => {
  try {
    const idx = parseInt(route.params.idx, 10);
    await policyStore.getPolicyInfo();
    await policyStore.getPolicyDetail(idx);
    policyDetail.value = policyStore.PolicyDetail;
    policyListItem.value = policyStore.PolicyInfoList.find(
      (item) => item.idx === idx
    );
    if (typeof window !== "undefined") {
      shareUrl.value = `${window.location.origin}/policy/detail/${policyDetail.value.idx}`;
    }

    headerHeight.value = document.querySelector("header")?.offsetHeight || 0;

    window.addEventListener("scroll", handleScroll);
  } catch (error) {
    console.error("Error fetching policy data: ", error);
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const additionalOffset = 20; // 네브바와의 추가 여백

  if (scrollPosition >= headerHeight.value + additionalOffset) {
    isFixed.value = true;
  } else {
    isFixed.value = false;
  }
};

const scrollToTop = () => {
  const titleElement = document.querySelector("h2");
  if (titleElement) {
    titleElement.scrollIntoView({ behavior: "smooth" });
    activeSection.value = "top";
  }
};

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
  }
};

const formatPolicySubject = (text) => {
  if (!text) return "";

  const segments = text
    .split(/[\u2022\u25E6\u25A1\*\u25CB](?!\d-\d)|(?<!\d)-(?=\D)/)
    .filter(Boolean);

  return segments
    .map((segment) => {
      const subSegments = segment
        .split(
          /(?<!\d)-(?=\D)|(?<=\D)-(?=\d)|(?=[가-힣]\.)|(?=※)|(?=\[.*?\])|(?=\b\d{1,2}\.(?!\d{1,2}\.\d{1,2})\b)/
        )
        .filter(Boolean)
        .map((sub) => {
          const trimmedSub = sub.trim();

          if (/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(trimmedSub)) {
            return trimmedSub;
          } else if (
            /^[가-힣]\.|^※|^\[.*?\]|^- |\b\d{1,2}\.(?!\d)/.test(trimmedSub)
          ) {
            return `<br>${trimmedSub}`;
          }
          return `- ${trimmedSub}`;
        });

      return subSegments.join("");
    })
    .join("<br><br>");
};
</script>

<template>
   <div class="contentsWrap mw_wrap p-4">
    <!-- 제목 -->
    <div class="flex justify-between items-center mb-10">
      <h2 id="page-title" class="text-3xl font-bold">
        {{ policyListItem?.name }}
      </h2>
      <div class="flex space-x-2">
        <MemberNotification :policyIdx="policyListItem?.idx" />
        <ShareButton
          :title="policyListItem?.name"
          :description="policyDetail?.subject"
          :shareUrl="shareUrl"
          class="w-6 h-6 bg-white rounded-full flex items-center justify-center"
        />
        <button
          @click="copyUrl"
          class="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-300"
        >
          <img :src="UrlCopyIcon" alt="URL 복사" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- 전체 콘텐츠 영역 -->
    <div class="content-wrapper flex">
      <!-- 왼쪽 콘텐츠 영역 (테이블) -->
      <div class="left w-full lg:w-3/4 lg:pr-6">
        <!-- 사업 개요 -->
        <h3
          id="business-overview"
          class="section-title border-b-2 border-gray-300 pb-2 mb-4"
        >
          사업 개요
        </h3>
        <div class="content-section mb-10">
          <div class="content-row mb-4">
            <span class="title-cell">정책 유형</span>
            <span class="content-cell">{{ policyListItem?.type }}</span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">주관 기관</span>
            <span class="content-cell">{{ policyListItem?.offer_inst }}</span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">정책 소개</span>
            <!-- v-html을 사용해 HTML 형식으로 텍스트를 렌더링 -->
            <span
              class="content-cell"
              v-html="formatPolicySubject(policyDetail?.subject)"
            ></span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">지원 내용</span>
            <span class="content-cell">{{ policyDetail?.content }}</span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">사업 운영 기간</span>
            <span class="content-cell"
              >{{ formatDate(policyListItem?.apply_start_date) }} ~
              {{ formatDate(policyListItem?.apply_end_date) }}</span
            >
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">지원 규모</span>
            <span class="content-cell">{{ policyDetail?.scale }}</span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">관련 사이트</span>
            <span class="content-cell">
              <a
                :href="policyDetail?.url"
                class="text-blue-500 underline"
                target="_blank"
                >{{ policyDetail?.url }}</a
              >
            </span>
          </div>
        </div>

        <!-- 신청 자격 -->
        <h3
          id="eligibility"
          class="section-title border-b-2 border-gray-300 pb-2 mb-4"
        >
          신청 자격
        </h3>
        <div class="content-section mb-10">
          <div class="content-row mb-4">
            <span class="title-cell">조건</span>
            <span class="content-cell">{{ policyDetail?.condition }}</span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">나이</span>
            <span class="content-cell"
              >{{ policyDetail?.minAge }} ~ {{ policyDetail?.maxAge }}</span
            >
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">직업</span>
            <span class="content-cell">{{ policyDetail?.job }}</span>
          </div>
          <div class="content-row mb-4">
            <span class="title-cell">자격</span>
            <span class="content-cell">{{ policyDetail?.enquiry }}</span>
          </div>
        </div>

        <!-- 신청 방법 -->
        <h3
          id="application-method"
          class="section-title border-b-2 border-gray-300 pb-2 mb-4"
        >
          신청 방법
        </h3>
        <p class="py-3 px-4 mb-10">{{ policyDetail?.way }}</p>

        <!-- 제출 서류 -->
        <h3
          id="required-documents"
          class="section-title border-b-2 border-gray-300 pb-2 mb-4"
        >
          제출 서류
        </h3>
        <ul class="list-disc pl-6 mb-10">
          <li v-for="doc in policyDetail?.requiredDocuments" :key="doc">
            {{ doc }}
          </li>
        </ul>

        <!-- 뒤로 가기 링크 -->
        <router-link to="/policy" class="text-blue-500 mt-4 inline-block"
          >뒤로 가기</router-link
        >
      </div>

      <!-- 오른쪽 네비게이션 (모바일에서는 숨기기) -->
      <div class="right-nav" :style="{ top: `${headerHeight}px` }">
        <div class="aside border-l pl-4">
          <p>
            <a
              href="javascript:void(0)"
              @click="scrollToTop"
              :class="{ 'active-link': activeSection === 'top' }"
            >
              이 페이지의 구성
            </a>
          </p>
          <nav class="mt-4">
            <ul class="lnb space-y-2">
              <li>
                <a
                  href="javascript:void(0)"
                  @click="scrollToSection('business-overview')"
                  :class="{
                    'active-link': activeSection === 'business-overview',
                  }"
                >
                  사업 개요
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="scrollToSection('eligibility')"
                  :class="{ 'active-link': activeSection === 'eligibility' }"
                >
                  신청 자격
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="scrollToSection('application-method')"
                  :class="{
                    'active-link': activeSection === 'application-method',
                  }"
                >
                  신청 방법
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="scrollToSection('required-documents')"
                  :class="{
                    'active-link': activeSection === 'required-documents',
                  }"
                >
                  제출 서류
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contentsWrap {
  max-width: 1200px;
  margin: 0 auto;
}

.content-wrapper {
  display: flex;
  gap: 20px;
}

.left {
  position: relative;
  z-index: 1;
}

.right-nav {
  position: sticky;
  top: 20px; /* 상단에서의 초기 고정 위치 */
  right: 0;
  width: 20%;
  background-color: #fff;
  z-index: 10;
  padding-top: 20px;
  max-height: calc(100vh - 80px); /* 화면에서 넘치지 않도록 제한 */
  overflow-y: auto; /* 내부 스크롤 허용 */
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.content-section {
  display: flex;
  flex-direction: column;
}

.content-row {
  display: flex;
  padding-bottom: 1rem;
}

.title-cell {
  font-weight: 600;
  width: 20%;
  white-space: nowrap;
  margin-right: 1rem;
}

.content-cell {
  width: 75%;
}

.right-nav a:hover,
.right-nav a.active-link {
  color: #0e429d;
}

button {
  border: none;
  cursor: pointer;
}

button.liked {
  color: red;
}

button:not(.liked) {
  color: gray;
}

@media (max-width: 640px) {
  .content-row {
    flex-direction: column;
  }
  .title-cell {
    width: 100%;
    margin-bottom: 0.25rem;
  }
  .content-cell {
    width: 100%;
  }

  .right-nav {
    display: none;
  }
}
</style>
