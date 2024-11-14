<template>
  <button @click="shareKakao" class="kakao-share-button">
    <img src="@/assets/kakaotalk_sharing_btn_medium.png" alt="카카오톡으로 공유하기" class="kakao-share-image" />
  </button>
</template>

<script>
import defaultImage from '@/assets/BluePrint_logo.png';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '정책 내용을 친구와 공유해보세요!',
    },
    shareUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: defaultImage,
    },
  },
  computed: {
    fullShareUrl() {
      // shareUrl이 localhost나 github.io를 포함하고 있으면 /frontend 추가
      if (this.shareUrl.includes('localhost') || this.shareUrl.includes('github.io')) {
        return this.shareUrl.replace(/^(https?:\/\/[^\/]+)(\/.*)?$/, '$1/frontend$2');
      }
      return this.shareUrl; // 다른 경우에는 원본 URL 반환
    }
  },
  methods: {
    shareKakao() {
      if (typeof Kakao === "undefined") {
        console.error("Kakao SDK가 로드되지 않았습니다.");
        alert("카카오톡 공유를 사용할 수 없습니다. 페이지를 새로고침 해주세요.");
        return;
      }

      if (!Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
        console.log("Kakao SDK 초기화 완료");
      }

      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          link: {
            mobileWebUrl: this.fullShareUrl,
            webUrl: this.fullShareUrl,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: this.fullShareUrl,
              webUrl: this.fullShareUrl,
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped>

</style>
