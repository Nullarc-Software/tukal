export class ExportData {
	public table : any = (data:any) => {
		const items = data;
		const replacer = (key, value) => value === null ? "" : value; // specify how you want to handle null values here
		const header = Object.keys(items[0]);
		const csv = [
			header.join(","),
			...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(","))
		].join("\r\n");
		const csvFile = new Blob([csv], { type: "text/csv" });
		const downloadLink = document.createElement("a");
		downloadLink.download = "Info";
		downloadLink.href = window.URL.createObjectURL(csvFile);
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
	};
}
