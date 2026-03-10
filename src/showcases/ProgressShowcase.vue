<template>
	<div class="showcase-component">
		<h3>Progress:</h3>
		<hr />
		
		<!-- Basic Progress -->
		<div style="margin: 20px 0;">
			<h4>Basic Progress:</h4>
			<TuProgress :percent="basicProgress" />
			<div style="margin-top: 10px;">
				<TuButton @click="basicProgress = Math.max(0, basicProgress - 10)" size="sm">-10%</TuButton>
				<TuButton @click="basicProgress = Math.min(100, basicProgress + 10)" size="sm" style="margin-left: 10px;">+10%</TuButton>
				<span style="margin-left: 15px;">{{ basicProgress }}%</span>
			</div>
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<div style="margin-bottom: 15px;">
				<p>Primary ({{ colorProgress }}%):</p>
				<TuProgress :percent="colorProgress" color="primary" />
			</div>
			<div style="margin-bottom: 15px;">
				<p>Success ({{ colorProgress }}%):</p>
				<TuProgress :percent="colorProgress" color="success" />
			</div>
			<div style="margin-bottom: 15px;">
				<p>Danger ({{ colorProgress }}%):</p>
				<TuProgress :percent="colorProgress" color="danger" />
			</div>
			<div style="margin-bottom: 15px;">
				<p>Warning ({{ colorProgress }}%):</p>
				<TuProgress :percent="colorProgress" color="warn" />
			</div>
			<div style="margin-bottom: 15px;">
				<p>Dark ({{ colorProgress }}%):</p>
				<TuProgress :percent="colorProgress" color="dark" />
			</div>
		</div>

		<!-- Animated Progress -->
		<div style="margin: 20px 0;">
			<h4>Animated Progress:</h4>
			<TuProgress :percent="animatedProgress" color="primary" />
			<div style="margin-top: 10px;">
				<TuButton @click="startAnimation" :disabled="isAnimating">Start Animation</TuButton>
				<TuButton @click="stopAnimation" style="margin-left: 10px;">Stop</TuButton>
				<TuButton @click="resetAnimation" style="margin-left: 10px;">Reset</TuButton>
			</div>
		</div>

		<!-- With Text -->
		<div style="margin: 20px 0;">
			<h4>With Text Display:</h4>
			<div style="margin-bottom: 15px;">
				<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
					<span>Download Progress</span>
					<span>{{ textProgress }}%</span>
				</div>
				<TuProgress :percent="textProgress" color="success" />
			</div>
			<div style="margin-bottom: 15px;">
				<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
					<span>Upload Progress</span>
					<span>{{ Math.round(textProgress * 0.8) }}% ({{ Math.round(textProgress * 0.8 * 2.5) }}MB / 250MB)</span>
				</div>
				<TuProgress :percent="textProgress * 0.8" color="primary" />
			</div>
		</div>

		<!-- Small Size -->
		<div style="margin: 20px 0;">
			<h4>Small Size:</h4>
			<TuProgress :percent="smallProgress" color="success" size="small" />
			<div style="margin-top: 10px;">
				<TuButton @click="simulateSmallProgress" size="sm">Simulate Progress</TuButton>
			</div>
		</div>

		<!-- Multiple Progress Bars -->
		<div style="margin: 20px 0;">
			<h4>Multiple Progress Tracking:</h4>
			<div v-for="task in tasks" :key="task.id" style="margin-bottom: 15px;">
				<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
					<span>{{ task.name }}</span>
					<span>{{ task.progress }}%</span>
				</div>
				<TuProgress :percent="task.progress" :color="task.color" />
			</div>
			<div style="margin-top: 15px;">
				<TuButton @click="startAllTasks" :disabled="allTasksRunning">Start All Tasks</TuButton>
				<TuButton @click="pauseAllTasks" style="margin-left: 10px;">Pause All</TuButton>
				<TuButton @click="resetAllTasks" style="margin-left: 10px;">Reset All</TuButton>
			</div>
		</div>

		<!-- Indeterminate Progress -->
		<div style="margin: 20px 0;">
			<h4>Indeterminate Progress:</h4>
			<div style="margin-bottom: 15px;">
				<p>Loading (indeterminate):</p>
				<TuProgress indeterminate color="primary" />
			</div>
			<div style="margin-bottom: 15px;">
				<p>Processing (indeterminate):</p>
				<TuProgress indeterminate color="success" />
			</div>
		</div>

		<!-- Circular Progress -->
		<div style="margin: 20px 0;">
			<h4>Circular Progress:</h4>
			<div style="display: flex; gap: 30px; align-items: center;">
				<div style="text-align: center;">
					<TuProgress :percent="circularProgress" type="circle" color="primary" />
					<p>{{ circularProgress }}%</p>
				</div>
				<div style="text-align: center;">
					<TuProgress :percent="circularProgress * 0.7" type="circle" color="success" size="small" />
					<p>{{ Math.round(circularProgress * 0.7) }}%</p>
				</div>
				<div style="text-align: center;">
					<TuProgress :percent="circularProgress * 1.2" type="circle" color="danger" size="large" />
					<p>{{ Math.min(100, Math.round(circularProgress * 1.2)) }}%</p>
				</div>
			</div>
		</div>

		<!-- Real-world Examples -->
		<div style="margin: 20px 0;">
			<h4>Real-world Examples:</h4>
			
			<!-- File Upload Simulation -->
			<div style="margin-bottom: 20px;">
				<h5>File Upload Simulation:</h5>
				<div v-for="file in files" :key="file.id" style="margin-bottom: 10px;">
					<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
						<span>📄 {{ file.name }}</span>
						<span>{{ file.progress }}% ({{ Math.round(file.size * file.progress / 100) }}KB / {{ file.size }}KB)</span>
					</div>
					<TuProgress :percent="file.progress" :color="file.progress === 100 ? 'success' : 'primary'" />
				</div>
				<TuButton @click="simulateFileUpload" :disabled="uploadInProgress">Upload Files</TuButton>
			</div>

			<!-- System Resources -->
			<div style="margin-bottom: 20px;">
				<h5>System Resources:</h5>
				<div style="margin-bottom: 10px;">
					<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
						<span>💾 Memory Usage</span>
						<span>{{ systemResources.memory }}%</span>
					</div>
					<TuProgress :percent="systemResources.memory" :color="systemResources.memory > 80 ? 'danger' : systemResources.memory > 60 ? 'warn' : 'success'" />
				</div>
				<div style="margin-bottom: 10px;">
					<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
						<span>🖥️ CPU Usage</span>
						<span>{{ systemResources.cpu }}%</span>
					</div>
					<TuProgress :percent="systemResources.cpu" :color="systemResources.cpu > 80 ? 'danger' : systemResources.cpu > 60 ? 'warn' : 'primary'" />
				</div>
				<div style="margin-bottom: 10px;">
					<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
						<span>💿 Disk Usage</span>
						<span>{{ systemResources.disk }}%</span>
					</div>
					<TuProgress :percent="systemResources.disk" :color="systemResources.disk > 90 ? 'danger' : systemResources.disk > 75 ? 'warn' : 'success'" />
				</div>
				<TuButton @click="updateSystemResources" size="sm">Refresh</TuButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

