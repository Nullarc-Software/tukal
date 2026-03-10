<template>
	<div class="showcase-component">
		<h3>Radio:</h3>
		<hr />
		
		<!-- Basic Radio Group -->
		<div style="margin: 20px 0;">
			<h4>Basic Radio Group:</h4>
			<div>
				<TuRadio v-model="basicRadio" val="option1">Option 1</TuRadio>
				<TuRadio v-model="basicRadio" val="option2">Option 2</TuRadio>
				<TuRadio v-model="basicRadio" val="option3">Option 3</TuRadio>
			</div>
			<p>Selected: {{ basicRadio }}</p>
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<div style="margin-bottom: 10px;">
				<TuRadio v-model="colorRadio" val="primary" color="primary">Primary</TuRadio>
				<TuRadio v-model="colorRadio" val="success" color="success">Success</TuRadio>
				<TuRadio v-model="colorRadio" val="danger" color="danger">Danger</TuRadio>
				<TuRadio v-model="colorRadio" val="warn" color="warn">Warning</TuRadio>
				<TuRadio v-model="colorRadio" val="dark" color="dark">Dark</TuRadio>
			</div>
			<p>Selected: {{ colorRadio }}</p>
		</div>

		<!-- Label Before -->
		<div style="margin: 20px 0;">
			<h4>Label Before:</h4>
			<div>
				<TuRadio v-model="labelBeforeRadio" val="left" label-before>Label on Left</TuRadio>
				<TuRadio v-model="labelBeforeRadio" val="right">Label on Right (default)</TuRadio>
			</div>
			<p>Selected: {{ labelBeforeRadio }}</p>
		</div>

		<!-- Disabled Options -->
		<div style="margin: 20px 0;">
			<h4>Disabled Options:</h4>
			<div>
				<TuRadio v-model="disabledRadio" val="enabled">Enabled Option</TuRadio>
				<TuRadio v-model="disabledRadio" val="disabled" disabled>Disabled Option</TuRadio>
				<TuRadio v-model="disabledRadio" val="another">Another Enabled</TuRadio>
			</div>
			<p>Selected: {{ disabledRadio }}</p>
		</div>

		<!-- Loading State -->
		<div style="margin: 20px 0;">
			<h4>Loading State:</h4>
			<div>
				<TuRadio v-model="loadingRadio" val="normal">Normal</TuRadio>
				<TuRadio v-model="loadingRadio" val="loading" loading>Loading State</TuRadio>
				<TuRadio v-model="loadingRadio" val="normal2">Normal Again</TuRadio>
			</div>
			<p>Selected: {{ loadingRadio }}</p>
		</div>

		<!-- Survey Example -->
		<div style="margin: 20px 0;">
			<h4>Survey Example:</h4>
			<div>
				<h5>How satisfied are you with this component library?</h5>
				<div style="margin: 10px 0;">
					<TuRadio v-model="surveyAnswer" val="very-satisfied" color="success">Very Satisfied</TuRadio>
				</div>
				<div style="margin: 10px 0;">
					<TuRadio v-model="surveyAnswer" val="satisfied" color="success">Satisfied</TuRadio>
				</div>
				<div style="margin: 10px 0;">
					<TuRadio v-model="surveyAnswer" val="neutral" color="warn">Neutral</TuRadio>
				</div>
				<div style="margin: 10px 0;">
					<TuRadio v-model="surveyAnswer" val="dissatisfied" color="danger">Dissatisfied</TuRadio>
				</div>
				<div style="margin: 10px 0;">
					<TuRadio v-model="surveyAnswer" val="very-dissatisfied" color="danger">Very Dissatisfied</TuRadio>
				</div>
				<p v-if="surveyAnswer">Your rating: <strong>{{ surveyAnswer.replace('-', ' ') }}</strong></p>
			</div>
		</div>

		<!-- Payment Method Example -->
		<div style="margin: 20px 0;">
			<h4>Payment Method Example:</h4>
			<div>
				<h5>Select Payment Method:</h5>
				<div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
					<TuRadio v-model="paymentMethod" val="credit-card" color="primary">
						💳 Credit Card
					</TuRadio>
				</div>
				<div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
					<TuRadio v-model="paymentMethod" val="paypal" color="primary">
						🏦 PayPal
					</TuRadio>
				</div>
				<div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
					<TuRadio v-model="paymentMethod" val="bank-transfer" color="primary">
						🏧 Bank Transfer
					</TuRadio>
				</div>
				<div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
					<TuRadio v-model="paymentMethod" val="crypto" color="primary">
						₿ Cryptocurrency
					</TuRadio>
				</div>
				<p v-if="paymentMethod">Selected: <strong>{{ paymentMethod.replace('-', ' ') }}</strong></p>
			</div>
		</div>

		<!-- Dynamic Options -->
		<div style="margin: 20px 0;">
			<h4>Dynamic Options:</h4>
			<div>
				<div v-for="option in dynamicOptions" :key="option.value" style="margin: 5px 0;">
					<TuRadio v-model="dynamicRadio" :val="option.value" :color="option.color">
						{{ option.label }}
					</TuRadio>
				</div>
				<div style="margin-top: 15px;">
					<TuButton @click="addOption" size="sm">Add Option</TuButton>
					<TuButton @click="removeOption" size="sm" style="margin-left: 10px;">Remove Option</TuButton>
					<TuButton @click="shuffleOptions" size="sm" style="margin-left: 10px;">Shuffle</TuButton>
				</div>
				<p v-if="dynamicRadio">Selected: {{ dynamicRadio }}</p>
			</div>
		</div>

		<!-- Custom Styling -->
		<div style="margin: 20px 0;">
			<h4>Custom Styling:</h4>
			<div>
				<div style="margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
					<TuRadio v-model="customRadio" val="option1" color="primary">
						🌟 Premium Plan - $29/month
					</TuRadio>
				</div>
				<div style="margin: 10px 0; padding: 15px; background: #fff; border: 2px solid #28a745; border-radius: 8px;">
					<TuRadio v-model="customRadio" val="option2" color="success">
						✨ Popular Plan - $19/month (Most Popular!)
					</TuRadio>
				</div>
				<div style="margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
					<TuRadio v-model="customRadio" val="option3" color="primary">
						💡 Basic Plan - $9/month
					</TuRadio>
				</div>
				<p v-if="customRadio">Selected plan: {{ customRadio }}</p>
			</div>
		</div>

		<!-- All Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic:</strong> {{ basicRadio }}</p>
				<p><strong>Color:</strong> {{ colorRadio }}</p>
				<p><strong>Label Before:</strong> {{ labelBeforeRadio }}</p>
				<p><strong>Disabled:</strong> {{ disabledRadio }}</p>
				<p><strong>Loading:</strong> {{ loadingRadio }}</p>
				<p><strong>Survey:</strong> {{ surveyAnswer }}</p>
				<p><strong>Payment:</strong> {{ paymentMethod }}</p>
				<p><strong>Dynamic:</strong> {{ dynamicRadio }}</p>
				<p><strong>Custom:</strong> {{ customRadio }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { TuButton } from "../components/tuButton";
import { TuRadio } from "../components/tuRadio";
// Radio values
const basicRadio = ref("");
const colorRadio = ref("");
const labelBeforeRadio = ref("");
const disabledRadio = ref("");
const loadingRadio = ref("");
const surveyAnswer = ref("");
const paymentMethod = ref("");
const dynamicRadio = ref("");
const customRadio = ref("");

// Dynamic options
const dynamicOptions = ref([
	{ label: "Option A", value: "a", color: "primary" },
	{ label: "Option B", value: "b", color: "success" },
	{ label: "Option C", value: "c", color: "danger" }
]);

// Methods
const addOption = () => {
	const letters = "DEFGHIJKLMNOPQRSTUVWXYZ";
	const colors = ["primary", "success", "danger", "warn", "dark"];
	const nextLetter = letters[dynamicOptions.value.length - 3];
	
	if (nextLetter) {
		dynamicOptions.value.push({
			label: `Option ${nextLetter}`,
			value: nextLetter.toLowerCase(),
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}
};

const removeOption = () => {
	if (dynamicOptions.value.length > 1) {
		const removed = dynamicOptions.value.pop();
		if (dynamicRadio.value === removed?.value) {
			dynamicRadio.value = "";
		}
	}
};

const shuffleOptions = () => {
	for (let i = dynamicOptions.value.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[dynamicOptions.value[i], dynamicOptions.value[j]] = [dynamicOptions.value[j], dynamicOptions.value[i]];
	}
};
</script>
