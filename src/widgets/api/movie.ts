import axios, { AxiosRequestConfig } from "axios";
import { createEffect } from "effector";
import { GetMoviesResponse } from "src/widgets/models/MovieModels";
import { apiInstance } from "src/shared/api/base";

type GetMoviesFxParams = {
  page?: number;
  limit?: number;
  sortField?: string[];
  sortType?: string[];
  year?: string[];
  ratingKp?: string[];
  ageRating?: string[];
  countriesName?: string[];
  selectFields?: string[];
};

export const getMoviesFx = createEffect<GetMoviesFxParams, GetMoviesResponse>(
  async ({
    page = 1,
    limit = 10,
    year = [],
    ratingKp = [],
    ageRating = [],
    countriesName = [],
    selectFields = [
      "id",
      "name",
      "description",
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

    if (year.length > 0) {
      options.params.year = year.join(",");
    }
    if (ratingKp.length > 0) {
      options.params["rating.kp"] = ratingKp.join(",");
    }
    if (ageRating.length > 0) {
      options.params.ageRating = ageRating.join(",");
    }
    if (countriesName.length > 0 && countriesName[0] !== "") {
      options.params["countries.name"] = countriesName.join(",");
    }

    const response = await apiInstance.get<GetMoviesResponse>(
      `/v1.4/movie`,
      options,
    );

    return response;
  },
);
