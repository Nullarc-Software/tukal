import { App, Plugin } from "vue";
import { Router } from "vue-router";
import { TUKAL_ROUTER_KEY, TUKAL_ICON_PACK_KEY } from "../composables/useTukal";

export interface TukalOptions {
	router?: Router;
	iconPackGlobal?: string;
	theme?: {
		colors?: Record<string, string>;
	};
}

export const TukalPlugin: Plugin = {
	install(app: App, options: TukalOptions = {}) {
		// Provide router for inject in components
		if (options.router) {
			app.provide(TUKAL_ROUTER_KEY, options.router);
			// Also provide with legacy key for backward compatibility
			app.provide("appRouter", options.router);
		}

		// Provide iconPackGlobal for inject in components
		if (options.iconPackGlobal) {
			app.provide(TUKAL_ICON_PACK_KEY, options.iconPackGlobal);
			// Also provide with legacy key for backward compatibility
			app.provide("iconPackGlobal", options.iconPackGlobal);
		}
	}
};

export default TukalPlugin;
