import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import { Person } from "@/typings";
import requests from "@/utils/requests";
import React from "react";

interface PeopleProps {
  id: string;
  person: Person;
}

const MAX_BIOGRAPHY_LENGTH = 350;

const PeoplePage: NextPage<PeopleProps> = ({ id, person }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderBiography = (biography: string) => {
    if (biography.length <= MAX_BIOGRAPHY_LENGTH) {
      return <p className="mb-6 text-xl">{biography}</p>;
    }

    const truncatedBiography = expanded
      ? biography
      : biography.slice(0, MAX_BIOGRAPHY_LENGTH) + "...";

    return (
      <div className="mb-6">
        <p className="text-xl">{truncatedBiography}</p>
        {biography.length > MAX_BIOGRAPHY_LENGTH && (
          <button
            onClick={handleToggleExpand}
            className="text-neutral-300 underline text-xl"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            {/* Left Column - Person Profile and Details */}
            <div className="mb-6">
              <Image
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                width={300}
                height={450}
                className="rounded-lg"
              />
            </div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
              {person.place_of_birth && (
                <p className="text-white text-lg">
                  Place of Birth: {person.place_of_birth}
                </p>
              )}
              {person.birthday && (
                <p className="text-white text-lg">
                  Birthday: {person.birthday}
                </p>
              )}
              {person.deathday && (
                <p className="text-white text-lg">
                  Deathday: {person.deathday}
                </p>
              )}
              <p className="text-white text-lg">
                Known for: {person.known_for_department}
              </p>
            </div>
          </div>

          {/* Right Column - Person Details */}
          <div className="lg:w-2/3 lg:pl-8 mt-6 space-y-10">
            <h2 className="text-3xl font-bold mb-4">Biography</h2>
            {renderBiography(person.biography)}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PeopleProps> = async (
  context
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const id = context.query.id;

  // Handle the case where the `id` parameter is an array
  const personId = Array.isArray(id) ? id[0] : id || ""; // Provide a default value for id
  // Fetch person details based on the `personId` parameter
  const person = await requests.fetchPersonDetails(personId);
  console.log(person);
  return {
    props: {
      id: personId,
      person,
    },
  };
};

export default PeoplePage;
