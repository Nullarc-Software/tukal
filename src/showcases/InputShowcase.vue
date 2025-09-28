<template>
	<div class="showcase-component">
		<h3>Input:</h3>
		<hr />
		
		<!-- Basic Inputs -->
		<div style="margin: 20px 0;">
			<h4>Basic Inputs:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="textInput" placeholder="Enter text" />
				<tu-input v-model="emailInput" type="email" placeholder="Enter email" />
				<tu-input v-model="passwordInput" type="password" placeholder="Enter password" />
				<tu-input v-model="numberInput" type="number" placeholder="Enter number" />
			</div>
		</div>

		<!-- With Labels -->
		<div style="margin: 20px 0;">
			<h4>With Labels:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="labelInput1" label="Full Name" placeholder="Enter your full name" />
				<tu-input v-model="labelInput2" label="Email Address" placeholder="Enter your email" />
			</div>
		</div>

		<!-- Label Placeholder -->
		<div style="margin: 20px 0;">
			<h4>Label Placeholder:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="placeholderInput1" label-placeholder="Username" />
				<tu-input v-model="placeholderInput2" label-placeholder="Password" type="password" />
			</div>
		</div>

		<!-- Different States -->
		<div style="margin: 20px 0;">
			<h4>Different States:</h4>
			<div>
				<tu-input v-model="successInput" state="success" label="Success" placeholder="Valid input" />
				<tu-input v-model="dangerInput" state="danger" label="Error" placeholder="Invalid input" />
				<tu-input v-model="warnInput" state="warn" label="Warning" placeholder="Warning input" />
				<tu-input v-model="primaryInput" state="primary" label="Primary" placeholder="Primary input" />
			</div>
		</div>

		<!-- With Icons -->
		<div style="margin: 20px 0;">
			<h4>With Icons:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="iconInput1" placeholder="Search..." label="Search">
					<template #icon>
						<tu-icon>search</tu-icon>
					</template>
				</tu-input>
				<tu-input v-model="iconInput2" placeholder="Enter email" label="Email" icon-after>
					<template #icon>
						<tu-icon>email</tu-icon>
					</template>
				</tu-input>
			</div>
		</div>

		<!-- Loading States -->
		<div style="margin: 20px 0;">
			<h4>Loading States:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="loadingInput1" loading label="Loading" placeholder="Processing..." />
				<tu-input v-model="loadingInput2" :loading="isValidating" label="Validation" placeholder="Enter value" @input="validateInput" />
			</div>
		</div>

		<!-- Progress -->
		<div style="margin: 20px 0;">
			<h4>With Progress:</h4>
			<tu-input v-model="progressInput" :progress="inputProgress" label="Progress Input" placeholder="Type to see progress" @input="updateProgress" />
		</div>

		<!-- Different Styles -->
		<div style="margin: 20px 0;">
			<h4>Different Styles:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="borderInput" border label="Border" placeholder="Border style" />
				<tu-input v-model="shadowInput" shadow label="Shadow" placeholder="Shadow style" />
				<tu-input v-model="transparentInput" transparent label="Transparent" placeholder="Transparent style" />
				<tu-input v-model="squareInput" square label="Square" placeholder="Square corners" />
			</div>
		</div>

		<!-- Block Input -->
		<div style="margin: 20px 0;">
			<h4>Block Input:</h4>
			<tu-input v-model="blockInput" block label="Block Input" placeholder="Full width input" />
		</div>

		<!-- Disabled -->
		<div style="margin: 20px 0;">
			<h4>Disabled:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input v-model="disabledInput" disable label="Disabled" placeholder="Cannot edit" />
				<tu-input v-model="editableStaticInput" editable-static label="Editable Static" placeholder="Click to edit" />
			</div>
		</div>

		<!-- Custom Width -->
		<div style="margin: 20px 0;">
			<h4>Custom Width:</h4>
			<div style="display: flex; gap: 15px; align-items: end;">
				<tu-input v-model="customWidth1" width="150px" label="150px" />
				<tu-input v-model="customWidth2" width="250px" label="250px" />
				<tu-input v-model="customWidth3" width="350px" label="350px" />
			</div>
		</div>

		<!-- Validation Example -->
		<div style="margin: 20px 0;">
			<h4>Validation Example:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
				<tu-input 
					v-model="validationEmail" 
					:state="emailValidationState" 
					label="Email Validation" 
					placeholder="Enter valid email"
					@input="validateEmail"
				/>
				<tu-input 
					v-model="validationPassword" 
					:state="passwordValidationState" 
					type="password"
					label="Password (min 8 chars)" 
					placeholder="Enter password"
					@input="validatePassword"
				/>
			</div>
		</div>

		<!-- Values Display -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Text:</strong> {{ textInput }}</p>
				<p><strong>Email:</strong> {{ emailInput }}</p>
				<p><strong>Number:</strong> {{ numberInput }}</p>
				<p><strong>Validation Email:</strong> {{ validationEmail }} ({{ emailValidationState }})</p>
				<p><strong>Password Length:</strong> {{ validationPassword.length }} ({{ passwordValidationState }})</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TuInput from "../components/tuInput";

// Basic inputs
const textInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const numberInput = ref("");

// Label inputs
const labelInput1 = ref("");
const labelInput2 = ref("");

// Label placeholder
const placeholderInput1 = ref("");
const placeholderInput2 = ref("");

// State inputs
const successInput = ref("Valid value");
const dangerInput = ref("Invalid value");
const warnInput = ref("Warning value");
const primaryInput = ref("Primary value");

// Icon inputs
const iconInput1 = ref("");
const iconInput2 = ref("");

// Loading inputs
const loadingInput1 = ref("");
const loadingInput2 = ref("");
const isValidating = ref(false);

// Progress input
const progressInput = ref("");
const inputProgress = computed(() => {
	return Math.min((progressInput.value.length / 20) * 100, 100);
});

// Style inputs
const borderInput = ref("");
const shadowInput = ref("");
const transparentInput = ref("");
const squareInput = ref("");

// Block input
const blockInput = ref("");

// Disabled inputs
const disabledInput = ref("Cannot edit this");
const editableStaticInput = ref("Click to edit");

// Custom width
const customWidth1 = ref("");
const customWidth2 = ref("");
const customWidth3 = ref("");

// Validation inputs
const validationEmail = ref("");
const validationPassword = ref("");

const emailValidationState = computed(() => {
	if (!validationEmail.value) return null;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(validationEmail.value) ? "success" : "danger";
});

const passwordValidationState = computed(() => {
	if (!validationPassword.value) return null;
	return validationPassword.value.length >= 8 ? "success" : "danger";
});

// Methods
const validateInput = () => {
	isValidating.value = true;
	setTimeout(() => {
		isValidating.value = false;
	}, 1000);
};

const updateProgress = () => {
	// Progress is computed automatically
};

const validateEmail = () => {
	// Validation is computed automatically
};

const validatePassword = () => {
	// Validation is computed automatically
};
</script>
