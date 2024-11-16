  <script setup>
  import { ref, onMounted } from "vue";
  import { getRegions, getSggList, getUmdList, getRealEstateSummary, handleApiError } from "@/util/axiosInstance";
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  // 선택 가능한 옵션들을 저장할 ref
  const regions = ref([]);
  const sggList = ref([]);
  const umdList = ref([]);
  
  // 선택된 값들을 저장할 ref
  const selectedRegion = ref('');
  const selectedSgg = ref('');
  const selectedUmd = ref('');
  
  const chartCanvas = ref(null);
  const chartInstance = ref(null);
  const error = ref(null);
  const loading = ref(false);
  
  // 초기 지역 데이터 로드
  const initializeLocationData = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await getRegions();
    
    // response.regions 배열 확인 및 저장
    if (response && response.regions && Array.isArray(response.regions)) {
      regions.value = response.regions;
    } else {
      regions.value = [];
      error.value = "지역 데이터 형식이 올바르지 않습니다.";
    }
  } catch (err) {
    error.value = handleApiError(err);
    regions.value = [];
  } finally {
    loading.value = false;
  }
};
  
  // 시/도 변경 시 처리
  const onRegionChange = async () => {
    selectedSgg.value = '';
    selectedUmd.value = '';
    sggList.value = [];
    umdList.value = [];
    if (!selectedRegion.value) return;
  
    try {
      loading.value = true;
      error.value = null;
      const sggData = await getSggList(selectedRegion.value);
      sggList.value = sggData;
    } catch (err) {
      error.value = handleApiError(err);
    } finally {
      loading.value = false;
    }
  };
  
  // 시군구 변경 시 처리
  const onSggChange = async () => {
    selectedUmd.value = '';
    umdList.value = [];
    if (!selectedSgg.value) return;
  
    try {
      loading.value = true;
      error.value = null;
      const umdData = await getUmdList(selectedRegion.value, selectedSgg.value);
      umdList.value = umdData;
    } catch (err) {
      error.value = handleApiError(err);
    } finally {
      loading.value = false;
    }
  };
  
  // 읍면동 변경 시 처리
  const onUmdChange = async () => {
    if (!selectedUmd.value) return;
    await fetchDataAndRenderChart();
  };
  
  const fetchDataAndRenderChart = async () => {
    if (!chartCanvas.value || !selectedRegion.value || !selectedSgg.value || !selectedUmd.value) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      const data = await getRealEstateSummary(
        selectedRegion.value,
        selectedSgg.value,
        selectedUmd.value
      );
      
      if (!data || data.length === 0) {
        error.value = "선택한 지역의 데이터가 없습니다";
        return;
      }
  
      // 차트 데이터 준비
      const labels = data.map(item => `${item.dealYear}-${item.dealMonth}`);
      const dealCounts = data.map(item => item.dealCount);
      const pricePerArs = data.map(item => item.pricePerAr);
  
      // 기존 차트 인스턴스가 있다면 파괴
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
  
      // Chart.js 차트 생성
      chartInstance.value = new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "거래 건수",
              data: dealCounts,
              yAxisID: "y1",
              type: 'bar',
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
            {
              label: "평당 가격",
              data: pricePerArs,
              yAxisID: "y2",
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y1: {
              type: "linear",
              position: "left",
              title: { 
                display: true, 
                text: "거래 건수",
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                drawOnChartArea: false
              }
            },
            y2: {
              type: "linear",
              position: "right",
              title: { 
                display: true, 
                text: "평당 가격 (만원)",
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                drawOnChartArea: false
              }
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              mode: 'index',
            },
            legend: {
              position: 'top',
            },
          }
        },
      });
    } catch (err) {
      error.value = handleApiError(err);
      console.error("Error rendering chart:", err);
    } finally {
      loading.value = false;
    }
  };
  
  // 컴포넌트 마운트 시 초기 데이터 로드
  onMounted(async () => {
    await initializeLocationData();
  });
  </script>

<template>
  <div class="chart-wrapper">
  <div class="chart-container">
    <div class="location-selector">
      <div class="select-group">
        <label>시/도</label>
        <select 
          v-model="selectedRegion" 
          @change="onRegionChange" 
          class="select-box" 
          :disabled="loading"
        >
          <option value="">시/도 선택</option>
          <option 
            v-for="region in regions" 
            :key="region" 
            :value="region"
          >
            {{ region }}
          </option>
        </select>
      </div>

      <div class="select-group">
        <label>시/군/구</label>
        <select 
          v-model="selectedSgg" 
          @change="onSggChange" 
          class="select-box" 
          :disabled="!selectedRegion || loading"
        >
          <option value="">시/군/구 선택</option>
          <option 
            v-for="sgg in sggList" 
            :key="sgg" 
            :value="sgg"
          >
            {{ sgg }}
          </option>
        </select>
      </div>

      <div class="select-group">
        <label>읍/면/동</label>
        <select 
          v-model="selectedUmd" 
          @change="onUmdChange" 
          class="select-box" 
          :disabled="!selectedSgg || loading"
        >
          <option value="">읍/면/동 선택</option>
          <option 
            v-for="umd in umdList" 
            :key="umd" 
            :value="umd"
          >
            {{ umd }}
          </option>
        </select>
      </div>
    </div>

    <div class="location-info" v-if="selectedRegion && selectedSgg && selectedUmd">
      <h2>{{ selectedRegion }} {{ selectedSgg }} {{ selectedUmd }} 부동산 현황</h2>
    </div>

    <div v-if="!selectedRegion || !selectedSgg || !selectedUmd" class="guide-message">
      지역을 선택해주세요.
    </div>

    <canvas ref="chartCanvas" v-show="selectedRegion && selectedSgg && selectedUmd"></canvas>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-if="loading" class="loading-message">
      데이터를 불러오는 중...
    </div>
  </div>
</div>
</template>

<style scoped>
.chart-wrapper {
  width: 100%;
  margin-bottom: 4rem;
}

.chart-container {
  position: relative;
  width: 100%;
  min-height: 600px;
  height: auto; 
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.location-selector {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.select-group label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.select-box {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 150px;
  background-color: white;
  cursor: pointer;
}

.select-box:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.select-box:focus {
  border-color: #4a90e2;
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.guide-message {
  text-align: center;
  padding: 2rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin: 2rem 0;
}

.location-info {
  text-align: center;
  margin-bottom: 20px;
}

.location-info h2 {
  font-size: 1.5rem;
  color: #333;
  margin: 0;
}

.error-message {
  color: #dc3545;
  text-align: center;
  padding: 1rem;
  background-color: #f8d7da;
  border-radius: 4px;
  margin-top: 1rem;
}

.loading-message {
  text-align: center;
  padding: 1rem;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-top: 1rem;
}

canvas {
  width: 100% !important;
  height: 400px !important;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .location-selector {
    flex-direction: column; 
    align-items: center; 
    gap: 1rem;
  }

  .select-group {
    width: 90%;
  }
}

@media (min-width: 769px) {
  .location-selector {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
  }

  .select-group {
    width: auto;
  }
}
</style>
