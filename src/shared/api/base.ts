import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { setupLocalApiMock } from "src/mock/localApiInstance";

const USE_MOCK = true; // process.env.USE_MOCK === "true";

export const API_URL = "https://api.kinopoisk.dev/";

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

		// Подключаем локальный мок, если активирован режим MOCK
		if (USE_MOCK) {
			setupLocalApiMock(this.axios);
		}
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
