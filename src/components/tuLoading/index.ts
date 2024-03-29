import { App, createApp, Ref, ref } from "vue";
import tuComponent from "./tuLoading.vue";

tuComponent.install = (vue: any) => {
	vue.component(tuComponent.name, tuComponent);
};

if (typeof window !== "undefined" && (<any>window).Vue)
	tuComponent.install((<any>window).Vue);


type TuLoadingTypes = "default" | "waves" | "corners" | "border" | "points" | "square" | "gradient" | "rectangle" | "circles" | "square-rotate" | "scale";
interface TuLoadingAttributes {
	type?: TuLoadingTypes;
	text?: string;
	hidden?: boolean;
	color?: string;
	background?: string;
	opacity?: string;
	percent?: string;
	progress?: number;
	target?: any;
	scale?: string;
}

const loadingConstructor = tuComponent;

class TuLoading {
	instance: App | null = null;
	params: Ref<TuLoadingAttributes>;
	isVisible = false;

	public changeText (val: string) {
		if (val)
			this.params.value.text = val;
	}

	public changeProgress (val: number) {
		if (val)
			this.params.value.progress = val;
	}

	public changePercent (val: string) {
		if (val)
			this.params.value.percent = val;
	}

	public close () {
		this.params.value.opacity = "0";
		setTimeout(() => {
			this.instance?.unmount();
		}, 50);
	}

	constructor (paramsAttr: TuLoadingAttributes) {
		this.params = ref(paramsAttr);
		let target: any = null;
		if (typeof paramsAttr.target === "string")
			target = document.querySelector(this.params.value.target);

		else if (paramsAttr.target)
			target = this.params.value.target.$el || this.params.value.target;

		else
			target = document.body;

		this.instance = createApp(loadingConstructor, this.params.value as any);
		const element = document.createElement("div");
		const html = this.instance.mount(element).$el;

		target.appendChild(html);
	}
}

export { TuLoading, tuComponent as tuLoading };	export type { TuLoadingAttributes, TuLoadingTypes };

