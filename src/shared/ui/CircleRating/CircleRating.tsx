import {
  CircularProgress,
  CircularProgressLabel,
  Tag,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { CircleRatingProps } from "src/shared/models/ICircleRating";

const getRatingColor = (rating: number) => {
  if (rating >= 8.5) {
    return "green.500";
  } else if (rating >= 7) {
    return "green.400";
  } else if (rating >= 6) {
    return "yellow.400";
  } else if (rating >= 5) {
    return "orange.400";
  } else if (rating >= 4) {
    return "red.400";
  } else if (rating >= 3) {
    return "red.600";
  } else if (rating > 0) {
    return "red.800";
  } else {
    return "gray.400";
  }
};

const CircleRating = ({ rating, children }: CircleRatingProps) => {
  const bgColor = useColorModeValue("gray.200", "gray.600");

  if (!rating) {
    return (
      <VStack mb="5px">
        <CircularProgress value={0} color="gray.400" trackColor={bgColor}>
          <CircularProgressLabel>-</CircularProgressLabel>
        </CircularProgress>
        <Tag>{children}</Tag>
      </VStack>
    );
  }
  const color = getRatingColor(rating);
  return (
    <VStack mb="5px">
      <CircularProgress value={rating * 10} color={color} trackColor={bgColor}>
        <CircularProgressLabel>
          {rating.toFixed(0)}/10 <br />
        </CircularProgressLabel>
      </CircularProgress>
      <Tag>{children}</Tag>
    </VStack>
  );
};

export default CircleRating;
