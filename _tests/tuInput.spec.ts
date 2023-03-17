import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import  tuInput  from "../src/components/tuInput";

describe("tuInput", () => {
	it("should emit modelValue on input change", async () => {
		const wrapper = mount(tuInput, {
			props: {
				modelValue: ""
			}
		});
		await wrapper.find(".tu-input").setValue("tushar"); 
		expect(wrapper.emitted("update:modelValue")[0]).toEqual(["tushar"]);
	});
	it("should emit modelValue on enter change", async () => {
		const wrapper = mount(tuInput, {
			props: {
				modelValue: ""
			}
		});
		await wrapper.find(".tu-input").trigger("keyup.enter");
		expect(wrapper.emitted("onEnter")[0]).toStrictEqual([]);
	});
	it("should disable input on passing editableStaticInternal as true", async () => {
		const wrapper = mount(tuInput, {
			props: {
				modelValue: "",
				editableStaticInternal: true
			}
		});
		expect(wrapper.find(".tu-input").attributes("editablestaticinternal")).toBe("true");
	});
	it("should emit icon-click on click event", async () => {
		const wrapper = mount(tuInput, {
			props: {
				modelValue: "",
			},
			slots: {
				icon: "<tu-icon>person</tu-icon>"
			}
		});
		await wrapper.find(".tu-input__icon").trigger("click");
		expect(wrapper.emitted("click-icon")[0]).toStrictEqual([undefined]);
	});
});