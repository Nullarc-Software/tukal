import { Component } from "vue";

export type CheckedState = "true" | "false" | "indeterminate";
export type SelectState = "selected" | "unselected";
export interface TuTreeViewItemDefn {
    children?: TuTreeViewItemDefn[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
	isComponent?: boolean,
	component?: Component | string,
	componentProps?: Object,
    data?: any,
    id: string
}

export interface ItemEventArgs {
    item: TuTreeViewItemDefn,
    change: CheckedState | SelectState
}

export interface TreeState {
    getParent(childId: string): TuTreeViewItemDefn | undefined;
    trackNode(childNode: TuTreeViewItemDefn, parentNode: TuTreeViewItemDefn): void;
    untrackNode(childNode: TuTreeViewItemDefn): void;
    emitItemSelected(node: TuTreeViewItemDefn): void;
    emitItemCheckedChange(node: TuTreeViewItemDefn): void;
    isNodeExpanded(id: string, type: string): boolean;
}

export interface TreeEvents {
    updateMultiSelectedItems(): void;
    updateSingleSelectedItem(): void;
}

export type IsValidDropCallback = (droppedItem: TuTreeViewItemDefn, dropHost: TuTreeViewItemDefn) => boolean;
