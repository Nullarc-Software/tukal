export function groupBy(arr, property, largest, categories) {
	return arr.reduce(function (memo, x: any) {
		if (!memo[x[property]]) {
			memo[x[property]] = [];
			memo[x[property]].id = findCategoryId(categories, x[property]);
		}
		x.categoryId = memo[x[property]].id;
		x.hidden = false;
		memo[x[property]].push(x);
		return memo;
	}, {});
}

function findCategoryId (categories: any[], category: string) {
	for (let i = 0; i < categories.length; i++) {
		if(categories[i].fieldname === category) 
			return i;
	}
}

export function sliceIntoChunks(arr: any, chunkSize: number) {
	const res = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		res.push(chunk);
	}
	return res;
}

export type kanbanItems = {
	id: any;
    content: string;
    image?: string;
    category: string;
	icon?: string;
}

export type kanbanFields = {
	title: string;
	fieldname: string;
}
