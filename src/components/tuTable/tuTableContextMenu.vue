<template>
	<tu-popper arrow>
		<tu-icon>more_horiz</tu-icon>
		<template #content>
			<tu-popup-menu>
				<tu-popup-item v-for="(item, index) of modelValue" :key="index"
					@click="item.onClicked ?? item.onClicked(item.data)" :onClickClose="item.closeOnClick" :divider="item.divider"
				>

					<tu-popper v-if="item.hasSubMenu" arrow placement='right'>
							{{ item.caption }}
							<template #content>
								<tu-popup-menu>
									<tu-popup-item v-for="(itemSub, indexSub) of item.subMenu" :key="indexSub" @click="itemSub.onClicked(itemSub.data)"
									:onClickClose="item.onClicked ?? item.closeOnClick" :divider="item.divider">
										<tu-icon v-if="itemSub.icon">{{ itemSub.icon }}</tu-icon>
										{{ itemSub.caption }}
									</tu-popup-item>
								</tu-popup-menu>
							</template>
					</tu-popper>

				</tu-popup-item>
			</tu-popup-menu>
		</template>
	</tu-popper>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import tuComponent from "../tuComponent";
import { TuTableContextMenuEntry } from "./tuTableStore";

export default defineComponent({
	extends: tuComponent,
	name: "TuTableContextMenu",
	props: {
		modelValue: {
			type: Object as PropType<Array<TuTableContextMenuEntry>>,
			default: () => {}
		}
	},
	setup (props, context) {
		return {

		};
	}
});
</script>

<style lang="scss">
</style>
