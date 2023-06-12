import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import requests from "@/utils/requests";
import { Person } from "@/typings";
import axios from "axios";
import Input from "@/components/Input";
import Link from "next/link";

interface PeoplePageProps {}

const PeoplePage: React.FC<PeoplePageProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  const fetchTrendingPeople = async () => {
    try {
      setIsLoading(true);
      const trendingPeople = await requests.fetchTrendingPeople();
      setPeople(trendingPeople);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching trending people: ", error);
      setIsLoading(false);
    }
  };

  

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&query=${searchQuery}`
      );
      setPeople(response.data.results);
    } catch (error) {
      console.error("Error searching for people: ", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const filteredPeople = people.filter((person) => person.profile_path);

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen bg-[url('/images/background_3.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Find People</h2>
          <div className="flex">
            <Input
              label="Find Actor!"
              type="search"
              id="search"
              onChange={(e: any) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyPress={handleKeyPress}
              sx="rounded-none text-xl"
            />
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white text-xl px-4 py-2 hover:bg-red-700 transition rounded-none"
            >
              Search
            </button>
          </div>

          <div className="mt-4">
            {isLoading ? (
              <div className="text-white text-xl">Loading...</div>
            ) : filteredPeople.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mt-8">
                {filteredPeople.map((person) => (
                  <li key={person.id} className="mb-2">
                    <Link href={`/people/${person.id}`} passHref>
                      <div className="p-4 rounded">
                        <img
                          src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                          alt={person.name}
                          className="w-full h-80% my-4 object-cover rounded-lg hover:scale-105 transition"
                        />
                        <h3 className="font-bold text-xl text-white">
                          {person.name}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white mt-4">No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
