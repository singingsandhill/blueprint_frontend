<script setup></script>

<template>
  <footer class="footer w-full bg-gray-50 py-8 border-t border-gray-200">
    <div class="mx-auto px-4 flex items-center justify-between">
      <div class="flex flex-1 mx-4 justify-between items-center">
        <div class="flex space-x-6 text-sm text-gray-600">
          <a href="#" class="hover:text-blue-600 font-bold">Chapter 1</a>
          <a href="#" class="hover:text-blue-600">개인정보처리방침</a>
          <a href="#" class="hover:text-blue-600">이용약관</a>
        </div>

        <div class="flex space-x-6">
          <a
            href="https://github.com/Chapter-1/frontend"
            target="_blank"
            class="hover:opacity-80"
          >
            <div
              class="bg-green-500 rounded-full shadow-md w-8 h-8 flex items-center justify-center"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo Front"
                class="rounded-full w-6 h-6"
              />
            </div>
          </a>
          <a
            href="https://github.com/Chapter-1/backend"
            target="_blank"
            class="hover:opacity-80"
          >
            <div
              class="bg-orange-500 rounded-full shadow-md w-8 h-8 flex items-center justify-center"
            >
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo Backend"
                class="rounded-full w-6 h-6"
              />
            </div>
          </a>
        </div>

      </div>
    </div>

    <div class="max-w-screen-lg mx-auto px-4 mt-16 text-center text-sm text-gray-700">
      <p class="mb-4">KB IT's your life 5기 멀티캠퍼스</p>
      <div class="flex justify-center items-center space-x-4 mb-8">
        <a href="https://github.com/Chapter-1/frontend" target="_blank" class="hover:opacity-80">
          <div class="bg-green-500 rounded-full shadow-md w-10 h-10 flex items-center justify-center">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo Front" class="rounded-full w-9 h-9">
          </div>
        </a>
        <a href="https://github.com/Chapter-1/backend" target="_blank" class="hover:opacity-80">
          <div class="bg-orange-500 rounded-full shadow-md w-10 h-10 flex items-center justify-center">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo Backend" class="rounded-full w-9 h-9">
          </div>
        </a>
      </div>
      <p class="mb-2">대표 전화: 010-5226-0259 (김지수)</p>
      <div class="text-center text-sm">
        <p>
          고객센터: 
          <a 
            href="mailto:kb.fingertips@gmail.com?subject=고객센터 문의&body=안녕하세요, 고객센터에 문의드립니다." 
            class="text-blue-500 underline hover:text-blue-700"
          >
            kb.fingertips@gmail.com
          </a>
        </p>
      </div>
    </div>

    <div class="mt-6 text-gray-500 text-center text-sm">
      <p>© 2024 Chapter 1. All rights reserved</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f9fafb;
}

.shadow-md {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
