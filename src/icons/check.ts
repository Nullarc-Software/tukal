import { defineComponent, VNode } from "vue";
import "./icons.sass";

export default defineComponent({
	props: {
		indeterminate: { type: Boolean, default: false }
	},

	render (h: any): VNode {
		const icon = h(
			"i",
			{
				staticClass: "tu-icon-check",
				on: {
					...this.$attrs
				},
				class: [
					{
						indeterminate: this.indeterminate
					}
				]
			},
			[
				h("span", {}, [
					h("div", {
						staticClass: "line1"
					}),
					h("div", {
						staticClass: "line2"
					})
				])
			]
		);

		return icon;
	}
});
