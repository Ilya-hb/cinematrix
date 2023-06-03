import React, { useEffect, useState } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading } from "react-icons/ai";

interface Props {
  movieId: string;
}

function FavoritesButton({ movieId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUserData } = useCurrentUser();
  const currentUserEmail = currentUserData?.email;

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get("/api/favorite", {
          params: {
            movieId,
            email: currentUserEmail,
          },
        });
        setIsFavorite(response.data.isFavorite);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUserEmail) {
      checkFavoriteStatus();
    }
  }, [movieId, currentUserEmail]);

  const handleFavoritesAction = async () => {
    try {
      setIsLoading(true);

      if (isFavorite) {
        await axios.delete("/api/favorite", {
          params: {
            movieId,
            email: currentUserEmail,
          },
        });
        setIsFavorite(false);
      } else {
        await axios.post("/api/favorite", {
          movieId,
          email: currentUserEmail,
        });
        setIsFavorite(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <button
      className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-3 py-3 transition-colors duration-300 ease-in-out block"
      onClick={handleFavoritesAction}
      disabled={isLoading} 
    >
      {isLoading ? (
        <AiOutlineLoading className="text-2xl animate-spin" />
      ) : isFavorite ? (
        <AiFillHeart className="text-2xl" />
      ) : (
        <AiOutlineHeart className="text-2xl" />
      )}
    </button>
  );
}

export default FavoritesButton;
