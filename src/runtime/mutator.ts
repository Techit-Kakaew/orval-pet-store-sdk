import { getSDKConfig } from "./config";

type BodyType<T> = T | string | FormData;

export const fetchMutator = async <T>(
  url: string,
  {
    method,
    params,
    body,
    responseType,
  }: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    params?: any;
    body?: BodyType<unknown>;
    responseType?: string;
    headers?: Record<string, string>;
  }
): Promise<T> => {
  const { baseUrl = "", defaultHeaders = {} } = getSDKConfig();

  let targetUrl = `${baseUrl}${url}`;

  if (params) {
    const qs = new URLSearchParams(params).toString();
    if (qs) targetUrl += (targetUrl.includes("?") ? "&" : "?") + qs;
  }

  const headers = {
    ...defaultHeaders,
    // ถ้า body เป็น JSON แล้วไม่ได้ตั้ง content-type ให้ใส่
    ...(body && typeof body === "object" && !(body instanceof FormData)
      ? { "Content-Type": "application/json" }
      : {}),
  };

  const init: RequestInit = {
    method,
    headers,
    body:
      body && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as any),
  };

  const res = await fetch(targetUrl, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  if (responseType === "blob") return res.blob() as unknown as T;
  return (await res.json()) as T;
};

export default fetchMutator;
