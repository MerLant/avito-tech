import { Box, Divider, Heading, Tag, Text, VStack } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { Pagination } from "src/entities/ui";
import { getReviewsFx } from "../../api/review";
import { MovieReviewsProps } from "../../models/review";
import { $reviewsStore } from "../../store/review";

const MovieReviews = ({ movieId }: MovieReviewsProps) => {
	const { docs, total, pages } = useUnit($reviewsStore);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getReviewsFx({
			page: currentPage,
			limit: 5,
			movieId: [movieId.toString()],
		});
	}, [currentPage, movieId]);

	if (total === 0) {
		return <Heading>Отзывов пока нет</Heading>;
	}

	return (
		<Box>
			<Heading as="h3" size="lg" mb={4} w="100%">
				Отзывы
			</Heading>
			{docs.length > 0 ? (
				<VStack divider={<Divider />} spacing={4} w="100%">
					{docs.map((review) => (
						<Box
							key={review.id}
							p={5}
							shadow="md"
							borderWidth="1px"
							borderRadius="md"
							display="flex"
							flexDirection="column"
							gap={4}
							w="100%"
						>
							<Heading as="h4" size="md">
								{review.title || "Без названия"}
							</Heading>
							<Text mt={4}>{review.review}</Text>
							<Text fontSize="sm">
								<Tag>Автор:</Tag>{" "}
								{review.author || "Неизвестен"}
							</Text>
							<Text fontSize="sm">
								<Tag>Оценка пользователя:</Tag>{" "}
								{review.userRating || "Не указана"}
							</Text>
							<Text fontSize="xs" color="gray.500">
								Дата отзыва:{" "}
								{review.createdAt
									? new Date(
											review.createdAt,
										).toLocaleDateString()
									: "-"}
							</Text>
						</Box>
					))}
				</VStack>
			) : (
				<Text>Отзывы отсутствуют.</Text>
			)}
			{pages > 1 && (
				<Pagination
					page={currentPage}
					maxPage={pages}
					setPage={setCurrentPage}
				/>
			)}
		</Box>
	);
};

export default MovieReviews;
