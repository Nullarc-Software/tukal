<template>
  <div class="showcase-component">
    <h3>Popper & Popup Menu:</h3>
    <hr />
    
    <!-- Simple Arrow Test -->
    <div class="demo-section">
      <h4>Simple Arrow Test (Default Arrow)</h4>
      <div class="demo-row">
        <TuPopper placement="bottom">
          <TuButton primary>Test Arrow</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>You should see an arrow</TuPopupItem>
              <TuPopupItem>pointing to the button</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Basic Dropdown Menu (now with default arrows) -->
    <div class="demo-section">
      <h4>Basic Dropdown Menu (with default arrows)</h4>
      <div class="demo-row">
        <TuPopper>
          <TuButton primary>Basic Menu</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Profile</TuPopupItem>
              <TuPopupItem>Settings</TuPopupItem>
              <TuPopupItem divider>Help</TuPopupItem>
              <TuPopupItem>Logout</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper hover>
          <TuButton success>Hover Menu</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Dashboard</TuPopupItem>
              <TuPopupItem>Analytics</TuPopupItem>
              <TuPopupItem>Reports</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Different Placements -->
    <div class="demo-section">
      <h4>Different Placements</h4>
      <div class="demo-grid">
        <TuPopper placement="top">
          <TuButton>Top</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Top Item 1</TuPopupItem>
              <TuPopupItem>Top Item 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper placement="bottom">
          <TuButton>Bottom</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Bottom Item 1</TuPopupItem>
              <TuPopupItem>Bottom Item 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper placement="left">
          <TuButton>Left</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Left Item 1</TuPopupItem>
              <TuPopupItem>Left Item 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper placement="right">
          <TuButton>Right</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Right Item 1</TuPopupItem>
              <TuPopupItem>Right Item 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- With/Without Arrow Control -->
    <div class="demo-section">
      <h4>Arrow Control</h4>
      <div class="demo-row">
        <TuPopper :arrow="false">
          <TuButton warn>No Arrow</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>No arrow on this one</TuPopupItem>
              <TuPopupItem>Clean minimal look</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper placement="top">
          <TuButton danger>Top Arrow (Default)</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Arrow pointing down</TuPopupItem>
              <TuPopupItem>to the button</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper placement="left">
          <TuButton dark>Left Arrow (Default)</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Arrow pointing right</TuPopupItem>
              <TuPopupItem>to the button</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Menu with Disabled Items -->
    <div class="demo-section">
      <h4>Menu with Disabled Items</h4>
      <div class="demo-row">
        <TuPopper>
          <TuButton dark>Options Menu</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Available Option</TuPopupItem>
              <TuPopupItem disabled>Disabled Option</TuPopupItem>
              <TuPopupItem>Another Option</TuPopupItem>
              <TuPopupItem disabled>Also Disabled</TuPopupItem>
              <TuPopupItem divider>Separator</TuPopupItem>
              <TuPopupItem>Last Option</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Menu with Dividers -->
    <div class="demo-section">
      <h4>Menu with Dividers</h4>
      <div class="demo-row">
        <TuPopper>
          <TuButton gradient>File Menu</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>New File</TuPopupItem>
              <TuPopupItem>Open File</TuPopupItem>
              <TuPopupItem divider>Save</TuPopupItem>
              <TuPopupItem>Save As</TuPopupItem>
              <TuPopupItem divider>Export</TuPopupItem>
              <TuPopupItem>Import</TuPopupItem>
              <TuPopupItem dividerBottom>Recent Files</TuPopupItem>
              <TuPopupItem>Exit</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Custom Offset -->
    <div class="demo-section">
      <h4>Custom Offset</h4>
      <div class="demo-row">
        <TuPopper offsetX="20" offsetY="20">
          <TuButton flat primary>Custom Offset</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Offset Menu 1</TuPopupItem>
              <TuPopupItem>Offset Menu 2</TuPopupItem>
              <TuPopupItem>Offset Menu 3</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Auto Close Menu -->
    <div class="demo-section">
      <h4>Auto Close Menu Items</h4>
      <div class="demo-row">
        <TuPopper>
          <TuButton border primary>Auto Close Menu</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem onClickClose>Close on Click 1</TuPopupItem>
              <TuPopupItem onClickClose>Close on Click 2</TuPopupItem>
              <TuPopupItem>Stay Open</TuPopupItem>
              <TuPopupItem onClickClose>Close on Click 3</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Timeout Menu -->
    <div class="demo-section">
      <h4>Auto Hide Menu (3 seconds)</h4>
      <div class="demo-row">
        <TuPopper :timeout="3000">
          <TuButton border success>Timeout Menu</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>This menu will</TuPopupItem>
              <TuPopupItem>auto-close after</TuPopupItem>
              <TuPopupItem>3 seconds</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Different Button Styles with Menus -->
    <div class="demo-section">
      <h4>Different Button Styles</h4>
      <div class="demo-row">
        <TuPopper>
          <TuButton shadow>Shadow Button</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Shadow Menu 1</TuPopupItem>
              <TuPopupItem>Shadow Menu 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper>
          <TuButton relief>Relief Button</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Relief Menu 1</TuPopupItem>
              <TuPopupItem>Relief Menu 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper>
          <TuButton floating>Floating Button</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Floating Menu 1</TuPopupItem>
              <TuPopupItem>Floating Menu 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper>
          <TuButton transparent>Transparent</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Transparent Menu 1</TuPopupItem>
              <TuPopupItem>Transparent Menu 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Icon Buttons with Menus -->
    <div class="demo-section">
      <h4>Icon Buttons with Menus</h4>
      <div class="demo-row">
        <TuPopper>
          <TuButton square primary>
            <tu-icon>person</tu-icon>
          </TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>View Profile</TuPopupItem>
              <TuPopupItem>Edit Profile</TuPopupItem>
              <TuPopupItem divider>Change Password</TuPopupItem>
              <TuPopupItem>Logout</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper placement="top">
          <TuButton only-icon success>
            <tu-icon>person</tu-icon>
          </TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Quick Action 1</TuPopupItem>
              <TuPopupItem>Quick Action 2</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>

        <TuPopper hover>
          <TuButton square warn>
            <tu-icon>person</tu-icon>
          </TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Hover Item 1</TuPopupItem>
              <TuPopupItem>Hover Item 2</TuPopupItem>
              <TuPopupItem>Hover Item 3</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Complex Menu Example -->
    <div class="demo-section">
      <h4>Complex Menu Example</h4>
      <div class="demo-row">
        <TuPopper arrow placement="bottom-start">
          <TuButton size="lg" primary>
            <tu-icon>person</tu-icon>
            User Menu
          </TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>👤 My Profile</TuPopupItem>
              <TuPopupItem>⚙️ Account Settings</TuPopupItem>
              <TuPopupItem>📊 Dashboard</TuPopupItem>
              <TuPopupItem divider>📝 Create New</TuPopupItem>
              <TuPopupItem>📁 My Projects</TuPopupItem>
              <TuPopupItem>👥 Team</TuPopupItem>
              <TuPopupItem disabled>🔒 Admin Panel</TuPopupItem>
              <TuPopupItem divider>❓ Help & Support</TuPopupItem>
              <TuPopupItem onClickClose>🚪 Sign Out</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
      </div>
    </div>

    <!-- Events Demo -->
    <div class="demo-section">
      <h4>Events Demo</h4>
      <div class="demo-row">
        <TuPopper @show:popper="onPopperShow" @hide:popper="onPopperHide">
          <TuButton danger>Events Demo</TuButton>
          <template #content>
            <TuPopupMenu>
              <TuPopupItem>Event Item 1</TuPopupItem>
              <TuPopupItem>Event Item 2</TuPopupItem>
              <TuPopupItem>Event Item 3</TuPopupItem>
            </TuPopupMenu>
          </template>
        </TuPopper>
        <div class="event-log">
          Last event: {{ lastEvent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TuButton } from "../components/tuButton";
import { TuPopper, TuPopupMenu, TuPopupItem } from "../components/tuPopper";
import { TuIcon } from "../components/tuIcon";

const lastEvent = ref<string>("None");

const onPopperShow = () => {
	lastEvent.value = "Popper Shown";
	console.log("Popper shown");
};

const onPopperHide = () => {
	lastEvent.value = "Popper Hidden";
	console.log("Popper hidden");
};
</script>

<style scoped>
.showcase-component {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.demo-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
  font-weight: 600;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
  max-width: 600px;
}

.event-log {
  padding: 8px 12px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  border-left: 3px solid #2196F3;
}

hr {
  border: none;
  height: 1px;
  background: #e0e0e0;
  margin: 20px 0;
}

h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
  font-weight: 700;
}
</style>
