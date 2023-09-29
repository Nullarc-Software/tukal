<template>
	<nav v-bind="$attrs" :class="`tu-align-${align}`" class="tu-breadcrumb" aria-label="breadcrumb">
		<ol class="tu-breadcrumb--ol">
			<slot />
			<li v-for="item in mutableItems" v-show="!hasSlot" :key="item.title" :class="{
				'tu-active': item.active,
				'disabled-link': item.disabled
			}" :aria-current="item.active ? 'page' : null">
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

<script lang="ts">
import { computed, defineComponent } from "vue";
import _color from "../../utils/color";
import { useRoute } from "vue-router";

export default defineComponent({
	name: "TuBreadcrumb",
	props: {
		items: {
			type: Array,
			readOnly: false
		},
		separator: {
			type: String,
			default: "/"
		},
		color: {
			type: String,
			default: "primary"
		},
		align: {
			type: String,
			default: "left"
		}
	},
	setup(props, context) {
		const textClass = computed(() => {
			const classes = {};
			if (_color.isColor(props.color))
				classes[`tu-breadcrumb-text-${props.color}`] = true;

			return classes;
		});

		const textStyle = computed(() => {
			const style: any = {};
			if (!_color.isColor(props.color))
				style.color = _color.getColor(props.color);

			return style;
		});

		const hasSlot = computed(() => {
			return !!context.slots.default;
		});

		const mutableItems = computed(() => {
			let newItems: typeof props.items;
			if (props.items) {
				newItems = props.items.map((item) => {
					if (typeof (item as any).title === "function") {
						return {
							...(item as any),
							title: (item as any).title(useRoute().params)
						};
					}

					return item;
				});
			}

			return newItems as any[];
		});

		return {
			textStyle,
			textClass,
			hasSlot,
			mutableItems
		};
	}
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
