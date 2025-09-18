<template>
	<div class="showcase-component">
		<h3>Breadcrumbs:</h3>
		<hr />
		
		<!-- Basic Breadcrumb -->
		<div style="margin: 20px 0;">
			<h4>Basic Breadcrumb:</h4>
			<TuBreadcrumb :items="basicItems" />
		</div>

		<!-- Different Separators -->
		<div style="margin: 20px 0;">
			<h4>Different Separators:</h4>
			<TuBreadcrumb :items="basicItems" separator=">" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" separator="|" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" separator="►" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" separator="arrow_forward_ios" />
		</div>

		<!-- Alignment -->
		<div style="margin: 20px 0;">
			<h4>Alignment:</h4>
			<p>Left Aligned (default):</p>
			<TuBreadcrumb :items="basicItems" align="left" />
			<br />
			<p>Center Aligned:</p>
			<TuBreadcrumb :items="basicItems" align="center" />
			<br />
			<p>Right Aligned:</p>
			<TuBreadcrumb :items="basicItems" align="right" />
		</div>

		<!-- Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<TuBreadcrumb :items="basicItems" color="primary" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" color="success" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" color="danger" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" color="warn" />
			<br /><br />
			<TuBreadcrumb :items="basicItems" color="dark" />
		</div>

		<!-- With Disabled Items -->
		<div style="margin: 20px 0;">
			<h4>With Disabled Items:</h4>
			<TuBreadcrumb :items="itemsWithDisabled" />
		</div>

		<!-- Slot Based Breadcrumb -->
		<div style="margin: 20px 0;">
			<h4>Slot-based Breadcrumb:</h4>
			<TuBreadcrumb separator="/">
				<li><a href="#" class="tu-breadcrumb--link">Home</a><span class="separator tu-breadcrum--separator">/</span></li>
				<li><a href="#" class="tu-breadcrumb--link">Library</a><span class="separator tu-breadcrum--separator">/</span></li>
				<li><a href="#" class="tu-breadcrumb--link">Components</a><span class="separator tu-breadcrum--separator">/</span></li>
				<li class="tu-active"><span class="tu-breadcrumb--text">Breadcrumb</span></li>
			</TuBreadcrumb>
		</div>

		<!-- Interactive Example -->
		<div style="margin: 20px 0;">
			<h4>Interactive Example:</h4>
			<TuBreadcrumb :items="dynamicItems" @click="handleBreadcrumbClick" />
			<br />
			<TuButton @click="addLevel" size="sm">Add Level</TuButton>
			<TuButton @click="removeLevel" size="sm" style="margin-left: 10px;">Remove Level</TuButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TuBreadcrumb from "../components/tuBreadcrumb";
import { tuButton as TuButton } from "../components/tuButton";
const basicItems = ref([
	{ title: "Home", url: "/" },
	{ title: "Library", url: "/library" },
	{ title: "Components", url: "/components" },
	{ title: "Breadcrumb", active: true }
]);

const itemsWithDisabled = ref([
	{ title: "Home", url: "/" },
	{ title: "Disabled", url: "/disabled", disabled: true },
	{ title: "Components", url: "/components" },
	{ title: "Current", active: true }
]);

const dynamicItems = ref([
	{ title: "Home", url: "/" },
	{ title: "Current", active: true }
]);

const handleBreadcrumbClick = (event: Event) => {
	console.log("Breadcrumb clicked:", event);
};

const addLevel = () => {
	const newItems = [...dynamicItems.value];
	// Remove active from last item
	if (newItems.length > 0) {
		newItems[newItems.length - 1].active = false;
		newItems[newItems.length - 1].url = `/level-${newItems.length}`;
	}
	// Add new active item
	newItems.push({
		title: `Level ${newItems.length + 1}`,
		active: true
	});
	dynamicItems.value = newItems;
};

const removeLevel = () => {
	if (dynamicItems.value.length > 1) {
		const newItems = [...dynamicItems.value];
		newItems.pop();
		// Make last item active
		if (newItems.length > 0) {
			newItems[newItems.length - 1].active = true;
			delete newItems[newItems.length - 1].url;
		}
		dynamicItems.value = newItems;
	}
};
</script>
