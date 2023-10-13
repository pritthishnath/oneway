import spotifyApi from "@/lib/spotify";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";

// const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.SPOTIFY_ID,
//   clientSecret: process.env.SPOTIFY_SECRET,
// });

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session, spotifyApi]);

  return spotifyApi;
};

export default useSpotify;
