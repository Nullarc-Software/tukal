<template>
	<div class="showcase-component">
		<h3>Alerts:</h3>
		<hr />
		<TuAlert> <b>Vuesax</b> Lorem ipsum dolor sit amet. </TuAlert>
		<TuAlert relief> <b>Relief</b> Lorem ipsum dolor sit amet. </TuAlert>
		<TuAlert shadow> <b>Shadow</b> Lorem ipsum dolor sit amet. </TuAlert>
		<TuAlert solid>
			<template v-slot:title> Solid </template>
			Lorem ipsum dolor sit amet.
		</TuAlert>
		<TuAlert border>
			<template v-slot:title> Border </template>
			Lorem ipsum dolor sit amet.
		</TuAlert>
		<TuAlert gradient>
			<template v-slot:title> Gradient </template>
			Lorem ipsum dolor sit amet.
		</TuAlert>
		<TuAlert flat>
			<template v-slot:title> Flat </template>
			Lorem ipsum dolor sit amet.
		</TuAlert>
		<TuAlert primary>
			<template v-slot:title> Primary </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert success>
			<template v-slot:title> Success </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert danger>
			<template v-slot:title> Danger </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert warn>
			<template v-slot:title> Warn </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert dark>
			<template v-slot:title> Dark </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert color="#7d33ff">
			<template v-slot:title> Color </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert>
			<template v-slot:icon>
				<tu-icon>verified_user</tu-icon>
			</template>
			<template v-slot:title> Icon </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert closable>
			<template v-slot:title> Closable </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert page>
			<template v-slot:title> Page </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
		<TuAlert square>
			<template v-slot:title> Square </template>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
			elementum rutrum auctor. Phasellus convallis sagittis augue, a
			consequat libero efficitur ac.
		</TuAlert>
	</div>
</template>

<script setup lang="ts">
import TuAlert from "../components/tuAlert";

// This component doesn't need any reactive state
</script>
