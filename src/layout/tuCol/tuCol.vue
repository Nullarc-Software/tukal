<template>
  <div
	class="tu-col"

	:style="{
			order: order,
			display: type,
			justifyContent: justify
		}"
	:class="[
		`tu-col--w-${w}`,
		`tu-col--offset-${offset}`,
		`tu-col--lg-${lg}`,
		`tu-col--sm-${sm}`,
		`tu-col--xs-${xs}`,
	  ]">
	<slot/>
  </div>
</template>

<script setup lang="ts">
interface Props {
	w?: string | number;
	offset?: string | number;
	order?: number;
	lg?: string | number;
	sm?: string | number;
	xs?: string | number;
	type?: string;
	justify?: string;
}

withDefaults(defineProps<Props>(), {
	w: "12",
	offset: "0",
	order: 0,
	lg: "0",
	sm: "0",
	xs: "0",
	type: "block",
	justify: "flex-start"
});
</script>

<style lang="scss">

$sizes: (1: 8.33%, 2: 16.66%, 3: 25%, 4: 33.33%, 5: 41.66%, 6: 50%, 7: 58.33%, 8: 66.66%, 9: 75%, 10: 83.33%, 11: 91.66%, 12: 100%);


.tu-col {
  width: 100%;
  position: relative;

  @each $num, $size in $sizes {
	&--w-#{$num} {
	  width: $size;
	}
  }

  @each $num, $size in $sizes {
	&--offset-#{$num} {
	  margin-left: $size;
	}
  }

  // responsive
  @each $num, $size in $sizes {
	&--lg-#{$num} {
	  width: $size;
	}
  }

  @media (max-width: 900px) {
	@each $num, $size in $sizes {
	  &--sm-#{$num} {
		width: $size;
	  }
	}
  }

  @media (max-width: 600px) {
	@each $num, $size in $sizes {
	  &--xs-#{$num} {
		width: $size;
	  }
	}
  }
}
</style>
