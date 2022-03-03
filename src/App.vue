
<template>
	<div style="position: relative">
		<h1 style="text-align: cente; margin-top: 50px">
			Vuesax3 (Typescript + composition API Demo) - TheCelebrimbor -
			Github
		</h1>
		<div class="showcase-component">
			<h3>Buttons:</h3>
			<hr />
			<tu-button success @click="justLoad"> Open Notification </tu-button>
			<div
				style="width: 200px; height: 200px; position: relative"
				ref="loadingDiv"
			/>
			<tu-button success @click="justShowLoading">
				Open Loading
			</tu-button>
			<tu-button
				type="filled"
				color="danger"
				textColor="#000"
				style="margin-right: 10px"
			>
				Simple Button
			</tu-button>
			<tu-button
				type="filled"
				color="primary"
				style="margin-right: 10px"
				size="small"
			>
				Small
			</tu-button>
			<tu-button
				type="filled"
				color="primary"
				style="margin-right: 10px"
				size="large"
			>
				Large
			</tu-button>
			<tu-button
				type="filled"
				color="primary"
				style="margin-right: 10px"
				size="xl"
			>
				Xtra Large
			</tu-button>
			<tu-button
				circle
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				<tu-icon>home </tu-icon>
			</tu-button>
			<tu-button circle transparent style="margin-right: 10px">
				<tu-icon>home </tu-icon>
			</tu-button>
			<tu-button
				square
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				Square Button
			</tu-button>
			<tu-button border color="primary" style="margin-right: 10px">
				Border Only
			</tu-button>
			<tu-button flat color="primary" style="margin-right: 10px">
				Flat
			</tu-button>
			<tu-button gradient color="primary" style="margin-right: 10px">
				Gradient
			</tu-button>
			<tu-button relief color="primary" style="margin-right: 10px">
				Relief
			</tu-button>
			<tu-button
				:loading="loading"
				@click="loading = true"
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				Loading
			</tu-button>
			<tu-button
				upload
				type="border"
				color="danger"
				style="margin-right: 10px"
			>
				Upload
			</tu-button>
			<tu-button
				upload
				type="border"
				color="#00FF00"
				style="margin-right: 10px"
			>
				Upload
			</tu-button>
			<tu-button
				upload
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
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
				<tu-button> One </tu-button>
				<tu-button> Two </tu-button>
				<tu-button> Three </tu-button>
				<tu-button> four </tu-button>
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
			<tu-alert
				title="Lorem ipsum dolor sit amet"
				color="rgb(231, 154, 23)"
				active="true"
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat
			</tu-alert>
			<div class="centerx">
				<tu-button
					@click="active1 = !active1"
					color="primary"
					type="filled"
					>{{ !active1 ? "Open Alert" : "Close Alert" }}</tu-button
				>
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
				<img
					src="https://avatars.githubusercontent.com/u/13927773?v=4"
				/>
			</tu-avatar>
		</div>
		<div class="showcase-component">
			<h3>Breadcrumbs:</h3>
			<hr />
			<tu-breadcrumb
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
			></tu-breadcrumb>

			<tu-breadcrumb>
				<li>
					<a href="#" title="Home">Home</a
					><span class="tu-breadcrum--separator">/</span>
				</li>
				<li>
					<a href="#" title="Profil">Profil</a
					><span class="tu-breadcrum--separator">/</span>
				</li>
				<li aria-current="page" class="active">Infos</li>
			</tu-breadcrumb>
		</div>
		<div class="showcase-component">
			<h3>Cards:</h3>
			<hr />
			<tu-card-group>
				<tu-card type="2" v-for="card in 6" :key="card">
					<template #title>
						<h3>Pot with a plant</h3>
					</template>
					<template #content>
						<img
							src="https://th.bing.com/th/id/R00b6dcd72e6c6c971f848b5710a22b14?rik=GUdyoJYQFeNOvw&riu=http%3a%2f%2fbluefaqs.com%2fwp-content%2fuploads%2f2010%2f06%2fRandom-Images-Thumb.jpg&ehk=gjZ1zvnepp3KjV7sLM91JMR92J6tw3FWxn23GyDBcVI%3d&risl=&pid=ImgRaw"
							alt=""
						/>
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
			<tu-checkbox v-model:checked="checkBox9" indeterminate>{{ checkBox9 }}</tu-checkbox>
			<div class="">
				<button @click="resetOpts" > Reset </button>
				<ul class="centerx">
					<li class="modelx">
						{{ opts }}
					</li>
					<li>
						<tu-checkbox v-model="opts" val="luis"
							>Luis</tu-checkbox
						>
					</li>
					<li>
						<tu-checkbox v-model="opts" val="carols"
							>Carols</tu-checkbox
						>
					</li>
					<li>
						<tu-checkbox :disabled="true" v-model="opts" val="summer"
							>Summer</tu-checkbox
						>
					</li>
					<li>
						<tu-checkbox v-model="opts" val="lyon"
							>Lyon</tu-checkbox
						>
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
			<tu-button @click="activeDialog = !activeDialog"
				>Open Dialog</tu-button
			>
			<tu-dialog width="550px" v-model="activeDialog">
				<template v-slot:header>
					<h4>Welcome to <b>Vuesax3</b></h4>
				</template>

				<div class="con-content">
					Vuesax3 is a relatively new framework with a refreshing
					design and in the latest trends, vuesax based on vuejs which
					means that we go hand in hand with one of the most popular
					javascript frameworks in the world and with a huge community
					with which you will have all the help and documentation to
					create and make your project
				</div>

				<template v-slot:footer>
					<tu-button
						width="100px"
						style="margin: 5px"
						@click="activeDialog = false"
						block
					>
						Ok
					</tu-button>
					<tu-button type="flat" color="secondary" width="100px">
						Cancel
					</tu-button>
				</template>
			</tu-dialog>
			<tu-button @click="activeDialog1 = !activeDialog1"
				>Open Dialog</tu-button
			>
			<tu-dialog
				square
				scroll
				prevent-close
				width="550px"
				v-model="activeDialog1"
			>
				<template v-slot:header>
					<h4>Welcome to <b>Vuesax3</b></h4>
					<tu-divider color="rgba(0,0,0,0.5)" />
				</template>

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

				<template v-slot:footer>
					<tu-button
						width="100px"
						style="margin: 5px"
						@click="activeDialog1 = false"
					>
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
			<tu-input
				block
				id="inp1"
				v-model="inpValue"
				placeholder="Name"
				style="margin-top: 10px"
				maxlength="15"
			/>
			<br />
			<tu-input
				label="Full Name"
				v-model:value="inpValue"
				placeholder="Evan You"
			/>
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
			<tu-input
				v-model:value="inpValue"
				label="Example Regex Validation"
				placeholder="vuesax@gmail.com"
			>
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

				<tu-input
					state="danger"
					danger
					icon-after
					placeholder="Danger icon after"
				>
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input
					warn
					state="warn"
					placeholder="Label Warn"
					label="Warn"
				/>

				<tu-input dark state="dark" label-placeholder="Dark" />

				<tu-input border placeholder="Name" />

				<tu-input
					color="#7d33ff"
					border
					type="password"
					placeholder="Password"
				>
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input
					border
					warn
					type="email"
					icon-after
					label-placeholder="Address"
				>
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

			<tu-select
				block
				multiple
				label-placeholder="Label-placeholder"
				v-model="selectValue"

				filter
			>
				<tu-option label="Test" value="1"> Test </tu-option>
				<tu-option label="Test1" value="2"> Test1 </tu-option>
				<tu-option label="Javascript" value="3"> Javascript </tu-option>
				<tu-option disabled label="Sass" value="4"> Sass </tu-option>
				<tu-option label="Typescript" value="5"> Typescript </tu-option>
				<tu-option label="Webpack" value="6"> Webpack </tu-option>
				<tu-option label="Nodejs" value="7"> Nodejs </tu-option>
			</tu-select>

			<tu-select
				inline
				placeholder="Label-placeholder for something soooooo longggg Label-placeholder for something soooooo longggg"
				v-model="selectValue1"
				style="margin: 10px"
				filter
			>
				<tu-option label="Test" value="1"> Test </tu-option>
				<tu-option label="Test1" value="2"> Test1 </tu-option>
				<tu-option label="Javascript" value="3"> Javascript </tu-option>
				<tu-option disabled label="Sass" value="4"> Sass </tu-option>
				<tu-option label="Typescript" value="5"> Typescript </tu-option>
				<tu-option label="Webpack" value="6"> Webpack </tu-option>
				<tu-option label="Nodejs" value="7"> Nodejs </tu-option>
			</tu-select>

			<tu-select
				inline
				label-placeholder="Label-placeholder"
				v-model="selectValue"
				style="margin: 10px"
			>
				<tu-option label="Test" value="1"> Test </tu-option>
				<tu-option label="Test1" value="2"> Test1 </tu-option>
				<tu-option label="Javascript" value="3"> Javascript </tu-option>
				<tu-option disabled label="Sass" value="4"> Sass </tu-option>
				<tu-option label="Typescript" value="5"> Typescript </tu-option>
				<tu-option label="Webpack" value="6"> Webpack </tu-option>
				<tu-option label="Nodejs" value="7"> Nodejs </tu-option>
			</tu-select>

			<tu-select
				inline
				dropdown
				placeholder="Dropdown"
				v-model="selectValue2"
				style="margin: 10px"
			>
				<tu-option label="Test" value="1"> Test </tu-option>
				<tu-option label="Test1" value="2"> Test1 </tu-option>
				<tu-option label="Javascript" value="3">
					Javascript <tu-icon>home</tu-icon>
				</tu-option>
				<tu-option disabled label="Sass" value="4"> Sass </tu-option>
				<tu-option label="Typescript" value="5"> Typescript </tu-option>
				<tu-option label="Webpack" value="6"> Webpack </tu-option>
				<tu-option label="Nodejs" value="7"> Nodejs </tu-option>
			</tu-select>
			<tu-select inline label="Group" placeholder="Group">
				<tu-option-group>
					<template v-slot:title> Vuejs </template>
					<tu-option label="Vuesax" value="1"> Vuesax </tu-option>
					<tu-option label="Vue" value="2"> Vue </tu-option>
					<tu-option label="Javascript" value="3">
						Javascript
					</tu-option>
				</tu-option-group>
				<tu-option-group>
					<template v-slot:title> Others </template>
					<tu-option label="Sass" value="4"> Sass </tu-option>
					<tu-option label="Typescript" value="5">
						Typescript
					</tu-option>
					<tu-option label="Webpack" value="6"> Webpack </tu-option>
					<tu-option label="Nodejs" value="7"> Nodejs </tu-option>
				</tu-option-group>
			</tu-select>

			<tu-select
				inline
				v-for="(color, i) in colors"
				:key="i"
				:state="color.color"
				:label="color.color"
				placeholder="Select"
				v-model="color.value"
			>
				<tu-option value="1"> Vuesax </tu-option>
				<tu-option label="Vue" value="2"> Vue </tu-option>
				<tu-option label="Javascript" value="3"> Javascript </tu-option>
				<tu-option label="Sass" value="4"> Sass </tu-option>
				<tu-option label="Typescript" value="5"> Typescript </tu-option>
				<tu-option label="Webpack" value="6"> Webpack </tu-option>
				<tu-option label="Nodejs" value="7"> Nodejs </tu-option>
			</tu-select>
		</div>
		<div class="showcase-component">
			<h4>Dropdown:</h4>
			<hr />
			aaa
			<tu-popper arrow border-radius="20px">
				<button>click me</button>
				<template #content>
					<tu-popup-menu>
						<tu-popup-item> Test </tu-popup-item>
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
					<img
						src="https://vuesax.com/logos/logo-vuesax-logotipo-vuesax-png-3.png"
						alt=""
					/>
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
						<tu-avatar
							badge-color="danger"
							badge-position="top-right"
						>
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
			<tu-navbar
				left-aligned
				fixed
				:open="openNav"
				v-model:value="navValue"
			>
				<template #left>
					<img
						src="https://vuesax.com/logos/logo-vuesax-logotipo-vuesax-png-3.png"
						alt=""
					/>
				</template>
				<tu-navbar-group>
					Docs
					<template #items>
						<tu-navbar-item
							:active="navValue == 'guide'"
							id="guide"
						>
							Guide
						</tu-navbar-item>
						<tu-navbar-item :active="navValue == 'docs'" id="docs">
							Documents
						</tu-navbar-item>
						<tu-navbar-item
							:active="navValue == 'components'"
							id="components"
						>
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

		<div class="showcase-component">
			<h4>Tabs:</h4>
			<hr />

			<tu-tabs
				position="top"
				noTransitions
				tabStyle="card"
				v-model="tabName"
			>
				<tu-tab label="Home" name="ho"> Home </tu-tab>
				<tu-tab label="Service" name="se"> Service </tu-tab>
				<tu-tab label="login" name="lo"> Login </tu-tab>
				<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
			</tu-tabs>
			<tu-tabs
				position="top"
				noTransitions
				tabStyle="progress"
				progressWidth="20"
				v-model="tabName"
			>
				<tu-tab label="Home" name="ho"> Home </tu-tab>
				<tu-tab label="Service" name="se"> Service </tu-tab>
				<tu-tab label="login" name="lo"> Login </tu-tab>
				<tu-tab label="Disabled" name="di"> Disabled </tu-tab>
			</tu-tabs>
		</div>
		<div class="showcase-component">
			<h4>Progress:</h4>
			<hr />

			<tu-progress :percent="100" color="primary">primary</tu-progress>
			<tu-progress :percent="90" color="warn">warning</tu-progress>
			<tu-progress :percent="75" color="danger">danger</tu-progress>
			<tu-progress :percent="60" color="success">success</tu-progress>
			<tu-progress :percent="45" color="dark">dark</tu-progress>
			<tu-progress :percent="30" color="rgb(164, 69, 15)"
				>RGB</tu-progress
			>
			<tu-progress :percent="15" color="#24c1a0">HEX</tu-progress>
			<tu-progress :height="12" indeterminate color="#24c1a0"
				>HEX</tu-progress
			>
		</div>
		<div class="showcase-component">
			<h4>Text Area:</h4>
			<hr />
				<tu-textarea  />
				<tu-textarea width="300px" />
				<tu-textarea label="Label in Textarea" height="100px" />
				<tu-textarea counter="20" label="Label in Textarea" height="100px" />
		</div>
		<div class="showcase-component">
			<h4>Table:</h4>
			<hr />
			{{selected}}
			<tu-table
				row-expand
				multi-select
				striped
				size=""
				v-model="selected"
				v-model:numPages="numPages"
				:page="page"
				:pageSize="25"
				:data="universities"
				:columns="columns"
				>
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
					<tu-pagination not-margin  flat v-model="page" :length="numPages" />
				</template>
			</tu-table>
		</div>
		<div class="showcase-component">
			<h4>Tree view component:</h4>
			<hr />
			<tu-tree-view :items="treeItems"
                   :isCheckable="true"
                   :hideGuideLines="false"
                   v-model:checkedItems="treeSelectedItems"/>
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
import {
	NotificationAttributes
} from "./components/tuNotifications";
import {
	Loading as LoadingConstructor,
	LoadingAttributes
} from "./components/tuLoading";
import testComponent from "./components/TestComponent.vue";
import "material-icons/iconfont/material-icons.css";
import axios from "axios";
import { TuHeaderDefn, TuTableContextMenuEntry } from "./components";
import tuTableContextMenuVue from "./components/tuTable/tuTableContextMenu.vue";
import { TuTreeViewItemDefn } from "./components/tuTreeView";

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
	setup (props, context) {
		const active1 = ref(true);
		const checkBox1 = ref(false);
		const checkBox9 = ref(false);
		const checkBox2 = ref(["luis"]);
		const loading = ref(false);
		const sideBar = ref("home");
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
		const selectValue1 = ref(null);
		const page = ref(1);

		const notificationComponent = ref(null);
		const validEmail = computed(function () {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
				inpValue.value
			);
		});

		provide("appRouter", null);
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
			const attrs: LoadingAttributes = {
				target: null,
				color: "dark",
				type: "circles",
				scale: "1.0"
			};

			const load = new LoadingConstructor(attrs);
		};

		const justLoad = function () {
			const notificationAttrs: NotificationAttributes = {
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

			/* new Notification(notificationAttrs);
			notificationAttrs.position = "top-center";
			notificationAttrs.color = "primary";
			notificationAttrs.sticky = true;
			notificationAttrs.flat = false;
			new Notification(notificationAttrs); */
		};

		watch(selectValue, () => {
			console.log(selectValue.value);
		});

		const picked = ref("1");

		watch(picked, () => {
			console.log("picked: " + picked.value);
		});

		const menu : TuTableContextMenuEntry[] = [
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

		const columns : TuHeaderDefn[] = [
			{
				caption: "Action",
				field: "test",
				isComponent: true,
				component: markRaw(tuTableContextMenuVue),
				componentProps: {
					modelValue: menu,
					customIcon: {
						icon: "desktop_windows"
					}
				}
			},
			{
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
				field: "web_pages",
				caption: "Web Page",
				props: {
					sort: true
				}
			},
			{
				field: "something",
				caption: "Undefined Col",
				props: {
					sort: true
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

		const selected = ref([]);
		const tabName = ref("ho");

		function resetOpts () {
			opts.value = ["carols"];
			console.log(opts.value);
		}
		const editStatic = ref("Some Text");
		const universities = shallowRef([]);
		axios.get("http://universities.hipolabs.com/search?country=India").then((response) => {
			const temp = response.data;
			temp.forEach((value) => {
				value.expanded = {
					component: testComponent,
					props: {
						name: value.name
					}
				};
			});
			universities.value = temp;
		});

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
		});

		return {
			treeSelectedItems,
			treeItems,
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
			users
		};
	}
});
</script>

<style>
.showcase-component {
	margin-bottom: 15px;
	margin-left: 30px;
	margin-top: 30px;
}

.tu-select-content {
	margin: 20px;
}
body {
	background-color: white;
}
</style>
