<template>
  <div :class="type === 'alternative' ? 'alter' : 'default'">
    <div class="center-line">
    </div>
    <div class="row" v-for="(ev, index) in events" :key="index" :class="parseInt(index) % 2 === 0 ? 'row-1' : 'row-2'">
      <section :style="categoryColor(ev)">
        <tu-icon class="icon" :style="categoryColorIcon(ev)"> {{ ev.icon }}</tu-icon>
        <div class="details">
          <span class="title-date">{{ ev.date }}</span>
        </div>
        <div class="title">{{ ev.title }}</div>
        <p>{{ ev.description }}</p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import tuComponent from '../tuComponent';
import * as _color from "../../utils";
export default defineComponent({
  name: "tuHistory",
  extends: tuComponent,
  props: {
    events: {
      type: Object,
      default: []
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  setup(props, context) {
    const categoryColor = (ev) => {
      const background = `rgba(${_color.getColorAsRgb(ev.category, 0.1)})`;
      return {
        background: background
      }
    }
    const categoryColorIcon = (ev) => {
      const color = `rgba(${_color.getColorAsRgb(ev.category, 0.9)})`;
      return {
        color: color
      }
    }
    return { categoryColor, categoryColorIcon }
  }
})
</script>

<style scoped>
@import "../../style/sass/_mixins.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.default,
.alter {
  max-width: 1080px;
  margin: auto;
  width: 50vw;
  padding: 0 20px;
  position: relative;
  justify-content: center;
}

.center-line {
  position: absolute;
  background: var(--tu-gray-3);
  height: 100%;
  width: 4px;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
}

.row {
  display: flex;
}

.row-1 {
  justify-content: flex-start;
}

.row-2 {
  justify-content: flex-end;
}

.row section {
  border-radius: 5px;
  width: calc(50% - 40px);
  padding: 20px;
  position: relative;
  box-sizing: border-box !important;
}

.row section::before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  top: 28px;
  z-index: -1;
  transform: rotate(45deg);
}

.row-1 section::before {
  right: -7px;
}

.row-2 section::before {
  left: -7px;
}

.row section .icon,
.center-line .scroll-icon {
  position: absolute;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  font-size: 17px;
  box-shadow: 0 0 0 4px var(--tu-gray-3), inset 0 2px 0 var(--tu-gray-3), 0 3px 0 4px var(--tu-gray-3);
}

.row-2 section .icon {
  top: 15px;
  left: -50px;
}

.row section .details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-date {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 400;
  color: var(--tu-text);
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: var(--tu-text);
}

.row section p {
  margin: 10px 0 17px 0;
}

.row section .bottom a:hover {
  transform: scale(0.97);
}

/* code for making it normal */

.default .center-line {
  left: 40px !important;
}

.default .row {
  margin: 30px 0 3px 60px !important;
}

.default .row section {
  width: 100% !important;
}

.default .row-1 section::before {
  left: -7px;
}

.default .row-1 section .icon {
  left: -50px;
}

/*end of that*/

/* making it alternative */
.alter .wrapper .center-line {
  left: 50% !important;
}

.alter .wrapper .row section {
  width: calc(50% - 40px) !important;
}

.alter .row-1 section::before {
  right: -7px !important;
}

.alter .row-1 section .icon {
  top: 15px !important;
  right: -50px !important;
}

/* end */


@media(max-width: 440px) {

  .wrapper .center-line,
  .row section::before,
  .row section .icon {
    display: none;
  }

  .wrapper .row {
    margin: 10px 0;
  }
}
</style>