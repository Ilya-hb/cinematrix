import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <div className="flex w-full justify-center align-middle m-5">
      <button className="p-2 bg-red-600 text-white " onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}
