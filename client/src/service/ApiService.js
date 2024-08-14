
import { API_BASE_URL } from "../api-config";

// 공통 API 호출 함수
export function call(api, method) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기 (선택 사항, 인증이 필요할 경우)
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  // 요청 옵션 설정
  let options = {
    headers: headers,
    method: method,
  };

  // API 호출
  return fetch(API_BASE_URL + api, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    })
    .catch((error) => {
      console.log("HTTP error:", error);
    });
}

// 데이터 불러오기 함수
export function fetchProducts() {
  return call("/api/products", "GET")
    .then((data) => {
      console.log("Fetched products:", data);
      return data;
    })
    .catch((error) => {
      console.log("Error fetching products:", error);
    });
}

export function fetchOptions() {
  return call("/api/options", "GET")
    .then((data) => {
      console.log("Fetched options:", data);
      return data;
    })
    .catch((error) => {
      console.log("Error fetching options:", error);
    });
}

// 새로운 fetchProductDetails 함수 추가
export function fetchProductDetails(productName) {
  return call(`/api/products/${productName}`, "GET")
    .then((data) => {
      console.log(`Fetched details for product: ${productName}`, data);
      return data;
    })
    .catch((error) => {
      console.log(`Error fetching details for product: ${productName}`, error);
    });
}


export const fetchReservedDatesWithProductIds = async () => {
  return call('/payment/dates',"GET")
  .then((data) => {
    console.log("Fetched options:", data);
    return data;
  })
  .catch((error) => {
    console.log("Error fetching options:", error);
  });

};

// return call(`/payment/${productName}`);


// ApiService.js

// 수정된 fetchPaymentDetails 함수
export const fetchPaymentDetails = async (productName) => {
  return call(`/payment/${productName}`)
  .then((data) => {
    console.log("Fetched options:", data);
    return data;
  })
  .catch((error) => {
    console.log("Error fetching options:", error);
  });
};

// 다른 fetch 함수들도 경로에 맞게 수정해야 합니다.
