import { useUserPreferencesStore } from "@/stores/user-preferences.store";
import dayjs from "dayjs";
import { useInactiveTasks } from "./useInactiveTasks";

function checkPreviousAccess() {
	const userPreferencesStore = useUserPreferencesStore();
	const { lastAccess } = userPreferencesStore.data;

	return (dayjs().isAfter(dayjs(lastAccess), 'day'));
}

function cleanUpPreviousAccess() {
	const { inactivateTaskByDate } = useInactiveTasks();
	const userPreferencesStore = useUserPreferencesStore();

	inactivateTaskByDate(dayjs().toDate());
	userPreferencesStore.update({ lastAccess: dayjs().toISOString() })
}

export function initializeApplication() {
	const isDayAfter = checkPreviousAccess();
	if (isDayAfter) {
		cleanUpPreviousAccess();
	}
}