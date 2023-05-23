import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

export async function getServe(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
}

export default function profiles() {
  return (
    <>
      <p>Profiles</p>
    </>
  );
}
