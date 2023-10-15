import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import {
  ChevronDownIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-red-500",
];

const Center = ({}) => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  console.log(session);

  const [color, setColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("Something went wrong: ", err);
      });
  }, [playlistId, spotifyApi]);

  console.log(playlist);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-red-300 space-x-3 cursor-pointer rounded-full opacity-90 hover:opacity-80 p-1 pr-2"
          onClick={signOut}
        >
          {(session?.user.image && (
            <img
              src={session?.user.image}
              className="w-10 h-10 rounded-full"
              alt="profile picture"
            />
          )) || <UserCircleIcon className="w-10 h-10" />}
          <div className="flex flex-col space-y-0 justify-center">
            <p style={{ marginBottom: -5 }} className="">
              {session?.user.name}
            </p>
            <p className=" text-xs text-gray-700">Logout</p>
          </div>
          {/* <ChevronDownIcon className="w-5 h-5" /> */}
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white h-80 p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0].url}
          alt="Playlist image"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div className="p-8">
        <Songs />
      </div>
    </div>
  );
};

export default Center;
