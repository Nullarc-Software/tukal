<template>
	<th class="tu-table__th" :class="{
		sort: sort,
		search: search
	}" v-bind="$attrs" :data-sort-type="sortType" ref="theader">
		<div class="tu-table__th__content">
			<div class="tu-table__th__content__text" @click="toggleSort">
				<slot />
				<div v-if="sort" class="tu-table__th__content__icons">
					<tu-icon class="icon-sort-1">keyboard_arrow_up</tu-icon>
					<tu-icon class="icon-sort-2">keyboard_arrow_down</tu-icon>
				</div>
			</div>
			<tu-input v-if="search && type === 'string'" block v-model="colSearch" type="search" @keypress="keyPressed" />
			<div v-if="search && type === 'timestamp'" style="display: inline-flex; flex-direction: column;">
				<tu-input border type="datetime-local" v-model="startDateTime" label="From" @change="setDateFilter" />
				<tu-input border type="datetime-local" v-model="endDateTime" label="To" @change="setDateFilter" />
			</div>
		</div>
		<div class="tu-table__th__resizer_right" :class="{ active: headerElement ? true : false }" v-on="resizeListeners"
			v-if="!fixed"></div>
	</th>
</template>

<script setup lang="ts">
import _ from "lodash";
import {
	computed,
	inject,
	onMounted,
	ref,
	watch,
} from "vue";
import { Router } from "vue-router";
import tuIcon from "../tuIcon";
import tuInput from "../tuInput";
import { TuTableStore } from "./tuTableStore";

defineOptions({
	name: "TuTh"
});

interface Props {
	sort?: boolean;
	search?: boolean;
	field?: string;
	fixed?: boolean;
	type?: string;
	index?: number;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	sort: false,
	search: false,
	field: "",
	fixed: false,
	type: "string",
	index: 0,
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

const emit = defineEmits<{
	enableDragListener: [];
	disableDragListener: [];
}>();

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

const tableInstance = inject<TuTableStore>("tableInstance");
const colSearch = ref("");
const theader = ref<HTMLElement>();
const startDateTime = ref("");
const endDateTime = ref("");

const sortType = computed(() => {
	const item = _.find(tableInstance?.getSorters.value, (value) => {
		return value.field === props.field;
	});
	return item ? item.dir : "none";
});

const headerDefn = tableInstance?.getHeaderObject(
	props.index || props.field
);

const headerElement = ref<HTMLElement>();
let startOffset = 0;

function setDateFilter() {
	if (props.field)
		tableInstance?.setFilter(props.field, "date-between", [startDateTime.value, endDateTime.value]);
}

function keyPressed(event: KeyboardEvent) {
	if (event.key === "Enter" && props.field) {
		switch (props.type) {
		case "string":
			tableInstance?.setFilter(
				props.field,
				"like",
				colSearch.value
			);
			break;
		case "number":
			tableInstance?.setFilter(
				props.field,
				"equals",
				colSearch.value
			);
			break;
		case "timestamp":
			tableInstance?.setFilter(
				props.field,
				"date-between",
				colSearch.value
			);
			break;
		default:
			break;
		}
	}
}

function toggleSort() {
	if (props.sort && props.field) tableInstance?.toggleSort(props.field);
}

watch(colSearch, (value) => {
	if (value === "" && props.field) tableInstance?.deleteFilter(props.field);
});

function trackMouseMove(event: MouseEvent) {
	if (headerElement.value && headerDefn) {
		const newWidth = startOffset + event.pageX;
		if (
			headerDefn.minWidth !== undefined &&
			headerDefn.maxWidth !== undefined &&
			newWidth >= headerDefn.minWidth &&
			newWidth <= headerDefn.maxWidth
		)
			headerDefn.width = startOffset + event.pageX + "px";
		else if (headerDefn.minWidth !== undefined && newWidth < headerDefn.minWidth)
			headerDefn.width = headerDefn.minWidth + "px";
		else if (headerDefn.maxWidth !== undefined) headerDefn.width = headerDefn.maxWidth + "px";
	}
}

function trackMouseUp() {
	headerElement.value = undefined;
	emit("enableDragListener");
}

const resizeListeners = {
	mousedown: function (event: MouseEvent) {
		headerElement.value = theader.value;
		if (headerElement.value) {
			startOffset = headerElement.value.offsetWidth - event.pageX;
			document.addEventListener("mousemove", trackMouseMove);
			document.addEventListener("mouseup", trackMouseUp);
			emit("disableDragListener");
		}
	}
};

onMounted(() => {
	if (headerDefn && theader.value) headerDefn.element = theader.value;
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_functions";

.tu-table__th {
	padding: 10px 12px;
	text-align: left;

	font-size: 0.8rem;
	border: 0px;
	position: relative;

	::v-deep(input) {
		width: 100%;
	}

	&.sort {
		&:hover {
			background: getColor("gray-3");
		}
	}

	&.search {
		.tu-table__th__content {
			display: flex;
			flex-direction: column;
		}
	}

	.icon-sort-1 {
		transform-origin: center bottom;
		font-size: 20px;
	}

	.icon-sort-2 {
		transform-origin: center top;
		font-size: 20px;
	}

	&__resizer {
		&_right {
			position: absolute;
			width: 2px;
			cursor: w-resize;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: getColorAlpha("text", 0.05);

			&.active {
				background-color: getColor("primary");
			}
		}
	}

	&[data-sort-type="asc"] {
		.icon-sort-2 {
			transform: rotate(180deg) translateY(-10px) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transition: inherit;
			transform: translateY(10px);
		}
	}

	&[data-sort-type="desc"] {
		.icon-sort-2 {
			transform: rotate(0deg) translateY(-10px) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transform: rotate(-180deg) translateY(10px) !important;
			transition: inherit;
		}
	}

	&[data-sort-type="none"] {
		.icon-sort-2 {
			transform: rotate(0deg) !important;
			transition: inherit;
		}

		.icon-sort-1 {
			transform: rotate(0deg) !important;
			transition: inherit;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		transition: all 0.25s ease;

		&__text {
			display: flex;
			flex-direction: row;
			align-items: center;
			cursor: pointer;
		}

		&__icons {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-left: 7px;
			transform: scale(0.8);
			transition: all 0.25s ease;
		}

		.tu-icon-arrow {
			position: relative;
			display: block;

			&.icon-sort-1 {
				transform: rotate(45deg);
			}

			&.icon-sort-2 {
				transform: rotate(-135deg);
			}
		}
	}
}
</style>

