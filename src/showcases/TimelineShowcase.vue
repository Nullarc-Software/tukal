<template>
	<div class="showcase-component">
		<h3>Timeline:</h3>
		<hr />
		
		<!-- Basic Timeline -->
		<div style="margin: 20px 0;">
			<h4>Basic Timeline:</h4>
			<TuTimeline>
				<TuTimeline-item title="Project Started" date="2024-01-15">
					The project was officially kicked off with initial planning and requirements gathering.
				</tu-timeline-item>
				<TuTimeline-item title="Design Phase" date="2024-02-01">
					UI/UX design and wireframes were completed and approved by the team.
				</tu-timeline-item>
				<TuTimeline-item title="Development Begin" date="2024-02-15">
					Frontend and backend development started in parallel with the approved designs.
				</tu-timeline-item>
				<TuTimeline-item title="Testing Phase" date="2024-03-10">
					Comprehensive testing including unit tests, integration tests, and user acceptance testing.
				</tu-timeline-item>
			</TuTimeline>
		</div>

		<!-- Different Colors -->
		<div style="margin: 20px 0;">
			<h4>Different Colors:</h4>
			<TuTimeline>
				<TuTimeline-item title="Planning" date="Week 1" color="info">
					Initial project planning and resource allocation.
				</tu-timeline-item>
				<TuTimeline-item title="Development" date="Week 2-4" color="warning">
					Active development phase with daily standups.
				</tu-timeline-item>
				<TuTimeline-item title="Testing" date="Week 5" color="primary">
					Quality assurance and bug fixing.
				</tu-timeline-item>
				<TuTimeline-item title="Deployment" date="Week 6" color="success">
					Successfully deployed to production environment.
				</tu-timeline-item>
				<TuTimeline-item title="Issue Found" date="Week 7" color="danger">
					Critical bug discovered in production requiring immediate attention.
				</tu-timeline-item>
			</TuTimeline>
		</div>

		<!-- With Icons -->
		<div style="margin: 20px 0;">
			<h4>With Icons:</h4>
			<TuTimeline>
				<TuTimeline-item title="User Registration" date="10:30 AM" color="success">
					<template #icon>
						<tu-icon>person_add</tu-icon>
					</template>
					New user account created successfully.
				</tu-timeline-item>
				<TuTimeline-item title="Email Verification" date="10:32 AM" color="info">
					<template #icon>
						<tu-icon>email</tu-icon>
					</template>
					Verification email sent and confirmed by user.
				</tu-timeline-item>
				<TuTimeline-item title="Profile Setup" date="10:35 AM" color="warning">
					<template #icon>
						<tu-icon>settings</tu-icon>
					</template>
					User is currently setting up their profile information.
				</tu-timeline-item>
				<TuTimeline-item title="First Purchase" date="11:15 AM" color="success">
					<template #icon>
						<tu-icon>shopping_cart</tu-icon>
					</template>
					User made their first purchase of $49.99.
				</tu-timeline-item>
			</TuTimeline>
		</div>

		<!-- Interactive Timeline -->
		<div style="margin: 20px 0;">
			<h4>Interactive Timeline:</h4>
			<div style="margin-bottom: 15px;">
				<TuButton @click="addTimelineItem" size="sm">Add New Item</TuButton>
				<TuButton @click="clearTimeline" size="sm" style="margin-left: 10px;">Clear All</TuButton>
			</div>
			<TuTimeline>
				<TuTimeline-item 
					v-for="item in interactiveItems" 
					:key="item.id"
					:title="item.title"
					:date="item.date"
					:color="item.color"
					@click="editTimelineItem(item)"
				>
					{{ item.description }}
					<div style="margin-top: 10px;">
						<TuButton @click.stop="removeTimelineItem(item.id)" size="xs" color="danger">Remove</TuButton>
					</div>
				</tu-timeline-item>
			</TuTimeline>
			<p v-if="interactiveItems.length === 0" style="text-align: center; color: #666; padding: 40px;">
				No timeline items. Click "Add New Item" to create one.
			</p>
		</div>

		<!-- Order Timeline -->
		<div style="margin: 20px 0;">
			<h4>Order Timeline Example:</h4>
			<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
				<h5>Order #12345 Status</h5>
				<TuTimeline>
					<TuTimeline-item 
						v-for="status in orderStatuses" 
						:key="status.id"
						:title="status.title"
						:date="status.date"
						:color="status.color"
					>
						<template #icon>
							<tu-icon>{{ status.icon }}</tu-icon>
						</template>
						{{ status.description }}
						<div v-if="status.details" style="margin-top: 8px; font-size: 12px; color: #666;">
							{{ status.details }}
						</div>
					</tu-timeline-item>
				</TuTimeline>
			</div>
		</div>

		<!-- Project Milestones -->
		<div style="margin: 20px 0;">
			<h4>Project Milestones:</h4>
			<TuTimeline>
				<TuTimeline-item 
					v-for="milestone in projectMilestones" 
					:key="milestone.id"
					:title="milestone.title"
					:date="milestone.date"
					:color="milestone.completed ? 'success' : 'default'"
				>
					<template #icon>
						<tu-icon>{{ milestone.completed ? 'check_circle' : 'radio_button_unchecked' }}</tu-icon>
					</template>
					{{ milestone.description }}
					<div style="margin-top: 10px;">
						<TuChip :color="milestone.completed ? 'success' : 'warning'" size="sm">
							{{ milestone.completed ? 'Completed' : 'Pending' }}
						</TuChip>
						<TuChip v-if="milestone.priority" :color="getPriorityColor(milestone.priority)" size="sm" style="margin-left: 8px;">
							{{ milestone.priority }} Priority
						</TuChip>
					</div>
					<div v-if="milestone.team" style="margin-top: 8px; font-size: 12px; color: #666;">
						Team: {{ milestone.team.join(', ') }}
					</div>
				</tu-timeline-item>
			</TuTimeline>
		</div>

		<!-- Activity Feed -->
		<div style="margin: 20px 0;">
			<h4>Activity Feed:</h4>
			<div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 8px; padding: 15px;">
				<TuTimeline>
					<TuTimeline-item 
						v-for="activity in activities" 
						:key="activity.id"
						:title="activity.title"
						:date="activity.date"
						:color="activity.color"
					>
						<template #icon>
							<TuAvatar :text="activity.user.charAt(0)" size="24" />
						</template>
						<div style="margin-bottom: 5px;">
							<strong>{{ activity.user }}</strong> {{ activity.action }}
						</div>
						{{ activity.description }}
						<div v-if="activity.tags" style="margin-top: 8px;">
							<TuTag v-for="tag in activity.tags" :key="tag" size="xs" style="margin-right: 5px;">
								{{ tag }}
							</TuTag>
						</div>
					</tu-timeline-item>
				</TuTimeline>
			</div>
		</div>

		<!-- Custom Styled Timeline -->
		<div style="margin: 20px 0;">
			<h4>Custom Styled Timeline:</h4>
			<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px;">
				<h5 style="color: white; margin-bottom: 15px;">Company History</h5>
				<TuTimeline style="--timeline-line-color: rgba(255,255,255,0.3);">
					<TuTimeline-item 
						v-for="event in companyHistory" 
						:key="event.id"
						:title="event.title"
						:date="event.date"
						:color="event.color"
						style="color: white;"
					>
						{{ event.description }}
						<div v-if="event.achievement" style="margin-top: 8px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 4px;">
							🏆 {{ event.achievement }}
						</div>
					</tu-timeline-item>
				</TuTimeline>
			</div>
		</div>

		<!-- Current Values -->
		<div style="margin: 20px 0;">
			<h4>Current Values:</h4>
			<div style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 12px;">
				<p><strong>Interactive Items Count:</strong> {{ interactiveItems.length }}</p>
				<p><strong>Completed Milestones:</strong> {{ projectMilestones.filter(m => m.completed).length }}/{{ projectMilestones.length }}</p>
				<p><strong>Recent Activities:</strong> {{ activities.length }}</p>
				<p><strong>Company History Events:</strong> {{ companyHistory.length }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TuTimeline from "../components/tuTimeline";
import { tuButton as TuButton } from "../components/tuButton";
import { tuChip as TuChip } from "../components/tuChip";
import { tuTag as TuTag } from "../components/tuTag";
import TuAvatar from "../components/tuAvatar";
// Interactive timeline
const interactiveItems = ref([
	{
		id: 1,
		title: "Initial Setup",
		date: "2024-01-01",
		color: "info",
		description: "Project initialization and environment setup completed."
	},
	{
		id: 2,
		title: "First Milestone",
		date: "2024-01-15",
		color: "success",
		description: "Successfully reached the first project milestone."
	}
]);

let nextItemId = 3;

// Order statuses
const orderStatuses = ref([
	{
		id: 1,
		title: "Order Placed",
		date: "2024-03-15 10:30 AM",
		color: "info",
		icon: "shopping_cart",
		description: "Your order has been successfully placed.",
		details: "Order ID: #12345 | Payment: Credit Card"
	},
	{
		id: 2,
		title: "Payment Confirmed",
		date: "2024-03-15 10:32 AM",
		color: "success",
		icon: "payment",
		description: "Payment has been processed successfully.",
		details: "Amount: $129.99 | Method: Visa ****1234"
	},
	{
		id: 3,
		title: "Processing",
		date: "2024-03-15 11:00 AM",
		color: "warning",
		icon: "inventory",
		description: "Your order is being prepared for shipment.",
		details: "Estimated processing time: 1-2 business days"
	},
	{
		id: 4,
		title: "Shipped",
		date: "2024-03-16 02:15 PM",
		color: "primary",
		icon: "local_shipping",
		description: "Your order has been shipped.",
		details: "Tracking: 1Z999AA1234567890 | Carrier: UPS"
	},
	{
		id: 5,
		title: "Delivered",
		date: "2024-03-18 03:45 PM",
		color: "success",
		icon: "check_circle",
		description: "Your order has been delivered successfully.",
		details: "Delivered to: Front door | Signed by: John Doe"
	}
]);

// Project milestones
const projectMilestones = ref([
	{
		id: 1,
		title: "Requirements Analysis",
		date: "2024-01-15",
		description: "Gather and document all project requirements.",
		completed: true,
		priority: "High",
		team: ["Product Manager", "Business Analyst"]
	},
	{
		id: 2,
		title: "System Design",
		date: "2024-02-01",
		description: "Create system architecture and design documents.",
		completed: true,
		priority: "High",
		team: ["Software Architect", "Senior Developer"]
	},
	{
		id: 3,
		title: "Frontend Development",
		date: "2024-02-15",
		description: "Develop user interface and user experience components.",
		completed: true,
		priority: "Medium",
		team: ["Frontend Developer", "UI/UX Designer"]
	},
	{
		id: 4,
		title: "Backend Development",
		date: "2024-03-01",
		description: "Implement server-side logic and database integration.",
		completed: false,
		priority: "High",
		team: ["Backend Developer", "Database Administrator"]
	},
	{
		id: 5,
		title: "Testing & QA",
		date: "2024-03-20",
		description: "Comprehensive testing and quality assurance.",
		completed: false,
		priority: "High",
		team: ["QA Engineer", "Test Automation"]
	},
	{
		id: 6,
		title: "Deployment",
		date: "2024-04-01",
		description: "Deploy application to production environment.",
		completed: false,
		priority: "Medium",
		team: ["DevOps Engineer", "System Administrator"]
	}
]);

// Activities
const activities = ref([
	{
		id: 1,
		user: "John Doe",
		action: "created a new task",
		title: "Task Created",
		date: "2 minutes ago",
		color: "info",
		description: "Implement user authentication system",
		tags: ["Backend", "Security"]
	},
	{
		id: 2,
		user: "Jane Smith",
		action: "completed a milestone",
		title: "Milestone Completed",
		date: "15 minutes ago",
		color: "success",
		description: "Frontend components development finished",
		tags: ["Frontend", "Components"]
	},
	{
		id: 3,
		user: "Bob Johnson",
		action: "commented on issue",
		title: "Issue Comment",
		date: "1 hour ago",
		color: "primary",
		description: "Added suggestions for performance optimization",
		tags: ["Performance", "Optimization"]
	},
	{
		id: 4,
		user: "Alice Brown",
		action: "uploaded files",
		title: "Files Uploaded",
		date: "2 hours ago",
		color: "warning",
		description: "Design mockups and wireframes added to project",
		tags: ["Design", "Mockups"]
	},
	{
		id: 5,
		user: "Charlie Wilson",
		action: "merged pull request",
		title: "PR Merged",
		date: "3 hours ago",
		color: "success",
		description: "Database schema updates successfully integrated",
		tags: ["Database", "Schema"]
	}
]);

// Company history
const companyHistory = ref([
	{
		id: 1,
		title: "Company Founded",
		date: "2010",
		color: "info",
		description: "Started as a small tech startup with big dreams.",
		achievement: "Founded with $50K initial investment"
	},
	{
		id: 2,
		title: "First Product Launch",
		date: "2012",
		color: "success",
		description: "Launched our flagship product to the market.",
		achievement: "1,000+ customers in first year"
	},
	{
		id: 3,
		title: "Series A Funding",
		date: "2015",
		color: "warning",
		description: "Secured major funding round for expansion.",
		achievement: "$5M raised from venture capital"
	},
	{
		id: 4,
		title: "International Expansion",
		date: "2018",
		color: "primary",
		description: "Opened offices in Europe and Asia.",
		achievement: "Presence in 15+ countries"
	},
	{
		id: 5,
		title: "IPO",
		date: "2023",
		color: "success",
		description: "Went public on the stock exchange.",
		achievement: "Valued at $1B+ market cap"
	}
]);

// Methods
const addTimelineItem = () => {
	const newItem = {
		id: nextItemId++,
		title: `Timeline Item ${nextItemId - 1}`,
		date: new Date().toLocaleDateString(),
		color: ["info", "success", "warning", "primary", "danger"][Math.floor(Math.random() * 5)],
		description: `This is a dynamically added timeline item created at ${new Date().toLocaleTimeString()}.`
	};
	
	interactiveItems.value.push(newItem);
};

const removeTimelineItem = (itemId: number) => {
	const index = interactiveItems.value.findIndex(item => item.id === itemId);
	if (index > -1) {
		interactiveItems.value.splice(index, 1);
	}
};

const clearTimeline = () => {
	interactiveItems.value = [];
};

const editTimelineItem = (item: any) => {
	const newTitle = prompt("Edit title:", item.title);
	if (newTitle !== null) {
		item.title = newTitle;
	}
};

const getPriorityColor = (priority: string) => {
	switch (priority) {
		case "High": return "danger";
		case "Medium": return "warning";
		case "Low": return "info";
		default: return "default";
	}
};
</script>
