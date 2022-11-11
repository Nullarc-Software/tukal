<template>
	<header>
		<h2 class="dialog-header" v-if="!isEditEvent">
			{{ event.Title }}
		</h2>
		<h2 v-else class="dialog-header">Edit</h2>
	</header>
	<div class="center">
		<div>
			<table>
				<tr>
					<td>
						<span title="Label">Title</span>
					</td>
					<td>
						<tu-input
							primary
							v-model="event.Title"
							state="primary"
							placeholder="Title"
							:disable="!isEditEvent"
						/>
					</td>
				</tr>
				<tr>
					<td>
						<span title="Label">Start Date</span>
					</td>
					<td>
						<tu-input
							type="date"
							v-model="event.StartDate"
							:disable="!isEditEvent"
						/>
					</td>
				</tr>
				<tr>
					<td>
						<span title="Label">Start Time</span>
					</td>
					<td>
						<tu-input
							type="time"
							v-model="event.StartTime"
							:disable="!isEditEvent"
						/>
					</td>
				</tr>
				<tr>
					<td>
						<span title="Label">End Date</span>
					</td>
					<td>
						<tu-input
							type="date"
							v-model="event.EndDate"
							:disable="!isEditEvent"
						/>
					</td>
				</tr>
				<tr>
					<td>
						<span title="Label">End Time</span>
					</td>
					<td>
						<tu-input
							type="time"
							v-model="event.EndTime"
							:disable="!isEditEvent"
						/>
					</td>
				</tr>
				<tr>
					<td>
						<span title="Label">Category</span>
					</td>
					<td>
						<tu-select
							inline
							:disabled="!isEditEvent"
							v-model="event.Category"
						>
							<tu-select-option
								v-for="category in categories"
								:key="category"
								:label="category.name"
								:value="category.name"
							>
								<span
									class="dot"
									:style="`background: ${_color.getApplyColor(
										category.color,
										0.6
									)}`"
								></span>
								{{ category.name }}
							</tu-select-option>
						</tu-select>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div v-if="!isEditEvent">
		<tu-button success @click.stop="isEditEvent = true"> Edit </tu-button>
		<tu-button
			danger
			@click="
				deleteItem();
			"
		>
			delete
		</tu-button>
	</div>
	<div v-else>
		<tu-button success @click.stop="editItem()"> Save </tu-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "TestComponent2",
	props: {
		selectedEvent: {},
		categories: {}
	},
	emits: ["editItem", "deleteItem"],
	setup (props, context) {
		const event = ref(props.selectedEvent);
		const isEditEvent = ref(false);
		const editItem = () => {
			context.emit("editItem", event.value);
			isEditEvent.value = false;
		};
		const deleteItem = () => {
			context.emit("deleteItem", event.value);
		};
		return { isEditEvent, event, editItem, deleteItem };
	}
});
</script>
