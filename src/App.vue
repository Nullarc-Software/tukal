<!-- eslint-disable unused-imports/no-unused-vars -->
<template>
	<div style="position: relative">
		<h1 class="text-color" style="text-align: cente; margin-top: 50px">
			Vuesax3 (Typescript + composition API Demo) - TheCelebrimbor -
			Github
		</h1>
		<tu-switch v-model="darkModeActive" dark> Dark Mode </tu-switch>
		<div class="showcase-component">
			<h3>Buttons:</h3>
			<hr />
			<tu-button success @click="justLoad"> Open Notification </tu-button>
			<div style="width: 200px; height: 200px; position: relative" ref="loadingDiv" />
			<tu-button success @click="justShowLoading">
				Open Loading
			</tu-button>
			<tu-button type="filled" color="danger" textColor="#000" style="margin-right: 10px">
				Simple Button
			</tu-button>
			<tu-button type="filled" color="primary" style="margin-right: 10px" size="small">
				Small
			</tu-button>
			<tu-button type="filled" color="primary" style="margin-right: 10px" size="large">
				Large
			</tu-button>
			<tu-button type="filled" color="primary" style="margin-right: 10px" size="xl">
				Xtra Large
			</tu-button>
			<tu-button circle type="filled" color="primary" style="margin-right: 10px">
				<tu-icon>home </tu-icon>
			</tu-button>
			<tu-button circle transparent style="margin-right: 10px">
				<tu-icon>home </tu-icon>
			</tu-button>
			<tu-button square type="filled" color="primary" style="margin-right: 10px">
				Square Button
			</tu-button>
			<tu-button border color="primary" style="margin-right: 10px">
				Border Only
			</tu-button>
			<tu-button flat color="primary" style="margin-right: 10px">
				Flat
			</tu-button>
			<tu-button flat color="danger" style="margin-right: 10px">
				Flat
			</tu-button>
			<tu-button gradient color="primary" style="margin-right: 10px">
				Gradient
			</tu-button>
			<tu-button relief color="primary" style="margin-right: 10px">
				Relief
			</tu-button>
			<tu-button :loading="loading" @click="loading = true" type="filled" color="primary" style="margin-right: 10px">
				Loading
			</tu-button>
			<tu-button upload type="border" color="danger" style="margin-right: 10px">
				Upload
			</tu-button>
			<tu-button upload type="border" color="#00FF00" style="margin-right: 10px">
				Upload
			</tu-button>
			<tu-button upload type="filled" color="primary" style="margin-right: 10px">
				Upload
			</tu-button>
			<tu-button type="filled" color="primary" style="margin-right: 10px">
				Animate
				<template v-slot:animate>
					<tu-icon>home </tu-icon>
				</template>
			</tu-button>
			<br />
		</div>
		<div class="showcase-component">
			<h3>Button Groups:</h3>
			<hr />
			<tu-button-group fixed-height="40px">
				<tu-button border color="primary"> One </tu-button>
				<tu-button border color="primary"> Two </tu-button>
				<tu-button border color="primary"> Three </tu-button>
				<tu-button border color="primary"> four </tu-button>
				<tu-button border color="primary"> five </tu-button>
			</tu-button-group>
			<br />
			<tu-button-group>
				<tu-button type="border">
					<tu-icon>edit</tu-icon>
				</tu-button>
				<tu-button type="border">
					<tu-icon>format_color_text</tu-icon>
				</tu-button>
				<tu-button type="border">
					<tu-icon>format_align_center</tu-icon>
				</tu-button>
				<tu-button type="border">
					<tu-icon>format_size</tu-icon>
				</tu-button>
			</tu-button-group>
			<br />
			<tu-button-group>
				<tu-button type="border">
					<tu-icon>edit</tu-icon>
				</tu-button>
				<div style="display: inline-block">aaabbb</div>
				<tu-button type="border">
					<tu-icon>format_align_center</tu-icon>
				</tu-button>
				<tu-button type="border">
					<tu-icon>format_size</tu-icon>
				</tu-button>
			</tu-button-group>
		</div>
		<div class="showcase-component">
			<h3>Alerts:</h3>
			<hr />
			<tu-alert title="Lorem ipsum dolor sit amet" color="rgb(231, 154, 23)" active="true">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat
			</tu-alert>
			<div class="centerx">
				<tu-button @click="active1 = !active1" color="primary" type="filled">
					{{ !active1 ? "Open Alert" : "Close Alert" }}
				</tu-button>
				<tu-alert v-model:active="active1" closable close-icon="close">
					Lorem ip sum dolor sit amet, consectetur adipisicing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat
				</tu-alert>
			</div>
		</div>
		<div class="showcase-component">
			<h3>Avatar:</h3>
			<hr />
			<tu-avatar text="Celebrimbor" />
			<tu-avatar size="large">
				<img src="https://avatars.githubusercontent.com/u/13927773?v=4" />
			</tu-avatar>
		</div>
		<div class="showcase-component">
			<h3>Breadcrumbs:</h3>
			<hr />
			<tu-breadcrumb :items="[
				{
					title: 'Dashboard',
					url: 'dashboard'
				},
				{
					title: 'Link 1',
					url: 'link-1'
				},
				{
					title: 'Link 2',
					disabled: true
				},
				{
					title: 'Active',
					active: true
				}
			]"></tu-breadcrumb>

			<tu-breadcrumb>
				<li>
					<a href="#" title="Home">Home</a><span class="tu-breadcrum--separator">/</span>
				</li>
				<li>
					<a href="#" title="Profil">Profil</a><span class="tu-breadcrum--separator">/</span>
				</li>
			</tu-breadcrumb>
		</div>
		<div class="showcase-component">
			<h3>Cards:</h3>
			<hr />
			<tu-card-group>
				<tu-card type="6">
					<template #title>
						<h3>Pot with a plant</h3>
					</template>
					<template #content>

					</template>
					<template #text>
						<div style="height: 300px;">
							<tu-history :events="histEvents" />
						</div>
					</template>
				</tu-card>
				<tu-card type="6">
					<template #title>
						<h3>Pot with a plant</h3>
					</template>
					<template #content>

					</template>
					<template #text>
						<div style="height: 300px;">
							<tu-history alternative :events="histEvents" />
						</div>
					</template>
				</tu-card>
			</tu-card-group>
			<tu-card-group>
				<tu-card type="2" v-for="card in 6" :key="card">
					<template #title>
						<h3>Pot with a plant</h3>
					</template>
					<template #content>
						<img src="https://th.bing.com/th/id/R00b6dcd72e6c6c971f848b5710a22b14?rik=GUdyoJYQFeNOvw&riu=http%3a%2f%2fbluefaqs.com%2fwp-content%2fuploads%2f2010%2f06%2fRandom-Images-Thumb.jpg&ehk=gjZ1zvnepp3KjV7sLM91JMR92J6tw3FWxn23GyDBcVI%3d&risl=&pid=ImgRaw"
							alt="" />
					</template>
					<template #text>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit.
						</p>
					</template>
					<template #interactions>
						<tu-button danger icon>
							<tu-icon>favorite</tu-icon>
						</tu-button>
						<tu-button class="btn-chat" shadow primary>
							<tu-icon>chat</tu-icon>
							<span class="span"> 54 </span>
						</tu-button>
					</template>
				</tu-card>
			</tu-card-group>
		</div>
		<div class="showcase-component">
			<h3>CheckBoxes:</h3>
			<hr />
			<tu-checkbox v-model="checkBox1">{{ checkBox1 }}</tu-checkbox>
			<tu-checkbox v-model="checkBox1">
				<template v-slot:icon>
					<tu-icon>settings</tu-icon>
				</template>
				{{ checkBox1 }}
			</tu-checkbox>
			<tu-checkbox v-model:checked="checkBox9" indeterminate>{{
				checkBox9
			}}</tu-checkbox>
			<div class="">
				<button @click="resetOpts">Reset</button>
				<ul class="centerx">
					<li class="modelx">
						{{ opts }}
					</li>
					<li>
						<tu-checkbox v-model="opts" val="luis">Luis</tu-checkbox>
					</li>
					<li>
						<tu-checkbox v-model="opts" val="carols">Carols</tu-checkbox>
					</li>
					<li>
						<tu-checkbox :disabled="true" v-model="opts" val="summer">Summer</tu-checkbox>
					</li>
					<li>
						<tu-checkbox v-model="opts" val="lyon">Lyon</tu-checkbox>
					</li>
				</ul>
			</div>
		</div>
	<!-- <div class="showcase-component">
				<h3>Chips:</h3>
				<hr />
				<div class="centerx">
					<tu-chip>
						<tu-avatar />
						Icon Default
					</tu-chip>
					<tu-chip color="primary">
						<tu-avatar icon="send" />
						Icon send
					</tu-chip>
					<tu-chip color="success">
						<tu-avatar icon="markunread" />
						Icon markunread
					</tu-chip>
					<tu-chip color="danger">
						<tu-avatar icon="link" />
						Icon link_off
					</tu-chip>
					<tu-chip color="warning">
						<tu-avatar icon="battery_alert" />
						Icon battery_alert
					</tu-chip>
					<tu-chip color="dark">
						<tu-avatar icon="edit" />
						Icon edit
					</tu-chip>
				</div>
													</div> -->
		<div class="showcase-component" style="margin-top: 100px">
			<h3>Collapse:</h3>
			<hr />
			<tu-collapse accordion type="border">
				<tu-collapse-item>
					<template v-slot:header> Collapse item </template>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Quisque rhoncus eros tortor, non fringilla lectus cursus et.
					Fusce vel nisi ante. Aliquam sit amet lectus pharetra,
					luctus mi sed, aliquet felis. Mauris a tortor viverra,
					ornare tellus in, consectetur leo.
					<br /><br />
					Etiam nec nunc nec nisl luctus tincidunt efficitur vitae
					elit. Vestibulum iaculis nibh commodo neque ultrices
					lobortis. Cras magna massa, pretium vitae mattis varius,
					pharetra nec massa. Aliquam ac ex enim. Quisque consequat
					dui libero, vel blandit lorem porttitor sit amet. Vestibulum
					ante ipsum primis in faucibus orci luctus et ultrices
					posuere cubilia Curae; Nullam sed lobortis nisl, quis
					eleifend metus.
				</tu-collapse-item>
				<tu-collapse-item>
					<template v-slot:header> Collapse item 2 </template>
					Nunc auctor et leo vitae suscipit. Nullam aliquet purus
					scelerisque enim hendrerit tristique. Maecenas tincidunt dui
					arcu, a aliquet nisl venenatis vitae. Praesent mauris
					ligula, porta at maximus ac, rutrum vitae sapien. Donec a
					sapien id erat dapibus dignissim sodales in est. Donec
					gravida dapibus sapien at sollicitudin. Maecenas iaculis
					quam ex,
					<br /><br />
					eu aliquam erat sagittis eget. Suspendisse mollis felis nec
					ipsum vehicula, at posuere libero viverra. Nam hendrerit
					dapibus eleifend. Aliquam elit nulla, tincidunt pellentesque
					enim mollis, consectetur placerat enim. Integer condimentum
					tristique ante et ullamcorper. Mauris placerat pretium ex.
					Nam aliquam sed tortor sit amet
					<br /><br />
					efficitur. Mauris quis faucibus nulla. Pellentesque egestas
					non ipsum vel maximus.
				</tu-collapse-item>
				<tu-collapse-item>
					<template v-slot:header> Collapse item 3 </template>
					Suspendisse aliquet condimentum diam, sed aliquam nisl
					dapibus et. Aliquam euismod ullamcorper dolor eu
				</tu-collapse-item>
				<tu-collapse-item>
					<template v-slot:header> Collapse item 4 </template>
					Suspendisse aliquet condimentum diam, sed aliquam nisl
					dapibus et. Aliquam euismod ullamcorper dolor eu imperdiet.
					Nullam eget odio at magna gravida suscipit sed vestibulum
					odio. Maecenas porta elit vel lectus molestie, eget aliquam
					enim feugiat. Vivamus nec faucibus nisl. Nunc venenatis
					tempus finibus.
				</tu-collapse-item>
			</tu-collapse>
		</div>
		<div class="showcase-component">
			<h3 :test="null">Dialog:</h3>
			<hr />
			<tu-button @click="activeDialog = !activeDialog">Open Dialog</tu-button>
			<tu-dialog width="550px" v-model="activeDialog">
				<template v-slot:header>
					<h4>Welcome to <b>Vuesax3</b></h4>
				</template>
				<tu-text-area />
				<div class="con-content">
					Vuesax3 is a relatively new framework with a refreshing
					design and in the latest trends, vuesax based on vuejs which
					means that we go hand in hand with one of the most popular
					javascript frameworks in the world and with a huge community
					with which you will have all the help and documentation to
					create and make your project

				</div>
				<tu-pagination not-margin flat v-model="page" :length="numPages" />

				<template v-slot:footer>
					<tu-button width="100px" style="margin: 5px" @click="activeDialog = false" block>
						Ok
					</tu-button>
					<tu-button type="flat" color="secondary" width="100px">
						Cancel
					</tu-button>
				</template>
			</tu-dialog>
			<tu-button @click="activeDialog1 = !activeDialog1">Open Dialog</tu-button>
			<tu-dialog square scroll prevent-close width="550px" v-model="activeDialog1">
				<template v-slot:header>
					<h4>Welcome to <b>Vuesax3</b></h4>
					<tu-divider color="rgba(0,0,0,0.5)" />
				</template>
				<tu-text-area />
				<div class="con-content">
					<p>
						Vuesax3 is a relatively new framework with a refreshing
						design and in the latest trends, vuesax based on vuejs
						which means that we go hand in hand with one of the most
						popular javascript frameworks in the world and with a
						huge community with which you will have all the help and
						documentation to create and make your project
					</p>
				</div>
				<tu-pagination not-margin flat v-model="page" :length="numPages" />


				<template v-slot:footer>
					<tu-button width="100px" style="margin: 5px" @click="activeDialog1 = false">
						Ok
					</tu-button>
					<tu-button type="flat" color="secondary" width="100px">
						Cancel
					</tu-button>
				</template>
			</tu-dialog>
		</div>
		<div class="showcase-component">
			<h3>Input:</h3>
			<hr />
			<tu-input block id="inp1" v-model="inpValue" placeholder="Name" style="margin-top: 10px" maxlength="15" />
			<br />
			<tu-input label="Full Name" v-model:value="inpValue" placeholder="Evan You" />
			<br />
			<tu-input label-placeholder="Country" />
			<tu-input editable-static v-model="editStatic" />
			<br />
			<tu-input placeholder="User name">
				<template #icon>
					<tu-icon>person</tu-icon>
				</template>
			</tu-input>

			<tu-input type="password" icon-after placeholder="Password">
				<template #icon>
					<tu-icon>person</tu-icon>
				</template>
			</tu-input>

			<br />
			<br />
			<tu-input v-model:value="inpValue" label="Example Regex Validation" placeholder="vuesax@gmail.com">
				<template v-if="validEmail" #message-success>
					Email Valid
				</template>
				<template v-if="!validEmail && inpValue !== ''" #message-danger>
					Email Invalid
				</template>
			</tu-input>
			<br />
			<tu-input loading placeholder="Name" />
			<div style="margin: 10px">
				<tu-input type="text" label="Text" />
				<tu-input type="password" label="Password" />
				<tu-input type="search" label="Search" />
				<tu-input type="number" label="Number" />
				<tu-input type="url" label="Url" />
				<tu-input type="time" label="time" />
				<tu-input width="300px" type="date" label="Date" />
			</div>
			<div style="margin: 10px">
				<tu-input primary state="primary" placeholder="Primary" />

				<tu-input state="success" success placeholder="Success Icon">
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input state="danger" danger icon-after placeholder="Danger icon after">
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input warn state="warn" placeholder="Label Warn" label="Warn" />

				<tu-input dark state="dark" label-placeholder="Dark" />

				<tu-input border placeholder="Name" color="danger" />

				<tu-input color="#7d33ff" border type="password" placeholder="Password">
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input border warn type="email" icon-after label-placeholder="Address">
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>
			</div>
		</div>
		<div class="showcase-component">
			<h4>Radio:</h4>
			<hr />

			<tu-radio v-model="picked" val="1">
				<template #icon>
					<tu-icon>person</tu-icon>
				</template>
				Option A
			</tu-radio>
			<tu-radio v-model="picked" val="2"> Option B </tu-radio>
			<tu-radio disabled v-model="picked" val="3"> Option C </tu-radio>
			<tu-radio v-model="picked" val="4"> Option D </tu-radio>
		</div>
		<div class="showcase-component">
			<h4>Select:</h4>
			<hr />
			<tu-select block multiple label-placeholder="Label-placeholder" v-model="selectValue" filter>
				<tu-select-option label="Test" value="1">
					Test
				</tu-select-option>
				<tu-select-option label="Test1" value="2">
					Test1
				</tu-select-option>
				<tu-select-option label="Javascript" value="3">
					Javascript
				</tu-select-option>
				<tu-select-option disabled label="Sass" value="4">
					Sass
				</tu-select-option>
				<tu-select-option label="Typescript" value="5">
					Typescript
				</tu-select-option>
				<tu-select-option label="Webpack" value="6">
					Webpack
				</tu-select-option>
				<tu-select-option label="Nodejs" value="7">
					Nodejs
				</tu-select-option>
			</tu-select>

			<tu-select width="550px" placeholder="" v-model="selectValue1" filter>
				<tu-select-option label="Test" value="1">
					Test
				</tu-select-option>
				<tu-select-option label="Test1" value="2">
					Test1
				</tu-select-option>
				<tu-select-option label="Javascript" value="3">
					Javascript
				</tu-select-option>
				<tu-select-option disabled label="Sass" value="4">
					Sass
				</tu-select-option>
				<tu-select-option label="Typescript" value="5">
					Typescript
				</tu-select-option>
				<tu-select-option label="Webpack" value="6">
					Webpack
				</tu-select-option>
				<tu-select-option label="Nodejs" value="7">
					Nodejs
				</tu-select-option>
			</tu-select>

			<tu-select inline label-placeholder="Label-placeholder" v-model="selectValue">
				<tu-select-option label="Test" value="1">
					Test
				</tu-select-option>
				<tu-select-option label="Test1" value="2">
					Test1
				</tu-select-option>
				<tu-select-option label="Javascript" value="3">
					Javascript
				</tu-select-option>
				<tu-select-option disabled label="Sass" value="4">
					Sass
				</tu-select-option>
				<tu-select-option label="Typescript" value="5">
					Typescript
				</tu-select-option>
				<tu-select-option label="Webpack" value="6">
					Webpack
				</tu-select-option>
				<tu-select-option label="Nodejs" value="7">
					Nodejs
				</tu-select-option>
			</tu-select>

			<tu-select inline dropdown placeholder="Dropdown" v-model="selectValue2" style="margin: 10px">
				<tu-select-option label="Test" value="1">
					Test
				</tu-select-option>
				<tu-select-option label="Test1" value="2">
					Test1
				</tu-select-option>
				<tu-select-option label="Javascript" value="3">
					Javascript <tu-icon>home</tu-icon>
				</tu-select-option>
				<tu-select-option disabled label="Sass" value="4">
					Sass
				</tu-select-option>
				<tu-select-option label="Typescript" value="5">
					Typescript
				</tu-select-option>
				<tu-select-option label="Webpack" value="6">
					Webpack
				</tu-select-option>
				<tu-select-option label="Nodejs" value="7">
					Nodejs
				</tu-select-option>
			</tu-select>
			<tu-select inline label="Group" placeholder="Group">
				<tu-select-option-group>
					<template v-slot:title> Vuejs </template>
					<tu-select-option label="Vuesax" value="1">
						Vuesax
					</tu-select-option>
					<tu-select-option label="Vue" value="2">
						Vue
					</tu-select-option>
					<tu-select-option label="Javascript" value="3">
						Javascript
					</tu-select-option>
				</tu-select-option-group>
				<tu-select-option-group>
					<template v-slot:title> Others </template>
					<tu-select-option label="Sass" value="4">
						Sass
					</tu-select-option>
					<tu-select-option label="Typescript" value="5">
						Typescript
					</tu-select-option>
					<tu-select-option label="Webpack" value="6">
						Webpack
					</tu-select-option>
					<tu-select-option label="Nodejs" value="7">
						Nodejs
					</tu-select-option>
				</tu-select-option-group>
			</tu-select>

			<tu-select inline v-for="(color, i) in colors" :key="i" :state="color.color" :label="color.color"
				placeholder="Select" v-model="color.value">
				<tu-select-option value="1"> Vuesax </tu-select-option>
				<tu-select-option label="Vue" value="2"> Vue </tu-select-option>
				<tu-select-option label="Javascript" value="3">
					Javascript
				</tu-select-option>
				<tu-select-option label="Sass" value="4">
					Sass
				</tu-select-option>
				<tu-select-option label="Typescript" value="5">
					Typescript
				</tu-select-option>
				<tu-select-option label="Webpack" value="6">
					Webpack
				</tu-select-option>
				<tu-select-option label="Nodejs" value="7">
					Nodejs
				</tu-select-option>
			</tu-select>
		</div>
		<div class="showcase-component">
			<h4>Dropdown:</h4>
			<hr />
			aaa
			<tu-popper arrow>
				<tu-button>click me</tu-button>
				<template #content>
					<tu-popup-menu>
						<tu-popup-item :loading="true" loadingType="scale"> Test </tu-popup-item>
						<tu-popup-item> Test 1 </tu-popup-item>
						<tu-popup-item divider> Test 2 </tu-popup-item>
					</tu-popup-menu>
				</template>
			</tu-popper>
		</div>
		<div class="showcase-component">
			<h4>Sidebar:</h4>
			<hr />
			<tu-button @click="isOpen = !isOpen"> Toggle Sidebar </tu-button>
			<tu-sidebar reduce v-model:value="sideBar" :open="isOpen">
				<template #logo>
					<img src="https://vuesax.com/logos/logo-vuesax-logotipo-vuesax-png-3.png" alt="" />
				</template>
				<template #header> Endpoint Nexus </template>
				<tu-sidebar-item id="home">
					<template v-slot:icon>
						<tu-icon>person</tu-icon>
					</template>
					Home
				</tu-sidebar-item>
				<tu-sidebar-item id="market">
					<template #icon>
						<tu-icon>view_module</tu-icon>
					</template>
					Market Overview
				</tu-sidebar-item>
				<tu-sidebar-item id="Music">
					<template #icon>
						<tu-icon>music_note</tu-icon>
					</template>
					Music
				</tu-sidebar-item>
				<tu-sidebar-group>
					<template #header>
						<tu-sidebar-item arrow>
							<template #icon>
								<tu-icon>music_note</tu-icon>
							</template>
							Social media
						</tu-sidebar-item>
					</template>

					<tu-sidebar-item id="Instagram">
						<template #icon>
							<tu-icon>music_note</tu-icon>
						</template>
						Instagram
					</tu-sidebar-item>
					<tu-sidebar-item id="twitter">
						<template #icon>
							<tu-icon>music_note</tu-icon>
						</template>
						Twitter
					</tu-sidebar-item>
					<tu-sidebar-item id="Facebook">
						<template #icon>
							<tu-icon>facebook</tu-icon>
						</template>
						Facebook
					</tu-sidebar-item>
				</tu-sidebar-group>
				<template #footer>
					<tu-row justify="space-between">
						<tu-avatar badge-color="danger" badge-position="top-right">
							<i class="bx bx-bell"></i>

							<template #badge> 28 </template>
						</tu-avatar>

						<tu-avatar>
							<img src="/avatars/avatar-5.png" alt="" />
						</tu-avatar>
					</tu-row>
				</template>
			</tu-sidebar>
		</div>
		<div class="showcase-component">
			<h4>Switch:</h4>
			<hr />
			<tu-switch> Subscribe </tu-switch>
			<tu-switch>
				<template #off> Off </template>
				<template #on> On </template>
			</tu-switch>
			<tu-switch>
				<template #off> default </template>
				<template #on> Premium </template>
			</tu-switch>
		</div>

		<div class="showcase-component">
			<h4>Navbar:</h4>
			<hr />
			<tu-navbar left-aligned fixed :open="openNav" v-model:value="navValue">
				<template #left>
					<img src="https://vuesax.com/logos/logo-vuesax-logotipo-vuesax-png-3.png" alt="" />
				</template>
				<tu-navbar-item :active="navValue == 'Github'" id="Github">
					Github
				</tu-navbar-item>
				<tu-navbar-item :active="navValue == 'Discord'" id="Discord">
					Discord
				</tu-navbar-item>
				<tu-navbar-item :active="navValue == 'Twitter'" id="Twitter">
					Twitter
				</tu-navbar-item>
				<tu-navbar-item :active="navValue == 'Medium'" id="Medium">
					Medium
				</tu-navbar-item>
			</tu-navbar>
			<tu-button @click="openNav = !openNav"> Toggle Navbar </tu-button>
		</div>

		<div class="showcase-component">
			<h4>Pagination:</h4>
			<hr />

		<!-- <tu-pagination progress not-margin v-model="page" :length="20" />
				<tu-pagination
					progress
					dark
					flat
					not-margin
					v-model="page"
					:length="20"
														/> -->
		</div>

		<tu-button @click="enableTabs = !enableTabs">Click Enable Tabs</tu-button>
		<div class="showcase-component" v-if="enableTabs">
			<h4>Tabs:</h4>
			<hr />
			<tu-tabs name="tabs1" type="router" position="top" noTransitions v-model="tabName"
				:router-mode-params="routerTabParams" />
			<tu-tabs name="tabs1" type="router" position="top" pills noTransitions v-model="tabName"
				:router-mode-params="routerTabParams" />
		<!-- <tu-tabs position="top" noTransitions tabStyle="progress" progressWidth="20" v-model="tabName">
				<tu-tab label="Home" name="ho"> Home </tu-tab>
				<tu-tab label="Service" name="se"> Service </tu-tab>
				<tu-tab label="login" name="lo"> Login </tu-tab>
				<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
									</tu-tabs> -->
			<!-- <tu-tabs name="tabs2" position="top" :button="true" noTransitions v-model="tabName" /> -->
			<tu-tabs position="left" pills noTransitions v-model="tabName" fixed-height="400px">
				<tu-tab label="Home" name="ho">
					<tu-calendar model="local" :items="items" :categories="Categories" @onClickDay="onClick" />
					<tu-table row-expand multi-select striped size="" persistent-id="twne" :draggable="true"
						v-model="selected" v-bind="srvTableConfig" v-model:numPages="numPages" :page="page" :pageSize="5"
						:columnSelector="true" @onRowClicked="rowClicked" @onTableBeginLoad="beginLoad"
						@onTableEndLoad="afterLoad" @onTableConfigUpdated="configUpdate">
					<!-- <template #thead>
						<tu-th field="country" sort search> Country </tu-th>
						<tu-th field="name" sort search :index="1" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="2" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="3" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="4" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="5" width="500px"> Name </tu-th>
						<tu-th field="web_pages" sort search> Web site </tu-th>
						<tu-th field="something" sort search> No value </tu-th>
																	</template> -->
						<template #footer>
							<tu-pagination not-margin flat v-model="page" :length="numPages" />
						</template>
					</tu-table>

				</tu-tab>
				<tu-tab label="Service" name="se"> Service </tu-tab>
				<tu-tab label="login" name="lo"> Login </tu-tab>
				<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
			</tu-tabs>
			<tu-tabs position="left" fixed-width="600px" noTransitions v-model="tabName">
				<tu-tab label="Home" name="ho"> Home </tu-tab>
				<tu-tab label="Service" name="se"> Service </tu-tab>
				<tu-tab label="login" name="lo"> Login </tu-tab>
				<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
			</tu-tabs>
		<!-- <tu-tabs position="right" noTransitions v-model="tabName">
					<tu-tab label="Home" name="ho"> Home </tu-tab>
					<tu-tab label="Service" name="se"> Service </tu-tab>
					<tu-tab label="login" name="lo"> Login </tu-tab>
					<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
														</tu-tabs> -->
		</div>
		<div class="showcase-component">
			<h4>Progress:</h4>
			<hr />

			<tu-progress :percent="100" color="primary">primary</tu-progress>
			<tu-progress :percent="90" color="warn">warning</tu-progress>
			<tu-progress :percent="75" color="danger">danger</tu-progress>
			<tu-progress :percent="60" color="success">success</tu-progress>
			<tu-progress :percent="45" color="dark">dark</tu-progress>
			<tu-progress :percent="30" color="rgb(164, 69, 15)">RGB</tu-progress>
			<tu-progress :percent="15" color="#24c1a0">HEX</tu-progress>
			<tu-progress :height="12" indeterminate color="#24c1a0">HEX</tu-progress>
		</div>
		<div class="showcase-component">
			<h4>Text Area:</h4>
			<hr />
			<tu-textarea width="400px" />
			<tu-textarea width="300px" />
			<tu-textarea label="Label in Textarea" height="100px" />
			<tu-textarea counter="20" label="Label in Textarea" height="100px" />
		</div>
		<div class="showcase-component">
			<h2>Color-picker</h2>
			<tu-color-picker> </tu-color-picker>
		</div>
		<div class="showcase-component">
			<h2>Rich Text editor</h2>
			<tu-rich-text-editor standard width="500px" height="200px" />
		</div>
		<div class="showcase-component">
			<h4>Table:</h4>
			<hr />
			<button @click="exportTable">Export</button>
			<button @click="exportTableToPDF">Export to pdf</button>
			{{ selected }}
			<div style="height: 400px">

				<tu-table row-expand multi-select striped size="" persistent-id="twne" :draggable="true" v-model="selected"
					v-bind="srvTableConfig" v-model:numPages="numPages" :page="page" :pageSize="5" :columnSelector="true"
					@onRowClicked="rowClicked" @onTableBeginLoad="beginLoad" @onTableEndLoad="afterLoad"
					@onTableConfigUpdated="configUpdate">
				<!-- <template #thead>
						<tu-th field="country" sort search> Country </tu-th>
						<tu-th field="name" sort search :index="1" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="2" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="3" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="4" width="500px"> Name </tu-th>
						<tu-th field="name" sort search :index="5" width="500px"> Name </tu-th>
						<tu-th field="web_pages" sort search> Web site </tu-th>
						<tu-th field="something" sort search> No value </tu-th>
															</template> -->
					<template #footer>
						<tu-pagination not-margin flat v-model="page" :length="numPages" />
					</template>
				</tu-table>
			</div>

		</div>
		<div class="showcase-component"></div>

		<div class="showcase-component">
			<h4>Upload Component:</h4>
			<hr />
			<!-- <tu-upload singleUpload :limit="1" /> -->

			<div class="showcase-component">
				<h4>Calendar:</h4>
				<tu-calendar model="local" :items="items" :categories="Categories" @onClickDay="onClick" />
			</div>
			<div class="showcase-component">
				<h4>Tags:</h4>
				<tu-tag name="Location" value="Far East" />
				<tu-tag name="Location" value="Far East" />
				<tu-tag name="Location" value="Far East" />
				<tu-tag name="Location" value="Far East" />
			</div>
			<div class="showcase-component">
				<h4>Treeview Component:</h4>
				<hr />
				<tu-tree-view :checkNode="true" :removeNode="true" :addNode="true" :editNode="true" :filterNode="true"
					model="local" :expandAll="true" :collapseAll="true" v-model="nodes" v-model:checkedNodes="checkedNodes"
					:nodes="treeDisplayData">
					<template v-slot:icon>
						<tu-icon>file_copy</tu-icon>
					</template>
				</tu-tree-view>
			</div>
		<!-- <div class="showcase-component">

				<h4>History Component:</h4>
				<hr />
				<div style="height: 500px;">
					<tu-history center :events="histEvents" />
				</div>

				<h4>Cron Component:</h4>
				<hr />
				<tu-cron v-model="cronValue" />
				<span>{{ cronValue }}</span>

				</div> -->
			<div class="showcase-component">
				<h4>Kanban Board Component:</h4>
				<hr />
				<tu-kanban :items="kanbanItems" :fields="kanbanCategories" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
