<template>
	<div class="showcase-component">
		<h3>Usage Bar:</h3>
		<hr />
		
		<!-- Basic Usage Bar -->
		<div style="margin: 20px 0;">
			<h4>Basic Usage Bar:</h4>
			<TuUsageBar :value="50" label="Storage Used" />
			<TuUsageBar :value="75" label="Memory Usage" style="margin-top: 15px;" />
			<TuUsageBar :value="30" label="CPU Usage" style="margin-top: 15px;" />
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<TuUsageBar :value="45" label="Primary" color="primary" />
			<TuUsageBar :value="60" label="Success" color="success" style="margin-top: 15px;" />
			<TuUsageBar :value="80" label="Warning" color="warning" style="margin-top: 15px;" />
			<TuUsageBar :value="90" label="Danger" color="danger" style="margin-top: 15px;" />
			<TuUsageBar :value="35" label="Info" color="info" style="margin-top: 15px;" />
		</div>

		<!-- Different Sizes -->
		<div style="margin: 20px 0;">
			<h4>Different Sizes:</h4>
			<TuUsageBar :value="40" label="Small" size="sm" />
			<TuUsageBar :value="55" label="Medium (Default)" style="margin-top: 15px;" />
			<TuUsageBar :value="70" label="Large" size="lg" style="margin-top: 15px;" />
		</div>

		<!-- With Custom Text -->
		<div style="margin: 20px 0;">
			<h4>With Custom Text:</h4>
			<TuUsageBar :value="diskUsage" :label="`Disk Space (${diskUsage}% used)`" :text="`${diskUsage}%`" color="info" />
			<TuUsageBar :value="bandwidthUsage" :label="`Bandwidth (${bandwidthUsage}% of 100GB)`" :text="`${Math.round(bandwidthUsage * 100 / 100)}GB used`" color="primary" style="margin-top: 15px;" />
			<TuUsageBar :value="quotaUsage" :label="`File Quota (${quotaUsage}% of 1000 files)`" :text="`${Math.round(quotaUsage * 10)} files`" color="warning" style="margin-top: 15px;" />
		</div>

		<!-- Real-time Usage -->
		<div style="margin: 20px 0;">
			<h4>Real-time Usage:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>System Monitor</h5>
				<TuUsageBar 
					:value="systemMetrics.cpu" 
					label="CPU Usage" 
					:text="`${systemMetrics.cpu}%`"
					:color="systemMetrics.cpu > 80 ? 'danger' : systemMetrics.cpu > 60 ? 'warning' : 'success'"
				/>
				<TuUsageBar 
					:value="systemMetrics.memory" 
					label="Memory Usage" 
					:text="`${systemMetrics.memory}%`"
					:color="systemMetrics.memory > 85 ? 'danger' : systemMetrics.memory > 70 ? 'warning' : 'success'"
					style="margin-top: 15px;"
				/>
				<TuUsageBar 
					:value="systemMetrics.disk" 
					label="Disk Usage" 
					:text="`${systemMetrics.disk}%`"
					:color="systemMetrics.disk > 90 ? 'danger' : systemMetrics.disk > 75 ? 'warning' : 'success'"
					style="margin-top: 15px;"
				/>
				<TuUsageBar 
					:value="systemMetrics.network" 
					label="Network Usage" 
					:text="`${systemMetrics.network}%`"
					color="info"
					style="margin-top: 15px;"
				/>
				<div style="margin-top: 15px;">
					<TuButton @click="toggleSystemMonitor" size="sm">
						{{ systemMonitorActive ? 'Stop Monitor' : 'Start Monitor' }}
					</TuButton>
					<TuButton @click="resetSystemMetrics" size="sm" style="margin-left: 10px;">Reset</TuButton>
				</div>
			</div>
		</div>

		<!-- Project Progress -->
		<div style="margin: 20px 0;">
			<h4>Project Progress:</h4>
			<div v-for="project in projects" :key="project.id" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h6 style="margin: 0;">{{ project.name }}</h6>
					<TuChip :color="getProjectStatusColor(project.progress)" size="sm">
						{{ getProjectStatus(project.progress) }}
					</TuChip>
				</div>
				<TuUsageBar 
					:value="project.progress" 
					:label="`Progress: ${project.progress}%`"
					:text="`${project.tasksCompleted}/${project.totalTasks} tasks`"
					:color="getProjectColor(project.progress)"
				/>
				<div style="margin-top: 10px; display: flex; gap: 10px;">
					<TuButton @click="updateProjectProgress(project.id, 10)" size="xs" :disabled="project.progress >= 100">+10%</TuButton>
					<TuButton @click="updateProjectProgress(project.id, -10)" size="xs" :disabled="project.progress <= 0">-10%</TuButton>
					<TuButton @click="completeProject(project.id)" size="xs" color="success" :disabled="project.progress >= 100">Complete</TuButton>
				</div>
			</div>
		</div>

		<!-- Storage Usage by Category -->
		<div style="margin: 20px 0;">
			<h4>Storage Usage by Category:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>File Storage Breakdown</h5>
				<div v-for="category in storageCategories" :key="category.name" style="margin-bottom: 15px;">
					<TuUsageBar 
						:value="category.percentage" 
						:label="`${category.name} (${category.size})`"
						:text="`${category.percentage}%`"
						:color="category.color"
					/>
				</div>
				<div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
					<span><strong>Total Used: {{ totalStorageUsed }}GB / 100GB</strong></span>
					<TuButton @click="optimizeStorage" size="sm" color="warning">Optimize Storage</TuButton>
				</div>
			</div>
		</div>

		<!-- Team Performance -->
		<div style="margin: 20px 0;">
			<h4>Team Performance:</h4>
			<div v-for="member in teamMembers" :key="member.id" style="margin-bottom: 15px; padding: 10px; border: 1px solid #eee; border-radius: 8px;">
				<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
					<TuAvatar :text="member.name.charAt(0)" size="32" />
					<div style="flex: 1;">
						<div style="font-weight: bold;">{{ member.name }}</div>
						<div style="font-size: 12px; color: #666;">{{ member.role }}</div>
					</div>
					<TuChip :color="getPerformanceColor(member.performance)" size="sm">
						{{ getPerformanceLevel(member.performance) }}
					</TuChip>
				</div>
				<TuUsageBar 
					:value="member.performance" 
					:label="`Performance Score`"
					:text="`${member.performance}/100`"
					:color="getPerformanceColor(member.performance)"
				/>
			</div>
		</div>

		<!-- Interactive Controls -->
		<div style="margin: 20px 0;">
			<h4>Interactive Usage Bar:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<TuUsageBar 
					:value="interactiveValue" 
					label="Adjustable Value"
					:text="`${interactiveValue}%`"
					:color="getInteractiveColor(interactiveValue)"
				/>
				<div style="margin-top: 15px; display: flex; gap: 10px; align-items: center;">
					<TuButton @click="decreaseValue" size="sm" :disabled="interactiveValue <= 0">-</TuButton>
					<input 
						v-model.number="interactiveValue" 
						type="range" 
						min="0" 
						max="100" 
						style="flex: 1;"
					/>
					<TuButton @click="increaseValue" size="sm" :disabled="interactiveValue >= 100">+</TuButton>
				</div>
				<div style="margin-top: 10px; display: flex; gap: 10px;">
					<TuButton @click="setInteractiveValue(25)" size="xs">25%</TuButton>
					<TuButton @click="setInteractiveValue(50)" size="xs">50%</TuButton>
					<TuButton @click="setInteractiveValue(75)" size="xs">75%</TuButton>
					<TuButton @click="setInteractiveValue(100)" size="xs">100%</TuButton>
					<TuButton @click="setInteractiveValue(0)" size="xs">Reset</TuButton>
				</div>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Disk Usage:</strong> {{ diskUsage }}%</p>
				<p><strong>Bandwidth Usage:</strong> {{ bandwidthUsage }}%</p>
				<p><strong>Quota Usage:</strong> {{ quotaUsage }}%</p>
				<p><strong>System Monitor Active:</strong> {{ systemMonitorActive }}</p>
				<p><strong>Interactive Value:</strong> {{ interactiveValue }}%</p>
				<p><strong>Total Storage Used:</strong> {{ totalStorageUsed }}GB</p>
				<p><strong>Completed Projects:</strong> {{ projects.filter(p => p.progress >= 100).length }}/{{ projects.length }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

import { tuUsageBar as TuUsageBar } from "../components/tuUsageBar";
import { tuButton as TuButton } from "../components/tuButton";
import { tuChip as TuChip } from "../components/tuChip";
import TuAvatar from "../components/tuAvatar";
// Basic usage values
const diskUsage = ref(68);
const bandwidthUsage = ref(42);
const quotaUsage = ref(87);

// System metrics
const systemMetrics = ref({
	cpu: 35,
	memory: 60,
	disk: 73,
	network: 28
});

const systemMonitorActive = ref(false);
let systemMonitorInterval: number | null = null;

// Projects
const projects = ref([
	{
		id: 1,
		name: "Website Redesign",
		progress: 75,
		totalTasks: 20,
		tasksCompleted: 15
	},
	{
		id: 2,
		name: "Mobile App Development",
		progress: 45,
		totalTasks: 30,
		tasksCompleted: 14
	},
	{
		id: 3,
		name: "Database Migration",
		progress: 90,
		totalTasks: 10,
		tasksCompleted: 9
	},
	{
		id: 4,
		name: "API Integration",
		progress: 25,
		totalTasks: 16,
		tasksCompleted: 4
	}
]);

// Storage categories
const storageCategories = ref([
	{ name: "Documents", size: "25.3GB", percentage: 25, color: "primary" },
	{ name: "Images", size: "18.7GB", percentage: 19, color: "success" },
	{ name: "Videos", size: "32.1GB", percentage: 32, color: "warning" },
	{ name: "Applications", size: "12.4GB", percentage: 12, color: "info" },
	{ name: "Other", size: "5.2GB", percentage: 5, color: "default" }
]);

// Team members
const teamMembers = ref([
	{ id: 1, name: "John Doe", role: "Frontend Developer", performance: 92 },
	{ id: 2, name: "Jane Smith", role: "Backend Developer", performance: 88 },
	{ id: 3, name: "Bob Johnson", role: "UI/UX Designer", performance: 76 },
	{ id: 4, name: "Alice Brown", role: "Project Manager", performance: 95 },
	{ id: 5, name: "Charlie Wilson", role: "QA Engineer", performance: 82 }
]);

// Interactive value
const interactiveValue = ref(50);

// Computed
const totalStorageUsed = computed(() => {
	return storageCategories.value.reduce((total, category) => {
		return total + parseFloat(category.size.replace("GB", ""));
	}, 0).toFixed(1);
});

// Methods
const getProjectColor = (progress: number) => {
	if (progress >= 100) return "success";
	if (progress >= 75) return "info";
	if (progress >= 50) return "warning";
	return "danger";
};

const getProjectStatus = (progress: number) => {
	if (progress >= 100) return "Completed";
	if (progress >= 75) return "Near Completion";
	if (progress >= 50) return "In Progress";
	return "Getting Started";
};

const getProjectStatusColor = (progress: number) => {
	if (progress >= 100) return "success";
	if (progress >= 75) return "info";
	if (progress >= 50) return "warning";
	return "default";
};

const getPerformanceColor = (performance: number) => {
	if (performance >= 90) return "success";
	if (performance >= 80) return "info";
	if (performance >= 70) return "warning";
	return "danger";
};

const getPerformanceLevel = (performance: number) => {
	if (performance >= 90) return "Excellent";
	if (performance >= 80) return "Good";
	if (performance >= 70) return "Average";
	return "Needs Improvement";
};

const getInteractiveColor = (value: number) => {
	if (value >= 80) return "danger";
	if (value >= 60) return "warning";
	if (value >= 40) return "info";
	return "success";
};

const updateProjectProgress = (projectId: number, change: number) => {
	const project = projects.value.find(p => p.id === projectId);
	if (project) {
		project.progress = Math.max(0, Math.min(100, project.progress + change));
		project.tasksCompleted = Math.round((project.progress / 100) * project.totalTasks);
	}
};

const completeProject = (projectId: number) => {
	const project = projects.value.find(p => p.id === projectId);
	if (project) {
		project.progress = 100;
		project.tasksCompleted = project.totalTasks;
	}
};

const optimizeStorage = () => {
	storageCategories.value.forEach(category => {
		if (category.name !== "Applications") {
			const reduction = Math.floor(Math.random() * 10) + 5;
			category.percentage = Math.max(5, category.percentage - reduction);
			const newSize = (category.percentage * 100 / 100).toFixed(1);
			category.size = `${newSize}GB`;
		}
	});
};

const toggleSystemMonitor = () => {
	if (systemMonitorActive.value) {
		if (systemMonitorInterval) {
			clearInterval(systemMonitorInterval);
			systemMonitorInterval = null;
		}
		systemMonitorActive.value = false;
	} else {
		systemMonitorActive.value = true;
		systemMonitorInterval = setInterval(() => {
			systemMetrics.value.cpu = Math.max(0, Math.min(100, systemMetrics.value.cpu + (Math.random() - 0.5) * 10));
			systemMetrics.value.memory = Math.max(0, Math.min(100, systemMetrics.value.memory + (Math.random() - 0.5) * 8));
			systemMetrics.value.disk = Math.max(0, Math.min(100, systemMetrics.value.disk + (Math.random() - 0.5) * 2));
			systemMetrics.value.network = Math.max(0, Math.min(100, systemMetrics.value.network + (Math.random() - 0.5) * 15));
		}, 1000);
	}
};

const resetSystemMetrics = () => {
	systemMetrics.value = {
		cpu: 35,
		memory: 60,
		disk: 73,
		network: 28
	};
};

const increaseValue = () => {
	if (interactiveValue.value < 100) {
		interactiveValue.value = Math.min(100, interactiveValue.value + 5);
	}
};

const decreaseValue = () => {
	if (interactiveValue.value > 0) {
		interactiveValue.value = Math.max(0, interactiveValue.value - 5);
	}
};

const setInteractiveValue = (value: number) => {
	interactiveValue.value = value;
};

// Lifecycle
onMounted(() => {
	// Auto-update some values periodically
	setInterval(() => {
		diskUsage.value = Math.max(0, Math.min(100, diskUsage.value + (Math.random() - 0.5) * 2));
		bandwidthUsage.value = Math.max(0, Math.min(100, bandwidthUsage.value + (Math.random() - 0.5) * 5));
		quotaUsage.value = Math.max(0, Math.min(100, quotaUsage.value + (Math.random() - 0.5) * 3));
	}, 3000);
});

onUnmounted(() => {
	if (systemMonitorInterval) {
		clearInterval(systemMonitorInterval);
	}
});
</script>
