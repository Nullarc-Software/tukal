<template>
  <div class="container">
  <div ref="scroll" :style="centerStyle()" :class="alternative ? 'alter' : 'default'">
    <div class="center-line">
    </div>
    <div class="row" v-for="(ev, index) in  histEvents" :key="index" :class="parseInt(index) % 2 === 0 ? 'row-1' : 'row-2'">
      <section :style="categoryColor(ev)">
        <tu-icon class="icon" :style="categoryColorIcon(ev)"> {{ ev.icon }}</tu-icon>
        <div class="details">
          <span class="title-date">{{ ev.date }}</span>
        </div>
        <div v-if="ev.url" style="text-decoration: none;"><a class="title title-router" :href="ev.url">{{ ev.title }}</a></div>
        <div v-else class="title">{{ ev.title }}</div>
        <p>{{ ev.description }}</p>
      </section>
    </div>
    <tuInfiniteLoading v-if="model === 'server'" @infinite="load">
					<template #complete>
						<span class="complete-text">No more results!</span>
					</template>
    </tuInfiniteLoading>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import tuComponent from '../tuComponent';
import * as _color from "../../utils";
import { useRouter } from 'vue-router';
import { serverRequest, historyEvent , TuHistoryServerModel } from "./utils"
import { tuInfiniteLoading } from '../tuInfiniteLoading';

export default defineComponent({
  name: "tuHistory",
  extends: tuComponent,
  components: {
    tuInfiniteLoading
  },
  props: {
    events: {
      type: Object as PropType<Array<historyEvent>>,
      default: []
    },
    alternative: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
		model: {
			type: String,
			default: "local"
		},
		serverSideConfig: {
			type: Object as PropType<TuHistoryServerModel>,
			default: () => {
				return {};
			}
		},
  },
  setup(props, context) {
    const router = useRouter();
    const histEvents = ref([]);
    const currentPage = ref(1);
    const scroll = ref();
    const lineHeight = ref()
    if (props.model === "local") {
      histEvents.value = props.events
    }
    const categoryColor = (ev: historyEvent) => {
      let background: string;
      if (ev.color) {
        background = `rgba(${_color.getColorAsRgb(ev.color, 0.1)})`;
      }
      else {
        background = 'var(--tu-gray-2)'
      }
      if (props.alternative) {
        return {
        width: 'calc(50% - 40px)',
        background: background
      }
      }
      else {
      return {
        width: 'auto',
        background: background
      }
    }
    }
    const categoryColorIcon = (ev: historyEvent) => {
      let color;
      if (!ev.icon) {
        return {
          background: 'var(--tu-gray-4)'
        }
      }
      else if (ev.color) {
        color = `rgba(${_color.getColorAsRgb(ev.color, 0.9)})`;
      }
      else {
        color = 'var(--tu-text)'
      }
        return {
        color: color
      }
    }
    const centerStyle = () => {
      if (props.center) {
        return {
          margin: 'auto',
          width: '50vw',
        }
      }
      else {
        return {
          margin: '40px auto',
        }
      }
    }
    const redirect = (ev: historyEvent) => {
      if(ev.url) {
        router.replace(ev.url);
      }
    }
    const load = async $state => {
      console.log("loading")
			serverRequest(props.serverSideConfig, `?page=${currentPage.value}`).then((data: historyEvent[]) => {
       if(data.length > 0) {
        for(let i = 0; i < data.length; i++) {
          histEvents.value.push(data[i]);
        }
        $state.loaded();
        let val = ( scroll.value.offSetHeight ).toString()
        console.log(scroll.value.clientHeight)
        lineHeight.value = val as string + "px !important"
      }
      else {
        $state.complete();
      }
			});
      currentPage.value++;
      console.log(currentPage.value)
  };
    return { categoryColor , categoryColorIcon , centerStyle, redirect,  histEvents, load, scroll, lineHeight }
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
  position: relative;
}
.container {
  overflow-y: scroll !important;
  display: block;
  height: 100%;
}

.center-line {
  position: absolute;
  background: var(--tu-gray-3);
  height: inherit !important;
  width: 4px;
  left: 50%;
  top: 20px;
  height: 95% !important;
  transform: translateX(-50%);
}

.row {
  display: flex;
}

.row-1 {
  justify-content: flex-start;
}

.row section {
  border-radius: 5px;
  width: calc(50% - 40px);
  padding: 11px;
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
  font-size: 15px;
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

.alter .row-2 {
  justify-content: flex-end;
}

/* end */

.title-router {
  cursor: pointer;
  text-decoration: none !important;
}

.complete-text {
  display: table;
  margin: 0 auto;
}
</style>