import { writable } from "svelte/store";

const accessToken = localStorage.getItem("access_token");

export const guitar = writable();
export const guitars = writable([]);
export const token = writable(accessToken);
