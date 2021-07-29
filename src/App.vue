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
            <div style="width: 200px; height:200px; position:relative" ref="loadingDiv" />
			<tu-button success @click="justShowLoading"> Open Loading </tu-button>
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
				<tu-card
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
			<tu-checkbox v-model:value="checkBox1">{{ checkBox1 }}</tu-checkbox>
			<tu-checkbox v-model:value="checkBox1">
				<template v-slot:icon>
					<tu-icon>settings</tu-icon>
				</template>
				{{ checkBox1 }}
			</tu-checkbox>
			<div class="">
				<ul class="centerx">
					<li class="modelx">
						{{ opts }}
					</li>
					<li>
						<tu-checkbox v-model:value="opts" val="luis"
							>Luis</tu-checkbox
						>
					</li>
					<li>
						<tu-checkbox v-model:value="opts" val="carols"
							>Carols</tu-checkbox
						>
					</li>
					<li>
						<tu-checkbox v-model:value="opts" val="summer"
							>Summer</tu-checkbox
						>
					</li>
					<li>
						<tu-checkbox v-model:value="opts" val="lyon"
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
			<tu-dialog width="550px" v-model:value="activeDialog">
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
				v-model:value="activeDialog1"
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
			<tu-input label-placeholder="Country" v-model="value" />
			<br />
			<tu-input v-model="value1" placeholder="User name">
				<template #icon>
					<tu-icon>person</tu-icon>
				</template>
			</tu-input>

			<tu-input
				type="password"
				icon-after
				v-model="value2"
				placeholder="Password"
			>
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
			<tu-input loading v-model="value" placeholder="Name" />
			<div style="margin: 10px">
				<tu-input type="text" v-model="value1" label="Text" />
				<tu-input type="password" v-model="value2" label="Password" />
				<tu-input type="search" v-model="value3" label="Search" />
				<tu-input type="number" v-model="value4" label="Number" />
				<tu-input type="url" v-model="value5" label="Url" />
				<tu-input type="time" v-model="value6" label="time" />
				<tu-input type="date" v-model="value7" label="Date" />
			</div>
			<div style="margin: 10px">
				<tu-input
					primary
					v-model="value"
					state="primary"
					placeholder="Primary"
				/>

				<tu-input
					state="success"
					success
					v-model="value2"
					placeholder="Success Icon"
				>
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input
					state="danger"
					danger
					icon-after
					v-model="value2"
					placeholder="Danger icon after"
				>
					<template #icon>
						<tu-icon>person</tu-icon>
					</template>
				</tu-input>

				<tu-input
					warn
					state="warn"
					v-model="value4"
					placeholder="Label Warn"
					label="Warn"
				/>

				<tu-input
					dark
					state="dark"
					v-model="value5"
					label-placeholder="Dark"
				/>

				<tu-input border v-model="value" placeholder="Name" />

				<tu-input
					color="#7d33ff"
					border
					type="password"
					v-model="value2"
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
					v-model="value3"
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
			<tu-select
				inline
				label="Group"
				placeholder="Group"
				v-model="value1"
			>
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
			<tu-popper arrow>
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
			<tu-switch v-model="active"> Subscribe </tu-switch>
			<tu-switch v-model="active2">
				<template #off> Off </template>
				<template #on> On </template>
			</tu-switch>
			<tu-switch v-model="active3">
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

			<tu-pagination progress not-margin v-model="page" :length="20" />
			<tu-pagination
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

			<tu-tabs position="top" tabStyle="card">
				<tu-tab label="Home">
					Home
				</tu-tab>
				<tu-tab label="Service">
					Service
				</tu-tab>
				<tu-tab label="login">
					Login
				</tu-tab>
				<tu-tab label="Disabled">
					Disabled
				</tu-tab>				
			</tu-tabs>
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
import { tuButton } from "./components/tuButton";
import {
    notification,
    NotificationAttributes
} from "./components/tuNotifications";
import Popper from "vue3-popper";
import { loading as LoadingConstructor, LoadingAttributes } from "./components/tuLoading";
import 'material-icons/iconfont/material-icons.css';
 
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
        let loadingDiv = ref();
        const  justShowLoading = function() {
            let attrs : LoadingAttributes = {
                target: null,
                color: 'dark',
                type: "circles",
                scale: "1.0"
            };

            const load = new LoadingConstructor(attrs);
           
        }

		let justLoad = function () {
			let notificationAttrs: NotificationAttributes = {
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

.tu-select-content {
	margin: 20px;
}
body {
	background-color: white;
}
</style>
