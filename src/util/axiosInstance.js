import axios from "axios";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
  },
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

export const getRealEstateSummary = async (region, sggCdNm, umdNm) => {
  try {
    const encodedRegion = region;
    const encodedSggCdNm = sggCdNm;
    const encodedUmdNm = umdNm;

    const response = await axiosInstance.get(
      `/realestate/summary/${encodedRegion}/${encodedSggCdNm}/${encodedUmdNm}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch real estate summary:", error);
    throw error;
  }
};
export const getRegions = async () => {
  try {
    const response = await axiosInstance.get("/realestate/locations");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch regions:", error);
    throw error;
  }
};

// 시군구 목록 조회
export const getSggList = async (region) => {
  try {
    const encodedRegion = encodeURIComponent(region);
    const response = await axiosInstance.get(
      `/realestate/sgg/${encodedRegion}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sgg list:", error);
    throw error;
  }
};

// 읍면동 목록 조회
export const getUmdList = async (region, sggCdNm) => {
  try {
    const encodedRegion = encodeURIComponent(region);
    const encodedSggCdNm = encodeURIComponent(sggCdNm);
    const response = await axiosInstance.get(
      `/realestate/umd/${encodedRegion}/${encodedSggCdNm}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch umd list:", error);
    throw error;
  }
};

export const handleApiError = (error) => {
  if (error.response) {
    // 서버가 응답을 반환한 경우
    switch (error.response.status) {
      case 400:
        return "잘못된 요청입니다. 입력값을 확인해주세요.";
      case 401:
        return "인증이 필요합니다. 다시 로그인해주세요.";
      case 403:
        return "접근 권한이 없습니다.";
      case 404:
        return "요청하신 데이터를 찾을 수 없습니다.";
      case 500:
        return "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      default:
        return `오류가 발생했습니다. (${error.response.status})`;
    }
  } else if (error.request) {
    // 요청이 전송되었으나 응답을 받지 못한 경우
    return "서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.";
  } else {
    // 요청 설정 중 오류가 발생한 경우
    return "요청 처리 중 오류가 발생했습니다.";
  }
};

export default axiosInstance;
