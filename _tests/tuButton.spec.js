import { describe, vi, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { tuButton } from "../src/components/tuButton";
import  Router  from "vue-router";

vi.doMock("../src/components/tuComponent", () => {
	const ComponentConstants = vi.importActual("../src/components/tuComponent");
	return {
		...ComponentConstants,
		router : Router(() => ({
			push:vi.fn()
		}))
	};

});

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
	it("disabled if activedisabled prop is passed", async () => {
		const wrapper = mount(tuButton, {
			props: {
				to: "/test"
			}
		});
		let push = vi.fn();
		await wrapper.find(".tu-button").trigger("click");
		expect(push).toBeCalled();
	});
});
