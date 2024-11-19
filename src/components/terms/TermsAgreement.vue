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
</script>

<template>
  <div class="border p-4 rounded-md bg-gray-100">

    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-2">개인정보 수집 및 이용 동의서</h3>
      <label class="flex items-center mb-4">
        <input type="checkbox" v-model="agreementInfo" @change="updateAgreement" />
        <span class="ml-2 text-sm">개인정보 수집 및 이용 동의서에 동의합니다.</span>
      </label>
      <div class="max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-md bg-white">
        <p class="text-sm">
          <strong>1. 수집하는 개인정보 항목</strong>
          <ul class="list-disc pl-6"> 
            <li>개인 정보: 이름, 이메일, 성별, 생년월일, 직업, 소득 수준, 거주지, 결혼 여부, 자녀 유무, 주거 유형 등</li>
            <li>자산 정보: 금융 자산, 부동산 정보(예: 보유 부동산, 예금, 투자 내역), 자산 관리에 필요한 정보</li>
            <li>서비스 이용 기록: IP 주소, 접속 시간, 브라우저 정보, 서비스 이용 기록 (클릭 로그 등)</li>
            <li>기타: 사용자 맞춤형 정책 추천을 위한 추가적인 정보(예: 금융 상품 관심도, 정책 신청 내역 등)</li>
          </ul>
          <br />
          <strong>2. 개인정보 수집 및 이용 목적</strong>
          <ul class="list-disc pl-6">
            <li>회원 가입 및 본인 확인: 회원 가입 시 필수적인 개인정보를 수집하여, 사용자의 신원을 확인합니다.</li>
            <li>청년 맞춤형 정책 추천 서비스 제공: 사용자에게 연령, 직업, 소득 수준 등 맞춤형 데이터를 기반으로 청년 정책을 추천합니다.</li>
            <li>자산 관리 및 금융 상품 연계 서비스: 사용자의 자산 데이터를 바탕으로 맞춤형 자산 관리 서비스를 제공하고, 금융 상품(예: 대출, 예금, 보험) 연계를 지원합니다.</li>
            <li>부동산 정보 및 청약 정보 제공: 사용자의 경제적 상황에 맞는 부동산 정보와 청약 정보를 제공합니다.</li>
            <li>경제적 인사이트 제공: 사용자에게 자산 관리, 재정 계획 등 장기적인 경제적 인사이트를 제공합니다.</li>
            <li>서비스 최적화 및 보안 강화: 서비스 이용 패턴을 분석하여 서비스 최적화를 위해 사용하며, 보안을 강화하는 데 필요한 정보를 수집합니다.</li>
            <li>서비스 오류 분석 및 문제 해결: 서비스 오류나 시스템 문제 발생 시, 이를 분석하고 해결하기 위해 로그 데이터를 수집합니다.</li>
          </ul>
          <br />
          <strong>3. 로그 수집 항목 및 목적</strong>
          <ul class="list-disc pl-6">
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
          <strong>4. 개인정보의 보유 및 이용 기간</strong>
          <ul class="list-disc pl-6">
            <li>회원 탈퇴 후 보유 기간: 회원 탈퇴 후 5년 동안 개인정보를 보관하며, 법적 요구(예: 세금, 회계 관련 법률) 및 서비스 개선을 위한 목적으로 보관됩니다.</li>
            <li>법적 요구에 따른 보관: 서비스 제공 과정에서 법적으로 요구되는 기록은 일정 기간 보관될 수 있습니다.</li>
          </ul>
          <br />
          <strong>5. 개인정보의 제3자 제공</strong>
          <ul class="list-disc pl-6">
            <li>서비스 제공을 위한 제3자 서비스 연동 시, 개인정보의 일부가 외부 제공자에게 전달될 수 있습니다.</li>
            <li>제3자 제공 항목: 금융 상품 연동 정보, 청년 정책 신청 내역 등</li>
            <li>제3자 제공받는 자: 정부 부처, 은행, 보험사, 청약 서비스 제공업체 등</li>
            <li>제3자 제공 동의 거부 시 서비스 제한: 제3자 제공 동의를 거부할 경우 일부 맞춤형 서비스 제공에 제한이 있을 수 있습니다.</li>
          </ul>
          <br />
          <strong>6. 동의 거부 권리 및 제한 사항</strong>
          <ul class="list-disc pl-6">
            <li>사용자는 언제든지 개인정보 제공에 대해 동의를 거부할 수 있습니다.</li>
            <li>동의 거부 시 제한 사항: 일부 서비스는 개인정보 제공에 동의하지 않으면 이용이 제한될 수 있습니다.</li>
          </ul>
          <br />
          본인은 위 내용을 충분히 이해하였으며, 이에 동의합니다.
        </p>
      </div>
    </div>

    <div>
      <h3 class="text-xl font-semibold mb-2 mt-4">이용 약관</h3>
      <label class="flex items-center mb-4">
        <input type="checkbox" v-model="agreementService" @change="updateAgreement" />
        <span class="ml-2 text-sm">이용 약관에 동의합니다.</span>
      </label>
      <div class="max-h-96 overflow-y-auto p-4 border border-gray-300 rounded-md bg-white">
        <p class="text-sm">
          '청사진' 플랫폼(이하 "서비스")은 청년들의 경제적 자립을 지원하는 종합 금융 정보 플랫폼입니다. 이 약관은 귀하와 서비스 제공자 간의 권리, 의무 및 책임 사항을 규정하며, 서비스 이용 시 반드시 준수해야 합니다.
          <br /><br />
          <strong>1. 서비스 목적</strong>
          <ul class="list-disc pl-6">
            <li>본 서비스는 청년층의 경제적 자립을 위한 맞춤형 정책 추천 및 자산 관리 서비스를 제공합니다. 사용자의 소득, 자산, 직업, 거주지 등의 정보를 분석하여 최적의 정책과 금융 상품을 추천하고, 부동산 정보와 청약 정보를 제공합니다.</li>
            <li>이 서비스는 정부 정책 정보와 부동산 정보를 통합하여 제공하며, 맞춤형 금융 인사이트와 자산 관리 도구를 제공합니다.</li>
          </ul>
          <br />
          <strong>2. 사용자의 의무</strong>
          <ul class="list-disc pl-6">
            <li>정확한 정보 제공: 사용자는 서비스 이용 시 정확한 정보를 제공해야 하며, 제공된 정보의 정확성에 대한 책임은 사용자에게 있습니다.</li>
            <li>타인의 권리 침해 금지: 사용자는 타인의 개인정보나 권리를 침해해서는 안 됩니다.</li>
            <li>서비스 악용 금지: 사용자는 서비스의 기능을 악용하거나 불법적인 목적을 위해 사용하지 않아야 합니다.</li>
            <li>서비스 이용의 책임: 사용자는 서비스 내 제공된 정보에 따라 본인의 자산을 관리할 책임이 있으며, 서비스 사용으로 발생한 모든 결과에 대해 책임을 집니다.</li>
          </ul>
          <br />
          <strong>3. 서비스 제공자의 의무</strong>
          <ul class="list-disc pl-6">
            <li>개인정보 보호: 당사는 사용자의 개인정보를 안전하게 처리하고 보호할 의무가 있습니다.</li>
            <li>서비스 안정성 보장: 당사는 서비스 제공에 최선을 다하며, 서비스의 오류 및 장애를 최소화하고 안정성을 보장할 의무가 있습니다.</li>
            <li>정확한 정보 제공 노력: 당사는 사용자의 금융 정보가 정확하게 처리되도록 노력하지만, 제3자 서비스 제공업체(예: 금융 상품 제공, 정부 정책 정보 제공)에서 발생한 오류에 대해 책임지지 않습니다.</li>
            <li>보안 관리: 당사는 사용자의 개인정보 및 금융 정보를 보호하기 위해 보안 체계를 강화하며, 최신 보안 기술을 적용합니다.</li>
          </ul>
          <br />
          <strong>4. 로그 수집</strong>
          <ul class="list-disc pl-6">
            <li>수집되는 로그: 서비스 이용 과정에서 IP 주소, 접속 시간, 브라우저 정보, 서비스 이용 기록 등이 수집됩니다.</li>
            <li>로그 활용 목적:
              <ul class="list-disc pl-6">
                <li>서비스 안정성 및 보안 강화: 로그인 시도 및 비정상적인 접근을 감지하여 보안 강화</li>
                <li>서비스 최적화 및 오류 해결: 이용 기록을 분석하여 사용자 경험을 개선하고 서비스 오류를 해결</li>
              </ul>
            </li>
            <li>법적 요구: 법적 요구에 따라 수집된 로그 데이터는 사법 당국에 제공될 수 있습니다.</li>
          </ul>
          <br />
          <strong>5. 책임의 한계</strong>
          <ul class="list-disc pl-6">
            <li>당사는 서비스 제공을 위해 노력하지만, 사용자의 개인적인 재정적 결정에 대해서는 책임을 지지 않습니다.</li>
            <li>금융 자산 정보는 외부 데이터(예: 부동산 정보, 금융 상품 데이터)에서 수집되며, 해당 정보의 오류나 지연에 대해 책임지지 않습니다.</li>
            <li>제3자 서비스 제공 업체(예: 은행 API, 정책 정보 제공 사이트 등)에서 발생한 오류로 인한 책임은 당사가 지지 않습니다.</li>
          </ul>
          <br />
          <strong>6. 개인정보 보호 및 권리</strong>
          <ul class="list-disc pl-6">
            <li>사용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있습니다.</li>
            <li>삭제 요청 시 서비스 제한: 개인정보 삭제 요청 시, 서비스 제공에 제한이 있을 수 있습니다. 예를 들어, 맞춤형 정책 추천 서비스나 자산 관리 서비스가 제공되지 않을 수 있습니다.</li>
            <li>당사는 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않으며, 법적 요구에 의해 제3자에게 제공될 수 있습니다.</li>
          </ul>
          <br />
          <strong>7. 서비스 이용 중단 및 해지</strong>
          <ul class="list-disc pl-6">
            <li>사용자는 언제든지 서비스 해지를 요청할 수 있으며, 서비스 해지 후에는 모든 금융 정보 연동이 종료됩니다.</li>
            <li>서비스 해지 후에는 제공된 모든 개인정보 및 자산 관리 데이터가 삭제됩니다.</li>
          </ul>
          <br />
          <strong>8. 소비 분석 및 맞춤형 서비스</strong>
          <ul class="list-disc pl-6">
            <li>사용자의 경제적 상황을 바탕으로 맞춤형 금융 상품 추천 및 자산 관리 도구가 제공됩니다. 이 도구를 통해 사용자는 자신의 자산을 계획하고 관리할 수 있습니다.</li>
            <li>사용자의 소비 패턴에 맞는 정책과 금융 상품을 추천하는 서비스도 제공됩니다.</li>
          </ul>
          <br />
          본인은 위 약관에 동의하며, 서비스를 이용함에 있어 이를 준수할 것을 약속합니다.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.max-h-96 {
  max-height: 16rem; /* 스크롤 영역의 최대 높이 설정 */
}
</style>
