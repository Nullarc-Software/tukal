<template>
	<div class="showcase-component">
		<h3>Dialog:</h3>
		<hr />
		
		<!-- Basic Dialog -->
		<div style="margin: 20px 0;">
			<h4>Basic Dialog:</h4>
			<TuButton @click="basicDialog = true">Open Basic Dialog</TuButton>
			<TuDialog v-model="basicDialog">
				<template #header>
					<h3>Basic Dialog</h3>
				</template>
				<p>This is a basic dialog with some content.</p>
				<template #footer>
					<TuButton @click="basicDialog = false">Close</TuButton>
				</template>
			</TuDialog>
		</div>

		<!-- Full Screen Dialog -->
		<div style="margin: 20px 0;">
			<h4>Full Screen Dialog:</h4>
			<TuButton @click="fullScreenDialog = true" color="primary">Open Full Screen</TuButton>
			<TuDialog v-model="fullScreenDialog" full-screen>
				<template #header>
					<h3>Full Screen Dialog</h3>
				</template>
				<p>This dialog takes up the entire screen.</p>
				<template #footer>
					<TuButton @click="fullScreenDialog = false" danger>Close</TuButton>
				</template>
			</TuDialog>
		</div>

		<!-- Different Sizes -->
		<div style="margin: 20px 0;">
			<h4>Different Sizes:</h4>
			<TuButton @click="smallDialog = true" size="sm">Small Dialog</TuButton>
			<TuButton @click="mediumDialog = true" size="sm" style="margin-left: 10px;">Medium Dialog</TuButton>
			<TuButton @click="largeDialog = true" size="sm" style="margin-left: 10px;">Large Dialog</TuButton>
			
			<TuDialog v-model="smallDialog" width="300px">
				<template #header><h4>Small Dialog</h4></template>
				<p>This is a small dialog.</p>
				<template #footer>
					<TuButton @click="smallDialog = false" size="sm">Close</TuButton>
				</template>
			</TuDialog>
			
			<TuDialog v-model="mediumDialog" width="500px">
				<template #header><h4>Medium Dialog</h4></template>
				<p>This is a medium-sized dialog with more content space.</p>
				<template #footer>
					<TuButton @click="mediumDialog = false">Close</TuButton>
				</template>
			</TuDialog>
			
			<TuDialog v-model="largeDialog" width="800px">
				<template #header><h4>Large Dialog</h4></template>
				<p>This is a large dialog that can contain substantial content like forms, tables, or detailed information.</p>
				<template #footer>
					<TuButton @click="largeDialog = false">Close</TuButton>
				</template>
			</TuDialog>
		</div>

		<!-- No Close Button -->
		<div style="margin: 20px 0;">
			<h4>No Close Button:</h4>
			<TuButton @click="noCloseDialog = true" color="warn">Cannot Close Outside</TuButton>
			<TuDialog v-model="noCloseDialog" not-close>
				<template #header>
					<h3>Important Notice</h3>
				</template>
				<p>This dialog cannot be closed by clicking outside or pressing ESC.</p>
				<p>You must use the close button.</p>
				<template #footer>
					<TuButton @click="noCloseDialog = false" danger>I Understand</TuButton>
				</template>
			</TuDialog>
		</div>

		<!-- Loading Dialog -->
		<div style="margin: 20px 0;">
			<h4>Loading Dialog:</h4>
			<TuButton @click="showLoadingDialog" color="success">Show Loading</TuButton>
			<TuDialog v-model="loadingDialog" :loading="dialogLoading" not-close>
				<template #header>
					<h3>Processing...</h3>
				</template>
				<p>Please wait while we process your request.</p>
			</TuDialog>
		</div>

		<!-- Scrollable Content -->
		<div style="margin: 20px 0;">
			<h4>Scrollable Content:</h4>
			<TuButton @click="scrollDialog = true">Long Content</TuButton>
			<TuDialog v-model="scrollDialog" width="600px" scroll>
				<template #header>
					<h3>Long Content Dialog</h3>
				</template>
				<div v-for="i in 20" :key="i">
					<h4>Section {{ i }}</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
				</div>
				<template #footer>
					<TuButton @click="scrollDialog = false">Close</TuButton>
				</template>
			</TuDialog>
		</div>

		<!-- Form Dialog -->
		<div style="margin: 20px 0;">
			<h4>Form Dialog:</h4>
			<TuButton @click="formDialog = true" color="primary">Open Form</TuButton>
			<TuDialog v-model="formDialog" width="500px">
				<template #header>
					<h3>User Information</h3>
				</template>
				<div style="padding: 20px;">
					<TuInput v-model="formData.name" label="Full Name" placeholder="Enter your name" style="margin-bottom: 15px;" />
					<TuInput v-model="formData.email" label="Email" placeholder="Enter your email" style="margin-bottom: 15px;" />
					<TuInput v-model="formData.phone" label="Phone" placeholder="Enter your phone" style="margin-bottom: 15px;" />
					<TuSelect v-model="formData.country" label="Country" placeholder="Select country" :select-items="countries" />
				</div>
				<template #footer>
					<TuButton @click="formDialog = false" flat>Cancel</TuButton>
					<TuButton @click="submitForm" color="primary" style="margin-left: 10px;">Submit</TuButton>
				</template>
			</TuDialog>
		</div>

		<!-- Confirmation Dialog -->
		<div style="margin: 20px 0;">
			<h4>Confirmation Dialog:</h4>
			<TuButton @click="confirmDialog = true" color="danger">Delete Item</TuButton>
			<TuDialog v-model="confirmDialog" width="400px">
				<template #header>
					<h3 style="color: #e74c3c;">⚠️ Confirm Deletion</h3>
				</template>
				<p>Are you sure you want to delete this item? This action cannot be undone.</p>
				<template #footer>
					<TuButton @click="confirmDialog = false" flat>Cancel</TuButton>
					<TuButton @click="confirmDelete" color="danger" style="margin-left: 10px;">Delete</TuButton>
				</template>
			</TuDialog>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { tuButton as TuButton } from "../components/tuButton";
import TuInput from "../components/tuInput";
import TuDialog from "../components/tuDialog";
import TuSelect from "../components/tuSelect/tuSelect.vue";
// Dialog states
const basicDialog = ref(false);
const fullScreenDialog = ref(false);
const smallDialog = ref(false);
const mediumDialog = ref(false);
const largeDialog = ref(false);
const noCloseDialog = ref(false);
const loadingDialog = ref(false);
const dialogLoading = ref(false);
const scrollDialog = ref(false);
const formDialog = ref(false);
const confirmDialog = ref(false);

// Form data
const formData = ref({
	name: "",
	email: "",
	phone: "",
	country: ""
});

const countries = ref([
	{ label: "United States", value: "US" },
	{ label: "Canada", value: "CA" },
	{ label: "United Kingdom", value: "UK" },
	{ label: "Germany", value: "DE" },
	{ label: "France", value: "FR" },
	{ label: "Australia", value: "AU" }
]);

// Methods
const showLoadingDialog = () => {
	loadingDialog.value = true;
	dialogLoading.value = true;
	
	// Simulate loading
	setTimeout(() => {
		dialogLoading.value = false;
		setTimeout(() => {
			loadingDialog.value = false;
		}, 1000);
	}, 3000);
};

const submitForm = () => {
	console.log("Form submitted:", formData.value);
	alert("Form submitted successfully!");
	formDialog.value = false;
	
	// Reset form
	formData.value = {
		name: "",
		email: "",
		phone: "",
		country: ""
	};
};

const confirmDelete = () => {
	alert("Item deleted!");
	confirmDialog.value = false;
};
</script>
