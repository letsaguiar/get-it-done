import { create } from "zustand";

type State = {
	darkMode: boolean;
}

type Actions = {
	toggleDarkMode: () => void;
}

export const useUserPreferencesStore = create<State & Actions>((set) => ({
	darkMode: false,
	toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
}))