import { TreeState, TuTreeViewItemDefn } from "../types";

/**
 * This recursive call is used to traverse a folder looking for all children of a particular type
 * @param parent
 * @param expectedType
 * @returns
 */
export const findChildrenOfType = (parent: TuTreeViewItemDefn, expectedType: string): TuTreeViewItemDefn[] => {
	const children: TuTreeViewItemDefn[] = [];
	if (!parent.children) return children;

	parent.children.forEach(TuTreeViewItemDefn => {
		if (TuTreeViewItemDefn.type === expectedType)
			children.push(TuTreeViewItemDefn);

		if (TuTreeViewItemDefn.type === "folder")
			children.push(...findChildrenOfType(TuTreeViewItemDefn, expectedType));
	});

	return children;
};

export const cascadeStateToDescendants = (item: TuTreeViewItemDefn, state: TreeState): void => {
	item.children?.forEach(child => {
		child.checkedStatus = item.checkedStatus;
		state.emitItemCheckedChange(child);
		cascadeStateToDescendants(child, state);
	});
};

export const notifyParentOfSelection = (child: TuTreeViewItemDefn, state: TreeState): void => {
	if (!child) return;
	const parent = state.getParent(child.id);

	if (!parent) return;

	const isEveryChildChecked = parent.children?.every(child => child.checkedStatus === "true");
	const hasIntermediate = parent.children?.some(child => child.checkedStatus === "indeterminate");
	const hasAnUncheckedChild = parent.children?.some(child => child.checkedStatus === "false" || !child.checkedStatus);
	const hasACheckedChild = parent.children?.some(child => child.checkedStatus === "true");

	if (isEveryChildChecked)
		parent.checkedStatus = "true";

	else if (hasIntermediate || (hasAnUncheckedChild && hasACheckedChild))
		parent.checkedStatus = "indeterminate";

	else
		parent.checkedStatus = "false";

	state.emitItemCheckedChange(parent);
	notifyParentOfSelection(parent, state);
};
