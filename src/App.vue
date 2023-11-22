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
			<tu-button style="margin-right: 10px">
				<tu-icon>
					computer
				</tu-icon>
				Simple Button
			</tu-button>
			<tu-button type="filled" color="primary" style="margin-right: 10px" size="mini">
				Mini
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
			<tu-button flat>
				Home
				<tu-icon>home</tu-icon>
			</tu-button>
			<tu-button circle transparent style="margin-right: 10px">
				<tu-icon>home</tu-icon>
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
			<tu-button :loading="loading" @click="showLoadingBtn" type="filled" color="primary" style="margin-right: 10px">
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
				<tu-button flat :active="buttonActive" @click="buttonActive = !buttonActive"> One </tu-button>
				<tu-button border> Two </tu-button>
				<tu-button border> Three </tu-button>
				<tu-button border> Four </tu-button>
				<tu-button border> Five </tu-button>
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
				<tu-input type="date" label="Date" />
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
				<tu-navbar-group>
					Docs
					<template #items>
						<tu-navbar-item :active="navValue == 'guide'" id="guide">
							Guide
						</tu-navbar-item>
						<tu-navbar-item :active="navValue == 'docs'" id="docs">
							Documents
						</tu-navbar-item>
						<tu-navbar-item :active="navValue == 'components'" id="components">
							Components
						</tu-navbar-item>
					</template>
				</tu-navbar-group>
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
			<tu-tabs position="top" tab-style="pills" noTransitions v-model="tabName" fixed-height="400px" :key="'tab1'">
				<tu-tab label="Home" name="ho">
					<tu-tabs name="tabs1" position="top" noTransitions :key="'tab2'" tab-style="progress">
						<tu-tab label="Home" name="ho">
							<tu-calendar model="local" :items="items" :categories="Categories" @onClickDay="onClick" />
							<tu-table row-expand multi-select striped size="" persistent-id="twne" :draggable="true"
								v-model="selected" v-bind="srvTableConfig" v-model:numPages="numPages" :page="page"
								:pageSize="5" :columnSelector="true" @onRowClicked="rowClicked"
								@onTableBeginLoad="beginLoad" @onTableEndLoad="afterLoad"
								@onTableConfigUpdated="configUpdate">

								<template #footer>
									<tu-pagination not-margin flat v-model="page" :length="numPages" />
								</template>
							</tu-table>
						</tu-tab>
						<tu-tab label="Service" name="se"> Service </tu-tab>
						<tu-tab label="login" name="lo"> Login </tu-tab>
						<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
					</tu-tabs>
				</tu-tab>
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
				<tu-tag flat name="Location" value="Far East asdaweqwezxczg" color="success" />
				<tu-tag flat name="Location" value="Far East" />
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
			<div class="showcase-component">

				<h4>History Component:</h4>
				<hr />
				<div style="height: 500px;">
					<tu-history center :events="histEvents" />
				</div>
				beginLoad
				<h4>Cron Component:</h4>
				<hr />
				<tu-cron v-model="cronValue" />
				<span>{{ cronValue }}</span>
			</div>
			<div class="showcase-component">
				<h4>Calendar heatmap Component:</h4>
				<hr />
				<div style="width: 90%">
					<calendar-heatmap :values="calendarData" :end-date="new Date('2021-08-01')" :vertical="false"
						no-data-text="No Contributions" :locale="{
							months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
							days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
							on: 'am',
							less: 'Least',
							more: 'Most'
						}" round="10" tooltip-unit="%" />
				</div>

			</div>
			<div class="showcase-component">
				<h4>Kanban Board Component:</h4>
				<hr />
				<tu-kanban :items="kanbanItems" v-model="currentItemsRef" multi-select :fields="kanbanCategories" />
			</div>
			<div class="showcase-component">

			</div>
			<div class="showcase-component">

				<h4>Usage Bar:</h4>
				<hr />
				<div style="width: 500px;">
					<tuUsageBar height="30px" :items="barItems" />
				</div>
				<h4>Timeline Component:</h4>
				<hr />
				<div style="width: 800px">
					<tu-timeline :interval="5" :intervalStartTime="9" :intervalEndTime="19" :intervals="intervals" />
				</div>
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
	markRaw,
	Ref
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
		const intervals = ref([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1])
		let func = () => {
			intervals.value.push(1)
		}
		setInterval(func, 10000)
		const kanbanItems = [
			{
				id: 1,
				content: "VS Code",
				fieldName: "Productive",
			},
			{
				id: 2,
				content: "Facebook",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAADx8fGxsbH39/e+vr6KioopKSkoKCj7+/vg4OBAQECNjY0JCQkNDQ1aWlpfX19LS0tGRkbp6enQ0NCDg4OhoaEjIyPb29urq6vm5uaamprDw8MwMDBubm4dHR02NjaVlZVUVFR3d3dmZmYVFRV4y9GXAAAC9klEQVR4nO3dC3LaMBRGYTAmwUB4Q3iEJqFk/1tshnZSaKfgK1+k3+45C2D0zYAsGyFarbQVeb+7GU6mg/3rqP3V00WjU7P3IvFY7WWL3bfXdvl689QjNtVfTUe3UZcdUw+6fPPVm1V3Kks98JItxkG8z15SD71MRWcW6mu3u6lHX6LuY7ivDsL+tIpPX5gvq/nkhet9VaC4cFXZpy3MJw5AZWE28AAKC+fPLkBdYd/Hpyt0A6oKs17ThT6TjLDw6AfUFO4cgZLCtSdQUhh2L18jYeW7CXWh73tUUXhouvDFGagn9J1mBIUdb6Cc0G89Kip0/xTKCYOfbNdFuPUHigkfGi90v1SoCb0XbHrC98YLHZ9daArvMZNqCf1XbGpC51vfX61Ts85yeoz/R3lq1ll3Aa5Sq85a3AM4TK06L3yieR4cjsuHvxtu+qlRF4VNNOPOQumTdrWQO6el0kx5s4Bldy32O31VmC8WH9vUY7ZlX7MprVbKZL51mqQesTWzsF4fwlbABT/1gM1Zhd9TD9icVbhLPWBzXaOwbjOpfVmqteQsk1VYlx3qv0OIUD+ECPVDiFA/hAj1Q4hQP4QI9UOIUD+EdRDm2ZXyjVG4vfZqP4t8OM38+GE0VO4t6ncbfj97tXSIKKxwOkmV4m2JmqcBtqfRhHf4IUWp9tFmG+u3g171om2YQogQ4f8rfESIECFChAgRIkSIECFChAgRIkSIECFChAgRIkSIsHbC5u9UyBIJI24Zqvh/OKFt4gnT7PoaxwN+vk89D8sv1yj6MVhF/u8K6+7L+bVXOxWbd6sm7KC9HkKE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoH0KE+iFEqB9ChPohRKgfQoT6IUSoX/OF1nN46ydc24Cz1OMNaGASRj+a1CHTKbVRD5d1K1vuy/GeZnc+HvgHllpO87YiSVIAAAAASUVORK5CYII=",
				fieldName: "UnProductive"
			},
			{
				id: 3,
				content: "Google Chrome",
				image: "https://th.bing.com/th/id/OIP.DXnh2NpUdDZrQ2NZAT6_tAHaHa?pid=ImgDet&rs=1",
				fieldName: "Neutral"
			},
			{
				id: 4,
				content: "Instagram",
				icon: "alarm",
				fieldName: "UnProductive"
			},
			{
				id: 5,
				content: "Adobe XD",
				icon: "album",
				fieldName: "Productive"
			},
			{
				id: 6,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 7,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 8,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 9,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 10,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 11,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 12,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			},
			{
				id: 13,
				content: "Firefox",
				image: "https://blog.mozilla.org/opendesign/files/2018/07/firefox-logo.png",
				fieldName: "Neutral"
			}
		]
		const currentItemsRef = ref();
		const kanbanCategories = [
			{
				title: "Productive",
				fieldName: "Productive"
			},
			{
				title: "UnProductive",
				fieldName: "UnProductive"
			},
			{
				title: "Neutral",
				fieldName: "Neutral"
			}
		]
		const barItems = ref([
			{
				name: "Google Chrome",
				time: 10,
			},
			{
				name: "VS Code",
				time: 5,
			},
			{
				name: "Outlook",
				time: 5,
			},
			{
				name: "Instagram",
				time: 5,
			},
			{
				name: "Apple",
				time: 1,
			},
			{
				name: "Windows",
				time: 1,
			},
			{
				name: "Anime",
				time: 1,
			},
			{
				name: "Movies",
				time: 1,
			},
			{
				name: "Cars",
				time: 1,
			},
			{
				name: "Bikes",
				time: 1,
			},
		])

		setTimeout(() => {
			barItems.value.push({
				name: "SomethingElse",
				time: 10,
			})
		}, 5000);


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
					icon: "computer",
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
		const calendarData = [
			{
				'date': '2019-11-30T23:00:00Z',
				'count': 635
			},
			{
				'date': '2020-12-02T23:00:00Z',
				'count': 244
			},
			{
				'date': '2020-12-03T23:00:00Z',
				'count': 672
			},
			{
				'date': '2020-12-04T23:00:00Z',
				'count': 912
			},
			{
				'date': '2020-12-06T23:00:00Z',
				'count': 856
			},
			{
				'date': '2020-12-07T23:00:00Z',
				'count': 273
			},
			{
				'date': '2020-12-08T23:00:00Z',
				'count': 252
			},
			{
				'date': '2020-12-11T23:00:00Z',
				'count': 643
			},
			{
				'date': '2020-12-13T23:00:00Z',
				'count': 423
			},
			{
				'date': '2020-12-14T23:00:00Z',
				'count': 246
			},
			{
				'date': '2020-12-15T23:00:00Z',
				'count': 26
			},
			{
				'date': '2020-12-17T23:00:00Z',
				'count': 372
			},
			{
				'date': '2020-12-18T23:00:00Z',
				'count': 518
			},
			{
				'date': '2020-12-19T23:00:00Z',
				'count': 309
			},
			{
				'date': '2020-12-20T23:00:00Z',
				'count': 677
			},
			{
				'date': '2020-12-21T23:00:00Z',
				'count': 431
			},
			{
				'date': '2020-12-23T23:00:00Z',
				'count': 513
			},
			{
				'date': '2020-12-25T23:00:00Z',
				'count': 748
			},
			{
				'date': '2020-12-26T23:00:00Z',
				'count': 215
			},
			{
				'date': '2020-12-27T23:00:00Z',
				'count': 318
			},
			{
				'date': '2020-12-29T23:00:00Z',
				'count': 457

			},
			{
				'date': '2020-12-30T23:00:00Z',
				'count': 297

			},
			{
				'date': '2021-01-01T23:00:00Z',
				'count': 915

			},
			{
				'date': '2021-01-04T23:00:00Z',
				'count': 385

			},
			{
				'date': '2021-01-06T23:00:00Z',
				'count': 359

			},
			{
				'date': '2021-01-07T23:00:00Z',
				'count': 113

			},
			{
				'date': '2021-01-09T23:00:00Z',
				'count': 228

			},
			{
				'date': '2021-01-10T23:00:00Z',
				'count': 603

			},
			{
				'date': '2021-01-14T23:00:00Z',
				'count': 407

			},
			{
				'date': '2021-01-17T23:00:00Z',
				'count': 478

			},
			{
				'date': '2021-01-18T23:00:00Z',
				'count': 797

			},
			{
				'date': '2021-01-19T23:00:00Z',
				'count': 938

			},
			{
				'date': '2021-01-20T23:00:00Z',
				'count': 139

			},
			{
				'date': '2021-01-21T23:00:00Z',
				'count': 372

			},
			{
				'date': '2021-01-23T23:00:00Z',
				'count': 344

			},
			{
				'date': '2021-01-24T23:00:00Z',
				'count': 294

			},
			{
				'date': '2021-01-25T23:00:00Z',
				'count': 37

			},
			{
				'date': '2021-01-26T23:00:00Z',
				'count': 386

			},
			{
				'date': '2021-01-27T23:00:00Z',
				'count': 40

			},
			{
				'date': '2021-01-28T23:00:00Z',
				'count': 639

			},
			{
				'date': '2021-01-29T23:00:00Z',
				'count': 535

			},
			{
				'date': '2021-02-02T23:00:00Z',
				'count': 550

			},
			{
				'date': '2021-02-04T23:00:00Z',
				'count': 371

			},
			{
				'date': '2021-02-05T23:00:00Z',
				'count': 32

			},
			{
				'date': '2021-02-17T23:00:00Z',
				'count': 386
			},
			{
				'date': '2021-02-18T23:00:00Z',
				'count': 1413000

			},
			{
				'date': '2021-02-19T23:00:00Z',
				'count': 1787000

			},
			{
				'date': '2021-02-20T23:00:00Z',
				'count': 1549000

			},
			{
				'date': '2021-02-22T23:00:00Z',
				'count': 5563000

			},
			{
				'date': '2021-02-23T23:00:00Z',
				'count': 5214000

			},
			{
				'date': '2021-02-24T23:00:00Z',
				'count': 3992000

			},
			{
				'date': '2021-02-25T23:00:00Z',
				'count': 2204000

			},
			{
				'date': '2021-02-27T23:00:00Z',
				'count': 4329000

			},
			{
				'date': '2021-02-28T23:00:00Z',
				'count': 3590000

			},
			{
				'date': '2021-03-01T23:00:00Z',
				'count': 315000

			},
			{
				'date': '2021-03-02T23:00:00Z',
				'count': 385000

			},
			{
				'date': '2021-03-04T23:00:00Z',
				'count': 4273000

			},
			{
				'date': '2021-03-05T23:00:00Z',
				'count': 4763000

			},
			{
				'date': '2021-03-07T23:00:00Z',
				'count': 2984000

			},
			{
				'date': '2021-03-09T23:00:00Z',
				'count': 6558000

			},
			{
				'date': '2021-03-10T23:00:00Z',
				'count': 3922000

			},
			{
				'date': '2021-03-11T23:00:00Z',
				'count': 6979000

			},
			{
				'date': '2021-03-12T23:00:00Z',
				'count': 7999000

			},
			{
				'date': '2021-03-13T23:00:00Z',
				'count': 883000

			},
			{
				'date': '2021-03-16T23:00:00Z',
				'count': 5224000

			},
			{
				'date': '2021-03-17T23:00:00Z',
				'count': 379000

			},
			{
				'date': '2021-03-18T23:00:00Z',
				'count': 3669000

			},
			{
				'date': '2021-03-19T23:00:00Z',
				'count': 4101000

			},
			{
				'date': '2021-03-22T23:00:00Z',
				'count': 1746000

			},
			{
				'date': '2021-03-23T23:00:00Z',
				'count': 7120000

			},
			{
				'date': '2021-03-24T23:00:00Z',
				'count': 2358000

			},
			{
				'date': '2021-03-25T23:00:00Z',
				'count': 4240000

			},
			{
				'date': '2021-03-27T23:00:00Z',
				'count': 4278000

			},
			{
				'date': '2021-04-07T22:00:00Z',
				'count': 7784000

			},
			{
				'date': '2021-04-08T22:00:00Z',
				'count': 4622000

			},
			{
				'date': '2021-04-11T22:00:00Z',
				'count': 1158000

			},
			{
				'date': '2021-04-12T22:00:00Z',
				'count': 3611000

			},
			{
				'date': '2021-04-13T22:00:00Z',
				'count': 3919999

			},
			{
				'date': '2021-04-14T22:00:00Z',
				'count': 2850000

			},
			{
				'date': '2021-04-15T22:00:00Z',
				'count': 2162000

			},
			{
				'date': '2021-04-16T22:00:00Z',
				'count': 7158999

			},
			{
				'date': '2021-04-18T22:00:00Z',
				'count': 1905999

			},
			{
				'date': '2021-04-20T22:00:00Z',
				'count': 380000

			},
			{
				'date': '2021-04-21T22:00:00Z',
				'count': 592000

			},
			{
				'date': '2021-04-22T22:00:00Z',
				'count': 3765000

			},
			{
				'date': '2021-04-23T22:00:00Z',
				'count': 1549000

			},
			{
				'date': '2021-04-24T22:00:00Z',
				'count': 824000

			},
			{
				'date': '2021-04-25T22:00:00Z',
				'count': 249000

			},
			{
				'date': '2021-04-26T22:00:00Z',
				'count': 1362000

			},
			{
				'date': '2021-04-27T22:00:00Z',
				'count': 297000

			},
			{
				'date': '2021-04-28T22:00:00Z',
				'count': 379000

			},
			{
				'date': '2021-04-29T22:00:00Z',
				'count': 401000

			},
			{
				'date': '2021-05-01T22:00:00Z',
				'count': 6083000

			},
			{
				'date': '2021-05-03T22:00:00Z',
				'count': 2915000

			},
			{
				'date': '2021-05-04T22:00:00Z',
				'count': 24417000

			},
			{
				'date': '2021-05-05T22:00:00Z',
				'count': 3289000

			},
			{
				'date': '2021-05-07T22:00:00Z',
				'count': 426000

			},
			{
				'date': '2021-05-08T22:00:00Z',
				'count': 6091000

			},
			{
				'date': '2021-05-09T22:00:00Z',
				'count': 2419000

			},
			{
				'date': '2021-05-11T22:00:00Z',
				'count': 364000

			},
			{
				'date': '2021-05-13T22:00:00Z',
				'count': 148000

			},
			{
				'date': '2021-05-14T22:00:00Z',
				'count': 5131000

			},
			{
				'date': '2021-05-15T22:00:00Z',
				'count': 1565000

			},
			{
				'date': '2021-05-16T22:00:00Z',
				'count': 431000

			},
			{
				'date': '2021-05-17T22:00:00Z',
				'count': 3819000

			},
			{
				'date': '2021-05-18T22:00:00Z',
				'count': 195000

			},
			{
				'date': '2021-05-19T22:00:00Z',
				'count': 2099000

			},
			{
				'date': '2021-05-21T22:00:00Z',
				'count': 13160999

			},
			{
				'date': '2021-05-22T22:00:00Z',
				'count': 3089999

			},
			{
				'date': '2021-05-23T22:00:00Z',
				'count': 7820999

			},
			{
				'date': '2021-05-24T22:00:00Z',
				'count': 739000

			},
			{
				'date': '2021-05-25T22:00:00Z',
				'count': 786000

			},
			{
				'date': '2021-05-26T22:00:00Z',
				'count': 881000

			},
			{
				'date': '2021-05-27T22:00:00Z',
				'count': 1632000

			},
			{
				'date': '2021-05-28T22:00:00Z',
				'count': 3843000

			},
			{
				'date': '2021-05-29T22:00:00Z',
				'count': 11635000

			},
			{
				'date': '2021-05-30T22:00:00Z',
				'count': 14181999

			},
			{
				'date': '2021-05-31T22:00:00Z',
				'count': 5697999

			},
			{
				'date': '2021-06-01T22:00:00Z',
				'count': 1285999

			},
			{
				'date': '2021-06-02T22:00:00Z',
				'count': 4295000

			},
			{
				'date': '2021-06-03T22:00:00Z',
				'count': 9143000

			},
			{
				'date': '2021-06-04T22:00:00Z',
				'count': 2208000

			},
			{
				'date': '2021-06-05T22:00:00Z',
				'count': 7224999

			},
			{
				'date': '2021-06-06T22:00:00Z',
				'count': 6307999

			},
			{
				'date': '2021-06-07T22:00:00Z',
				'count': 695000

			},
			{
				'date': '2021-06-08T22:00:00Z',
				'count': 622000

			},
			{
				'date': '2021-06-09T22:00:00Z',
				'count': 2483999

			},
			{
				'date': '2021-06-10T22:00:00Z',
				'count': 2462000

			},
			{
				'date': '2021-06-11T22:00:00Z',
				'count': 5458000

			},
			{
				'date': '2021-06-13T22:00:00Z',
				'count': 4365000

			},
			{
				'date': '2021-06-14T22:00:00Z',
				'count': 633000

			},
			{
				'date': '2021-06-15T22:00:00Z',
				'count': 4717000

			},
			{
				'date': '2021-06-16T22:00:00Z',
				'count': 5040999

			},
			{
				'date': '2021-06-17T22:00:00Z',
				'count': 6640998

			},
			{
				'date': '2021-06-18T22:00:00Z',
				'count': 4700000

			},
			{
				'date': '2021-06-19T22:00:00Z',
				'count': 5093000

			},
			{
				'date': '2021-06-20T22:00:00Z',
				'count': 722000

			},
			{
				'date': '2021-06-21T22:00:00Z',
				'count': 6051999

			},
			{
				'date': '2021-06-22T22:00:00Z',
				'count': 636000

			},
			{
				'date': '2021-06-23T22:00:00Z',
				'count': 4202000

			},
			{
				'date': '2021-06-24T22:00:00Z',
				'count': 5845000

			},
			{
				'date': '2021-06-25T22:00:00Z',
				'count': 10937000

			},
			{
				'date': '2021-06-26T22:00:00Z',
				'count': 18756000

			},
			{
				'date': '2021-06-27T22:00:00Z',
				'count': 422000

			},
			{
				'date': '2021-06-28T22:00:00Z',
				'count': 6215000

			},
			{
				'date': '2021-06-30T22:00:00Z',
				'count': 4984000

			},
			{
				'date': '2021-07-01T22:00:00Z',
				'count': 4475000

			},
			{
				'date': '2021-07-02T22:00:00Z',
				'count': 282000

			},
			{
				'date': '2021-07-03T22:00:00Z',
				'count': 3153000

			},
			{
				'date': '2021-07-04T22:00:00Z',
				'count': 2066000

			},
			{
				'date': '2021-07-05T22:00:00Z',
				'count': 5421000

			},
			{
				'date': '2021-07-06T22:00:00Z',
				'count': 330000

			},
			{
				'date': '2021-07-07T22:00:00Z',
				'count': 274000

			},
			{
				'date': '2021-07-08T22:00:00Z',
				'count': 6514000

			},
			{
				'date': '2021-07-09T22:00:00Z',
				'count': 17034999

			},
			{
				'date': '2021-07-10T22:00:00Z',
				'count': 12104000

			},
			{
				'date': '2021-07-11T22:00:00Z',
				'count': 3892000
			},
			{
				'date': '2021-07-12T22:00:00Z',
				'count': 1873000
			},
			{
				'date': '2021-07-13T22:00:00Z',
				'count': 1257000
			},
			{
				'date': '2021-07-14T22:00:00Z',
				'count': 3969000
			},
			{
				'date': '2021-07-15T22:00:00Z',
				'count': 5168000
			},
			{
				'date': '2021-07-17T22:00:00Z',
				'count': 3621000
			},
			{
				'date': '2021-07-18T22:00:00Z',
				'count': 4297000
			},
			{
				'date': '2021-07-19T22:00:00Z',
				'count': 5791000
			},
			{
				'date': '2021-07-20T22:00:00Z',
				'count': 7096000
			},
			{
				'date': '2021-07-21T22:00:00Z',
				'count': 6622000
			},
			{
				'date': '2021-07-22T22:00:00Z',
				'count': 9067000
			},
			{
				'date': '2021-07-23T22:00:00Z',
				'count': 8541999
			},
			{
				'date': '2021-07-24T22:00:00Z',
				'count': 7402000
			},
			{
				'date': '2021-07-25T22:00:00Z',
				'count': 268000
			},
			{
				'date': '2021-07-26T22:00:00Z',
				'count': 289000
			},
			{
				'date': '2021-07-27T22:00:00Z',
				'count': 1112000
			},
			{
				'date': '2021-07-28T22:00:00Z',
				'count': 3543000
			},
			{
				'date': '2021-07-29T22:00:00Z',
				'count': 5737000
			}
		];

		const enableTabs = ref(false);

		const showLoadingBtn = () => {
			loading.value = true;
			setTimeout(() => { loading.value = false; }, 2000)
		}

		const buttonActive = ref(false);

		return {
			buttonActive,
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
			barItems,
			intervals,
			kanbanItems,
			kanbanCategories,
			currentItemsRef,
			calendarData,
			showLoadingBtn
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