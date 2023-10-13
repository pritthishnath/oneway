import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";

import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { debounce } from "@/lib/debounce";
import {
  ArrowsRightLeftIcon,
  SpeakerWaveIcon as VolumeDownIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowPathIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon as VolumeUpIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Player = () => {
  const spotifyApi = useSpotify();

  const { data: session } = useSession();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentTrack = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now playing", data.body);
        setCurrentTrackId(data.body?.item.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentTrack();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const debounceAdjustVolume = useCallback(
    debounce((volume) => spotifyApi.setVolume(volume).catch((err) => {}), 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-gray-900 text-white 
    grid grid-cols-3 text-xs md:text-base p-2 md:px-8"
    >
      {/* Left */}
      <div className="flex items-center space-x-4">
        {songInfo?.name && (
          <img
            className="hidden md:inline h-10 w-10"
            src={songInfo?.album?.images?.[0]?.url}
            alt="Track image"
          />
        )}
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon className="button" />

        {isPlaying ? (
          <PauseCircleIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        ) : (
          <PlayCircleIcon
            onClick={handlePlayPause}
            className="button w-10 h-10"
          />
        )}

        <ForwardIcon className="button" />
        <ArrowPathIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex justify-end items-center space-x-3 md:space-x-4">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setVolume((v) => v - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          name="volume"
          id="volume"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setVolume((v) => v + 10)}
        />
      </div>
    </div>
  );
};

export default Player;
