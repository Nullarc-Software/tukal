
import _ from "lodash";

export class ExportData {
	private manipulateData (data: Array<any>, columns: string[]) {
		const newItems = [];
		data.forEach((item: []) => {
			newItems.push(_.pick(item, columns));
		});
		const iterate = (obj: Object, column : string) => {
			Object.keys(obj).forEach(key => {
				if (`${key}` === column) {
					newItems.forEach((item) => {
						item[`${key}`] = `${obj[key]}`;
					});
				}
				else {
					if (typeof obj[key] === "object" && obj[key] !== null)
						iterate(obj[key], column);
				}
			});
		};
		columns.forEach((column) => {
			if (!Object.keys(data[0]).includes(column))
				iterate(data[0], column);
		});
		return newItems;
	};

	private convertJSONToCSV (items: Array<any>, name: string) {
		const replacer = (key, value) => value === null ? "" : value; // specify how you want to handle null values here
		const header = Object.keys(items[0]); // it will return all the keys of the object
		const csv = [
			header.join(","),
			...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(","))
		].join("\r\n"); // convert all the object keys and values to csv
		const csvFile = new Blob([csv], { type: "text/csv" }); // creating a csf blob with above csv variable
		const downloadLink = document.createElement("a"); // creating a html link
		downloadLink.download = name; // naming the file info
		downloadLink.href = window.URL.createObjectURL(csvFile); // creating href link using csv blob
		downloadLink.style.display = "none"; // hiding the a tag
		document.body.appendChild(downloadLink); // adding the a tag to the html
		downloadLink.click(); // calling the onclick event on the a tag to redirect to the href mentioned above
	};

	public table (data: Array<any>, columns: string[], name: string) {
		const items = this.manipulateData(data, columns);
		this.convertJSONToCSV(items, name);
	};
}
