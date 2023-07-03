<template>
	<div>
		<CronCore :fields="fields" :periods="periods" :customLocale="customLocale" :mergeLocale="true" v-bind="$attrs"
			@update:model-value="$emit('update:model-value', $event)" @error="$emit('error', $event)"
			v-slot="{ fields, period }">
			<span class="vcron-editor">
				<span>{{ period.prefix }}</span>
				<div class="vcron-l-spacer">
					<custom-select v-bind="period.attrs" v-on="period.events" :items="period.items" item-value="id"
						:cols="cols['period'] || 1" />
				</div>
				<span>{{ period.suffix }}</span>

				<template v-for="f in fields" :key="f.id">
					<span>{{ f.prefix }}</span>
					<div class="vcron-l-spacer">
						<custom-select v-bind="f.attrs" v-on="f.events" :items="f.items" :cols="cols[f.id] || 1"
							:selection="f.selectedStr" multiple></custom-select>
					</div>
					<span>{{ f.suffix }}</span>
				</template>
			</span>
		</CronCore>
	</div>
</template>

<script lang="ts">
import CronCore from './core.vue'
import { defineComponent } from "vue";
import CustomSelect from './customSelect.vue'
export default defineComponent({
	name: 'VueCronEditor',
	components: {
		CronCore,
		CustomSelect
	},
	props: {
		cols: {
			type: Object,
			default: () => {
				return {
					minute: 5,
					hour: 4,
					day: 4
				}
			}
		},
		customLocale: {
			type: Object,
			default: function (props) {
				return null
			}
		},
		fields: {
			type: Array
		},
		periods: {
			type: Array
		}
	},
	setup() {
	},
	emits: ['update:model-value', 'error']
});
</script>

<style>
.vcron-l-spacer {
	display: inline-block;
	padding: 3px;
}
</style>