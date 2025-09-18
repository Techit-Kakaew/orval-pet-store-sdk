export type SDKConfig = {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
};

let config: SDKConfig = {
  baseUrl: "https://petstore.swagger.io/v2", // default empty — ฝั่ง client ต้องเรียก setSDKConfig ก่อนใช้ (หรืออ่าน env)
  defaultHeaders: {},
};

export const setSDKConfig = (c: SDKConfig) => {
  config = { ...config, ...c };
};

export const getSDKConfig = () => config;
