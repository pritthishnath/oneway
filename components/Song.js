import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSpotify from "@/hooks/useSpotify";
import { msToMinAndSec } from "@/lib/time";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const Song = ({ item, order }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(item.track.id);
    setIsPlaying(true);
    console.log(item.track);
    console.log("API", spotifyApi);
    spotifyApi.play({
      uris: [item.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-5 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className="w-5 text-right mr-2">{order + 1}</p>
        <img
          src={item.track.album.images[0].url}
          className="h-10 w-10"
          alt="Song image"
        />
        <div>
          <p className="text-white w-36 lg:w-64 truncate">{item.track.name}</p>
          <p className="md:w-44 lg:w-auto truncate">
            {item.track.artists[0].name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline md:w-44 lg:w-auto truncate">
          {item.track.album.name}
        </p>
        <p>{msToMinAndSec(item.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
