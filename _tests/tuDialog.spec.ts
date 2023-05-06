import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import  tuDialog  from "../src/components/tuDialog";

describe("tuDialog", () => {
	it("should change modelValue on clicking the close icon", async () => {
		const wrapper = mount(tuDialog, {
			props: {
				modelValue: true
			}
		});
		await wrapper.find(".tu-dialog__close").trigger("click");
		expect(wrapper.emitted("update:modelValue")[0]).toStrictEqual([false]);
		expect(wrapper.emitted("close")[0]).toStrictEqual([]);
	});
});