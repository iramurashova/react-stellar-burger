import { RootStore } from "../../store";

export const selectUser = (store: RootStore) => store.user.user;
export const selectAuth = (store: RootStore) => store.user.isAuthChecked;
export const selectEmailChecked = (store: RootStore) => store.user.isEmailChecked;