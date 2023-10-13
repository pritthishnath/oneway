import { atom } from "recoil";

export const playlistsState = atom({
  key: "playlistsState",
  default: [],
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DZ06evO2dMtFk",
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});
