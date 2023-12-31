import React from "react";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col bg-black items-center min-h-screen justify-center w-full">
      <img
        src="https://i.imgur.com/fPuEa9V.png"
        className="w-52 mb-5"
        alt="logo"
      />

      {Object.values(providers).map((provider) => {
        console.log("Provider", provider);
        return (
          <div key={provider.id} className="flex flex-col">
            <button
              className="bg-[#18D860] text-white p-5 rounded-lg text-lg"
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: "/",
                })
              }
            >
              Login with {provider.name}
            </button>
            <p className="text-gray-300 text-xs mt-4">
              (For playing PREMIUM is required)
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
