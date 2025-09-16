<template>
	<div class="">
		<div :class="{ 'no-items': value.length == 0 }" class="con-chips">
			<slot>
			</slot>

			<input :placeholder="value.length > 0 ? null : placeholder" v-model="newChip" type="text"
				class="con-chips--input" @keypress.enter="addItem">
			<div class="x-global con-chips--remove-all" @click="removeTotalItems">
				<tu-icon :icon-pack="iconPack" :icon="removeIcon"></tu-icon>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import tuChip from "./tuChip.vue";

interface Props {
	value?: unknown[];
	tuColor?: string;
	placeholder?: string;
	items?: unknown[];
	iconPack?: string;
	removeIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
	tuColor: "primary",
	placeholder: "",
	iconPack: "material-icons",
	removeIcon: "close"
});

const emit = defineEmits<{
	input: [value: unknown[]];
}>();

const newChip = ref("");
const chip1 = ref(true);

const addItem = () => {
	const valueOld = props.value as unknown[];
	valueOld.push(newChip.value);
	emit("input", valueOld);
	newChip.value = "";
};

const removeTotalItems = () => {
	const valueOld = props.value as unknown[];
	valueOld.splice(0, (props.value as unknown[]).length);
	emit("input", valueOld);
};
</script>
