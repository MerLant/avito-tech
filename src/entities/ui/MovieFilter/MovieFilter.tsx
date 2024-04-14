import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
  NumberInput,
  NumberInputField,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useUnit } from "effector-react";
import { $countriesStore } from "src/entities/store/countries";
import {
  FilterApplication,
  FilterParams,
} from "src/entities/models/IMovieFilter";
import { getCountriesFx } from "src/entities/api/countries";

const safeParseInt = (value: string, fallback: number) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? fallback : parsed;
};

const MovieFilter: React.FC<
  FilterApplication & { initialFilters: FilterParams }
> = ({ onApplyFilters, initialFilters }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [yearRange, setYearRange] = useState<[number, number]>(
    initialFilters.yearRange,
  );
  const [ageRange, setAgeRange] = useState<[number, number]>(
    initialFilters.ageRange,
  );
  const [ratingRange, setRatingRange] = useState<[number, number]>(
    initialFilters.ratingRange,
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    initialFilters.country || "",
  );
  const countries = useUnit($countriesStore);
  const isPending = useUnit(getCountriesFx.pending);

  useEffect(() => {
    if (countries.length === 0 && !isPending) {
      getCountriesFx();
    }
  }, [countries, isPending]);

  const handleApplyFilters = () => {
    onApplyFilters({
      yearRange,
      ageRange,
      ratingRange,
      country: selectedCountry,
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Фильтры</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Фильтр фильмов</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <FormLabel>Года выхода</FormLabel>
              <HStack spacing={2}>
                <NumberInput
                  value={yearRange[0]}
                  max={yearRange[1]}
                  onChange={(valueString) =>
                    setYearRange([
                      safeParseInt(valueString, yearRange[0]),
                      yearRange[1],
                    ])
                  }
                >
                  <NumberInputField />
                </NumberInput>
                <NumberInput
                  value={yearRange[1]}
                  min={yearRange[0]}
                  onChange={(valueString) =>
                    setYearRange([
                      yearRange[0],
                      safeParseInt(valueString, yearRange[1]),
                    ])
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
              <RangeSlider
                min={1900}
                max={new Date().getFullYear()}
                value={yearRange}
                onChange={(val) => setYearRange(val as [number, number])}
                step={1}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Возростной рейтинг</FormLabel>
              <HStack spacing={2}>
                <NumberInput
                  value={ageRange[0]}
                  max={ageRange[1]}
                  onChange={(valueString) =>
                    setAgeRange([
                      safeParseInt(valueString, ageRange[0]),
                      ageRange[1],
                    ])
                  }
                >
                  <NumberInputField />
                </NumberInput>
                <NumberInput
                  value={ageRange[1]}
                  min={ageRange[0]}
                  onChange={(valueString) =>
                    setAgeRange([
                      ageRange[0],
                      safeParseInt(valueString, ageRange[1]),
                    ])
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
              <RangeSlider
                min={0}
                max={18}
                value={ageRange}
                onChange={(val) => setAgeRange(val as [number, number])}
                step={1}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Рейтинг фильма</FormLabel>
              <HStack spacing={2}>
                <NumberInput
                  value={ratingRange[0]}
                  max={ratingRange[1]}
                  onChange={(valueString) =>
                    setRatingRange([
                      safeParseInt(valueString, ratingRange[0]),
                      ratingRange[1],
                    ])
                  }
                >
                  <NumberInputField />
                </NumberInput>
                <NumberInput
                  value={ratingRange[1]}
                  min={ratingRange[0]}
                  onChange={(valueString) =>
                    setRatingRange([
                      ratingRange[0],
                      safeParseInt(valueString, ratingRange[1]),
                    ])
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </HStack>
              <RangeSlider
                min={0}
                max={10}
                value={ratingRange}
                onChange={(val) => setRatingRange(val as [number, number])}
                step={0.1}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Страна</FormLabel>
              <Select
                placeholder="Выберите страну"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Button mt="4" colorScheme="blue" onClick={handleApplyFilters}>
              Применить фильтры
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MovieFilter;
