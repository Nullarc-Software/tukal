import { describe, it, expect, vi} from "vitest";
import { mount } from "@vue/test-utils";
import  tuTimeline  from "../src/components/tuTimeline";
import { nextTick } from "vue";

const hours = new Date().getHours();
const minutes = new Date().getMinutes();
const timeInMinutes = hours * 60 + minutes;
const current = (timeInMinutes / 1440) * 100;

const intervals = [1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,0,1];
 
const myElement = {
	appendChild: vi.fn()
};
  
const documentMock = {
	getElementById: vi.fn().mockReturnValue(myElement)
};

const createElementSpy = vi.spyOn(document, "createElement");
const getElementByIdSpy = vi.spyOn(document, "getElementById");

describe("tuTimeline", () => {
	it("should render current Time properly", async () => {
		const wrapper = mount(tuTimeline, {
			props: {
				interval: 5,
				intervalStartTime: 9,
				intervalEndTime: 19,
				intervals: intervals
			},
			attachTo: document.body,
			globals: {
				document: documentMock
			}
		});
		await nextTick();
		const currentTimeDiv = wrapper.find(".tu-timeline-current-time").element;
		const marginLeft = window.getComputedStyle(currentTimeDiv).marginLeft;
		expect(Math.round(parseFloat(marginLeft))).toBe(Math.round(current));
	});
	it("should append child divs", async () => {
		const wrapper = mount(tuTimeline, {
			props: {
				interval: 5,
				intervalStartTime: 9,
				intervalEndTime: 19,
				intervals: intervals
			},
			globals: {
				document: documentMock
			}
		});
		await nextTick();    
		expect(createElementSpy).toHaveBeenCalledWith("div");
		expect(getElementByIdSpy).toBeCalledWith("tu-timeline-box-1");
	});
});