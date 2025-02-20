import axios from "axios";


const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

const getCookie = (name: string): string | null => {
  if (document) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  }
  return null;
};

const customHeaders = (
  auth?: boolean,
  media?: boolean
): { [key: string]: string } => {
  const header: { [key: string]: string } = DEFAULT_HEADERS;
  if (auth) {
    header["Authorization"] = `Bearer ${getCookie("token")}`;
  }
  if (media) {
    delete header["Content-Type"];
  }
  return header;
};

const http = axios.create({
  baseURL: import.meta.env.BASE_URL,
});


http.interceptors.request.use((config) => {
  config.headers = customHeaders(true);
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error response:", error.response);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return Promise.reject(new Error(error.message));
  }
);

const httpService = {
  get: async (url: string, params?: any): Promise<any> => {
    return await http.get(url, { params });
  },

  post: async (url: string, data: any): Promise<any> => {
    return await http.post(url, data);
  },

  put: async (url: string, data: any): Promise<any> => {
    return await http.put(url, data);
  },

  delete: async (url: string): Promise<any> => {
    return await http.delete(url);
  },
};

export default httpService;
