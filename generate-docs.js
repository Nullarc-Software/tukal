import fs from "fs";

function extractCommentsFromFile(filePath) {
	const fileContent = fs.readFileSync(filePath, "utf8");
	const commentRegex = /\/\*\*(?:\s*\*[^/]|[^*])*?\*\//g;
	const comments = fileContent.match(commentRegex);

	return comments || [];
}

function createMarkdownTable(comments) {
	let markdown = "| Name | Description |\n";
	markdown += "|------|-------------|\n";

	comments.forEach((comment) => {
		const nameRegex = /@name\s+(.*?)\s/;
		const descriptionRegex = /@description\s+(.*?)\s/;
		const name = comment.match(nameRegex);
		const description = comment.match(descriptionRegex);

		if (name && description) 
			markdown += `| ${name[i]} | ${description[i]} |\n`;
	});

	return markdown;
}

function generateDocumentation() {
	try {
		const filePath = "./src/components/tuAlert/tuAlert.vue";
		const comments = extractCommentsFromFile(filePath);
		const markdownTable = createMarkdownTable(comments);

		const vueComponentContent = `<template>
		<div>
		  <h1>My Table</h1>
	  
		  <table>
			<tr>
			  <th>Column 1</th>
			  <th>Column 2</th>
			</tr>
			<tr>
			  <td>Data 1</td>
			  <td>Data 2</td>
			</tr>
			<tr>
			  <td>Data 3</td>
			  <td>Data 4</td>
			</tr>
		  </table>
		</div>
	  </template>
	  
	  <script>
	  export default {
		name: 'TableComponent',
	  };
	  </script>`;

		// Save the generated documentation to a Markdown file
		fs.writeFileSync("./docs/components.md", markdownTable);

		console.log("Documentation generated successfully.");
	}
	catch (error) {
		console.error("Error generating documentation:", error);
	}
}

generateDocumentation();
