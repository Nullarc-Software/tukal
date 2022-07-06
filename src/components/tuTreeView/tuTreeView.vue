<template></template>
<script lang="ts">
import TreeItemComponent from "./tuTreeItem.vue";
import { defineComponent } from "vue";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuTreeView",
	extends: tuComponent,
	components: { TreeItemComponent },
	emits: [
		"update:selectedItem",
		"update:checkedItems",
		"onContextMenu",
		"onSelect",
		"onCheck"
	]
});
</script>
