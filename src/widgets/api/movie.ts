import axios, { AxiosRequestConfig } from "axios";
import { createEffect } from "effector";
import { GetMoviesResponse } from "src/widgets/models/MovieModels";
import { apiInstance } from "src/shared/api/base";

export const getMoviesFx = createEffect(
  async ({
    page = 1,
    limit = 10,
    selectFields = [
      "id",
      "name",
      "year",
      "rating",
      "ageRating",
      "countries",
      "poster",
    ],
  } = {}) => {
    const cancelTokenSource = axios.CancelToken.source();
    const fields = selectFields.join("&selectFields=");
    const options: AxiosRequestConfig = {
      cancelToken: cancelTokenSource.token,
      params: {
        page,
        limit,
        selectFields: fields,
      },
      paramsSerializer: (params) => {
        return Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&");
      },
    };

    const response = await apiInstance.get<GetMoviesResponse>(`movie`, options);

    getMoviesFx.finally.watch(() => {
      cancelTokenSource.cancel("Operation canceled by the user.");
    });

    return response;
  },
);
