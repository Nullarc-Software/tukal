<template>
	<div class="showcase-component">
		<h3>History Timeline:</h3>
		<hr />
		
		<h4>Basic History</h4>
		<TuHistory :events="basicEvents" />
		
		<hr />
		
		<h4>Alternative Layout</h4>
		<TuHistory :events="basicEvents" alternative />
		
		<hr />
		
		<h4>Centered Layout</h4>
		<TuHistory :events="basicEvents" center />
		
		<hr />
		
		<h4>With Colors and Icons</h4>
		<TuHistory :events="coloredEvents" />
		
		<hr />
		
		<h4>With Links</h4>
		<TuHistory :events="eventsWithLinks" alternative />
		
		<hr />
		
		<h4>Scrollable History (Many Events)</h4>
		<p>The tuHistory component is fully scrollable. This container is limited to 400px height to demonstrate the scrolling behavior with many events:</p>
		<div class="scrollable-container">
			<TuHistory :events="manyEvents" />
		</div>
		
		<hr />
		
		<h4>Scrollable Alternative Layout</h4>
		<p>The alternative layout also supports scrolling when content exceeds the container height:</p>
		<div class="scrollable-container">
			<TuHistory :events="manyEvents" alternative />
		</div>
		
		<hr />
		
	</div>
</template>

<script setup lang="ts">
import { TuHistory } from "../components/tuHistory";
import type { TuHistoryEvent, TuHistoryServerModel } from "../components/tuHistory";

const basicEvents: TuHistoryEvent[] = [
	{
		title: "Project Started",
		description: "Initial project setup and configuration completed successfully.",
		date: "2024-01-01",
	},
	{
		title: "First Milestone",
		description: "Completed the first phase of development including basic components.",
		date: "2024-01-15",
	},
	{
		title: "Beta Release",
		description: "Released beta version for testing and feedback collection.",
		date: "2024-02-01",
	},
	{
		title: "Production Ready",
		description: "All tests passed and the application is ready for production deployment.",
		date: "2024-02-15",
	}
];

const coloredEvents: TuHistoryEvent[] = [
	{
		title: "Feature Development",
		description: "Started developing new user interface components.",
		date: "2024-01-10",
		icon: "🚀",
		color: "primary",
	},
	{
		title: "Code Review",
		description: "Conducted comprehensive code review and quality assurance.",
		date: "2024-01-20",
		icon: "✅",
		color: "success",
	},
	{
		title: "Bug Fixes",
		description: "Identified and resolved critical bugs in the payment system.",
		date: "2024-01-25",
		icon: "🐛",
		color: "warn",
	},
	{
		title: "Security Update",
		description: "Implemented security patches and vulnerability fixes.",
		date: "2024-02-05",
		icon: "🔒",
		color: "danger",
	}
];

const eventsWithLinks: TuHistoryEvent[] = [
	{
		title: "Documentation",
		description: "Updated project documentation with latest API changes.",
		date: "2024-01-12",
		icon: "📚",
		color: "primary",
		url: "https://example.com/docs",
	},
	{
		title: "Team Meeting",
		description: "Quarterly team meeting to discuss project roadmap.",
		date: "2024-01-18",
		icon: "👥",
		color: "success",
		url: "https://example.com/meeting",
	},
	{
		title: "Performance Optimization",
		description: "Optimized database queries resulting in 40% faster response times.",
		date: "2024-01-28",
		icon: "⚡",
		color: "warn",
		url: "https://example.com/performance",
	}
];

