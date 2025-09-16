<template>
	<td class="tu-table__td" :class="{
		isCheck: checkbox,
		isEdit: edit,
		textWrap: textWrap
	}" @click="clickHandler">
		<slot />
	</td>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Router } from "vue-router";

interface Props {
	checkbox?: boolean;
	edit?: boolean;
	textWrap?: boolean;
	expand?: boolean;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	checkbox: false,
	edit: false,
	textWrap: false,
	expand: false,
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	tdClick: [event: MouseEvent];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const clickHandler = function (event: MouseEvent) {
	if (props.checkbox || props.edit) (event as MouseEvent & { isInput: boolean }).isInput = true;
	else if (props.expand) (event as MouseEvent & { isExpand: boolean }).isExpand = true;
	emit("tdClick", event);
};
</script>

<style lang="scss" scoped>
.tu-table__td {
	padding: 10px 12px;
	transition: all 0.25s ease;
	font-size: 0.8rem;
	border: 0px;
	overflow-wrap: break-word;



	&.isCheckbox {
		width: 23px;
	}

	&.isEdit {
		text-decoration: underline;
		cursor: pointer;
	}

	&.textWrap {
		overflow-wrap: break-word;
		word-wrap: break-word;
	}
}
</style>
