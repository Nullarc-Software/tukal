/**
 * @fileoverview TuCalendarHeatMap component - A Vue 3 calendar heatmap visualization component
 * @author Tukal UI Library
 * @since 1.0.0
 */

import { App } from "vue";
import tuComponent from "./tuCalendarHeatMap.vue";

/**
 * Global Vue interface for UMD builds
 */
interface GlobalVue {
	Vue?: {
		createApp?: (options: Record<string, unknown>) => { use: (plugin: unknown) => void };
	};
}

/**
 * Component with install method for Vue 3 plugin system
 */
interface InstallableComponent {
	install: (app: App) => void;
}

/**
 * Install method for Vue 3 plugin system
 * @param app - Vue 3 app instance
 */
const install = (app: App): void => {
	app.component(tuComponent.name || "TuCalendarHeatMap", tuComponent);
};

/**
 * Component with install method attached
 */
const TuCalendarHeatMapComponent = tuComponent as typeof tuComponent & InstallableComponent;
TuCalendarHeatMapComponent.install = install;

// Auto-install for UMD builds
if (typeof window !== "undefined" && (window as GlobalVue).Vue) {
	const vue = (window as GlobalVue).Vue;
	if (vue?.createApp) {
		// Vue 3
		vue.createApp({}).use(TuCalendarHeatMapComponent);
	}
}

export { TuCalendarHeatMapComponent as TuCalendarHeatMap };
export type { TuHeatmapValue, TuHeatmapLocale, TuHeatmapTooltipFormatter, TuHeatmapCalendarItem } from "./Heatmap";
export default TuCalendarHeatMapComponent;