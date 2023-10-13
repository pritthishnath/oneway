import React, { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { currentTrackIdState } from "@/atoms/songAtom";
import { useRecoilState } from "recoil";

const useSongInfo = () => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      console.log("Fetching 1");
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((response) => response.json());

        console.log("Fetching 2 ", trackInfo);
        setSongInfo(trackInfo);
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