import { TuButton } from "../components/tuButton";
import { TuProgress } from "../components/tuProgress";
// Basic progress
const basicProgress = ref(45);

// Color progress
const colorProgress = ref(65);

// Animated progress
const animatedProgress = ref(0);
const isAnimating = ref(false);
let animationInterval: ReturnType<typeof setInterval> | null = null;

// Text progress
const textProgress = ref(73);

// Small progress
const smallProgress = ref(30);

// Circular progress
const circularProgress = ref(80);

// Tasks
const tasks = ref([
	{ id: 1, name: "Database Migration", progress: 0, color: "primary" },
	{ id: 2, name: "File Processing", progress: 0, color: "success" },
	{ id: 3, name: "Data Backup", progress: 0, color: "warn" },
	{ id: 4, name: "System Update", progress: 0, color: "danger" }
]);

const allTasksRunning = ref(false);
let taskIntervals: ReturnType<typeof setInterval>[] = [];

// Files
const files = ref([
	{ id: 1, name: "document.pdf", size: 2500, progress: 0 },
	{ id: 2, name: "image.jpg", size: 1200, progress: 0 },
	{ id: 3, name: "video.mp4", size: 15000, progress: 0 }
]);

const uploadInProgress = ref(false);

// System resources
const systemResources = ref({
	memory: 45,
	cpu: 23,
	disk: 67
});

