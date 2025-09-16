<template>
	<nav v-bind="$attrs" :class="`tu-align-${align}`" class="tu-breadcrumb" aria-label="breadcrumb">
		<ol class="tu-breadcrumb--ol">
			<slot />
			<li v-for="(item, index) in mutableItems" v-show="!hasSlot" :key="`${item.title}-${index}`" :class="{
				'tu-active': item.active,
				'disabled-link': item.disabled
			}" :aria-current="item.active ? 'page' : undefined">
				<a v-if="!item.active" :href="item.url ? item.url : '#'" :title="item.title" class="tu-breadcrumb--link"
					v-text="item.title"></a>
				<template v-else>
					<span :class="textClass" :style="textStyle" class="tu-breadcrumb--text" v-text="item.title"></span>
				</template>
				<span v-if="!item.active" :class="separator.length > 1 ? 'material-icons' : null"
					class="separator notranslate tu-breadcrum--separator" translate="no" aria-hidden="true"
					v-text="separator"></span>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import _color from "../../utils/color";
import { useRoute } from "vue-router";

interface BreadcrumbItem {
	title: string | ((params: Record<string, string | string[]>) => string);
	url?: string;
	active?: boolean;
	disabled?: boolean;
}

interface ProcessedBreadcrumbItem {
	title: string;
	url?: string;
	active?: boolean;
	disabled?: boolean;
}

interface Props {
	items?: BreadcrumbItem[];
	separator?: string;
	color?: string;
	align?: string;
}

const props = withDefaults(defineProps<Props>(), {
	separator: "/",
	color: "primary",
	align: "left"
});

const slots = useSlots();

const textClass = computed(() => {
	const classes: Record<string, boolean> = {};
	if (_color.isColor(props.color))
		classes[`tu-breadcrumb-text-${props.color}`] = true;

	return classes;
});

const textStyle = computed(() => {
	const style: Record<string, string> = {};
	if (!_color.isColor(props.color))
		style.color = _color.getColor(props.color);

	return style;
});

const hasSlot = computed(() => {
	return !!slots.default;
});

const mutableItems = computed(() => {
	let newItems: ProcessedBreadcrumbItem[] | undefined;
	if (props.items) {
		newItems = props.items.map((item) => {
			if (typeof item.title === "function") {
				return {
					...item,
					title: item.title(useRoute().params)
				};
			}

			return {
				...item,
				title: item.title
			};
		});
	}

	return newItems as ProcessedBreadcrumbItem[];
});
</script>

<style lang="scss" scoped>
@import "../../style/sass/_mixins";

.tu-breadcrumb {
	display: flex;

	&.tu-align-left {
		justify-content: flex-start;
	}

	&.tu-align-center {
		justify-content: center;
	}

	&.tu-align-right {
		justify-content: flex-end;
	}

	.disabled-link {
		opacity: 0.5;
		pointer-events: none;
	}
}

.tu-breadcrumb--ol {
	display: flex;
	flex-wrap: wrap;
	padding: 0.75rem 1rem;
	list-style-type: none;

	li {
		&.tu-active {
			cursor: default;
		}
	}

	a {
		transition: all 0.2s ease;
		color: -getColor("text");
	}
}

.tu-breadcrumb--ol a:hover,
.tu-breadcrumb--ol a:focus {
	color: -getColor("text");
	text-decoration: none;
}

.tu-breadcrum--separator {
	color: rgba(0, 0, 0, 0.4);
	padding: 0 0.5rem 0 0.5rem;

	&.material-icons {
		vertical-align: middle;
		font-size: inherit;
	}
}

@each $color in $tu-colors {
	.tu-breadcrumb-text-#{$color} {
		color: -getColor(colorx);
	}
}
</style>
