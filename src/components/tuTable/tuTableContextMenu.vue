<template>
	<tu-popper arrow>
		<tu-icon v-bind="customIcon"></tu-icon>
		<template #content>
			<tu-popup-menu>
				<tu-popup-item :to="null" v-for="(item, index) of modelValue" :key="index"
					@click="onOptionClicked(item.onClicked)" :onClickClose="item.closeOnClick" :divider="item.divider">
					<tu-popper v-if="item.hasSubMenu" arrow :placement="placement">
						{{ item.caption }}
						<template #content>
							<tu-popup-menu>
								<tu-popup-item :to="null" v-for="(itemSub, indexSub) of item.subMenu" :key="indexSub"
									@click="onOptionClicked(itemSub.onClicked)" :onClickClose="
										item.closeOnClick
									" :divider="item.divider">
									<tu-icon v-if="itemSub.icon">{{
											itemSub.icon
									}}</tu-icon>
									{{ itemSub.caption }}
								</tu-popup-item>
							</tu-popup-menu>
						</template>
					</tu-popper>
					<span v-else>
						{{ item.caption }}
					</span>
				</tu-popup-item>
			</tu-popup-menu>
		</template>
	</tu-popper>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { Router } from "vue-router";
import { TuTableContextMenuEntry } from "./tuTableStore";
import { tuPopper, tuPopupMenu, tuPopupItem } from "../tuPopper";
import tuIcon from "../tuIcon";
import { PlacementType } from "../tuPopper/tuPopper.vue";

interface Props {
	customIcon?: Record<string, unknown>;
	rowData?: Record<string, unknown>;
	rowIndex?: number;
	modelValue?: TuTableContextMenuEntry[];
	placement?: PlacementType;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	customIcon: () => ({
		icon: "more_horiz"
	}),
	rowIndex: 0,
	modelValue: () => [],
	placement: "right",
	color: "primary",
	active: false,
	colorSecondary: "rgb(130, 207, 23)",
	textColor: "#fff"
});

// tuComponent functionality
inject<Router | null>("appRouter", null);
inject<string | null>("iconPackGlobal", null);

// Inject table instance for future use
// const tableInstance = inject<TuTableStore>("tableInstance");

// eslint-disable-next-line @typescript-eslint/ban-types
const onOptionClicked = function (callback?: Function) {
	if (callback && props.rowData) {
		// Type assertion to ensure it's callable
		(callback as (...args: unknown[]) => void)(props.rowData);
	}
};
</script>

<style lang="scss">

</style>
