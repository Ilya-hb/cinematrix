import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function favorite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { movieId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    try {
      const user = await prismadb.user.findUnique({
        where: { email: currentUser.email || "" },
      });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const isDuplicate = user.favoriteIds.includes(movieId);

      if (isDuplicate) {
        return res
          .status(400)
          .json({ error: "Фильм уже добавлен в список любимых" });
      }

      await prismadb.user.update({
        where: { email: currentUser.email || "" },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      res
        .status(200)
        .json({ message: "Фильм успешно добавлен в список любимых" });
    } catch (error) {
      console.error("Ошибка при добавлении фильма в список любимых", error);
      res.status(500).json({
        error: "Произошла ошибка при добавлении фильма в список любимых",
      });
    }
  } else if (req.method === "DELETE") {
    const { movieId, email } = req.query;

    try {
      const user = await prismadb.user.findUnique({
        where: { email: email || "" },
      });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const isFavorite = user.favoriteIds.includes(movieId);

      if (!isFavorite) {
        return res
          .status(400)
          .json({ error: "Фильм не найден в списке любимых" });
      }

      const updatedFavoriteIds = user.favoriteIds.filter(
        (id: string) => id !== movieId
      );

      await prismadb.user.update({
        where: { email: email || "" },
        data: { favoriteIds: updatedFavoriteIds },
      });

      res
        .status(200)
        .json({ message: "Фильм успешно удален из списка любимых" });
    } catch (error) {
      console.error("Ошибка при удалении фильма из списка любимых", error);
      res.status(500).json({
        error: "Произошла ошибка при удалении фильма из списка любимых",
      });
    }
  } else if (req.method === "GET") {
    try {
      const { currentUser } = await serverAuth(req, res);
      const { movieId } = req.query; // Assuming movieId is part of the request query parameters

      const user = await prismadb.user.findUnique({
        where: { email: currentUser.email || "" },
        select: { favoriteIds: true },
      });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const isFavorite = user.favoriteIds.includes(movieId);
      const favoritedMovies = user.favoriteIds || [];

      return res.status(200).json({ favoritedMovies, isFavorite });
    } catch (error) {
      console.error("Ошибка при получении избранных фильмов", error);
      return res.status(500).json({
        error: "Произошла ошибка при получении избранных фильмов",
      });
    }
  } else {
    res.status(405).json({ error: "Метод не разрешен" });
  }
}

// }
// else if (req.method === "GET") {
//   const { currentUser } = await serverAuth(req, res);
// try{const user = await prismadb.user.findUnique({
//         where: { email: currentUser.email || "" },
//         select: { favoriteIds: true },
//       });

//       if (!user) {
//         return res.status(404).json({ error: "Пользователь не найден" });
//       }

//     const isFavorite = user.favoriteIds.includes(movieId);
//     const favoritedMovies = user.favoriteIds || [];
//     return res.status(200).json(favoritedMovies);
//     res.status(200).json({ isFavorite });}

//   } catch (error) {
//     console.error("Ошибка при проверке статуса избранного", error);
//     res.status(500).json({
//       error: "Произошла ошибка при проверке статуса избранного",
//     });
//   }
// } else {
//   res.status(405).json({ error: "Метод не разрешен" });
// }
