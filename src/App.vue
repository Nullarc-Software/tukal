<template>
	<div style="position: relative">
		<h1 style="text-align: cente; margin-top: 50px">
			Vuesax3 (Typescript + composition API Demo) - TheCelebrimbor -
			Github
		</h1>
		<div class="showcase-component">
			<h3>Buttons:</h3>
			<hr />
			<vs-button success @click="justLoad"> Open Notification </vs-button>
            <div style="width: 200px; height:200px; position:relative" ref="loadingDiv" />
			<vs-button success @click="justShowLoading"> Open Loading </vs-button>
			<vs-button
				type="filled"
				color="danger"
				textColor="#000"
				style="margin-right: 10px"
			>
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
			<vs-button circle transparent style="margin-right: 10px">
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
			<vs-button border color="primary" style="margin-right: 10px">
				Border Only
			</vs-button>
			<vs-button flat color="primary" style="margin-right: 10px">
				Flat
			</vs-button>
			<vs-button gradient color="primary" style="margin-right: 10px">
				Gradient
			</vs-button>
			<vs-button relief color="primary" style="margin-right: 10px">
				Relief
			</vs-button>
			<vs-button
				:loading="loading"
				@click="loading = true"
				type="filled"
				color="primary"
				style="margin-right: 10px"
			>
				Loading
			</vs-button>
			<vs-button
				upload
				type="border"
				color="danger"
				style="margin-right: 10px"
			>
				Upload
			</vs-button>
			<vs-button
				upload
				type="border"
				color="#00FF00"
				style="margin-right: 10px"
			>
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
			<vs-button-group fixed-height="40px">
				<vs-button> One </vs-button>
				<vs-button> Two </vs-button>
				<vs-button> Three </vs-button>
				<vs-button> four </vs-button>
			</vs-button-group>
			<br />
			<vs-button-group>
				<vs-button type="border">
					<vs-icon>edit</vs-icon>
				</vs-button>
				<vs-button type="border">
					<vs-icon>format_color_text</vs-icon>
				</vs-button>
				<vs-button type="border">
					<vs-icon>format_align_center</vs-icon>
				</vs-button>
				<vs-button type="border">
					<vs-icon>format_size</vs-icon>
				</vs-button>
			</vs-button-group>
			<br />
			<vs-button-group>
				<vs-button type="border">
					<vs-icon>edit</vs-icon>
				</vs-button>
				<div style="display: inline-block">aaabbb</div>
				<vs-button type="border">
					<vs-icon>format_align_center</vs-icon>
				</vs-button>
				<vs-button type="border">
					<vs-icon>format_size</vs-icon>
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
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat
			</vs-alert>
			<div class="centerx">
				<vs-button
					@click="active1 = !active1"
					color="primary"
					type="filled"
					>{{ !active1 ? "Open Alert" : "Close Alert" }}</vs-button
				>
				<vs-alert v-model:active="active1" closable close-icon="close">
					Lorem ip sum dolor sit amet, consectetur adipisicing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat
				</vs-alert>
			</div>
		</div>
		<div class="showcase-component">
			<h3>Avatar:</h3>
			<hr />
			<vs-avatar text="Celebrimbor" />
			<vs-avatar size="large">
				<img
					src="https://avatars.githubusercontent.com/u/13927773?v=4"
				/>
			</vs-avatar>
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
			<vs-card-group>
				<vs-card
					type="2"
					v-for="(card, key) in 6"
					:key="key"
					@click="handleClick"
				>
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
						<vs-button danger icon>
							<vs-icon>favorite</vs-icon>
						</vs-button>
						<vs-button class="btn-chat" shadow primary>
							<vs-icon>chat</vs-icon>
							<span class="span"> 54 </span>
						</vs-button>
					</template>
				</vs-card>
			</vs-card-group>
		</div>
		<div class="showcase-component">
			<h3>CheckBoxes:</h3>
			<hr />
			<vs-checkbox v-model:value="checkBox1">{{ checkBox1 }}</vs-checkbox>
			<vs-checkbox v-model:value="checkBox1">
				<template v-slot:icon>
					<vs-icon>settings</vs-icon>
				</template>
				{{ checkBox1 }}
			</vs-checkbox>
			<div class="">
				<ul class="centerx">
					<li class="modelx">
						{{ opts }}
					</li>
					<li>
						<vs-checkbox v-model:value="opts" val="luis"
							>Luis</vs-checkbox
						>
					</li>
					<li>
						<vs-checkbox v-model:value="opts" val="carols"
							>Carols</vs-checkbox
						>
					</li>
					<li>
						<vs-checkbox v-model:value="opts" val="summer"
							>Summer</vs-checkbox
						>
					</li>
					<li>
						<vs-checkbox v-model:value="opts" val="lyon"
							>Lyon</vs-checkbox
						>
					</li>
				</ul>
			</div>
		</div>
		<!-- <div class="showcase-component">
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
		</div> -->
		<div class="showcase-component" style="margin-top: 100px">
			<h3>Collapse:</h3>
			<hr />
			<vs-collapse accordion type="border">
				<vs-collapse-item>
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
				</vs-collapse-item>
				<vs-collapse-item>
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
				</vs-collapse-item>
				<vs-collapse-item>
					<template v-slot:header> Collapse item 3 </template>
					Suspendisse aliquet condimentum diam, sed aliquam nisl
					dapibus et. Aliquam euismod ullamcorper dolor eu
				</vs-collapse-item>
				<vs-collapse-item>
					<template v-slot:header> Collapse item 4 </template>
					Suspendisse aliquet condimentum diam, sed aliquam nisl
					dapibus et. Aliquam euismod ullamcorper dolor eu imperdiet.
					Nullam eget odio at magna gravida suscipit sed vestibulum
					odio. Maecenas porta elit vel lectus molestie, eget aliquam
					enim feugiat. Vivamus nec faucibus nisl. Nunc venenatis
					tempus finibus.
				</vs-collapse-item>
			</vs-collapse>
		</div>
		<div class="showcase-component">
			<h3 :test="null">Dialog:</h3>
			<hr />
			<vs-button @click="activeDialog = !activeDialog"
				>Open Dialog</vs-button
			>
			<vs-dialog width="550px" v-model:value="activeDialog">
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
					<vs-button
						width="100px"
						style="margin: 5px"
						@click="activeDialog = false"
						block
					>
						Ok
					</vs-button>
					<vs-button type="flat" color="secondary" width="100px">
						Cancel
					</vs-button>
				</template>
			</vs-dialog>
			<vs-button @click="activeDialog1 = !activeDialog1"
				>Open Dialog</vs-button
			>
			<vs-dialog
				square
				scroll
				prevent-close
				width="550px"
				v-model:value="activeDialog1"
			>
				<template v-slot:header>
					<h4>Welcome to <b>Vuesax3</b></h4>
					<vs-divider color="rgba(0,0,0,0.5)" />
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
					<vs-button
						width="100px"
						style="margin: 5px"
						@click="activeDialog1 = false"
					>
						Ok
					</vs-button>
					<vs-button type="flat" color="secondary" width="100px">
						Cancel
					</vs-button>
				</template>
			</vs-dialog>
		</div>
		<div class="showcase-component">
			<h3>Input:</h3>
			<hr />
			<vs-input
				block
				id="inp1"
				v-model="inpValue"
				placeholder="Name"
				style="margin-top: 10px"
                maxlength="15"
			/>
			<br />
			<vs-input
				label="Full Name"
				v-model:value="inpValue"
				placeholder="Evan You"
			/>
			<br />
			<vs-input label-placeholder="Country" v-model="value" />
			<br />
			<vs-input v-model="value1" placeholder="User name">
				<template #icon>
					<vs-icon>person</vs-icon>
				</template>
			</vs-input>

			<vs-input
				type="password"
				icon-after
				v-model="value2"
				placeholder="Password"
			>
				<template #icon>
					<vs-icon>person</vs-icon>
				</template>
			</vs-input>

			<br />
			<br />
			<vs-input
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
			</vs-input>
			<br />
			<vs-input loading v-model="value" placeholder="Name" />
			<div style="margin: 10px">
				<vs-input type="text" v-model="value1" label="Text" />
				<vs-input type="password" v-model="value2" label="Password" />
				<vs-input type="search" v-model="value3" label="Search" />
				<vs-input type="number" v-model="value4" label="Number" />
				<vs-input type="url" v-model="value5" label="Url" />
				<vs-input type="time" v-model="value6" label="time" />
				<vs-input type="date" v-model="value7" label="Date" />
			</div>
			<div style="margin: 10px">
				<vs-input
					primary
					v-model="value"
					state="primary"
					placeholder="Primary"
				/>

				<vs-input
					state="success"
					success
					v-model="value2"
					placeholder="Success Icon"
				>
					<template #icon>
						<vs-icon>person</vs-icon>
					</template>
				</vs-input>

				<vs-input
					state="danger"
					danger
					icon-after
					v-model="value2"
					placeholder="Danger icon after"
				>
					<template #icon>
						<vs-icon>person</vs-icon>
					</template>
				</vs-input>

				<vs-input
					warn
					state="warn"
					v-model="value4"
					placeholder="Label Warn"
					label="Warn"
				/>

				<vs-input
					dark
					state="dark"
					v-model="value5"
					label-placeholder="Dark"
				/>

				<vs-input border v-model="value" placeholder="Name" />

				<vs-input
					color="#7d33ff"
					border
					type="password"
					v-model="value2"
					placeholder="Password"
				>
					<template #icon>
						<vs-icon>person</vs-icon>
					</template>
				</vs-input>

				<vs-input
					border
					warn
					type="email"
					icon-after
					v-model="value3"
					label-placeholder="Address"
				>
					<template #icon>
						<vs-icon>person</vs-icon>
					</template>
				</vs-input>
			</div>
		</div>
		<div class="showcase-component">
			<h4>Radio:</h4>
			<hr />

			<vs-radio v-model="picked" val="1">
				<template #icon>
					<vs-icon>person</vs-icon>
				</template>
				Option A
			</vs-radio>
			<vs-radio v-model="picked" val="2"> Option B </vs-radio>
			<vs-radio disabled v-model="picked" val="3"> Option C </vs-radio>
			<vs-radio v-model="picked" val="4"> Option D </vs-radio>
		</div>
		<div class="showcase-component">
			<h4>Select:</h4>
			<hr />

			<vs-select
				block
				multiple
				label-placeholder="Label-placeholder"
				v-model="selectValue"
				style="margin: 10px"
				filter
			>
				<vs-option label="Test" value="1"> Test </vs-option>
				<vs-option label="Test1" value="2"> Test1 </vs-option>
				<vs-option label="Javascript" value="3"> Javascript </vs-option>
				<vs-option disabled label="Sass" value="4"> Sass </vs-option>
				<vs-option label="Typescript" value="5"> Typescript </vs-option>
				<vs-option label="Webpack" value="6"> Webpack </vs-option>
				<vs-option label="Nodejs" value="7"> Nodejs </vs-option>
			</vs-select>

			<vs-select
				inline
				placeholder="Label-placeholder for something soooooo longggg Label-placeholder for something soooooo longggg"
				v-model="selectValue1"
				style="margin: 10px"
				filter
			>
				<vs-option label="Test" value="1"> Test </vs-option>
				<vs-option label="Test1" value="2"> Test1 </vs-option>
				<vs-option label="Javascript" value="3"> Javascript </vs-option>
				<vs-option disabled label="Sass" value="4"> Sass </vs-option>
				<vs-option label="Typescript" value="5"> Typescript </vs-option>
				<vs-option label="Webpack" value="6"> Webpack </vs-option>
				<vs-option label="Nodejs" value="7"> Nodejs </vs-option>
			</vs-select>

			<vs-select
				inline
				label-placeholder="Label-placeholder"
				v-model="selectValue"
				style="margin: 10px"
			>
				<vs-option label="Test" value="1"> Test </vs-option>
				<vs-option label="Test1" value="2"> Test1 </vs-option>
				<vs-option label="Javascript" value="3"> Javascript </vs-option>
				<vs-option disabled label="Sass" value="4"> Sass </vs-option>
				<vs-option label="Typescript" value="5"> Typescript </vs-option>
				<vs-option label="Webpack" value="6"> Webpack </vs-option>
				<vs-option label="Nodejs" value="7"> Nodejs </vs-option>
			</vs-select>

			<vs-select
				inline
				dropdown
				placeholder="Dropdown"
				v-model="selectValue2"
				style="margin: 10px"
			>
				<vs-option label="Test" value="1"> Test </vs-option>
				<vs-option label="Test1" value="2"> Test1 </vs-option>
				<vs-option label="Javascript" value="3">
					Javascript <vs-icon>home</vs-icon>
				</vs-option>
				<vs-option disabled label="Sass" value="4"> Sass </vs-option>
				<vs-option label="Typescript" value="5"> Typescript </vs-option>
				<vs-option label="Webpack" value="6"> Webpack </vs-option>
				<vs-option label="Nodejs" value="7"> Nodejs </vs-option>
			</vs-select>
			<vs-select
				inline
				label="Group"
				placeholder="Group"
				v-model="value1"
			>
				<vs-option-group>
					<template v-slot:title> Vuejs </template>
					<vs-option label="Vuesax" value="1"> Vuesax </vs-option>
					<vs-option label="Vue" value="2"> Vue </vs-option>
					<vs-option label="Javascript" value="3">
						Javascript
					</vs-option>
				</vs-option-group>
				<vs-option-group>
					<template v-slot:title> Others </template>
					<vs-option label="Sass" value="4"> Sass </vs-option>
					<vs-option label="Typescript" value="5">
						Typescript
					</vs-option>
					<vs-option label="Webpack" value="6"> Webpack </vs-option>
					<vs-option label="Nodejs" value="7"> Nodejs </vs-option>
				</vs-option-group>
			</vs-select>

			<vs-select
				inline
				v-for="(color, i) in colors"
				:key="i"
				:state="color.color"
				:label="color.color"
				placeholder="Select"
				v-model="color.value"
			>
				<vs-option value="1"> Vuesax </vs-option>
				<vs-option label="Vue" value="2"> Vue </vs-option>
				<vs-option label="Javascript" value="3"> Javascript </vs-option>
				<vs-option label="Sass" value="4"> Sass </vs-option>
				<vs-option label="Typescript" value="5"> Typescript </vs-option>
				<vs-option label="Webpack" value="6"> Webpack </vs-option>
				<vs-option label="Nodejs" value="7"> Nodejs </vs-option>
			</vs-select>
		</div>
		<div class="showcase-component">
			<h4>Dropdown:</h4>
			<hr />
			aaa
			<vs-popper arrow>
				<button>click me</button>
				<template #content>
					<vs-popup-menu>
						<vs-popup-item> Test </vs-popup-item>
						<vs-popup-item> Test 1 </vs-popup-item>
						<vs-popup-item divider> Test 2 </vs-popup-item>
					</vs-popup-menu>
				</template>
			</vs-popper>
		</div>
		<div class="showcase-component">
			<h4>Sidebar:</h4>
			<hr />
			<vs-button @click="isOpen = !isOpen"> Toggle Sidebar </vs-button>
			<vs-sidebar reduce v-model:value="sideBar" :open="isOpen">
				<template #logo>
					<img
						src="https://vuesax.com/logos/logo-vuesax-logotipo-vuesax-png-3.png"
						alt=""
					/>
				</template>
				<template #header> Endpoint Nexus </template>
				<vs-sidebar-item id="home">
					<template v-slot:icon>
						<vs-icon>person</vs-icon>
					</template>
					Home
				</vs-sidebar-item>
				<vs-sidebar-item id="market">
					<template #icon>
						<vs-icon>view_module</vs-icon>
					</template>
					Market Overview
				</vs-sidebar-item>
				<vs-sidebar-item id="Music">
					<template #icon>
						<vs-icon>music_note</vs-icon>
					</template>
					Music
				</vs-sidebar-item>
				<vs-sidebar-group>
					<template #header>
						<vs-sidebar-item arrow>
							<template #icon>
								<vs-icon>music_note</vs-icon>
							</template>
							Social media
						</vs-sidebar-item>
					</template>

					<vs-sidebar-item id="Instagram">
						<template #icon>
							<vs-icon>music_note</vs-icon>
						</template>
						Instagram
					</vs-sidebar-item>
					<vs-sidebar-item id="twitter">
						<template #icon>
							<vs-icon>music_note</vs-icon>
						</template>
						Twitter
					</vs-sidebar-item>
					<vs-sidebar-item id="Facebook">
						<template #icon>
							<vs-icon>facebook</vs-icon>
						</template>
						Facebook
					</vs-sidebar-item>
				</vs-sidebar-group>
				<template #footer>
					<vs-row justify="space-between">
						<vs-avatar
							badge-color="danger"
							badge-position="top-right"
						>
							<i class="bx bx-bell"></i>

							<template #badge> 28 </template>
						</vs-avatar>

						<vs-avatar>
							<img src="/avatars/avatar-5.png" alt="" />
						</vs-avatar>
					</vs-row>
				</template>
			</vs-sidebar>
		</div>
		<div class="showcase-component">
			<h4>Switch:</h4>
			<hr />
			<vs-switch v-model="active"> Suscribe </vs-switch>
			<vs-switch v-model="active2">
				<template #off> Off </template>
				<template #on> On </template>
			</vs-switch>
			<vs-switch v-model="active3">
				<template #off> default </template>
				<template #on> Premium </template>
			</vs-switch>
		</div>

		<div class="showcase-component">
			<h4>Navbar:</h4>
			<hr />
			<vs-navbar
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
				<vs-navbar-group>
					Docs
					<template #items>
						<vs-navbar-item
							:active="navValue == 'guide'"
							id="guide"
						>
							Guide
						</vs-navbar-item>
						<vs-navbar-item :active="navValue == 'docs'" id="docs">
							Documents
						</vs-navbar-item>
						<vs-navbar-item
							:active="navValue == 'components'"
							id="components"
						>
							Components
						</vs-navbar-item>
					</template>
				</vs-navbar-group>
				<vs-navbar-item :active="navValue == 'Github'" id="Github">
					Github
				</vs-navbar-item>
				<vs-navbar-item :active="navValue == 'Discord'" id="Discord">
					Discord
				</vs-navbar-item>
				<vs-navbar-item :active="navValue == 'Twitter'" id="Twitter">
					Twitter
				</vs-navbar-item>
				<vs-navbar-item :active="navValue == 'Medium'" id="Medium">
					Medium
				</vs-navbar-item>
			</vs-navbar>
			<vs-button @click="openNav = !openNav"> Toggle Navbar </vs-button>
		</div>

		<div class="showcase-component">
			<h4>Pagination:</h4>
			<hr />

			<vs-pagination progress not-margin v-model="page" :length="20" />
			<vs-pagination
				progress
				dark
				flat
				not-margin
				v-model="page"
				:length="20"
			/>
		</div>

		<div class="showcase-component">
			<h4>Tabs:</h4>
			<hr />

			<vs-tabs color="success" position="left">
				<vs-tab label="Home">
					Home
				</vs-tab>
				<vs-tab label="Service">
					Service
				</vs-tab>
				<vs-tab label="login">
					Login
				</vs-tab>
				<vs-tab disabled label="Disabled">
					Disabled
				</vs-tab>				
			</vs-tabs>
		</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	provide,
	reactive,
	ref,
	watch,
} from "@vue/runtime-core";
import * as components from "./components";
import { vsButton } from "./components/vsButton";
import notification, {
	notificationAttributes,
} from "./components/vsNotifications";
import Popper from "vue3-popper";
import { LoadingParams } from "./components/vsLoading";
import {default as LoadingConstructor } from "./components/vsLoading";

