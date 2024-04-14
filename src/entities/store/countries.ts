import { createStore } from "effector";
import { getCountriesFx } from "src/entities/api/countries";
import { Country } from "src/widgets/models/countries";

const initialCountriesState: Country[] = [];

const $countriesStore = createStore<Country[]>(initialCountriesState)
  .on(getCountriesFx.doneData, (_, response) => {
    return response || [];
  })
  .on(getCountriesFx.fail, (state, error) => {
    console.error("Failed to fetch countries:", error);
    return [];
  });

export { $countriesStore };
