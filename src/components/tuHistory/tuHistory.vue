<template>
  <div class="tu-hist-container">
  <div :style="centerStyle()" :class="alternative ? 'alter' : 'default'">
    <div class="tu-hist-center-line">
    </div>
    <div class="tu-hist-row" v-for="(ev, index) in  histEvents" :key="index" :class="parseInt(index) % 2 === 0 ? 'tu-hist-row-1' : 'tu-hist-row-2'">
      <section :style="categoryColor(ev)">
          <tu-icon class="tu-hist-icon" :style="categoryColorIcon(ev, index)"> {{ ev.icon }}</tu-icon>
        <div class="tu-hist-details">
          <span class="tu-hist-title-date">{{ ev.date }}</span>
        </div>
        <div v-if="ev.url" style="text-decoration: none;"><a class="tu-hist-title tu-hist-title-router" :href="ev.url">{{ ev.title }}</a></div>
        <div v-else class="tu-hist-title">{{ ev.title }}</div>
        <p>{{ ev.description }}</p>
      </section>
    </div>
    <tuInfiniteLoading v-if="model === 'server'" @infinite="load">
					<template #complete>
						<span class="tu-hist-complete-text">No more results!</span>
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
import { serverRequest, TuHistoryEvent , TuHistoryServerModel } from "./utils"
import { tuInfiniteLoading } from '../tuInfiniteLoading';

export default defineComponent({
  name: "tuHistory",
  extends: tuComponent,
  components: {
    tuInfiniteLoading
  },
  props: {
    events: {
      type: Object as PropType<Array<TuHistoryEvent>>,
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
    const categoryColor = (ev: TuHistoryEvent) => {
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
        maxWidth: '100%',
        width: 'auto',
        background: background
      }
    }
    }
    const categoryColorIcon = (ev: TuHistoryEvent, index: number) => {
      let color: string, height: string, width: string, left: string, right: string;
      height = '20px !important'
      width = '20px !important'
      if (!props.alternative) {
        left = '-30px'
      }
      else {
        if(index % 2 === 0) {
          right = '-50px !important'
        }
        else {
          left = "-50px !important"
        }
      }
      if (!ev.icon) {
        return {
          background: 'var(--tu-gray-4)',
          height: height,
          width: width,
          right: right,
          left: left
        }
      }
      else if (ev.color) {
        color = `rgba(${_color.getColorAsRgb(ev.color, 0.9)})`;
      }
      else {
        color = 'var(--tu-text)'
      }
        return {
        color: color,
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
    const redirect = (ev: TuHistoryEvent) => {
      if(ev.url) {
        router.replace(ev.url);
      }
    }
    const load = async $state => {
      console.log("loading")
			serverRequest(props.serverSideConfig, `?page=${currentPage.value}`).then((data: TuHistoryEvent[]) => {
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

<style scoped lang="scss">
@import "../../style/sass/_mixins.scss";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.tu-dark-theme .tu-card .tu-hist-container .tu-hist-icon {
  background: rgba(37,38,41);
}

.default,
.alter {
  max-width: 1080px;
  position: relative;
}
.tu-hist-container {
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  display: block;
  height: 100%;
  width: 100%;

  &::-webkit-scrollbar {
		display: none;
	}

  &::-webkit-scrollbar-track {
       background: #f1f1f1;
    }
}
.tu-hist-center-line {
  position: absolute;
  background: var(--tu-gray-3);
  height: inherit !important;
  width: 4px;
  left: 50%;
  top: 20px;
  height: 95% !important;
  transform: translateX(-50%);
}
.tu-hist-row section .tu-hist-icon,
.tu-hist-center-line .scroll-icon {
  position: absolute;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 28px;
  border-radius: 50%;
  font-size: 17px;
  background: var(--tu-background);
}
.tu-hist-row-2 section .tu-hist-icon {
  top: 15px;
  left: -55px;
}
.default .tu-hist-row-2 .tu-hist-icon {
  left: -35px;
}

.default .tu-hist-row-1 section .tu-hist-icon {
  left: -35px;
}

.alter .tu-hist-row-1 section .tu-hist-icon {
  top: 15px !important;
  right: -55px !important;
}

.tu-hist-row {
  display: flex;
}
.tu-hist-row-1 {
  justify-content: flex-start;
}
.tu-hist-row-2 section::before {
  left: -7px;
}
.tu-hist-row section {
  border-radius: 5px;
  width: 50%;
  padding: 11px;
  position: relative;
  box-sizing: border-box !important;
}
.tu-hist-row-1 section::before {
  right: -7px;
}
.tu-hist-row section .tu-hist-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tu-hist-title-date {
  font-size: 15px;
  margin-bottom: 8px;
  font-weight: 400;
  color: var(--tu-text);
}
.tu-hist-title {
  font-size: 120%;
  font-weight: 600;
  color: var(--tu-text);
}
.tu-hist-row section p {
  font-size: 90%;
  margin: 1.5% 0 1.5% 0;
}
.tu-hist-row section .bottom a:hover {
  transform: scale(0.97);
}

/* code for making it normal */
.default .tu-hist-center-line {
  left: 40px !important;
}
.default .tu-hist-row {
  margin: 20px 0 1px 60px !important;
}
.default .tu-hist-row-1 section::before {
  left: -7px;
}
/*end of that*/

/* making it alternative */
.alter .wrapper .tu-hist-center-line {
  left: 50% !important;
}
.alter .wrapper .tu-hist-row section {
  width: calc(50% - 40px) !important;
}
.alter .tu-hist-row-1 section::before {
  right: -7px !important;
}
.alter .tu-hist-row-2 {
  justify-content: flex-end;
}
/* end */
.tu-hist-title-router {
  cursor: pointer;
  text-decoration: none !important;
}

.tu-hist-complete-text {
  display: table;
  margin: 10px auto;
}
</style>