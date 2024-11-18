<script setup>
import gbyouthImage from '@/assets/datasource/gbyouth.jpg';
import bizinfo from '@/assets/datasource/bizinfo.png';
</script>

<template>
    <div class="section mt-12">
        <h2 class="text-2xl font-bold mb-8 text-center">정보 출처</h2>
    </div>

    <div class="mb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div class="card relative border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4" >
            <div class="content-wrapper">
                <div class="text-sm rounded-full px-3 py-1 mb-2 text-center limited-width" style="background-color: #C1D5F9; color: white;">
                    정책정보
                </div>
        
                <h3 class="text-lg font-semibold mb-2 text-center"> 기업마당 </h3>

                <div class="flex justify-center my-4" > <img :src="bizinfo" alt="Bank Logo" class="w-32 h-15 object-contain" /> </div>
                
                <div class="text-center text-gray-700 mt-4 space-y-2 text-sm"> 
                    <p>530여 개의 기관에서 제공하는 
                    최신 지원사업정보, 교육ㆍ세미나ㆍ전시회 등 중소기업 관련 정책정보 제공
                    </p> 
                </div>
            </div>
        </div>

        <div class="card relative border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4" >
            <div class="content-wrapper">
                <div class="text-sm rounded-full px-3 py-1 mb-2 text-center limited-width" style="background-color: #C1D5F9; color: white;">
                    정책정보
                </div>
        
                <h3 class="text-lg font-semibold mb-2 text-center"> 경북 e 끌림 </h3>

                <div class="flex justify-center my-4" > <img :src="gbyouthImage" alt="Bank Logo" class="w-32 h-15 object-contain" /> </div>
                
                <div class="text-center text-gray-700 mt-4 space-y-2 text-sm"> 
                    <p>경상북도 정책 알림 페이지. 청년이 이끄는(lead) 정책 홈페이지와 청년이 끌리는(attract) 소통 공간의 홈페이지가 될 수 있도록 청년e끌림으로 표현한다.
                    </p> 
                </div>
            </div>
        </div>
        
        <div class="card relative border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4" >
            <div class="content-wrapper">
                <div class="text-sm rounded-full px-3 py-1 mb-2 text-center limited-width" style="background-color: #C1D5F9; color: white;" >
                    금융상품
                </div>
            
                <h3 class="text-lg font-semibold mb-2 text-center"> 금융감독원 </h3>

                <div class="flex justify-center my-4" > <img :src="gbyouthImage" alt="Bank Logo" class="w-32 h-15 object-contain" /> </div>
    
                <div class="text-center text-gray-700 mt-4 space-y-2 text-sm"> <p></p> </div>
            
            </div>
        </div>

        <div class="card relative border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4" >
            <div class="content-wrapper">
                <div class="text-sm rounded-full px-3 py-1 mb-2 text-center limited-width" style="background-color: #C1D5F9; color: white;" >
                    부동산 실거래가
                </div>
            
                <h3 class="text-lg font-semibold mb-2 text-center"> 출처 </h3>

                <div class="flex justify-center my-4" > <img :src="gbyouthImage" alt="Bank Logo" class="w-32 h-15 object-contain" /> </div>
    
                <div class="text-center text-gray-700 mt-4 space-y-2 text-sm"> <p></p> </div>
            
            </div>
        </div>

        <div class="card relative border border-gray-400 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4" >
            <div class="content-wrapper">
                <div class="text-sm rounded-full px-3 py-1 mb-2 text-center limited-width" style="background-color: #C1D5F9; color: white;" >
                    청약정보
                </div>
            
                <h3 class="text-lg font-semibold mb-2 text-center"> 출처 </h3>

                <div class="flex justify-center my-4" > <img :src="gbyouthImage" alt="Bank Logo" class="w-32 h-15 object-contain" /> </div>
    
                <div class="text-center text-gray-700 mt-4 space-y-2 text-sm"> <p></p> </div>
            
            </div>
        </div>

        </div>
    </div>
    
        
</template>

<style>
.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}
.limited-width {
  max-width: 200px; /* 원하는 최대 너비 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: center; /* flex 배치에서 중앙 정렬 */
}
.card {
  min-height: 300px;
  height: 100%;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>