import { TuTableRow } from "./tuTableStore";
import _ from "lodash";

export class ExportData {
	private manipulateData = (data: Array<TuTableRow>, columns: Array<String>) => {
		const items = data;
		const newItems = [];
		items.forEach((item) => {
			newItems.push(_.pick(item, `${columns}`.split(",")));
		});
		columns.forEach((column) => {
			if (column.includes("expanded")) {
				const arr = `${column}`.split(".");
				const l = arr.length;
				newItems.forEach((item) => {
					item[`${arr[l - 1]}`] = item.expanded.props[`${arr[l - 1]}`];
					delete item.expanded;
				});
			}
		});
		return newItems;
	};

	private convertJSONToCSV = (items: Array<TuTableRow>) => {
		const replacer = (key, value) => value === null ? "" : value; // specify how you want to handle null values here
		const header = Object.keys(items[0]); // it will return all the keys of the object
		const csv = [
			header.join(","),
			...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(","))
		].join("\r\n"); // convert all the object keys and values to csv
		const csvFile = new Blob([csv], { type: "text/csv" }); // creating a csf blob with above csv variable
		const downloadLink = document.createElement("a"); // creating a html link
		downloadLink.download = "Info"; // naming the file info
		downloadLink.href = window.URL.createObjectURL(csvFile); // creating href link using csv blob
		downloadLink.style.display = "none"; // hiding the a tag
		document.body.appendChild(downloadLink); // adding the a tag to the html
		downloadLink.click(); // calling the onclick event on the a tag to redirect to the href mentioned above
	};

	public table = (data: Array<TuTableRow>, columns: Array<String>) => {
		const items = this.manipulateData(data, columns);
		this.convertJSONToCSV(items);
	};
}
