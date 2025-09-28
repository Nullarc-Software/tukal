<template>
  <div class="showcase-component">
    <h3>Buttons:</h3>
    <hr />
    <div style="display: flex; margin: 10px">
      <TuButton @click="buttonActive = !buttonActive" :loading="loading" flat>
        {{ buttonActive ? "true" : "false" }}
      </TuButton>
      <TuButton :active="buttonActive" @click="showLoadingBtn">
        active
      </TuButton>
      <TuButton shadow> shadow </TuButton>
      <TuButton transparent> transparent </TuButton>
      <TuButton relief> relief </TuButton>
      <TuButton floating> floating </TuButton>
    </div>
    <div style="display: flex; margin: 10px">
      <TuButton primary> primary </TuButton>
      <TuButton success> success </TuButton>
      <TuButton danger> danger </TuButton>
      <TuButton warn> warn </TuButton>
      <TuButton dark> dark </TuButton>
      <TuButton color="#7d33ff" dark> color </TuButton>
      <TuButton gradient> gradient </TuButton>
    </div>
    <div style="display: flex; margin: 10px">
      <TuButton border> Border </TuButton>
      <TuButton gradient border> gradient border </TuButton>
      <TuButton flat border primary> flat border primary </TuButton>
      <TuButton border primary> Border primary </TuButton>
      <TuButton border success> Border success </TuButton>
      <TuButton border danger> Border danger </TuButton>
      <TuButton border warn> Border warn </TuButton>
      <TuButton border dark> Border dark </TuButton>
    </div>
    <div style="display: flex; margin: 10px">
      <TuButton flat> flat </TuButton>
      <TuButton flat primary> flat primary </TuButton>
      <TuButton flat success> flat success </TuButton>
      <TuButton flat danger> flat danger </TuButton>
      <TuButton flat warn> flat warn </TuButton>
      <TuButton flat dark> flat dark </TuButton>
    </div>
    <div style="display: flex; margin: 10px; align-items: center; gap: 8px">
      <TuButton size="xl"> xl </TuButton>
      <TuButton size="lg"> lg </TuButton>
      <TuButton> default (md) </TuButton>
      <TuButton size="sm"> sm </TuButton>
      <TuButton size="xs"> xs </TuButton>
    </div>
    <div style="display: flex; margin: 10px; align-items: center; gap: 8px">
      <TuButton circle size="xl">
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton circle size="lg" warn>
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton circle>
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton circle size="sm" success>
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton circle size="xs" danger>
        <tu-icon>person</tu-icon>
      </TuButton>
    </div>
    <div style="display: flex; margin: 10px; align-items: center; gap: 8px">
      <TuButton square size="xl">
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton square size="lg" warn>
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton square>
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton square size="sm" success>
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton square size="xs" danger>
        <tu-icon>person</tu-icon>
      </TuButton>
    </div>
    <div style="display: flex; margin: 10px; align-items: center">
      <TuButton>
        <tu-icon>person</tu-icon>
        Icon Left
      </TuButton>
      <TuButton icon-after>
        Icon Right
        <tu-icon>person</tu-icon>
      </TuButton>
      <TuButton only-icon>
        <tu-icon>person</tu-icon>
      </TuButton>
    </div>
    <div style="display: flex; margin: 10px">
      <TuButton upload>
        <tu-icon>person</tu-icon>
        upload
      </TuButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { tuButton as TuButton } from "../components/tuButton";

const buttonActive = ref(false);
const loading = ref(false);

const showLoadingBtn = () => {
	loading.value = true;
	setTimeout(() => {
		loading.value = false;
	}, 2000);
};
</script>
