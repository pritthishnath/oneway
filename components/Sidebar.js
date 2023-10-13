import React, { useEffect, useState } from "react";
import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { useRecoilState } from "recoil";
import {
  playlistIdState,
  playlistState,
  playlistsState,
} from "@/atoms/playlistAtom";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  const [playlists, setPlaylists] = useRecoilState(playlistsState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide pb-36">
      <div className="space-y-4">
        {/* <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <p>Log out</p>
        </button> */}

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[.1px] border-gray-900" />

        {/* Playlists */}
        {playlists?.map((playlist) => {
          return (
            <p
              key={playlist.id}
              className="cursor-pointer hover:text-white"
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