const manyEvents: TuHistoryEvent[] = [
	{
		title: "Project Initialization",
		description: "Created new project repository and set up initial development environment with all necessary tools and configurations.",
		date: "2023-12-01",
		icon: "🚀",
		color: "primary",
	},
	{
		title: "Requirements Analysis",
		description: "Conducted detailed requirements analysis with stakeholders to understand project scope and deliverables.",
		date: "2023-12-05",
		icon: "📋",
		color: "success",
	},
	{
		title: "Architecture Design",
		description: "Designed system architecture and created technical specifications for the development team.",
		date: "2023-12-10",
		icon: "🏗️",
		color: "primary",
	},
	{
		title: "Database Schema",
		description: "Designed and implemented database schema with proper indexing and relationships.",
		date: "2023-12-15",
		icon: "🗄️",
		color: "success",
	},
	{
		title: "API Development",
		description: "Developed RESTful APIs with proper authentication and authorization mechanisms.",
		date: "2023-12-20",
		icon: "🔗",
		color: "primary",
	},
	{
		title: "Frontend Setup",
		description: "Set up frontend framework and component library structure for consistent UI development.",
		date: "2024-01-02",
		icon: "🎨",
		color: "success",
	},
	{
		title: "Authentication System",
		description: "Implemented secure user authentication system with JWT tokens and refresh mechanism.",
		date: "2024-01-08",
		icon: "🔐",
		color: "primary",
	},
	{
		title: "User Interface Components",
		description: "Created reusable UI components following design system guidelines and accessibility standards.",
		date: "2024-01-15",
		icon: "🎯",
		color: "success",
	},
	{
		title: "Data Validation",
		description: "Implemented comprehensive data validation on both client and server side for data integrity.",
		date: "2024-01-22",
		icon: "✅",
		color: "primary",
	},
	{
		title: "Error Handling",
		description: "Added robust error handling and logging mechanisms throughout the application.",
		date: "2024-01-28",
		icon: "🚨",
		color: "warn",
	},
	{
		title: "Testing Implementation",
		description: "Developed comprehensive test suites including unit tests, integration tests, and end-to-end tests.",
		date: "2024-02-05",
		icon: "🧪",
		color: "success",
	},
	{
		title: "Performance Optimization",
		description: "Optimized application performance through code splitting, lazy loading, and caching strategies.",
		date: "2024-02-12",
		icon: "⚡",
		color: "primary",
	},
	{
		title: "Security Audit",
		description: "Conducted thorough security audit and implemented security best practices and vulnerability fixes.",
		date: "2024-02-18",
		icon: "🛡️",
		color: "danger",
	},
	{
		title: "Documentation",
		description: "Created comprehensive documentation including API docs, user guides, and developer documentation.",
		date: "2024-02-25",
		icon: "📖",
		color: "success",
	},
	{
		title: "Beta Testing",
		description: "Released beta version to selected users for feedback collection and bug identification.",
		date: "2024-03-01",
		icon: "🔬",
		color: "primary",
	},
	{
		title: "Bug Fixes",
		description: "Resolved all critical bugs identified during beta testing phase and improved overall stability.",
		date: "2024-03-08",
		icon: "🐛",
		color: "warn",
	},
	{
		title: "Final Review",
		description: "Conducted final code review and quality assurance checks before production deployment.",
		date: "2024-03-15",
		icon: "👀",
		color: "success",
	},
	{
		title: "Production Deployment",
		description: "Successfully deployed application to production environment with monitoring and alerting setup.",
		date: "2024-03-20",
		icon: "🎉",
		color: "primary",
	},
	{
		title: "Post-Launch Monitoring",
		description: "Monitoring application performance and user feedback for continuous improvement opportunities.",
		date: "2024-03-25",
		icon: "📊",
		color: "success",
	},
	{
		title: "Feature Enhancement",
		description: "Added new features based on user feedback and market requirements for better user experience.",
		date: "2024-03-30",
		icon: "✨",
		color: "primary",
	}
];

// Server-side configuration and initial events
const serverEvents: TuHistoryEvent[] = [
	{
		title: "Initial Server Load",
		description: "First batch of events loaded from server. Scroll down to load more events automatically.",
		date: "2024-04-01",
		icon: "⚡",
		color: "primary",
	}
];

const serverConfig: TuHistoryServerModel = {
	ajaxUrl: "/api/history", // This would normally point to a real endpoint
	method: "GET",
};
</script>

<style scoped>
.showcase-component h4 {
	margin: 20px 0 10px 0;
	color: var(--tu-text);
}

.showcase-component p {
	margin: 10px 0;
	color: var(--tu-text);
	line-height: 1.5;
}

.scrollable-container {
	height: 400px;
	border: 2px solid var(--tu-gray-3);
	border-radius: 8px;
	padding: 10px;
	background: var(--tu-background);
	position: relative;
	margin: 10px 0;
	overflow: hidden; /* Ensure content is contained */
}

.scrollable-container :deep(.tu-hist-container) {
	height: 100% !important;
	max-height: 100% !important;
	overflow-y: auto !important;
	overflow-x: hidden !important;
}

.scrollable-container::before {
	content: "↕️ Scrollable Container (400px height)";
	position: absolute;
	top: -10px;
	left: 10px;
	background: var(--tu-background);
	padding: 0 8px;
	font-size: 12px;
	color: var(--tu-text);
	font-weight: 600;
	z-index: 1;
}
</style>
