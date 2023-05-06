import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import  tuAlert  from "../src/components/tuAlert";

describe("tuAlert", () => {
	it("should render if prop active is passed", async () => {
		const wrapper = mount(tuAlert, {
			props: {
				active: true
			}
		});
		expect(wrapper.find(".con-tu-alert-primary")).toBeTruthy();
	});
	it("should close the alert on click event which is making the active prop false", async () => {
		const wrapper = mount(tuAlert, {
			props: {
				active: true,
				closable: true
			}
		});
		await wrapper.find(".tu-alert--close").trigger("click");
		expect(wrapper.emitted("update:active")[0]).toEqual([false]);
	});
});