import { Theme } from "@/components/theme-provider/ThemeProvider";
import { create } from "zustand";

const Store = "UserPreference"

type State = {
	darkMode: boolean;
}

type Actions = {
	theme: Theme;
	toggleTheme: () => void;
	commit: () => void;
}

export const useUserPreferencesStore = create<State & Actions>((set, get) => ({
	theme: 'dark',
	toggleTheme() {
		const toggleMap: Record<Theme, Theme> = {
			'dark': 'light',
			'light': 'dark'
		};

		set(state => ({ theme: toggleMap[state.theme] }))
		get().commit();
	},
	commit: () => {
		const data: State = {
			darkMode: get().darkMode
		};

		localStorage.setItem(Store, JSON.stringify(data));
	},
	...JSON.parse(localStorage.getItem(Store) || '{}')
}))