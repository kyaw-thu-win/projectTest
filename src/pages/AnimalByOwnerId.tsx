import { useLocation } from "react-router-dom";
import AnimalListsByOwner from "../components/AnimalListsByOwner";

export const AnimalByOwnerId = () => {
  const location = useLocation();
  const { data } = location.state;
  return (
    <>
      <AnimalListsByOwner ownerId={data._id} />
    </>
  );
};
