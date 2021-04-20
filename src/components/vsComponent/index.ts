import functionWrapper from "@/functions";
import { defineComponent, ref } from "vue";
import {getColor} from "../../utils"

export default defineComponent({

	data(){
		
		let componentColor = ref('');

		let funcWrapper = function(color){
			return getColor(color);
		}
		
		return {
			componentColor,
			getColor: funcWrapper,
			getColorSecondary: Function
		}
	},
	props: {
		color: { type: String, default: null },
		danger: { type: Boolean, default: false },
		success: { type: Boolean, default: false },
		warn: { type: Boolean, default: false },
		dark: { type: Boolean, default: false },
		primary: { type: Boolean, default: false },
		active: { type: Boolean, default: false },
		colorSecondary: {
			type: String,
			default: 'rgb(130, 207, 23)'
		},
		textColor: { type: String, default: null}
	},
	methods: {
		isColorDark() {

			let val = (this.color === 'dark' || this.dark || this.componentColor === 'dark');
			return val;
		},

		isColor() {
			return !!this.color || !!this.primary || !!this.success || !!this.warn || !!this.danger || !!this.dark
		}
	},
	mounted() {

		this.getColorSecondary = getColor(this.colorSecondary);
	}
});