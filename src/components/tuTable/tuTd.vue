<template>
	<td class="tu-table__td" :class="{
		isCheck: checkbox,
		isEdit: edit,
		textWrap: textWrap
	}" @click="clickHandler">
		<slot />
	</td>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import tuComponent from "../tuComponent";

export default defineComponent({
	name: "TuTd",
	extends: tuComponent,
	props: {
		checkbox: {
			type: Boolean,
			default: false
		},
		edit: {
			type: Boolean,
			default: false
		},
		textWrap: {
			type: Boolean,
			default: false
		},
		expand: {
			type: Boolean,
			default: false
		}
	},
	setup(props, context) {
		const clickHandler = function (event: MouseEvent) {
			if (props.checkbox || props.edit) (event as any).isInput = true;
			else if (props.expand) (event as any).isExpand = true;
			context.emit("tdClick", event);
		};

		return {
			clickHandler
		};
	}
});
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
