import { playlistState } from "@/atoms/playlistAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import Song from "./Song";

const Songs = ({}) => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 text-white pb-28">
      {playlist?.tracks.items.map((item, i) => {
        return <Song key={item.track.id} item={item} order={i} />;
      })}
    </div>
  );
};

export default Songs;
