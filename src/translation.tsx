import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const translations = import.meta.glob('./translations/**/*.json', { import: 'default', eager: true })
const resources = (() => {
	const data: Record<string, any> = {}

	for (const [key, value] of Object.entries(translations)) {
		console.log(key, value)
		let [language, namespace] = key.split('/').slice(2);
		namespace = namespace.replace('.json', '');

		if (!data[language])
			data[language] = {}

		data[language][namespace] = value;
	}

	return data;
})()

i18next
	.use(initReactI18next)
	.init({
		lng: 'en',
		fallbackLng: 'en',
		resources: resources,
		interpolation: {
			escapeValue: false
		}
	})