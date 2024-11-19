<script setup></script>

<template>
  <footer class="footer w-full bg-gray-50 py-8 border-t border-gray-200">
    <div class="mx-auto px-4 flex items-center justify-between">
      <div class="flex-shrink-0 mx-4">
        <img src="/src/assets/Chapter1.png.png" alt="Logo" class="h-16" />
      </div>
      <div class="flex flex-1 mx-4 justify-between items-center">
        <div class="flex space-x-6 text-sm text-gray-600">
          <a href="#" class="hover:text-blue-600 font-medium">Chapter 1</a>
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

    <div class="max-w-screen-lg mx-auto px-4 mt-12 text-center text-gray-700">
      <p class="mb-2">대표전화: 010-5226-0259</p>
      <p>고객센터: kb.fingertips@gmail.com</p>
    </div>

    <div class="mt-16 text-gray-400 text-center text-sm">
      <p>© 2024 Chapter 1. All rights reserved.</p>
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
