
// import { describe, it, expect, vi } from "vitest";
// import { mount } from "@vue/test-utils";
// import  tuTable  from "../src/components/tuTable/tuTable.vue";
// import { TuTableStore } from "../src/components/tuTable/tuTableStore";
 
// const columns = [
// 	{
// 		index: 1,
// 		caption: "Action",
// 		field: "action",
// 		dataType: "string"
// 	},
// 	{
// 		index: 2,
// 		field: "country",
// 		caption: "Country",
// 		props: {
// 			sort: true
// 		},
// 	},
// 	{
// 		index: 3,
// 		field: "name",
// 		caption: "Name",
// 		props: {
// 			sort: true
// 		},
// 	},
// 	{
// 		index: 4,
// 		field: "web_pages",
// 		caption: "Web Page",
// 		props: {
// 			sort: true,
// 			search: false
// 		}
// 	},

// 	{
// 		index: 6,
// 		field: "testDate",
// 		caption: "Date",
// 		dataType: "timestamp",
// 		props: {
// 			sort: true,
// 			search: true
// 		}
// 	}
// ];

// describe("tuTable", () => {
// 	it("should renders page correctly if columns not passed as prop or given empty array",async () => {
// 		const wrapper = mount(tuTable, {
// 			props: {
// 				columns: columns,
// 				model: "server",
// 			}
// 		});
// 		vi.doMock( TuTableStore , async () => {
// 			let TuTableStore = await vi.importActual("../src/components/tuTable/tuTableStore.ts");
// 			return {
// 				...TuTableStore.TuTableStore,
// 				getTableData: () => {
// 					return new Promise((resolve) => {
// 						resolve(false);
// 					});
// 				}
// 			};
// 		});
// 		console.log(await wrapper.vm.table.getTableData());
// 		await wrapper.vm.table.getTableData();
// 		expect(wrapper.findAll(".span")).toHaveLength(80);
// 	});
// });