import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import tuDialog from "../src/components/tuDialog";

describe("tuDialog", () => {
	it("should change modelValue on clicking the close icon", async () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true
			}
		});
		await wrapper.find(".tu-dialog__close").trigger("click");
		const updateModelValueEvents = wrapper.emitted("update:modelValue");
		const closeEvents = wrapper.emitted("close");
		expect(updateModelValueEvents?.[0]).toStrictEqual([false]);
		expect(closeEvents?.[0]).toStrictEqual([]);
	});

	it("should not show close button when notClose is true", () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true,
				notClose: true
			}
		});
		expect(wrapper.find(".tu-dialog__close").exists()).toBe(false);
	});

	it("should not close on ESC key when notClose is true", async () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true,
				notClose: true
			}
		});

		// Simulate ESC key press
		const escEvent = new KeyboardEvent("keydown", { which: 27 });
		window.dispatchEvent(escEvent);

		await wrapper.vm.$nextTick();
		expect(wrapper.emitted("update:modelValue")).toBeFalsy();
		expect(wrapper.emitted("close")).toBeFalsy();
	});

	it("should not close on clicking outside when notClose is true", async () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true,
				notClose: true
			}
		});

		await wrapper.find(".tu-dialog-content").trigger("click");
		expect(wrapper.emitted("update:modelValue")).toBeFalsy();
		expect(wrapper.emitted("close")).toBeFalsy();
	});

	it("should add rebound animation when clicking outside with notClose", async () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true,
				notClose: true
			}
		});

		await wrapper.find(".tu-dialog-content").trigger("click");
		expect(wrapper.find(".tu-dialog--rebound").exists()).toBe(true);
	});

	it("should close normally when notClose is false", async () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true,
				notClose: false
			}
		});

		await wrapper.find(".tu-dialog-content").trigger("click");
		const updateModelValueEvents = wrapper.emitted("update:modelValue");
		const closeEvents = wrapper.emitted("close");
		expect(updateModelValueEvents?.[0]).toStrictEqual([false]);
		expect(closeEvents?.[0]).toStrictEqual([]);
	});
});