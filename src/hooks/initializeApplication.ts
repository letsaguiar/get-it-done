import { useUserPreferencesStore } from "@/stores/user-preferences.store";
import dayjs from "dayjs";
import { useInactiveTasks } from "./useInactiveTasks";

function cleanUpPreviousAccess() {
	const { inactivateTaskByDate } = useInactiveTasks();

	const userPreferencesStore = useUserPreferencesStore();
	const { lastAccess } = userPreferencesStore.data;

	const isDayAfter = dayjs().isAfter(dayjs(lastAccess), 'day');
	if (isDayAfter) {
		inactivateTaskByDate(dayjs().toDate());
		userPreferencesStore.update({ lastAccess: dayjs().toISOString() })
	}
}

export function initializeApplication() {
	cleanUpPreviousAccess();
}