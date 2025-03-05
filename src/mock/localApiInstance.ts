import AxiosMockAdapter from "axios-mock-adapter";
import { Country } from "src/widgets/models/countries";
import { DetailedMovie } from "src/entities/models/Movie";

// ------------------ Начало блока генерации фильмов ------------------ //

const TOTAL_MOVIES = 50;

/** Генерируем случайное число в диапазоне [min, max] */
function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Возвращает подмассив случайных элементов из массива arr (без повторений) */
function getRandomSubarray<T>(arr: T[], count: number): T[] {
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

/** Генерация случайных персон (актёров) */
function generateRandomPersons(count: number) {
	const persons = [];
	for (let i = 1; i <= count; i++) {
		persons.push({
			id: i,
			photo: "https://placehold.co/100x100",
			name: `Актёр №${i}`,
			enName: null,
			description: null,
			profession: "актёр",
			enProfession: "actor",
		});
	}
	return persons;
}

/**
 * Создаём базовый список фильмов (MovieBase),
 * а потом внизу «обогащаем» каждый фильм similarMovies и persons,
 * чтобы получился массив DetailedMovie
 */
const baseMovies = Array.from({ length: TOTAL_MOVIES }, (_, index) => {
	const id = index + 1;
	return {
		id,
		name: `Тестовый фильм №${id}`,
		year: randomInt(1950, 2025), // год от 1950 до 2025 (число)
		poster: {
			url: "https://placehold.co/300x500",
			previewUrl: "https://placehold.co/300x500",
		},
		rating: {
			kp: parseFloat((Math.random() * 10).toFixed(1)),
			imdb: parseFloat((Math.random() * 10).toFixed(1)),
			filmCritics: parseFloat((Math.random() * 10).toFixed(1)),
			russianFilmCritics: parseFloat((Math.random() * 10).toFixed(1)),
			await: parseFloat((Math.random() * 10).toFixed(1)),
		},
		ageRating: randomInt(0, 18),
		countries: [
			{
				name: id % 2 === 0 ? "США" : "Россия",
				slug: id % 2 === 0 ? "usa" : "russia",
			},
		],
		description: `Описание тестового фильма №${id}`,
	};
});

/**
 * Обогащаем каждый фильм:
 * - persons: случайный список актёров (3–7 человек)
 * - similarMovies: несколько случайных фильмов из общего списка (2–5 штук)
 */
export const allMovies: DetailedMovie[] = baseMovies.map((movie) => {
	// Подбираем «похожие фильмы»: 2–5 случайных других фильмов (исключаем сам фильм)
	const otherMovies = baseMovies.filter((m) => m.id !== movie.id);
	const randomSimilar = getRandomSubarray(otherMovies, randomInt(2, 5)).map(
		(m) => ({
			id: m.id,
			name: m.name,
			year: m.year,
			poster: m.poster,
			rating: m.rating,
		}),
	);

	// Генерируем 3–7 случайных актёров
	const randomActors = generateRandomPersons(randomInt(3, 7));

	return {
		...movie,
		persons: randomActors,
		similarMovies: randomSimilar,
	};
});

// ------------------ Конец блока генерации фильмов ------------------ //

// ------------------ Генерация отзывов ------------------ //

const TOTAL_REVIEWS = 100;

// Массив с «реальными» текстами отзывов
const reviewParagraphs = [
	"Этот фильм оставил незабываемые впечатления. Сюжет захватывающий, а визуальные эффекты на высшем уровне. Каждый кадр наполнен эмоциями и глубоким смыслом.",
	"Фильм поразил своей атмосферой и неожиданными поворотами. Актерская игра была убедительной, а саундтрек идеально дополнял происходящее на экране.",
	"Очень реалистичное повествование и яркие образы персонажей. Рекомендую к просмотру тем, кто ценит качественное кино и стремится к новым эмоциям.",
	"Режиссура и сценарий демонстрируют высокий уровень мастерства. Фильм заставляет задуматься над важными жизненными вопросами и вызывает целый спектр чувств.",
	"Эффектные визуальные решения и глубокая проработка персонажей делают этот фильм по-настоящему выдающимся. Он оставляет долгий послевкусие и желание пересмотреть его снова.",
];

// Функция, которая формирует длинный текст отзыва, выбирая 2-3 случайных абзаца
function generateLongReviewText(): string {
	const count = randomInt(2, 3);
	const paragraphs = getRandomSubarray(reviewParagraphs, count);
	return paragraphs.join(" ");
}

const allReviews = Array.from({ length: TOTAL_REVIEWS }, (_, index) => {
	const id = index + 1;
	// Назначаем случайный movieId от 1 до TOTAL_MOVIES
	const movieId = randomInt(1, TOTAL_MOVIES);
	return {
		id,
		movieId,
		title: `Отзыв о фильме №${movieId} - ${id}`,
		type: "review",
		review: generateLongReviewText(),
		date: new Date().toISOString(),
		author: `Автор ${randomInt(1, 10)}`,
		userRating: parseFloat((Math.random() * 10).toFixed(1)),
		authorId: randomInt(1, 10),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
});

// ------------------ Инициализация моков ------------------ //

export function setupLocalApiMock(axiosInstance: any): void {
	const mock = new AxiosMockAdapter(axiosInstance);

	// 1) Мок для получения списка фильмов (с фильтрами)
	mock.onGet("/v1.4/movie").reply((config) => {
		const params = config.params || {};

		// Граничные значения фильтра
		const [yearFrom, yearTo] = (params.year || "1990-2025")
			.split("-")
			.map(Number);
		const [ratingFrom, ratingTo] = (params["rating.kp"] || "0-10")
			.split("-")
			.map(Number);
		const [ageFrom, ageTo] = (params.ageRating || "0-18")
			.split("-")
			.map(Number);

		const page = Number(params.page) || 1;
		const limit = Number(params.limit) || 20;
		const country = params.country || "Россия";

		const filtered = allMovies.filter((movie) => {
			const currentYear = movie.year ?? 0;
			const currentAgeRating = movie.ageRating ?? 0;
			const currentKpRating = movie.rating.kp ?? 0;

			const yearInRange =
				currentYear >= yearFrom && currentYear <= yearTo;
			const ageRatingInRange =
				currentAgeRating >= ageFrom && currentAgeRating <= ageTo;
			const ratingInRange =
				currentKpRating >= ratingFrom && currentKpRating <= ratingTo;

			const countryInRange = movie.countries.some(
				(c) => c.name === country,
			);

			return (
				yearInRange &&
				ageRatingInRange &&
				ratingInRange &&
				countryInRange
			);
		});

		const startIndex = (page - 1) * limit;
		const paginated = filtered.slice(startIndex, startIndex + limit);
		const pages = Math.ceil(filtered.length / limit);

		return [
			200,
			{
				docs: paginated,
				total: filtered.length,
				limit,
				page,
				pages,
			},
		];
	});

	// 2) Мок для получения детальной информации о фильме по ID
	mock.onGet(/\/v1\.4\/movie\/\d+$/).reply((config) => {
		const urlParts = config.url?.split("/") ?? [];
		const movieIdStr = urlParts[urlParts.length - 1];
		const movieId = Number(movieIdStr);

		const foundMovie = allMovies.find((m) => m.id === movieId);
		if (!foundMovie) {
			return [404, { message: "Movie not found" }];
		}

		return [200, foundMovie];
	});

	// 3) Мок для получения списка стран
	mock.onGet(
		/\/v1\/movie\/possible-values-by-field\?field=countries\.name/i,
	).reply(() => {
		const countries: Country[] = [
			{ name: "США", slug: "usa" },
			{ name: "Россия", slug: "russia" },
		];
		return [200, countries];
	});

	// 4) Мок для получения отзывов
	//    Ожидается, что запрос содержит параметры: page, limit, movieId (в виде строки, где ID разделены запятыми)
	mock.onGet("/v1.4/review").reply((config) => {
		const params = config.params || {};
		const page = Number(params.page) || 1;
		const limit = Number(params.limit) || 10;
		// Параметр movieId передается как строка, например "1,3,5"
		const movieIdsStr = params.movieId || "";
		const movieIds = movieIdsStr
			.split(",")
			.map((s: string) => Number(s))
			.filter((n: number) => !isNaN(n));

		// Фильтруем отзывы по заданным movieId
		const filteredReviews = allReviews.filter((review) =>
			movieIds.includes(review.movieId),
		);

		const startIndex = (page - 1) * limit;
		const paginatedReviews = filteredReviews.slice(
			startIndex,
			startIndex + limit,
		);
		const pages = Math.ceil(filteredReviews.length / limit);

		return [
			200,
			{
				docs: paginatedReviews,
				total: filteredReviews.length,
				limit,
				page,
				pages,
			},
		];
	});
}
