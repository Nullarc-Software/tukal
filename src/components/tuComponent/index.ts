import { defineComponent, inject, ref } from "vue";
import { Router } from "vue-router";

import { getColor, getColorAsRgb } from "../../utils";

class ComponentConstants {
	public static router : Router;
	public static iconPackGlobal : string;
}

export default defineComponent({

	data () {
		const componentColor = ref("");

		const funcWrapper = function (color) {
			return getColor(color);
		};

		const funcWrapper2 = function (color) {
			return getColorAsRgb(color);
		};

		const approuter = inject<Router|null>("appRouter", null);
		const iconPackGlobal = inject<string|null>("iconPackGlobal", null);

		if (approuter) ComponentConstants.router = approuter;

		if (iconPackGlobal) ComponentConstants.iconPackGlobal = iconPackGlobal;

		return {
			componentColor,
			getColorAsRgb: funcWrapper2,
			getColor: funcWrapper,
			getColorSecondary: Function,
			approuter
		};
	},
	props: {
		color: { type: String, default: "primary" },
		active: { type: Boolean, default: false },
		colorSecondary: {
			type: String,
			default: "rgb(130, 207, 23)"
		},
		textColor: { type: String, default: "#fff" }
	},
	methods: {
		isColorDark () {
			const val = (this.color === "dark" || this.dark || this.componentColor === "dark");
			return val;
		},

		isColor () {
			return !!this.color || !!this.primary || !!this.success || !!this.warn || !!this.danger || !!this.dark;
		}
	},
	mounted () {
		this.getColorSecondary = getColor(this.colorSecondary);
	}
});

export { ComponentConstants };
