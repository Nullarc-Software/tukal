export function groupBy(arr, property, largest, categories) {
	let id = 0;
	return arr.reduce(function (memo, x: any) {
		if (!memo[largest])  memo[largest] = 0; 
		if (!memo[x[property]]) {
			memo[x[property]] = [];
			memo[x[property]].id = findCategoryId(categories, x[property]);
		}
		x.id = id;
		x.categoryId = memo[x[property]].id;
		memo[x[property]].push(x);
		id++;
		if (memo[x[property]].length > memo[largest]) 
			memo[largest] = memo[x[property]].length;
		return memo;
	}, {});
}

function findCategoryId (categories: [], category: string) {
	for (let i = 0; i < categories.length; i++) {
		if(categories[i] === category) 
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
    name: string;
    image?: string;
    category: string;
}

// removeObjectWithId(itemsOfCategories.value[dragItem.value.category], dragItem.value.id)
// dragItem.value.categoryId = dropCategory.value
// dragItem.value.category = props.categories[dropCategory.value]
// itemsOfCategories.value[props.categories[dropCategory.value]].push(dragItem.value)
// if(itemsOfCategories.value.noOfRows < itemsOfCategories.value[props.categories[dropCategory.value]].length) {
//     itemsOfCategories.value.noOfRows = itemsOfCategories.value[props.categories[dropCategory.value]].length
// }
// let newOrder = []
// for (let i = 0; i < itemsOfCategories.value["noOfRows"]; i++) {
//     createARow(i, newOrder)
// }
// orderedItems = sliceIntoChunks(newOrder, props.categories.length)
// await nextTick();