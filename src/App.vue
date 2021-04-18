<template>
	<div>
		<h1 style="text-align:center">
			Vuesax3 (Typescript + composition API Demo) - TheCelebrimbor - Github
		</h1>
		<div class="showcase-component">
			<h3>Buttons:</h3>
			<hr />
			<vs-button type="filled" color="primary" style="margin-right: 10px">
				Simple Button
			</vs-button>
			<vs-button
				type="filled"
				color="primary"
				style="margin-right: 10px"
				size="small"
			>
				Small
			</vs-button>
			<vs-button
				type="filled"
				color="primary"
				style="margin-right: 10px"
				size="large"
			>
				Large
			</vs-button>
			<vs-button
				type="filled"
				color="primary"
				style="margin-right: 10px"
				size="xl"
			>
				Xtra Large
			</vs-button>
			<vs-button
				circle
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				<vs-icon>home </vs-icon>
			</vs-button>
			<vs-button
				square
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				Square Button
			</vs-button>
			<vs-button type="border" color="primary" style="margin-right: 10px">
				Border Only
			</vs-button>
			<vs-button type="flat" color="primary" style="margin-right: 10px">
				Flat
			</vs-button>
			<vs-button type="line" color="primary" style="margin-right: 10px">
				Line Type
			</vs-button>
			<vs-button type="gradient" color="primary" style="margin-right: 10px">
				Gradient
			</vs-button>
			<vs-button type="relief" color="primary" style="margin-right: 10px">
				Relief
			</vs-button>
			<vs-button
				:loading="loading"
				@click="justLoad()"
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				Loading
			</vs-button>
			<vs-button upload type="border" color="danger" style="margin-right: 10px">
				Upload
			</vs-button>
			<vs-button
				upload
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				Upload
			</vs-button>
			<vs-button type="filled" color="primary" style="margin-right: 10px">
				Animate
				<template v-slot:animate>
					<vs-icon>home </vs-icon>
				</template>
			</vs-button>
			<br />
		</div>
		<div class="showcase-component">
			<h3>Button Groups:</h3>
			<hr />
			<vs-button-group>
				<vs-button>
					One
				</vs-button>
				<vs-button>
					Two
				</vs-button>
				<vs-button>
					Three
				</vs-button>
				<vs-button>
					four
				</vs-button>
			</vs-button-group>
			<br/>
			<vs-button-group>
				<vs-button type="border"> 		
					<vs-icon >edit</vs-icon>		
				</vs-button>
				<vs-button type="border">
					<vs-icon >format_color_text</vs-icon>						
				</vs-button>
				<vs-button type="border" >
					<vs-icon >format_align_center</vs-icon>		
				</vs-button>
				<vs-button type="border">
					<vs-icon >format_size</vs-icon>		
				</vs-button>
			</vs-button-group>
		</div>
		<div class="showcase-component">
			<h3>Alerts:</h3>
			<hr />
			<vs-alert
				title="Lorem ipsum dolor sit amet"
				color="rgb(231, 154, 23)"
				active="true"
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat
			</vs-alert>
			<div class="centerx">
				<vs-button @click="active1 = !active1" color="primary" type="filled">{{
					!active1 ? "Open Alert" : "Close Alert"
				}}</vs-button>
				<vs-alert v-model:active="active1" closable close-icon="close">
					Lorem ip sum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat
				</vs-alert>
			</div>
		</div>
		<div class="showcase-component">
			<h3>Avatar:</h3>
			<hr />
			<vs-avatar text="Celebrimbor" />
			<vs-avatar
				src="https://avatars.githubusercontent.com/u/13927773?v=4"
				size="large"
				text="Celebrimbor"
			/>
		</div>
		<div class="showcase-component">
			<h3>Breadcrumbs:</h3>
			<hr />
			<vs-breadcrumb
				:items="[
					{
						title: 'Dashboard',
						url: 'dashboard',
					},
					{
						title: 'Link 1',
						url: 'link-1',
					},
					{
						title: 'Link 2',
						disabled: true,
					},
					{
						title: 'Active',
						active: true,
					},
				]"
			></vs-breadcrumb>

			<vs-breadcrumb>
				<li>
					<a href="#" title="Home">Home</a
					><span class="vs-breadcrum--separator">/</span>
				</li>
				<li>
					<a href="#" title="Profil">Profil</a
					><span class="vs-breadcrum--separator">/</span>
				</li>
				<li aria-current="page" class="active">Infos</li>
			</vs-breadcrumb>
		</div>
		<div class="showcase-component">
			<h3>Cards:</h3>
			<hr />
			<vs-row vs-justify="center">
				<vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
					<vs-card>
						<template v-slot:header>
							<h3>
								Hello world !
							</h3>
						</template>
						<div>
							<span
								>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
								nisi ut aliquip ex ea commodo consequat.</span
							>
						</div>
						<template v-slot:footer>
							<vs-row vs-justify="flex-end">
								<vs-button
									type="gradient"
									color="danger"
									icon="favorite"
									style="margin:3px"
								></vs-button>
								<vs-button
									color="primary"
									icon="turned_in_not"
									style="margin:3px"
								></vs-button>
								<vs-button
									color="rgb(230,230,230)"
									color-text="rgb(50,50,50)"
									icon="settings"
									style="margin:3px"
								></vs-button>
							</vs-row>
						</template>
					</vs-card>
				</vs-col>
			</vs-row>
		</div>
		<div class="showcase-component">
			<h3>CheckBoxes:</h3>
			<hr />
			<vs-checkbox v-model:value="checkBox1">{{ checkBox1 }}</vs-checkbox>
			<div class="">
				<ul class="centerx">
					<li class="modelx">
						{{ checkBox2 }}
					</li>
					<li>
						<vs-checkbox v-model:value="checkBox2" vs-value="luis"
							>Luis</vs-checkbox
						>
					</li>
					<li>
						<vs-checkbox v-model:value="checkBox2" vs-value="carols"
							>Carols</vs-checkbox
						>
					</li>
					<li>
						<vs-checkbox v-model:value="checkBox2" vs-value="summer"
							>Summer</vs-checkbox
						>
					</li>
					<li>
						<vs-checkbox v-model:value="checkBox2" vs-value="lyon"
							>Lyon</vs-checkbox
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="showcase-component">
			<h3>Chips:</h3>
			<hr />
			<div class="centerx">
				<vs-chip>
					<vs-avatar />
					Icon Default
				</vs-chip>
				<vs-chip color="primary">
					<vs-avatar icon="send" />
					Icon send
				</vs-chip>
				<vs-chip color="success">
					<vs-avatar icon="markunread" />
					Icon markunread
				</vs-chip>
				<vs-chip color="danger">
					<vs-avatar icon="link" />
					Icon link_off
				</vs-chip>
				<vs-chip color="warning">
					<vs-avatar icon="battery_alert" />
					Icon battery_alert
				</vs-chip>
				<vs-chip color="dark">
					<vs-avatar icon="edit" />
					Icon edit
				</vs-chip>
			</div>
		</div>
		<div class="showcase-component" style="margin-top:100px">
			<h3>Collapse:</h3>
			<hr />
			<vs-collapse accordion type="border">
				<vs-collapse-item>
					<template v-slot:header>
						Collapse item
					</template>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
					rhoncus eros tortor, non fringilla lectus cursus et. Fusce vel nisi
					ante. Aliquam sit amet lectus pharetra, luctus mi sed, aliquet felis.
					Mauris a tortor viverra, ornare tellus in, consectetur leo.
					<br /><br />
					Etiam nec nunc nec nisl luctus tincidunt efficitur vitae elit.
					Vestibulum iaculis nibh commodo neque ultrices lobortis. Cras magna
					massa, pretium vitae mattis varius, pharetra nec massa. Aliquam ac ex
					enim. Quisque consequat dui libero, vel blandit lorem porttitor sit
					amet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
					posuere cubilia Curae; Nullam sed lobortis nisl, quis eleifend metus.
				</vs-collapse-item>
				<vs-collapse-item>
					<template v-slot:header>
						Collapse item 2
					</template>
					Nunc auctor et leo vitae suscipit. Nullam aliquet purus scelerisque
					enim hendrerit tristique. Maecenas tincidunt dui arcu, a aliquet nisl
					venenatis vitae. Praesent mauris ligula, porta at maximus ac, rutrum
					vitae sapien. Donec a sapien id erat dapibus dignissim sodales in est.
					Donec gravida dapibus sapien at sollicitudin. Maecenas iaculis quam
					ex,
					<br /><br />
					eu aliquam erat sagittis eget. Suspendisse mollis felis nec ipsum
					vehicula, at posuere libero viverra. Nam hendrerit dapibus eleifend.
					Aliquam elit nulla, tincidunt pellentesque enim mollis, consectetur
					placerat enim. Integer condimentum tristique ante et ullamcorper.
					Mauris placerat pretium ex. Nam aliquam sed tortor sit amet
					<br /><br />
					efficitur. Mauris quis faucibus nulla. Pellentesque egestas non ipsum
					vel maximus.
				</vs-collapse-item>
				<vs-collapse-item>
					<template v-slot:header>
						Collapse item 3
					</template>
					Suspendisse aliquet condimentum diam, sed aliquam nisl dapibus et.
					Aliquam euismod ullamcorper dolor eu
				</vs-collapse-item>
				<vs-collapse-item>
					<template v-slot:header>
						Collapse item 4
					</template>
					Suspendisse aliquet condimentum diam, sed aliquam nisl dapibus et.
					Aliquam euismod ullamcorper dolor eu imperdiet. Nullam eget odio at
					magna gravida suscipit sed vestibulum odio. Maecenas porta elit vel
					lectus molestie, eget aliquam enim feugiat. Vivamus nec faucibus nisl.
					Nunc venenatis tempus finibus.
				</vs-collapse-item>
			</vs-collapse>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import * as components from "./components";

export default defineComponent({
	components: {
		...components,
	},
	setup(props, context) {
		let active1 = ref(true);
		let checkBox1 = ref(false);
		let checkBox2 = ref(["luis"]);
		let loading = ref(false);

		let justLoad = function() {
			loading.value = !loading.value;
			setTimeout(() => {
				loading.value = !loading.value;
			}, 5000);
		};

		return {
			active1,
			checkBox1,
			checkBox2,
			justLoad,
			loading,
		};
	},
});
</script>

<style>
.showcase-component {
	margin-bottom: 15px;
	margin-left: 30px;
	margin-top: 30px;
}

body {
	background-color: white;
}
</style>
