import { ItemEventArgs, TreeState, TuTreeViewItemDefn } from "../types";

/**
 * Initialises the root state of a tree.
 * @param selectedItem An array of preselected items
 * @param onItemSelected Callback for itemselected
 * @param checkedItems An array of prechecked items
 * @param onItemsChecked Callback for itemChecked
 * @param isNodeExpanded A callback to verify if node is preset to expanded
 * @param itemSelectedEventHandler A callback when an item is selected.
 * @param itemSelectedEventHandler A callback when an item is checked.
 * @returns
 */
export function useGraph (
	selectedItem: TuTreeViewItemDefn | undefined,
	onItemSelected: (item: TuTreeViewItemDefn) => void,
	checkedItems: TuTreeViewItemDefn[] | undefined,
	onItemsChecked: (selectedItems: TuTreeViewItemDefn[]) => void,
	isNodeExpanded: (id: string, type: string) => boolean,
	itemSelectedEventHandler: (args: ItemEventArgs) => void,
	itemCheckedEventHandler: (args: ItemEventArgs) => void): TreeState {
	const childParentLookUp: {[childId: string]: TuTreeViewItemDefn | undefined } = {};

	const getParent = (childId: string) => childParentLookUp[childId];
	const trackNode = (node: TuTreeViewItemDefn, parentNode: TuTreeViewItemDefn) => {
		childParentLookUp[node.id] = parentNode;
	};
	const untrackNode = (node: TuTreeViewItemDefn) => delete (childParentLookUp[node.id]);

	const checkedItemsLookup: {[childId: string]: TuTreeViewItemDefn } = {};
	checkedItems?.forEach(node => {
		checkedItemsLookup[node.id] = node;
	});

	const emitItemSelected = (node: TuTreeViewItemDefn) => {
		if (node === selectedItem) return;

		itemSelectedEventHandler({
			item: node,
			change: "selected"
		});

		selectedItem = node;
		onItemSelected(node);
	};
	const emitItemCheckedChange = (node: TuTreeViewItemDefn) => {
		itemCheckedEventHandler({
			item: node,
			change: node.checkedStatus!
		});

		if (node.checkedStatus === "true")
			checkedItemsLookup[node.id] = node;
		else
			delete (checkedItemsLookup[node.id]);

		onItemsChecked(Object.values(checkedItemsLookup));
	};

	return {
		getParent,
		trackNode,
		untrackNode,
		emitItemCheckedChange,
		emitItemSelected,
		isNodeExpanded
	};
}
