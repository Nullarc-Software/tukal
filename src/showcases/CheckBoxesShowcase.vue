<template>
	<div class="showcase-component">
		<h3>CheckBoxes:</h3>
		<hr />
		<TuCheckbox v-model="checkBox1" val="luis" name="checkbox">
			Option
		</TuCheckbox>
		<TuCheckbox disabled v-model="checkBox9" val="luis" name="checkbox">
			Option disabled
		</TuCheckbox>
		<TuCheckbox v-model="checkBox2" val="luis" name="checkbox">
			Array option
		</TuCheckbox>
		<TuCheckbox v-model="checkBox2" val="carols" name="checkbox">
			Array option
		</TuCheckbox>
		<TuCheckbox v-model="checkBox2" val="maria" name="checkbox">
			Array option
		</TuCheckbox>
		<TuCheckbox color="primary" v-model="checkBox1" val="luis" name="checkbox">
			Primary
		</TuCheckbox>
		<TuCheckbox color="success" v-model="checkBox1" val="luis" name="checkbox">
			Success
		</TuCheckbox>
		<TuCheckbox color="danger" v-model="checkBox1" val="luis" name="checkbox">
			Danger
		</TuCheckbox>
		<TuCheckbox color="warn" v-model="checkBox1" val="luis" name="checkbox">
			Warn
		</TuCheckbox>
		<TuCheckbox color="dark" v-model="checkBox1" val="luis" name="checkbox">
			Dark
		</TuCheckbox>
		<TuCheckbox color="#7d33ff" v-model="checkBox1" val="luis" name="checkbox">
			Color
		</TuCheckbox>
		<TuCheckbox v-model="checkBox1" val="luis" name="checkbox">
			<template v-slot:icon>
				<tu-icon>visibility</tu-icon>
			</template>
			Icon
		</TuCheckbox>
		<TuCheckbox line-through v-model="checkBox1" val="luis" name="checkbox">
			Linethrough
		</TuCheckbox>
		<TuCheckbox :indeterminate="true" v-model="checkBox1" val="luis" name="checkbox">
			Indeterminate
		</TuCheckbox>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { TuCheckbox } from "../components/tuCheckBox";
const checkBox1 = ref(false);
const checkBox9 = ref(false);
const checkBox2 = ref(["luis"]);
</script>
