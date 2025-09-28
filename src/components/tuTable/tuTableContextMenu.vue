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
import { TuTableContextMenuEntry } from "./tuTableStore.refactored";
import { useTableRowContext } from "./useTableRowContext";
import { tuPopper, tuPopupMenu, tuPopupItem } from "../tuPopper";
import tuIcon from "../tuIcon";
import { PlacementType } from "../tuPopper/tuPopper.vue";

defineOptions({
	name: "TuTableContextMenu"
});

interface Props {
	customIcon?: Record<string, unknown>;
	modelValue?: TuTableContextMenuEntry[];
	placement?: PlacementType;
	// tuComponent props
	color?: string;
	active?: boolean;
	colorSecondary?: string;
	textColor?: string;
}

withDefaults(defineProps<Props>(), {
	customIcon: () => ({
		icon: "more_horiz"
	}),
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

// Use row context composable
const rowContext = useTableRowContext();

// eslint-disable-next-line @typescript-eslint/ban-types
const onOptionClicked = function (callback?: (...args: unknown[]) => void) {
	if (callback && rowContext?.rowData) {
		// Pass row data to callback
		callback(rowContext.rowData);
	} 
	else if (callback) {
		// Fallback for callbacks that don't need row data
		callback();
	}
};
</script>

<style lang="scss">

</style>
