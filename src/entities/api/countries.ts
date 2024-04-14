import { createEffect } from "effector";
import { apiInstance } from "src/shared/api/base";
import { Country } from "src/widgets/models/countries";

export const getCountriesFx = createEffect(async () => {
  const response = await apiInstance.get<Country[]>(
    "/v1/movie/possible-values-by-field?field=countries.name",
  );
  return response;
});

getCountriesFx.fail.watch(({ error }) => {
  console.error("Failed to fetch countries", error);
});