/* eslint no-unused-vars: "off" */

import {
	computed,
	defineComponent,
	provide,
	ref,
	watch,
	shallowRef,
	markRaw
} from "vue";
import * as components from "./components";
import { TuNotificationAttributes, TuNotification } from "./components/tuNotifications";
import {
	TuLoading as LoadingConstructor,
	TuLoadingAttributes
} from "./components/tuLoading";
import { ExportData } from "./components/tuTable";
import testComponent from "./components/TestComponent.vue";
import "material-icons/iconfont/material-icons.css";
import axios from "axios";
import { TuHeaderDefn, TuTableContextMenuEntry } from "./components";
import tuTableContextMenuVue from "./components/tuTable/tuTableContextMenu.vue";
import { TuTabsChildData, TuTabsRouterParams } from "./components/tuTabs";
import { useRouter } from "vue-router";
// import { TuTreeViewItemDefn } from "./components/tuTreeView";
export default defineComponent({
	components: {
		...components
	},
	data: () => ({
		colors: [
			{
				color: "primary",
				value: "1"
			},
			{
				color: "danger",
				value: "1"
			},
			{
				color: "success",
				value: "2"
			},
			{
				color: "warn",
				value: "3"
			},
			{
				color: "dark",
				value: "4"
			}
		]
	}),
	setup(props, context) {
		const active1 = ref(true);
		const checkBox1 = ref(false);
		const checkBox9 = ref(false);
		const checkBox2 = ref(["luis"]);
		const loading = ref(false);
		const sideBar = ref("home");
		const darkModeActive = ref(false);
		const activeDialog = ref(false);
		const activeDialog1 = ref(false);
		const activeDialog2 = ref(false);
		const notifShow = ref(false);
		const isOpen = ref(false);
		const openNav = ref(false);
		const opts: any = ref(["luis"]);
		const inpValue = ref("");
		const navValue = ref("guide");
		const selectValue = ref([]);
		const selectValue2 = ref("1");
		const selectValue1 = ref("");
		const page = ref(1);
		const kanbanItems = [
			{
				id: 1,
				name: "VS Code",
				fieldname: "Productive",
				icon: "home"
			},
			{
				id: 2,
				name: "Facebook",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAADx8fGxsbH39/e+vr6KioopKSkoKCj7+/vg4OBAQECNjY0JCQkNDQ1aWlpfX19LS0tGRkbp6enQ0NCDg4OhoaEjIyPb29urq6vm5uaamprDw8MwMDBubm4dHR02NjaVlZVUVFR3d3dmZmYVFRV4y9GXAAAC9klEQVR4nO3dC3LaMBRGYTAmwUB4Q3iEJqFk/1tshnZSaKfgK1+k3+45C2D0zYAsGyFarbQVeb+7GU6mg/3rqP3V00WjU7P3IvFY7WWL3bfXdvl689QjNtVfTUe3UZcdUw+6fPPVm1V3Kks98JItxkG8z15SD71MRWcW6mu3u6lHX6LuY7ivDsL+tIpPX5gvq/nkhet9VaC4cFXZpy3MJw5AZWE28AAKC+fPLkBdYd/Hpyt0A6oKs17ThT6TjLDw6AfUFO4cgZLCtSdQUhh2L18jYeW7CXWh73tUUXhouvDFGagn9J1mBIUdb6Cc0G89Kip0/xTKCYOfbNdFuPUHigkfGi90v1SoCb0XbHrC98YLHZ9daArvMZNqCf1XbGpC51vfX61Ts85yeoz/R3lq1ll3Aa5Sq85a3AM4TK06L3yieR4cjsuHvxtu+qlRF4VNNOPOQumTdrWQO6el0kx5s4Bldy32O31VmC8WH9vUY7ZlX7MprVbKZL51mqQesTWzsF4fwlbABT/1gM1Zhd9TD9icVbhLPWBzXaOwbjOpfVmqteQsk1VYlx3qv0OIUD+ECPVDiFA/hAj1Q4hQP4QI9UOIUD+EdRDm2ZXyjVG4vfZqP4t8OM38+GE0VO4t6ncbfj97tXSIKKxwOkmV4m2JmqcBtqfRhHf4IUWp9tFmG+u3g171om2YQogQ4f8rfESIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIsHbC5u9UyBIJI24Zqvh/OKFt4gnT7PoaxwN+vk89D8sv1yj6MVhF/u8K6+7L+bVXOxWbd6sm7KC9HkKE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoX/OF1nN46ydc24Cz1OMNaGASRj+a1CHTKbVRD5d1K1vuy/GeZnc+HvgHllpO87YiSVIAAAAASUVORK5CYII=",
				fieldname: "UnProductive"
			},
			{
				id: 3,
				name: "Google Chrome",
				image: "https://th.bing.com/th/id/OIP.DXnh2NpUdDZrQ2NZAT6_tAHaHa?pid=ImgDet&rs=1",
				fieldname: "Neutral"
			},
			{
				id: 4,
				name: "Instagram",
				image: "data:image/png;base64,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",
				fieldname: "UnProductive"
			},
			{
				id: 5,
				name: "Adobe XD",
				image: "data:image/png;base64,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",
				fieldname: "Productive"
			},
			{
				id: 6,
				name: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldname: "Neutral"
			}
		]

		const kanbanCategories = [
			{
				title: "Productive",
				fieldname: "Productive"
			},
			{
				title: "UnProductive",
				fieldname: "UnProductive"
			},
			{
				title: "Neutral",
				fieldname: "Neutral"
			}
		]

		const histEvents = [
			{
				title: "Added New Agent",
				description: "Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero",
				date: "07:50",
				color: "danger",
				icon: 'file_copy',
				url: "https://www.youtube.com/watch?v=ElZfdU54Cp8&ab_channel=ZeeMusicCompany"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "success",
				icon: 'alarm',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum  adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "warn",
				icon: 'anchor',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero",
				date: "07:50",
				color: "danger",
				icon: 'file_copy',
				url: "https://www.youtube.com/watch?v=ElZfdU54Cp8&ab_channel=ZeeMusicCompany"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "success",
				icon: 'alarm',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum  adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "warn",
				icon: 'anchor',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero",
				date: "07:50",
				color: "danger",
				icon: 'file_copy',
				url: "https://www.youtube.com/watch?v=ElZfdU54Cp8&ab_channel=ZeeMusicCompany"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "success",
				icon: 'alarm',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum  adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "warn",
				icon: 'anchor',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore Lorem ipsum dolor  elit. Sed qui veroes praesentium maiores, sint eos vero",
				date: "07:50",
				color: "danger",
				icon: 'file_copy',
				url: "https://www.youtube.com/watch?v=ElZfdU54Cp8&ab_channel=ZeeMusicCompany"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "success",
				icon: 'alarm',
				url: "/test"
			},
			{
				title: "Added New Agent",
				description: "Lorem ipsum  adipisicing elit. Sed qui veroes praesentium maiores, sint eos vero sapiente voluptas debitis dicta dolore.",
				date: "07:50",
				color: "warn",
				icon: 'anchor',
				url: "/test"
			}
		]

		const cronValue = ref();
		const customLocale = {
			"*": {
				prefix: "todos los",
				suffix: "",
				text: "Desconocido",
				"*": {
					empty: { text: "todos los {{ field.id }}" },
					value: { text: "{{ val.text }}" },
					range: { text: "{{ start.text }}-{{ end.text }}" },
					everyX: { text: "todos/as {{ every.value }}" }
				},
				month: {
					"*": { prefix: "en" },
					empty: { text: "todos los meses" },
					value: { text: "{{ val.alt }}" },
					range: { text: "{{ start.alt }}-{{ end.alt }}" }
				},
				day: {
					"*": { prefix: "en" },
					empty: { text: "todos los días" },
					value: { text: "los días {{ val.alt }}" }
				},
				dayOfWeek: {
					"*": { prefix: "de" },
					empty: { text: "todos los días de la semana" },
					value: { text: "los {{ val.alt }}" },
					range: { text: "{{ start.alt }}-{{ end.alt }}" }
				},
				hour: {
					"*": { prefix: "a" },
					empty: { text: "todas las horas" },
					value: { text: "las {{ val.text }}" }
				},
				minute: {
					"*": { prefix: ":" },
					empty: { text: "todos los minutos" }
				}
			},
			minute: {
				prefix: "todos los",
				text: "minutos"
			},
			hour: {
				prefix: "todas las",
				text: "horas",
				minute: {
					"*": {
						prefix: "a los",
						suffix: "minutos"
					},
					empty: { text: "todos", prefix: "a", suffix: "los minutos" }
				}
			},
			day: {
				text: "Días"
			},
			week: {
				text: "Semanas"
			},
			month: {
				text: "Meses",
				dayOfWeek: {
					"*": { prefix: "y" }
				}
			},
			year: {
				text: "años",
				dayOfWeek: {
					"*": { prefix: "y" }
				}
			}
		}

		const routerTabParams: TuTabsRouterParams = {
			tabs: [
				{

					label: "Home",
					name: "ho1",
					to: "/test"
				},
				{

					label: "About",
					name: "se1",
					to: "/test2"
				},
			],
		}
		const tabsRouter2 = [
			{

				label: "Home",
				name: "ho",
				to: "/test11"
			},
			{

				label: "About",
				name: "se",
				to: "/test22"
			},
			{

				label: "Service",
				name: "lo",
				to: "/test22"
			},
			{

				label: "Test",
				name: "di",
				to: "/test22"
			}
		]
		const tabs: TuTabsChildData[] = [
			{
				id: 1,
				label: "Home",
				name: "Ho"
			},
			{
				id: 2,
				label: "Service",
				name: "sa"
			}
		]
		const Export: ExportData = new ExportData();
		const rowClicked = (tr) => {
			console.log(tr);
		};
		const beginLoad = () => {
			console.log("begin load");
		};
		const afterLoad = () => {
			console.log("after load");
		};
		const configUpdate = (config) => {
			console.log(config);
		};
		const newItemTitle = ref("");
		const newItemStartDate = ref();
		const newItemStartTime = ref();
		const newItemEndDate = ref();
		const newItemEndTime = ref();
		const Categories = [
			{
				name: "Birthday",
				color: "primary"
			},
			{
				name: "Appointment",
				color: "success"
			},
			{
				name: "Meeting",
				color: "danger"
			}
		];
		const items = ref([]);
		const onClick = (date: Date) => {
			newItemStartDate.value = date;
		};
		const submitNewItem = () => {
			if (newItemEndDate.value === undefined)
				newItemEndDate.value = newItemStartDate.value;
			items.value.push({
				startDate: new Date(
					newItemStartDate.value + " " + newItemStartTime.value
				),
				endDate: new Date(
					newItemEndDate.value + " " + newItemEndTime.value
				),
				title: newItemTitle.value,
				id: "e" + Math.random().toString(36).substring(2, 11)
			});
		};

		const notificationComponent = ref(null);
		const validEmail = computed(function () {
			return /^\w+([\\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
				inpValue.value
			);
		});

		const exportTable = () => {
			Export.tableToCSV(
				universities.value,
				["email", "country", "name"],
				"Data"
			);
		};

		const exportTableToPDF = () => {
			Export.tableToPDF(
				universities.value,
				["email", "country", "name"],
				"Data"
			);
		};
		provide("appRouter", useRouter());
		provide("iconPackGlobal", "material-icons-outlined");
		/*
		waves
		corners
		border
		points
		square
		gradient
		rectangle
		circles
		square-rotate
		scale
		*/
		const loadingDiv = ref();
		const justShowLoading = function () {
			const attrs: TuLoadingAttributes = {
				target: null,
				color: "dark",
				type: "circles",
				scale: "1.0"
			};

			const load = new LoadingConstructor(attrs);
		};

		const justLoad = function () {
			const notificationAttrs: TuNotificationAttributes = {
				title: "Documentation Vuesax 4.0+",
				text: `These documents refer to the latest version of vuesax (4.0+),
					to see the documents of the previous versions you can do it here 👉 Vuesax3.x`,
				flat: true,

				onClickClose: function () {
					console.log("notif closed");
				},
				onClick: function () {
					console.log("clicked");
				},
				color: "#7d33ff",
				progressAuto: true
			};

			new TuNotification(notificationAttrs);
			notificationAttrs.position = "top-center";
			notificationAttrs.color = "primary";
			notificationAttrs.flat = false;
			new TuNotification(notificationAttrs);
			notificationAttrs.position = "top-left";
			new TuNotification(notificationAttrs);
			notificationAttrs.position = "top-right";
			new TuNotification(notificationAttrs);
			notificationAttrs.position = "bottom-left";
			new TuNotification(notificationAttrs);
			notificationAttrs.position = "bottom-center";
			new TuNotification(notificationAttrs);
		};

		watch(selectValue, () => {
			console.log(selectValue.value);
		});

		const picked = ref("1");

		watch(picked, () => {
			console.log("picked: " + picked.value);
		});

		const menu: TuTableContextMenuEntry[] = [
			{
				caption: "More Options >",
				hasSubMenu: true,
				subMenu: [
					{
						caption: "Sample",
						onClicked: (data) => {
							console.log("Some data");
							console.log(data);
						}
					}
				]
			}
		];

		const columns: TuHeaderDefn[] = [
			{
				index: 1,
				caption: "Action",
				field: "action",
				isComponent: true,
				component: markRaw(tuTableContextMenuVue),
				componentProps: {
					modelValue: menu,
					customIcon: {
						icon: "desktop_windows"
					}
				},
				dataType: "string"
			},
			{
				index: 2,
				field: "country",
				caption: "Country",
				props: {
					sort: true
				},
				valueFormatter: function (cellData, rowData) {
					//  console.log("formatter called");
					return cellData.substr(0, 2);
				}
			},
			{
				index: 3,
				field: "name",
				caption: "Name",
				props: {
					sort: true
				},
				valueFormatter: function (cellData, rowData) {
					// console.log(rowData);
					return cellData.substr(0, 2);
				}
			},
			{
				index: 4,
				field: "web_pages",
				caption: "Web Page",
				props: {
					sort: true,
					search: false
				}
			},

			{
				index: 6,
				field: "testDate",
				caption: "Date",
				dataType: "timestamp",
				props: {
					sort: true,
					search: true
				}
			}
		];

		const users = [
			{
				id: 1,
				name: "Leanne Graham",
				username: "Bret",
				email: "Sincere@april.biz",
				website: "hildegard.org"
			},
			{
				id: 2,
				name: "Ervin Howell",
				username: "Antonette",
				email: "Shanna@melissa.tv",
				website: "anastasia.net"
			},
			{
				id: 3,
				name: "Clementine Bauch",
				username: "Samantha",
				email: "Nathan@yesenia.net",
				website: "ramiro.info"
			},
			{
				id: 4,
				name: "Patricia Lebsack",
				username: "Karianne",
				email: "Julianne.OConner@kory.org",
				website: "kale.biz"
			},
			{
				id: 5,
				name: "Chelsey Dietrich",
				username: "Kamren",
				email: "Lucio_Hettinger@annie.ca",
				website: "demarco.info"
			},
			{
				id: 6,
				name: "Mrs. Dennis Schulist",
				username: "Leopoldo_Corkery",
				email: "Karley_Dach@melissa.tv",
				website: "ola.org"
			},
			{
				id: 7,
				name: "Kurtis Weissnat",
				username: "Elwyn.Skiles",
				email: "Telly.Hoeger@billy.biz",
				website: "elvis.io"
			},
			{
				id: 8,
				name: "Nicholas Runolfsdottir V",
				username: "Maxime_Nienow",
				email: "Sherwood@rosamond.me",
				website: "jacynthe.com"
			},
			{
				id: 9,
				name: "Glenna Reichert",
				username: "Delphine",
				email: "Chaim_McDermott@dana.io",
				website: "conrad.com"
			},
			{
				id: 10,
				name: "Clementina DuBuque",
				username: "Moriah.Stanton",
				email: "Rey.Padberg@karina.biz",
				website: "ambrose.net"
			}
		];

		const numPages = ref(Math.ceil(users.length / 3));

		const generateRandomDOB = (): string => {
			const random = getRandomDate(new Date('1950-02-12T01:57:45.271Z'), new Date('2022-02-12T01:57:45.271Z'))
			return random.toISOString();
		}

		function getRandomDate(from: Date, to: Date) {
			const fromTime = from.getTime();
			const toTime = to.getTime();
			return new Date(fromTime + Math.random() * (toTime - fromTime));
		}

		const selected = ref([]);
		const tabName = ref("ho");

		function resetOpts() {
			opts.value = ["carols"];
			console.log(opts.value);
		}
		const editStatic = ref("Some Text");
		const universities = shallowRef([]);
		axios
			.get("http://universities.hipolabs.com/search?country=Singapore")
			.then((response) => {
				const temp = response.data;
				temp.forEach((value) => {
					value.testDate = generateRandomDOB();
					value.expanded = {
						isComponent: true,
						component: testComponent,
						props: {
							name: value.name,
							email: "user@gmail.com"
						}
					};
					value.number = 2;
				});
				universities.value = temp.slice(0, 8);
				console.log(universities.value);
			});

		const srvTableConfig: components.TuTableProps = {
			columns: [
				{
					caption: "name",
					field: "name",
					dataType: "string"
				},
				{
					caption: "Country",
					field: "country",
					dataType: "string"
				},
				{
					caption: "alpha_two_code",
					field: "alpha_two_code",
					dataType: "string"
				},
				{
					caption: "state-province",
					field: "state-province",
					dataType: "string"
				}
			],
			size: "",
			model: "server",
			serverSideConfig: {
				ajaxUrl: "http://universities.hipolabs.com/search?country=Singapore",
				method: "GET"
			}
		}

		/*
		const treeSelectedItems = ref<TuTreeViewItemDefn[]>([]);
		const treeItems = ref<TuTreeViewItemDefn[]>([
			{
				id: "aru",
				name: "test",
				type: "folder",
				children: [
					{
						id: "temp",
						name: "Hello",
						type: "switch",
						isComponent: true,
						component: "TuSwitch"
					},
					{
						id: "temp1",
						name: "Hello ABC",
						type: "folder",
						children: [
							{
								id: "temp2",
								name: "Hello",
								type: "switch",
								isComponent: true,
								component: "TuSwitch"
							},
							{
								id: "temp3",
								name: "Hello ABC",
								type: "folder"
							}
						]
					}
				]
			}
		]); // define your tree items here.

		watch(treeSelectedItems, (value) => {
			console.log(value);
		}); */

		watch(darkModeActive, (active) => {
			if (!active)
				document.body.classList.remove("tu-dark-theme");
			else
				document.body.classList.add("tu-dark-theme");
		})

		const checkedNodes = ref();
		const nodes = ref();

		const treeDisplayData = ref([
			{
				text: "Root 1",
				id: "1",
				children: [
					{
						text: "Child 1",
						id: "3",
						children: [
							{
								text: "Grandchild 1",
								id: "5",
								children: []
							},
							{
								text: "Grandchild 2",
								id: "6",
								children: []
							}
						]
					},
					{
						text: "Child 2",
						id: "4",
						children: []
					}
				]
			},
			{
				text: "Root 2",
				id: "2",
				children: []
			}
		]);

		watch(checkedNodes, () => {
			console.log(checkedNodes.value)
		})

		const enableTabs = ref(false);

		return {
			// treeSelectedItems,
			enableTabs,
			items,
			checkedNodes,
			treeDisplayData,
			darkModeActive,
			columns,
			universities,
			numPages,
			editStatic,
			selected,
			active1,
			checkBox1,
			checkBox2,
			checkBox9,
			justLoad,
			resetOpts,
			loading,
			activeDialog,
			activeDialog1,
			activeDialog2,
			notificationComponent,
			notifShow,
			opts,
			inpValue,
			validEmail,
			selectValue,
			sideBar,
			isOpen,
			navValue,
			openNav,
			selectValue1,
			selectValue2,
			radios1: "luis",
			picked,
			page,
			loadingDiv,
			tabName,
			justShowLoading,
			users,
			exportTable,
			exportTableToPDF,
			rowClicked,
			beginLoad,
			afterLoad,
			newItemTitle,
			newItemStartDate,
			newItemStartTime,
			newItemEndDate,
			newItemEndTime,
			submitNewItem,
			onClick,
			Categories,
			configUpdate,
			nodes,
			routerTabParams,
			tabsRouter2,

			histEvents,

			cronValue,
			customLocale,
			srvTableConfig,
			kanbanItems,
			kanbanCategories
		};
	}
});
</script>

<style lang="scss">
@import "./style/sass/_mixins";


.showcase-component {
	margin-bottom: 15px;
	margin-left: 30px;
	margin-top: 30px;
	color: -getColor("text") !important;
}

.text-color {
	color: -getColor("text");
}

.tu-select-content {
	margin: 20px;
}

body {
	background-color: -getColor(background)
}
</style>
