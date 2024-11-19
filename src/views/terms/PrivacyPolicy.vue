<script setup>
import '@fortawesome/fontawesome-free/css/all.css';
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6 text-center">개인정보처리방침</h1>
    <p class="text-gray-700 leading-relaxed">
      <strong>청사진</strong>은 개인정보 보호법 제30조에 따라 청사진에서 처리하는 정보주체의 개인정보를 보호하고,
      이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
    </p>
    
    <!-- 개인정보 처리방침 항목들 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <!-- 개인정보 항목 -->
      <div class="flex items-center space-x-4 border p-4 rounded-md bg-blue-50">
        <div class="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <i class="fas fa-user"></i>
        </div>
        <div>
          <h2 class="font-semibold text-blue-800">개인정보</h2>
          <p class="text-sm text-gray-600">아이디, 이름, 생년월일, 성별, 연락처, 이메일주소, 주소 등</p>
        </div>
      </div>
      
      <!-- 처리목적 -->
      <div class="flex items-center space-x-4 border p-4 rounded-md bg-green-50">
        <div class="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
          <i class="fa-regular fa-object-group"></i>
        </div>
        <div>
          <h2 class="font-semibold text-green-800">처리목적</h2>
          <p class="text-sm text-gray-600">청년지원사업 신청 및 사업관리</p>
        </div>
      </div>

      <!-- 보유 기간 -->
      <div class="flex items-center space-x-4 border p-4 rounded-md bg-purple-50">
        <div class="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div>
          <h2 class="font-semibold text-purple-800">보유 기간</h2>
          <p class="text-sm text-gray-600">회원 탈퇴 후 5년간 보관</p>
        </div>
      </div>

      <!-- 제3자 제공 -->
      <div class="flex items-center space-x-4 border p-4 rounded-md bg-orange-50">
        <div class="h-12 w-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <i class="fa-regular fa-handshake"></i>
        </div>
        <div>
          <h2 class="font-semibold text-orange-800">제3자 제공</h2>
          <p class="text-sm text-gray-600">정부 부처, 은행, 보험사 등</p>
        </div>
      </div>
    </div>

    <div class="mt-12 p-6">
      <h3 class="font-semibold text-2xl mb-8">개인정보 처리 및 보유 내용</h3>
      <p class="leading-relaxed text-gray-700">
        <strong class="text-xl">1. 수집하는 개인정보 항목</strong>
          <ul class="list-disc pl-6 mt-3 mb-3"> 
            <li>개인 정보: 이름, 이메일, 성별, 생년월일, 직업, 소득 수준, 거주지, 결혼 여부, 자녀 유무, 주거 유형 등</li>
            <li>자산 정보: 금융 자산, 부동산 정보(예: 보유 부동산, 예금, 투자 내역), 자산 관리에 필요한 정보</li>
            <li>서비스 이용 기록: IP 주소, 접속 시간, 브라우저 정보, 서비스 이용 기록 (클릭 로그 등)</li>
            <li>기타: 사용자 맞춤형 정책 추천을 위한 추가적인 정보(예: 금융 상품 관심도, 정책 신청 내역 등)</li>
          </ul>
          <br />
          <strong class="text-xl">2. 개인정보 수집 및 이용 목적</strong>
          <ul class="list-disc pl-6 mt-3 mb-3">
            <li>회원 가입 및 본인 확인: 회원 가입 시 필수적인 개인정보를 수집하여, 사용자의 신원을 확인합니다.</li>
            <li>청년 맞춤형 정책 추천 서비스 제공: 사용자에게 연령, 직업, 소득 수준 등 맞춤형 데이터를 기반으로 청년 정책을 추천합니다.</li>
            <li>자산 관리 및 금융 상품 연계 서비스: 사용자의 자산 데이터를 바탕으로 맞춤형 자산 관리 서비스를 제공하고, 금융 상품(예: 대출, 예금, 보험) 연계를 지원합니다.</li>
            <li>부동산 정보 및 청약 정보 제공: 사용자의 경제적 상황에 맞는 부동산 정보와 청약 정보를 제공합니다.</li>
            <li>경제적 인사이트 제공: 사용자에게 자산 관리, 재정 계획 등 장기적인 경제적 인사이트를 제공합니다.</li>
            <li>서비스 최적화 및 보안 강화: 서비스 이용 패턴을 분석하여 서비스 최적화를 위해 사용하며, 보안을 강화하는 데 필요한 정보를 수집합니다.</li>
            <li>서비스 오류 분석 및 문제 해결: 서비스 오류나 시스템 문제 발생 시, 이를 분석하고 해결하기 위해 로그 데이터를 수집합니다.</li>
          </ul>
          <br />
          <strong class="text-xl">3. 로그 수집 항목 및 목적</strong>
          <ul class="list-disc pl-6 mt-3 mb-3">
            <li>수집하는 로그 정보: 접속 IP 주소, 접속 시간, 브라우저 유형 및 버전, 서비스 이용 기록 등</li>
            <li>로그 수집 목적:
              <ul class="list-disc pl-6">
                <li>서비스 운영 및 보안 강화: 이상 로그인, 부정 사용 감지 등을 위한 보안 강화</li>
                <li>오류 분석 및 문제 해결: 서비스 오류 및 장애 발생 시, 원인 파악 및 해결</li>
                <li>사용자 경험 향상: 서비스 이용 패턴을 분석하여 사용자 경험을 개선하기 위한 데이터 활용</li>
              </ul>
            </li>
          </ul>
          <br />
          <strong class="text-xl">4. 개인정보의 보유 및 이용 기간</strong>
          <ul class="list-disc pl-6 mt-3 mb-3">
            <li>회원 탈퇴 후 보유 기간: 회원 탈퇴 후 5년 동안 개인정보를 보관하며, 법적 요구(예: 세금, 회계 관련 법률) 및 서비스 개선을 위한 목적으로 보관됩니다.</li>
            <li>법적 요구에 따른 보관: 서비스 제공 과정에서 법적으로 요구되는 기록은 일정 기간 보관될 수 있습니다.</li>
          </ul>
          <br />
          <strong class="text-xl">5. 개인정보의 제3자 제공</strong>
          <ul class="list-disc pl-6 mt-3 mb-3">
            <li>서비스 제공을 위한 제3자 서비스 연동 시, 개인정보의 일부가 외부 제공자에게 전달될 수 있습니다.</li>
            <li>제3자 제공 항목: 금융 상품 연동 정보, 청년 정책 신청 내역 등</li>
            <li>제3자 제공받는 자: 정부 부처, 은행, 보험사, 청약 서비스 제공업체 등</li>
            <li>제3자 제공 동의 거부 시 서비스 제한: 제3자 제공 동의를 거부할 경우 일부 맞춤형 서비스 제공에 제한이 있을 수 있습니다.</li>
          </ul>
          <br />
          <strong class="text-xl">6. 동의 거부 권리 및 제한 사항</strong>
          <ul class="list-disc pl-6 mt-3 mb-3">
            <li>사용자는 언제든지 개인정보 제공에 대해 동의를 거부할 수 있습니다.</li>
            <li>동의 거부 시 제한 사항: 일부 서비스는 개인정보 제공에 동의하지 않으면 이용이 제한될 수 있습니다.</li>
          </ul>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
}
</style>
