import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import  tuCheckBox  from "../src/components/tuCheckBox";

describe("tuCheckBox", () => {
	it("should emit modelValue on input", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				modelValue: true
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("update:modelValue")[0]).toEqual([false]);
	});
	it("should emit modelValue on input with an array  containing the val", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				val: "carrot",
				modelValue: ["potato"]
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("update:modelValue")[0]).toEqual([ [ "potato", "carrot" ] ]);
	});
	it("should emit modelValue on input with an array not containing the val", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				val: "carrot",
				modelValue: ["carrot"]
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("update:modelValue")[0]).toEqual([[]]);
	});
	it("when indeterminate is true checked should change on click", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				indeterminate: true,
				checked: true
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("update:checked")[0]).toEqual([false]);
	});
	it("indeterminate icon should render on passing the prop true", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				indeterminate: true
			}
		});
		expect(wrapper.find("i").text()).toBe("horizontal_rule");
	});
	it("notValue prop", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				notValue: "Carols",
				modelValue: ["louis"]
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("update:modelValue")[0]).toEqual([["louis", ""]]);
	});
	it("disabled prop disables the checkbox", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				disabled: true,
			}
		});
		expect(wrapper.find(".tu-checkbox--disabled")).toBeTruthy();
	});
	it("loading prop should show loading animation", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				disabled: true,
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.find(".tu-checkbox--loading")).toBeTruthy();
	});
	it("eventBubble prop when passed should emit click event", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				eventBubble: true,
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("click")).toBeTruthy();
	});
	it("should emit blur event", async () => {
		const wrapper = mount(tuCheckBox);
		await wrapper.find(".tu-checkbox").trigger("blur");
		expect(wrapper.emitted("blur")).toBeTruthy();
	});
	it("should update checked prop on input event", async () => {
		const wrapper = mount(tuCheckBox, {
			props: {
				checked: false
			}
		});
		await wrapper.find(".tu-checkbox").trigger("input");
		expect(wrapper.emitted("update:checked")[0]).toEqual([true]);
	});
});