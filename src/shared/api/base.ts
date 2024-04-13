import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const API_URL = "https://api.kinopoisk.dev/v1.4/";

class ApiInstance {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      timeout: 120000,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.TOKEN,
      },
    });
  }

  async get<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
    retryCount: number = 3,
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const response: AxiosResponse<T> = await this.axios.get(
          endpoint,
          options,
        );
        return response.data;
      } catch (error) {
        lastError = error;
        console.error(`Attempt ${attempt + 1} failed: ${error}`);

        if (attempt < retryCount - 1) {
          await this.delay(1000);
        }
      }
    }

    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const apiInstance = new ApiInstance();
