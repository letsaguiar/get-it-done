import { IUserPreferencesModel, UserPreferencesModel } from "@/models/user-preferences.model";
import { v4 } from "uuid";
import { createObjectStore } from "./constructs/object.store";

type Extensions = {
	toggleColorMode: () => void
}

export const useUserPreferencesStore = createObjectStore<IUserPreferencesModel, Extensions>({
	name: 'user-preferences',
	schema: UserPreferencesModel,
	initialState: {
		id: v4(),
		colorMode: 'light',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	extensions: (_set, get) => ({
		toggleColorMode() {
			if (get().data.colorMode === 'light')
				get().update({ colorMode: 'dark', updatedAt: new Date() });
			else
				get().update({ colorMode: 'light', updatedAt: new Date() });
		}
	})
})