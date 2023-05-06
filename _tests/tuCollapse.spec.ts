import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import { tuCollapse, tuCollapseItem } from "../src/components/tuCollapse";

describe("tuCollapse", () => {
	it("should render ", async () => {
		const wrapperItem = mount(tuCollapseItem, {
			slots: {
				header: "Collapse item Header",
				default: "Collapse item Body"
			}
		});
		const wrapper = mount(tuCollapse, {
			slots: {
				default: wrapperItem.html()
			}
		});
		console.log(wrapper.html());
	});
});