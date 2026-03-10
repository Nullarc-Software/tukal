<template>
  <div class="showcase-component">
    <h3>Avatars:</h3>
    <hr />
    
    <!-- Basic Avatars -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar>
        <img src="/avatars/avatar.png" alt="Avatar" />
      </TuAvatar>
      <TuAvatar text="JD" />
      <TuAvatar text="AB" color="success" />
      <TuAvatar text="CD" color="danger" />
      <TuAvatar text="EF" color="warn" />
    </div>

    <!-- Sizes -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar size="30" text="XS" />
      <TuAvatar size="40" text="SM" />
      <TuAvatar size="50" text="MD" />
      <TuAvatar size="60" text="LG" />
      <TuAvatar size="80" text="XL" />
    </div>

    <!-- Shapes -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar text="CR" circle />
      <TuAvatar text="SQ" square />
      <TuAvatar text="DF" />
    </div>

    <!-- With Badges -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar text="BD" badge>
        <template #badge>
          <div style="background: red; width: 10px; height: 10px; border-radius: 50%;"></div>
        </template>
      </TuAvatar>
      <TuAvatar text="WR" writing />
      <TuAvatar text="ON" badge badge-color="success" />
    </div>

    <!-- History/Story Style -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar text="ST" history />
      <TuAvatar text="GR" history history-gradient />
      <TuAvatar text="LD" loading />
    </div>

    <!-- Interactive -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar text="PT" pointer @click="showMessage('Avatar clicked!')" />
      <TuAvatar text="IC" pointer>
        <template #icons>
          <tu-icon>verified</tu-icon>
        </template>
      </TuAvatar>
    </div>

    <!-- Avatar Group -->
    <div style="margin: 20px 0;">
      <h4>Avatar Group:</h4>
      <TuAvatar-group>
        <TuAvatar text="A1" />
        <TuAvatar text="B2" color="success" />
        <TuAvatar text="C3" color="danger" />
        <TuAvatar text="D4" color="warn" />
        <TuAvatar text="E5" color="dark" />
        <TuAvatar text="F6" />
        <TuAvatar text="G7" />
      </tu-avatar-group>
    </div>

    <!-- Avatar Group with Max -->
    <div style="margin: 20px 0;">
      <h4>Avatar Group (Max 3):</h4>
      <TuAvatar-group max="3">
        <TuAvatar text="X1" />
        <TuAvatar text="Y2" color="success" />
        <TuAvatar text="Z3" color="danger" />
        <TuAvatar text="A4" color="warn" />
        <TuAvatar text="B5" color="dark" />
      </tu-avatar-group>
    </div>

    <!-- Colors -->
    <div style="display: flex; margin: 10px; align-items: center; gap: 15px;">
      <TuAvatar text="PR" color="primary" />
      <TuAvatar text="SC" color="success" />
      <TuAvatar text="DG" color="danger" />
      <TuAvatar text="WN" color="warn" />
      <TuAvatar text="DK" color="dark" />
      <TuAvatar text="CT" color="#7d33ff" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TuAvatar } from "../components/tuAvatar";

const showMessage = (message: string) => {
	alert(message);
};
</script>
