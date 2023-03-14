import { describe, vi, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { tuButton } from "../src/components/tuButton";

describe("trigger events", () => {
	it("should trigger and emit event on click", () => {
		const wrapper = mount(tuButton, {
			props: {
				success: true
			}
		});
		console.log(wrapper.html());
	});
});