export default defineComponent({
	components: {
		...components,
		Popper,
	},
	data: () => ({
		colors: [
			{
				color: "primary",
				value: "1",
			},
			{
				color: "danger",
				value: "1",
			},
			{
				color: "success",
				value: "2",
			},
			{
				color: "warn",
				value: "3",
			},
			{
				color: "dark",
				value: "4",
			},
		],
	}),
	setup(props, context) {
		let active1 = ref(true);
		let checkBox1 = ref(false);
		let checkBox2 = ref(["luis"]);
		let loading = ref(false);
		let sideBar = ref("home");
		let activeDialog = ref(false);
		let activeDialog1 = ref(false);
		let activeDialog2 = ref(false);
		let notifShow = ref(false);
		let isOpen = ref(false);
		let openNav = ref(false);
		let opts: any = reactive([]);
		let inpValue = ref("");
		let navValue = ref("guide");
		let selectValue = ref([]);
		let selectValue2 = ref("1");
		let selectValue1 = ref(null);
		let page = ref(1);

		let notificationComponent = ref(null);
		let validEmail = computed(function () {
			return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
				inpValue.value
			);
		});

		provide("appRouter", null);

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
        let loadingDiv = ref();
        const  justShowLoading = function() {
            let attrs : LoadingParams = {
                target: null,
                color: 'dark',
                type: "circles",
                scale: "1.0"
            };

            const load = new LoadingConstructor(attrs);
           
        }

		let justLoad = function () {
			let notificationAttrs: notificationAttributes = {
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
				progressAuto: true,
			};

			let notif = new notification(notificationAttrs);
			notificationAttrs.position = "top-center";
			notificationAttrs.color = "primary";
			notificationAttrs.sticky = true;
			notificationAttrs.flat = false;
			new notification(notificationAttrs);
		};

		watch(selectValue, () => {
			console.log(selectValue.value);
		});

		let picked = ref("1");

		watch(picked, () => {
			console.log("picked: " + picked);
		});

		return {
			active1,
			checkBox1,
			checkBox2,
			justLoad,
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
            justShowLoading
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

.vs-select-content {
	margin: 20px;
}
body {
	background-color: white;
}
</style>
