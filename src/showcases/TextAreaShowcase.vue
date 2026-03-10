<template>
	<div class="showcase-component">
		<h3>Text Area:</h3>
		<hr />
		
		<!-- Basic Text Area -->
		<div style="margin: 20px 0;">
			<h4>Basic Text Area:</h4>
			<tu-text-area v-model="basicText" placeholder="Enter your text here..." />
			<p style="margin-top: 10px; font-size: 12px; color: #666;">
				Characters: {{ basicText.length }}
			</p>
		</div>

		<!-- Different Sizes -->
		<div style="margin: 20px 0;">
			<h4>Different Sizes:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
				<div>
					<label style="display: block; margin-bottom: 5px; font-weight: bold;">Small</label>
					<tu-text-area v-model="smallText" size="sm" placeholder="Small text area" />
				</div>
				<div>
					<label style="display: block; margin-bottom: 5px; font-weight: bold;">Medium (Default)</label>
					<tu-text-area v-model="mediumText" placeholder="Medium text area" />
				</div>
				<div>
					<label style="display: block; margin-bottom: 5px; font-weight: bold;">Large</label>
					<tu-text-area v-model="largeText" size="lg" placeholder="Large text area" />
				</div>
			</div>
		</div>

		<!-- With Labels -->
		<div style="margin: 20px 0;">
			<h4>With Labels:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
				<tu-text-area v-model="descriptionText" label="Description" placeholder="Enter product description..." />
				<tu-text-area v-model="commentsText" label="Comments" placeholder="Add your comments..." />
			</div>
		</div>

		<!-- Different States -->
		<div style="margin: 20px 0;">
			<h4>Different States:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
				<tu-text-area v-model="normalText" label="Normal" placeholder="Normal state" />
				<tu-text-area v-model="disabledText" label="Disabled" placeholder="This is disabled" disabled />
			</div>
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
				<tu-text-area v-model="readonlyText" label="Read Only" placeholder="Read only text" readonly />
				<tu-text-area v-model="errorText" label="With Error" placeholder="Error state" error />
			</div>
		</div>

		<!-- With Character Limit -->
		<div style="margin: 20px 0;">
			<h4>With Character Limit:</h4>
			<tu-text-area v-model="limitedText" label="Bio (max 200 characters)" placeholder="Tell us about yourself..." :maxlength="200" />
			<div style="text-align: right; margin-top: 5px; font-size: 12px;" :style="{ color: limitedText.length > 180 ? '#dc3545' : '#6c757d' }">
				{{ limitedText.length }}/200 characters
			</div>
		</div>

		<!-- Auto Resize -->
		<div style="margin: 20px 0;">
			<h4>Auto Resize:</h4>
			<tu-text-area v-model="autoResizeText" label="Auto Resize Text Area" placeholder="This text area will grow as you type..." auto-resize />
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
				<tu-text-area v-model="primaryText" label="Primary" color="primary" placeholder="Primary colored..." />
				<tu-text-area v-model="successText" label="Success" color="success" placeholder="Success colored..." />
				<tu-text-area v-model="warningText" label="Warning" color="warning" placeholder="Warning colored..." />
			</div>
		</div>

		<!-- Form Example -->
		<div style="margin: 20px 0;">
			<h4>Contact Form Example:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Contact Us</h5>
				<div style="margin-bottom: 15px;">
					<TuInput v-model="contactForm.name" label="Name" placeholder="Your full name" />
				</div>
				<div style="margin-bottom: 15px;">
					<TuInput v-model="contactForm.email" label="Email" type="email" placeholder="your.email@example.com" />
				</div>
				<div style="margin-bottom: 15px;">
					<TuSelect v-model="contactForm.subject" label="Subject" :select-items="subjectOptions" />
				</div>
				<div style="margin-bottom: 15px;">
					<tu-text-area v-model="contactForm.message" label="Message" placeholder="Please describe your inquiry..." :rows="6" />
				</div>
				<div style="margin-bottom: 15px;">
					<TuCheckbox v-model="contactForm.newsletter">Subscribe to newsletter</TuCheckbox>
				</div>
				<div style="display: flex; gap: 10px;">
					<TuButton color="primary" @click="submitContactForm">Send Message</TuButton>
					<TuButton @click="resetContactForm">Reset</TuButton>
				</div>
			</div>
		</div>

		<!-- Code Editor Example -->
		<div style="margin: 20px 0;">
			<h4>Code Editor Example:</h4>
			<div style="background: #1e1e1e; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
				<div style="color: #fff; font-size: 14px; margin-bottom: 10px;">JavaScript Code</div>
				<tu-text-area 
					v-model="codeText" 
					placeholder="// Enter your JavaScript code here..."
					:rows="10"
					style="font-family: 'Courier New', monospace; background: #2d2d2d; color: #fff; border: 1px solid #444;"
				/>
			</div>
			<div style="display: flex; gap: 10px;">
				<TuButton size="sm" @click="formatCode">Format Code</TuButton>
				<TuButton size="sm" @click="clearCode">Clear</TuButton>
				<TuButton size="sm" @click="insertSample">Insert Sample</TuButton>
			</div>
		</div>

		<!-- Feedback Form -->
		<div style="margin: 20px 0;">
			<h4>Feedback Form:</h4>
			<div style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
				<h5>How was your experience?</h5>
				<div style="margin: 15px 0;">
					<label style="display: block; margin-bottom: 5px;">Rating:</label>
					<div style="display: flex; gap: 10px;">
						<TuButton 
							v-for="rating in [1, 2, 3, 4, 5]" 
							:key="rating"
							:color="feedbackForm.rating >= rating ? 'warn' : 'dark'"
							size="sm"
							@click="feedbackForm.rating = rating"
						>
							★
						</TuButton>
					</div>
				</div>
				<div style="margin: 15px 0;">
					<tu-text-area 
						v-model="feedbackForm.feedback" 
						label="Feedback" 
						placeholder="Tell us about your experience..." 
						:rows="4"
					/>
				</div>
				<div style="margin: 15px 0;">
					<tu-text-area 
						v-model="feedbackForm.suggestions" 
						label="Suggestions for improvement" 
						placeholder="How can we improve?" 
						:rows="3"
					/>
				</div>
				<TuButton color="success" @click="submitFeedback">Submit Feedback</TuButton>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Basic Text Length:</strong> {{ basicText.length }}</p>
				<p><strong>Limited Text Length:</strong> {{ limitedText.length }}/200</p>
				<p><strong>Contact Form Complete:</strong> {{ isContactFormComplete }}</p>
				<p><strong>Feedback Rating:</strong> {{ feedbackForm.rating }}/5</p>
				<p><strong>Code Text Length:</strong> {{ codeText.length }}</p>
				<p><strong>Auto Resize Text Lines:</strong> {{ autoResizeText.split('\n').length }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { TuButton } from "../components/tuButton";
import { TuInput } from "../components/tuInput";
import { TuCheckbox } from "../components/tuCheckBox";
import { TuSelect } from "../components/tuSelect";
// Basic text areas
const basicText = ref("");
const smallText = ref("");
const mediumText = ref("");
const largeText = ref("");
const descriptionText = ref("");
const commentsText = ref("");

// States
const normalText = ref("");
const disabledText = ref("This text area is disabled and cannot be edited.");
const readonlyText = ref("This is read-only content that cannot be modified by the user.");
const errorText = ref("");

// Character limit
const limitedText = ref("");

// Auto resize
const autoResizeText = ref("This text area will automatically adjust its height as you type more content.\n\nTry adding more lines to see it in action!");

// Colors
const primaryText = ref("");
const successText = ref("");
const warningText = ref("");

// Contact form
const contactForm = ref({
	name: "",
	email: "",
	subject: "",
	message: "",
	newsletter: false
});

const subjectOptions = ref([
	{ label: "General Inquiry", value: "general" },
	{ label: "Technical Support", value: "support" },
	{ label: "Sales Question", value: "sales" },
	{ label: "Bug Report", value: "bug" },
	{ label: "Feature Request", value: "feature" }
]);

// Code editor
const codeText = ref("function hello() {\n  console.log('Hello, World!');\n}");

// Feedback form
const feedbackForm = ref({
	rating: 0,
	feedback: "",
	suggestions: ""
});

// Computed
const isContactFormComplete = computed(() => {
	return contactForm.value.name && 
		   contactForm.value.email && 
		   contactForm.value.subject && 
		   contactForm.value.message;
});

// Methods
const submitContactForm = () => {
	if (isContactFormComplete.value) {
		alert("Thank you for your message! We'll get back to you soon.");
		console.log("Contact form submitted:", contactForm.value);
	} else {
		alert("Please fill in all required fields.");
	}
};

const resetContactForm = () => {
	contactForm.value = {
		name: "",
		email: "",
		subject: "",
		message: "",
		newsletter: false
	};
};

const formatCode = () => {
	// Simple code formatting (basic indentation)
	const lines = codeText.value.split('\n');
	let indentLevel = 0;
	const formatted = lines.map(line => {
		const trimmed = line.trim();
		if (trimmed.includes('}')) indentLevel = Math.max(0, indentLevel - 1);
		const indented = '  '.repeat(indentLevel) + trimmed;
		if (trimmed.includes('{')) indentLevel++;
		return indented;
	});
	codeText.value = formatted.join('\n');
};

const clearCode = () => {
	codeText.value = "";
};

const insertSample = () => {
	const sample = `function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate and display first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`;
	codeText.value = sample;
};

const submitFeedback = () => {
	if (feedbackForm.value.rating > 0 && feedbackForm.value.feedback) {
		alert("Thank you for your feedback!");
		console.log("Feedback submitted:", feedbackForm.value);
		
		// Reset form
		feedbackForm.value = {
			rating: 0,
			feedback: "",
			suggestions: ""
		};
	} else {
		alert("Please provide a rating and feedback.");
	}
};
</script>
