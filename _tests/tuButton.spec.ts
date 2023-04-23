import { describe, vi, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import { tuButton } from "../src/components/tuButton";
// import  Router  from "vue-router";
// import { ComponentConstant } from "../src/components/tuComponent/utils.ts";

// vi.mock("../src/components/tuComponent/utils.ts", async () => {
// 	const ComponentConstants = await vi.importActual("../src/components/tuComponent/utils.ts");
// 	return {
// 		...ComponentConstants,
// 		router : Router
// 	};
// });
// vi.mock("../src/components/tuComponent/utils.ts", async (importOriginal) => {
// 	const mod = await importOriginal();
// 	return {
// 		...mod,
// 		router : Router
// 	};
// });

describe("tuButton", () => {
	it("should trigger and emit event on click", async () => {
		const wrapper = mount(tuButton);
		await wrapper.find(".tu-button").trigger("click");
		expect(wrapper.emitted("click")).toBeTruthy();
	});
	it("should trigger and emit event on mousedown", async () => {
		const wrapper = mount(tuButton);
		await wrapper.find(".tu-button").trigger("mousedown");
		expect(wrapper.emitted("mousedown")).toBeTruthy();
	});
	it("disabled if activedisabled prop is passed", async () => {
		const wrapper = mount(tuButton, {
			props: {
				activeDisabled: true
			}
		});
		expect(wrapper.find(".tu-button--active-disabled")).toBeTruthy();
	});
	it("determine if page is opened via window.open api is called when href prop passed", async () => {
		vi.spyOn(window, "open");
		const wrapper = mount(tuButton, {
			props: {
				href: "https://www.google.com",
				blank: true
			}
		});
		await wrapper.find(".tu-button").trigger("click");
		expect(window.open).toBeCalledWith("https://www.google.com", "_blank");
	});
});
