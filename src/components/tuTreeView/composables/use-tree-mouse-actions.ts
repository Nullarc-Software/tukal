import { TuTreeViewItemDefn } from "../types";

export function useTreeViewItemMouseActions () {
	const addHoverClass = (event: DragEvent): void => {
		const target = event.currentTarget as HTMLElement;

		if (target)
			target.classList.add("drag-over");
	};

	const removeHoverClass = (event: DragEvent): void => {
		const target = event.currentTarget as HTMLElement;

		if (target)
			target.classList.remove("drag-over");
	};

	const onDragNode = (item: TuTreeViewItemDefn, event: DragEvent): void => {
		if (event.dataTransfer)
			event.dataTransfer.setData("text/plain", JSON.stringify(item));
	};

	const onDropNode = (dropHost: TuTreeViewItemDefn, event: DragEvent, isDropValid: (item1: TuTreeViewItemDefn, item2: TuTreeViewItemDefn) => boolean): void => {
		if (event.dataTransfer) {
			const droppedNode = JSON.parse(event.dataTransfer.getData("text/plain")) as TuTreeViewItemDefn;

			removeHoverClass(event);

			if (droppedNode.id === dropHost.id)
				return;

			if (!isDropValid(droppedNode, dropHost)) return;
		}
	};

	return {
		addHoverClass,
		removeHoverClass,
		onDragNode,
		onDropNode
	};
}
