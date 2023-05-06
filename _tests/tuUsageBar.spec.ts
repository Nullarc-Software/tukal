import { describe, it, expect} from "vitest";
import { mount } from "@vue/test-utils";
import { default as tuUsageBar } from "../src/components/tuUsageBar";

const dummyItemsOne = [
	{
		name: "Google Chrome",
		time: 120,
	},
	{
		name: "VS Code",
		time: 100,
	},
	{
		name: "Outlook",
		time: 50,
	},
	{
		name: "Instagram",
		time: 70,
	},
	{
		name: "Apple",
		time: 90,
	},
	{
		name: "Windows",
		time: 10,
	},
	{
		name: "Anime",
		time: 100,
	},
];
const dummyItemsTwo = [
	{
		name: "Google Chrome",
		time: 220,
	},
	{
		name: "VS Code",
		time: 1,
	},
	{
		name: "Outlook",
		time: 1,
	},
]

describe("tuUsageBar", () => {
	it("percentage of items should be calculated properly", async () => {
		const wrapper = mount(tuUsageBar, {
			props: {
				items: dummyItemsOne
			}
		});
		const percentageOfGoogleChrome: number = (120/540) * 100;
		const percentageOfVsCode: number = (100/540) * 100;
		const percentageOfAnime: number = percentageOfVsCode;
		const percentageOfApple:number = (90/540) * 100;
		const percentageOfInstagram = (70/540) * 100;
		const percentageOfOutlook = (50/540) * 100;
		const percentageOfWindows = (10/540) * 100;
		const allChildren = wrapper.findAll(".tu-usagebar-children");
		await allChildren[0].trigger("mouseover");
		expect(wrapper.find(".tu-usagebar-text-percentage").text()).toBe( percentageOfGoogleChrome.toFixed(2));
		await allChildren[1].trigger("mouseover");
		expect(wrapper.findAll(".tu-usagebar-text-percentage")[1].text()).toBe( percentageOfVsCode.toFixed(2));
		await allChildren[2].trigger("mouseover");
		expect(wrapper.findAll(".tu-usagebar-text-percentage")[2].text()).toBe( percentageOfAnime.toFixed(2));
		await allChildren[3].trigger("mouseover");
		expect(wrapper.findAll(".tu-usagebar-text-percentage")[3].text()).toBe( percentageOfApple.toFixed(2));
		await allChildren[4].trigger("mouseover");
		expect(wrapper.findAll(".tu-usagebar-text-percentage")[4].text()).toBe( percentageOfInstagram.toFixed(2));
		await allChildren[5].trigger("mouseover");
		expect(wrapper.findAll(".tu-usagebar-text-percentage")[5].text()).toBe( percentageOfOutlook.toFixed(2));
		await allChildren[6].trigger("mouseover");
		expect(wrapper.findAll(".tu-usagebar-text-percentage")[6].text()).toBe( percentageOfWindows.toFixed(2));
	});
	it("if percentage of more than one item is less than 5% then it should be grouped as others", async () => {
		const wrapper = mount(tuUsageBar, {
			props: {
				items: dummyItemsTwo
			}
		});
		expect(wrapper.findAll(".tu-usagebar-text")[1].text()).toBe("Others");
	});
});