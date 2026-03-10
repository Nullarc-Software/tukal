<template>
	<div class="showcase-component">
		<h3>Navbar Positioning Showcase:</h3>
		<hr />
		
		<!-- Relative Positioning (Takes up space) -->
		<div style="margin: 40px 0;">
			<h4>1. Relative Positioning (Takes up space in layout):</h4>
			<div class="navbar-container relative-container">
				<TuNavbar>
					<template #left>
						<div style="font-weight: bold; font-size: 18px;">
							RelativeApp
						</div>
					</template>
					
					<TuNavbarItem id="rel-home" active>Home</TuNavbarItem>
					<TuNavbarItem id="rel-about">About</TuNavbarItem>
					<TuNavbarItem id="rel-services">Services</TuNavbarItem>
					<TuNavbarItem id="rel-contact">Contact</TuNavbarItem>
				</TuNavbar>
				
				<!-- Content that flows naturally below the navbar -->
				<div class="content-section">
					<h5>Content Below Navbar</h5>
					<p>This content flows naturally below the navbar because the navbar takes up space in the document flow (relative positioning). Notice how the navbar pushes this content down.</p>
					<div class="demo-content">
						<div class="card">Card 1</div>
						<div class="card">Card 2</div>
						<div class="card">Card 3</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Fixed Positioning (Overlaps content) -->
		<div style="margin: 40px 0;">
			<h4>2. Fixed Positioning (Overlaps content):</h4>
			<div class="navbar-container fixed-container">
				<TuNavbar fixed text-white style="background: #1a202c;">
					<template #left>
						<div style="font-weight: bold; font-size: 18px; color: white;">
							FixedApp
						</div>
					</template>
					
					<TuNavbarItem id="fix-home" style="color: white;" active>Home</TuNavbarItem>
					<TuNavbarItem id="fix-about" style="color: white;">About</TuNavbarItem>
					<TuNavbarItem id="fix-services" style="color: white;">Services</TuNavbarItem>
					<TuNavbarItem id="fix-contact" style="color: white;">Contact</TuNavbarItem>
				</TuNavbar>
				
				<!-- Content that gets overlapped by the fixed navbar -->
				<div class="content-section overlapped-content">
					<h5>Content Behind Fixed Navbar</h5>
					<p>This content starts at the top of its container but gets overlapped by the fixed navbar above it. Fixed navbars don't take up space in the document flow, so content flows underneath them.</p>
					<div class="demo-content">
						<div class="card">Card 1 (Partially Hidden)</div>
						<div class="card">Card 2</div>
						<div class="card">Card 3</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Comparison Summary -->
		<div style="margin: 40px 0;">
			<h4>Positioning Summary:</h4>
			<div class="comparison-grid">
				<div class="comparison-card">
					<h6>Relative/Static (Default)</h6>
					<ul>
						<li>Takes up space in document flow</li>
						<li>Content flows naturally below</li>
						<li>Good for: Standard page layouts</li>
						<li>Scrolls with page content</li>
					</ul>
				</div>
				
				<div class="comparison-card">
					<h6>Fixed</h6>
					<ul>
						<li>Removed from document flow</li>
						<li>Overlaps content underneath</li>
						<li>Good for: Always-visible navigation</li>
						<li>Stays in viewport when scrolling</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TuNavbar, TuNavbarItem } from "../components/tuNavbar";
</script>

<style scoped>
.navbar-container {
	border: 2px solid #e2e8f0;
	border-radius: 12px;
	overflow: hidden;
	margin: 20px 0;
}

.relative-container {
	background: #f8f9fa;
}

.fixed-container {
	height: 400px;
	position: relative;
	background: #f8f9fa;
}

.content-section {
	padding: 20px;
}

.overlapped-content {
	padding-top: 0;
}

.demo-content {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 15px;
	margin-top: 15px;
}

.card {
	background: white;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	text-align: center;
	font-weight: 500;
}

.comparison-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 20px;
	margin-top: 20px;
}

.comparison-card {
	background: white;
	padding: 20px;
	border-radius: 12px;
	border: 2px solid #e2e8f0;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.comparison-card h6 {
	color: #2d3748;
	margin-bottom: 10px;
	font-size: 16px;
	font-weight: 600;
}

.comparison-card ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.comparison-card li {
	padding: 5px 0;
	color: #4a5568;
	position: relative;
	padding-left: 20px;
}

.comparison-card li:before {
	content: "•";
	color: #3182ce;
	font-weight: bold;
	position: absolute;
	left: 0;
}
</style>
