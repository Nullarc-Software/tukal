<template>
	<div class="con-content">
		<div>
			<tu-avatar>
				<img :src="`/avatars/avatar.png`" alt="" />
			</tu-avatar>
			<p>
				{{ name }}
			</p>
		</div>
		<div>
			<tu-button flat icon>
				<i class="bx bx-lock-open-alt"></i>
			</tu-button>
			<tu-button flat icon> Send Email </tu-button>
			<tu-button border danger> Remove User </tu-button>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	name?: string;
}

withDefaults(defineProps<Props>(), {
	name: "test"
});

defineOptions({
	name: "TestComponent"
});
</script>

<style lang="scss" scoped>

.con-content {
	display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>
