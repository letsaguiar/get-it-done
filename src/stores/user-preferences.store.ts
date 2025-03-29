import { create } from "zustand";

const Store = "UserPreference"

type State = {
	darkMode: boolean;
}

type Actions = {
	toggleDarkMode: () => void;
	commit: () => void;
}

export const useUserPreferencesStore = create<State & Actions>((set, get) => ({
	darkMode: false,
	commit: () => {
		const data: State = {
			darkMode: get().darkMode
		};

		localStorage.setItem(Store, JSON.stringify(data));
	},
	toggleDarkMode: () => {
		set(state => ({ darkMode: !state.darkMode }));
		get().commit();
	},
	...JSON.parse(localStorage.getItem(Store) || '{}')
}))