// Methods
const startAnimation = () => {
	if (isAnimating.value) return;
	
	isAnimating.value = true;
	animatedProgress.value = 0;
	
	animationInterval = setInterval(() => {
		animatedProgress.value += 2;
		if (animatedProgress.value >= 100) {
			animatedProgress.value = 100;
			isAnimating.value = false;
			if (animationInterval) {
				clearInterval(animationInterval);
				animationInterval = null;
			}
		}
	}, 100);
};

const stopAnimation = () => {
	isAnimating.value = false;
	if (animationInterval) {
		clearInterval(animationInterval);
		animationInterval = null;
	}
};

const resetAnimation = () => {
	stopAnimation();
	animatedProgress.value = 0;
};

const simulateSmallProgress = () => {
	smallProgress.value = 0;
	const interval = setInterval(() => {
		smallProgress.value += 5;
		if (smallProgress.value >= 100) {
			clearInterval(interval);
		}
	}, 150);
};

const startAllTasks = () => {
	if (allTasksRunning.value) return;
	
	allTasksRunning.value = true;
	
	tasks.value.forEach((task, index) => {
		task.progress = 0;
		const interval = setInterval(() => {
			task.progress += Math.random() * 3;
			if (task.progress >= 100) {
				task.progress = 100;
				clearInterval(interval);
				
				// Check if all tasks are done
				if (tasks.value.every(t => t.progress >= 100)) {
					allTasksRunning.value = false;
				}
			}
		}, 200 + index * 50);
		
		taskIntervals.push(interval);
	});
};

const pauseAllTasks = () => {
	allTasksRunning.value = false;
	taskIntervals.forEach(interval => clearInterval(interval));
	taskIntervals = [];
};

const resetAllTasks = () => {
	pauseAllTasks();
	tasks.value.forEach(task => {
		task.progress = 0;
	});
};

const simulateFileUpload = () => {
	if (uploadInProgress.value) return;
	
	uploadInProgress.value = true;
	
	files.value.forEach((file, index) => {
		file.progress = 0;
		const interval = setInterval(() => {
			file.progress += Math.random() * 4;
			if (file.progress >= 100) {
				file.progress = 100;
				clearInterval(interval);
				
				// Check if all files are uploaded
				if (files.value.every(f => f.progress >= 100)) {
					uploadInProgress.value = false;
				}
			}
		}, 300 + index * 100);
	});
};

const updateSystemResources = () => {
	systemResources.value = {
		memory: Math.floor(Math.random() * 100),
		cpu: Math.floor(Math.random() * 100),
		disk: Math.floor(Math.random() * 100)
	};
};

// Auto-update some progress values
let autoUpdateInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
	autoUpdateInterval = setInterval(() => {
		colorProgress.value = Math.floor(Math.random() * 100);
		textProgress.value = Math.floor(Math.random() * 100);
		circularProgress.value = Math.floor(Math.random() * 100);
	}, 3000);
});

onUnmounted(() => {
	if (autoUpdateInterval) {
		clearInterval(autoUpdateInterval);
	}
	stopAnimation();
	pauseAllTasks();
});
</script>
