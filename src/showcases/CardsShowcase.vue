<template>
	<div class="showcase-component">
		<h3>Cards:</h3>
		<hr />
		<div style="display: flex; margin: 20px">
			<TuCard style="margin: 5px">
				<template v-slot:header>
					<h3>Pot with a plant</h3>
				</template>
				<img
					style="width: 100%"
					src="https://picsum.photos/300/150?random=1"
					alt=""
				/>
				<p style="margin: 0px; font-size: 0.8rem; padding: 5px">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>
				<template v-slot:footer>
					<tu-row>
						<tu-col w="6">
							<TuButton shadow> Share </TuButton>
						</tu-col>
						<tu-col w="6">
							<TuButton color="rgb(230,230,230)" color-text="rgb(50,50,50)">
								Remove
							</TuButton>
						</tu-col>
					</tu-row>
				</template>
			</TuCard>

			<TuCard style="margin: 5px">
				<template v-slot:header>
					<div>
						<h3>Pot with a plant</h3>
						<TuButton
							size="small"
							danger
							style="position: absolute; top: 5px; right: 5px"
						>
							<tu-icon size="18px">close</tu-icon>
						</TuButton>
					</div>
				</template>
				<img
					style="width: 100%"
					src="https://picsum.photos/300/150?random=2"
					alt=""
				/>
				<p style="margin: 0px; font-size: 0.8rem; padding: 5px">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>

				<template v-slot:footer>
					<tu-row>
						<tu-col w="6">
							<TuButton shadow> Share </TuButton>
						</tu-col>
						<tu-col w="6">
							<TuButton color="rgb(230,230,230)" color-text="rgb(50,50,50)">
								Remove
							</TuButton>
						</tu-col>
					</tu-row>
				</template>
			</TuCard>

			<TuCard style="margin: 5px">
				<template v-slot:header>
					<tu-row>
						<tu-col w="8">
							<h3>Pot with a plant</h3>
						</tu-col>
						<tu-col w="4">
							<TuButton
								primary
								size="small"
								icon-after
								style="position: absolute; top: 5px; right: 5px"
							>
								<tu-icon size="16px">person</tu-icon>
								Luis
							</TuButton>
						</tu-col>
					</tu-row>
				</template>
				<img
					style="width: 100%"
					src="https://picsum.photos/300/150?random=3"
					alt=""
				/>
				<p style="margin: 0px; font-size: 0.8rem; padding: 5px">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
				</p>

				<template v-slot:footer>
					<tu-row>
						<tu-col w="6">
							<TuButton shadow> Share </TuButton>
						</tu-col>
						<tu-col w="6">
							<TuButton color="rgb(230,230,230)" color-text="rgb(50,50,50)">
								Remove
							</TuButton>
						</tu-col>
					</tu-row>
				</template>
			</TuCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { tuCard as TuCard } from "../components/tuCard";
import { tuButton as TuButton } from "../components/tuButton";
import { tuRow as TuRow } from "../layout/tuRow";
import { tuCol as TuCol } from "../layout/tuCol";

// This component doesn't need any reactive state
</script>
