import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  step?: number;
}

const BackButton = ({ step = 1 }: BackButtonProps) => {
  let navigate = useNavigate();

  function handleBack() {
    navigate(-step);
  }
  return (
    <Button mb="3" onClick={handleBack}>
      Назад
    </Button>
  );
};

export default BackButton;
