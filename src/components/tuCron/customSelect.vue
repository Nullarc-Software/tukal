<template>
	<renderless-select v-bind="$attrs" @update:model-value="$emit('update:model-value', $event)"
		#default="{ selectedStr, itemRows, clear, select, isSelected, multiple }">
		<div class="vcron-select-container">
			<tu-popper arrow placement="top">
				<tu-button>
					{{ selectedStr }}
					<tu-icon @click="clear()" v-if="!selectedStr.includes('every')"
						style="font-size: 14px; margin-left: 5px;">close</tu-icon>
				</tu-button>
				<template #content>
					<div class="vcron-items">
						<tu-button flat color="primary" v-for="(item, j) in getChildItems(itemRows)" :key="j"
							:active="isSelected(item)" @click="select(item)"
							@click.stop="multiple ? () => { } : toggleMenu()" loadingType="scale">
							<span v-if="item">{{ item.text }}</span>
						</tu-button>
					</div>


				</template>
			</tu-popper>
		</div>
	</renderless-select>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RenderlessSelect from './renderlessSelect.vue'
import tuPopupMenu from "../tuPopper/tuPopupMenu.vue";
import { tuButton } from "../tuButton";
import { tuPopper, tuPopupItem } from "../tuPopper";

export default defineComponent({
	inheritAttrs: false,
	components: {
		RenderlessSelect,
		tuPopupMenu,
		tuButton,
		tuPopper,
		tuPopupItem
	},
	name: 'CustomSelect',
	props: {},
	emits: ['update:model-value'],
	setup() {
		function getChildItems(itemRows) {
			const items = [];
			for (const row of itemRows)
				items.push(...row);
			return items;
		}

		return {
			getChildItems
		}
	}
});
</script>

<style >
.vcron-items {
	width: 400px;
}

.vcron-select-container {
	display: inline-block;
	position: relative;
	margin: 0 0.2em;
}

.tu-dropdown--menu {
	display: flex !important;
	flex-wrap: wrap;
}

.tu-dropdown--item {
	width: unset !important;
}

.tu-dropdown--item-link {
	padding-top: 2px !important;
	padding-bottom: 2px !important;
	overflow-y: auto !important;
}
</style>