import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { storage } from '../lib/utils';
import { refreshToken, type AuthResponse } from '../lib/api';

// 设置 axios 默认 baseURL
axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5006/api';

interface DecodedToken {
  exp: number;
  // 其他token字段...
}

// 配置 axios 拦截器
axios.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const url = config.url;
    const accessToken = storage.getToken();

    if (
      url?.includes('/customer-auth/register') ||
      url?.includes('/customer-auth/login') ||
      url?.includes('/customer-auth/refresh')
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    if (accessToken) {
      const currentDate = new Date();
      const decodedToken = jwtDecode<DecodedToken>(accessToken);

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        try {
          const refreshTokenValue = storage.getRefreshToken();
          if (refreshTokenValue) {
            const response: AuthResponse =
              await refreshToken(refreshTokenValue);
            if (response.jwt) {
              storage.setToken(response.jwt);
              // Assuming the refresh token is also returned in the response
              if (response.refreshToken) {
                storage.setRefreshToken(response.refreshToken);
              }
            }
            config.headers.Authorization = `Bearer ${response.jwt}`;
          }
        } catch (error) {
          console.error('刷新token失败', error);
          // 这里可以添加额外的错误处理逻辑，比如重定向到登录页面
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 创建一个新的 QueryClient 实例
const queryClient = new QueryClient();

const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackProvider;
