<template>
	<div class="showcase-component">
		<h3>Card Types Showcase</h3>
		<hr />
		
		<!-- Type 1: Standard Card -->
		<section class="card-section">
			<h4>Type 1: Standard Cards</h4>
			<p>Basic cards with simple hover effects and shadow elevation.</p>
			<div class="card-grid">
				<TuCard type="1" background-color="red">
					<template #header>
						<h3>Product Card</h3>
					</template>
					<template #content>
						<img
							src="https://picsum.photos/300/200?random=1"
							alt="Product Image"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Premium Headphones</h4>
						</div>
						<p>High-quality wireless headphones with noise cancellation.</p>
					</template>
					<template #buttons>
						<TuButton primary>Add to Cart</TuButton>
						<TuButton>Details</TuButton>
					</template>
				</TuCard>

				<TuCard type="1">
					<template #content>
						<img
							src="https://picsum.photos/300/200?random=2"
							alt="Article Image"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Tech News Article</h4>
						</div>
						<p>Latest developments in artificial intelligence and machine learning.</p>
					</template>
					<template #footer>
						<div class="footer-content">
							<span class="date">March 15, 2024</span>
							<TuButton size="sm">Read More</TuButton>
						</div>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Type 2: Overlay Text Cards -->
		<section class="card-section">
			<h4>Type 2: Overlay Text Cards</h4>
			<p>Cards with text overlay that appears on hover with gradient background.</p>
			<div class="card-grid">
				<TuCard type="2">
					<template #content>
						<img
							src="https://picsum.photos/300/400?random=3"
							alt="Portfolio Image"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Urban Photography</h4>
						</div>
						<p>Capturing the essence of city life through modern photography techniques.</p>
					</template>
					<template #interactions>
						<TuButton variant="flat" size="sm" style="color: white; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);">View Gallery</TuButton>
					</template>
				</TuCard>

				<TuCard type="2">
					<template #content>
						<img
							src="https://picsum.photos/300/400?random=4"
							alt="Travel Destination"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Mountain Adventure</h4>
						</div>
						<p>Explore breathtaking mountain trails and scenic landscapes.</p>
					</template>
					<template #interactions>
						<TuButton variant="flat" size="sm" style="color: white; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);">Book Now</TuButton>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Type 3: Horizontal Layout Cards -->
		<section class="card-section">
			<h4>Type 3: Horizontal Layout Cards</h4>
			<p>Cards with side-by-side content layout, ideal for articles and media.</p>
			<div class="card-grid horizontal">
				<TuCard type="3">
					<template #content>
						<img
							src="https://picsum.photos/150/200?random=5"
							alt="Book Cover"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>The Art of Design</h4>
						</div>
						<p>A comprehensive guide to modern design principles and practices.</p>
					</template>
					<template #buttons>
						<TuButton size="sm" primary>Read Sample</TuButton>
					</template>
				</TuCard>

				<TuCard type="3">
					<template #content>
						<img
							src="https://picsum.photos/150/200?random=6"
							alt="Music Album"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Electronic Vibes</h4>
						</div>
						<p>Latest electronic music album featuring ambient and synthwave tracks.</p>
					</template>
					<template #buttons>
						<TuButton size="sm" primary>Play</TuButton>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Type 4: Bottom Overlay Cards -->
		<section class="card-section">
			<h4>Type 4: Bottom Overlay Cards</h4>
			<p>Cards with bottom overlay that expands on hover with blur effect.</p>
			<div class="card-grid">
				<TuCard type="4">
					<template #content>
						<img
							src="https://picsum.photos/300/500?random=7"
							alt="Fashion Model"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Spring Collection</h4>
						</div>
						<p>Discover the latest trends in sustainable fashion for spring 2024.</p>
					</template>
					<template #interactions>
						<TuButton variant="flat" size="sm" style="background: rgba(255,255,255,0.9); color: #1f2937; backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3);">Shop Collection</TuButton>
					</template>
				</TuCard>

				<TuCard type="4">
					<template #content>
						<img
							src="https://picsum.photos/300/500?random=8"
							alt="Recipe Photo"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Gourmet Recipe</h4>
						</div>
						<p>Learn to cook restaurant-quality meals at home with our expert tips.</p>
					</template>
					<template #interactions>
						<TuButton variant="flat" size="sm" style="background: rgba(255,255,255,0.9); color: #1f2937; backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3);">Get Recipe</TuButton>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Type 5: Animated Sliding Cards -->
		<section class="card-section">
			<h4>Type 5: Animated Sliding Cards</h4>
			<p>Cards with animated sliding text that appears from bottom on hover.</p>
			<div class="card-grid">
				<TuCard type="5">
					<template #content>
						<img
							src="https://picsum.photos/300/300?random=9"
							alt="Event Photo"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Tech Conference 2024</h4>
						</div>
						<p>Join industry leaders for three days of innovation, networking, and learning.</p>
					</template>
					<template #interactions>
						<TuButton variant="flat" size="sm" style="background: rgba(37,99,235,0.9); color: white; backdrop-filter: blur(8px); border: 1px solid rgba(37,99,235,0.5);">Register Now</TuButton>
					</template>
				</TuCard>

				<TuCard type="5">
					<template #content>
						<img
							src="https://picsum.photos/300/300?random=10"
							alt="Course Photo"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Web Development Course</h4>
						</div>
						<p>Master modern web development with hands-on projects and expert guidance.</p>
					</template>
					<template #interactions>
						<TuButton variant="flat" size="sm" style="background: rgba(37,99,235,0.9); color: white; backdrop-filter: blur(8px); border: 1px solid rgba(37,99,235,0.5);">Enroll</TuButton>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Type 6: Column Layout Cards -->
		<section class="card-section">
			<h4>Type 6: Column Layout Cards</h4>
			<p>Cards with header and vertical column layout, perfect for profiles and listings.</p>
			<div class="card-grid">
				<TuCard type="6">
					<template #header>
						<div class="header-content">
							<h4>Team Member</h4>
							<TuButton size="sm">Contact</TuButton>
						</div>
					</template>
					<template #content>
						<img
							src="https://picsum.photos/200/200?random=11"
							alt="Profile Photo"
							class="profile-image"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Sarah Johnson</h4>
						</div>
						<p>Senior UI/UX Designer with 8 years of experience in creating user-centered designs.</p>
					</template>
					<template #footer>
						<div class="footer-buttons">
							<TuButton size="sm">Portfolio</TuButton>
							<TuButton size="sm">LinkedIn</TuButton>
						</div>
					</template>
				</TuCard>

				<TuCard type="6">
					<template #header>
						<div class="header-content">
							<h4>Property Listing</h4>
							<span class="price">$450,000</span>
						</div>
					</template>
					<template #content>
						<img
							src="https://picsum.photos/300/200?random=12"
							alt="House Photo"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Modern Family Home</h4>
						</div>
						<p>Beautiful 3-bedroom house with garden, garage, and modern amenities in quiet neighborhood.</p>
					</template>
					<template #footer>
						<div class="footer-content">
							<TuButton size="sm">Schedule Tour</TuButton>
							<TuButton size="sm" primary>Contact Agent</TuButton>
						</div>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Card Groups -->
		<section class="card-section">
			<h4>Card Groups</h4>
			<p>Multiple cards grouped together for cohesive layouts.</p>
			
			<h5>News Article Grid</h5>
			<div class="card-group-grid">
				<TuCard type="1" v-for="n in 6" :key="`news-${n}`">
					<template #content>
						<img
							:src="`https://picsum.photos/300/200?random=${13 + n}`"
							alt="News Image"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>News Article {{ n }}</h4>
						</div>
						<p>Brief description of the news article content and main points covered.</p>
					</template>
					<template #footer>
						<div class="footer-content">
							<span class="date">{{ new Date().toLocaleDateString() }}</span>
							<TuButton size="sm">Read More</TuButton>
						</div>
					</template>
				</TuCard>
			</div>

			<h5>Product Showcase</h5>
			<div class="card-group-horizontal">
				<TuCard type="2" v-for="n in 4" :key="`product-${n}`">
					<template #content>
						<img
							:src="`https://picsum.photos/250/350?random=${19 + n}`"
							alt="Product Image"
						/>
					</template>
					<template #text>
						<div class="tu-card__title">
							<h4>Product {{ n }}</h4>
						</div>
						<p>Premium quality product with excellent features and design.</p>
					</template>
					<template #interactions>
						<TuButton 
							variant="flat" 
							size="sm" 
							style="background: rgba(255, 255, 255, 0.2); color: white; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(10px);">
							Buy Now
						</TuButton>
					</template>
				</TuCard>
			</div>
		</section>

		<!-- Special Card Modes -->
		<section class="card-section">
			<h4>Special Card Modes</h4>
			<p>Cards with special content and scrolling capabilities.</p>
			
			<div class="card-grid">
				<!-- Scrollable Content Card -->
				<TuCard content style="height: 300px;">
					<template #header>
						<h4>Scrollable Content</h4>
					</template>
					<div class="scrollable-content">
						<h5>Long Content Example</h5>
						<p>This card demonstrates scrollable content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
						<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
						<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
						<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
						<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
						<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
					</div>
				</TuCard>

				<!-- Fit Content Card -->
				<TuCard fit-content>
					<template #header>
						<h4>Fit Content Card</h4>
					</template>
					<div class="fit-content">
						<p>This card adjusts its size to fit the content perfectly.</p>
						<TuButton primary>Action Button</TuButton>
					</div>
				</TuCard>

				<!-- Fill Parent Card -->
				<div class="parent-container">
					<TuCard fill-parent>
						<template #header>
							<h4>Fill Parent Card</h4>
						</template>
						<div class="fill-content">
							<p>This card fills its parent container completely.</p>
							<p>Useful for dashboard layouts and full-width components.</p>
						</div>
					</TuCard>
				</div>
			</div>
		</section>

		<!-- Default Slot Example -->
		<section class="card-section">
			<h4>Default Slot Cards</h4>
			<p>Cards using the default slot for simple content.</p>
			
			<div class="card-grid">
				<TuCard>
					<h4>Simple Card</h4>
					<p>This card uses the default slot for simple content without complex layouts.</p>
					<TuButton primary>Learn More</TuButton>
				</TuCard>

				<TuCard>
					<img
						src="https://picsum.photos/300/150?random=25"
						alt="Simple Image"
						style="width: 100%; border-radius: 8px; margin-bottom: 16px;"
					/>
					<h4>Image Card</h4>
					<p>A simple card with an image and basic content using the default slot.</p>
				</TuCard>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { TuCard } from "../components/tuCard";
import { TuButton } from "../components/tuButton";

// This component demonstrates all card types and variations
</script>

<style scoped>
.showcase-component {
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
}

.card-section {
	margin-bottom: 4rem;
	clear: both;
	position: relative;
}

.card-section h4 {
	color: #1f2937;
	font-size: 1.5rem;
	margin-bottom: 0.5rem;
}

.card-section h5 {
	color: #374151;
	font-size: 1.2rem;
	margin: 2rem 0 1rem 0;
}

.card-section p {
	color: #6b7280;
	margin-bottom: 1.5rem;
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem;
	margin-bottom: 2rem;
}

.card-grid.horizontal {
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.card-group-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
}

.card-group-horizontal {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	margin-bottom: 2rem;
}

.parent-container {
	height: 200px;
	border: 2px dashed #d1d5db;
	border-radius: 8px;
	padding: 1rem;
	background: #f9fafb;
}

.fit-content {
	padding: 1rem;
}

.fill-content {
	padding: 1rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

@media (max-width: 768px) {
	.card-grid,
	.card-grid.horizontal {
		grid-template-columns: 1fr;
	}
	
	.card-group-grid {
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}
	
	.card-group-horizontal {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}
}
</style>
