<template>
    <button
        class="tu-sidebar__item"
        :class="{
            active: (parentValue && this.id == parentValue) || internalActive,
            hasIcon: !!$slots.icon
        }"
        @click="onClick"
    >
        <div v-if="$slots.icon" class="tu-sidebar__item__icon">
            <slot name="icon" />
        </div>
        <div class="tu-sidebar__item__text" :class="{ reduced: reduced }">
            <slot />
        </div>
        <div class="tu-sidebar__item__text-tooltip">
            <slot />
        </div>
        <div v-if="$slots.arrow || arrow" class="tu-sidebar__item__arrow">
            <slot v-if="$slots.arrow" name="arrow" />
            <tu-icon v-else>keyboard_arrow_down</tu-icon>
        </div>
    </button>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, ref, Ref, watch } from "vue";
import { RouteLocationMatched, useRouter } from "vue-router";
import tuIcon from "../tuIcon/tuIcon.vue";
import tuComponent, { ComponentConstants } from "../tuComponent";
import _ from "lodash";

export default defineComponent({
    name: "TuSidebarItem",
    extends: tuComponent,
    props: {
        to: {},
        href: {},
        target: { default: "_blank" },
        value: { type: String },
        id: { type: String },
        arrow: { type: Boolean }
    },
    setup(props, context) {
        let parentValue = inject<any>("parentValue");
        let handleClickItem = inject<Function>("handleClickItem");
        let reduced = inject<Ref<Boolean>>("reduced");
        let internalActive = ref(false);
        let router = ComponentConstants.router;

        const handleClick = function() {
            if (props.to) {
                ComponentConstants.router.push(props.to as any);
            } else if (props.href) {
                window.open(props.href as string, props.target);
            }
        };

        const onClick = () => {
            if (props.id) {
                handleClickItem?.call(null, props.id);
            }
            handleClick();
        };

        const handleRouteChange = function() {
            if (router) {
                if (
                    _.some(router.currentRoute.value.matched, route => {
                        return route.path === props.to;
                    })
                ) {
                    internalActive.value = true;
                    if (props.id) {
                        handleClickItem?.call(null, props.id);
                    }
                } else internalActive.value = false;
            }
        };

        if (router)
            watch(router.currentRoute, () => {
                handleRouteChange();
            });

        onMounted(() => {
            //Need to handle route when component mounted not just on route change
            handleRouteChange();
        });

        return {
            parentValue,
            internalActive,
            reduced,
            onClick
        };
    }
});
</script>

<style lang="scss">
@import "../../style/sass/_mixins";

.tu-sidebar__item {
    width: 100%;
    padding: 14px 16px;
    padding-top: 15px;
    text-align: left;
    background: transparent;
    font-size: 1rem;
    font-weight: bold;
    opacity: 0.7;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    color: -getColor("text");
    border: 0px;

    &.hasIcon {
        padding: 0px;

        &.active {
            padding-left: 8px;
        }

        &:hover {
            padding-left: 8px;
            opacity: 1;
        }
    }

    &:after {
        content: "";
        position: absolute;
        left: -4px;
        top: 0px;
        width: 10px;
        height: 100%;
        background: -getColor("color");
        border-radius: 0px 20px 20px 0px;
        transform: translate(-6px);
        transition: all 0.25s ease;
        z-index: 60;
    }

    &.active:not(.hasIcon) {
        padding-left: 25px;
    }

    &.active {
        opacity: 1;

        // background: -getColor('background', .1) !important
        color: -getColor("color");

        &:after {
            transform: translate(0px);
        }
    }

    &__icon {
        min-width: 40px;
        height: 47px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 50;
        background: -getColor("background");
    }

    &:hover:not(.hasIcon) {
        opacity: 1;
        padding-left: 25px;
    }

    &__text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        z-index: 10;
        transition: all 0.25s ease;
        font-size: 0.9rem;
        opacity: 1;

        &.reduced {
            opacity: 0;
        }
    }

    &__arrow {
        position: relative;
        justify-self: flex-end;
        margin-left: auto;
        margin-right: 15px;

        i {
            transition: all 0.25s ease;
            transform: rotate(0deg) !important;
        }

        z-index: 80;

        .tu-icon-arrow {
            &:before {
                width: 2px;
            }

            &:after {
                height: 2px;
            }
        }
    }

    &__text-tooltip {
        position: fixed;
        left: 50px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.25s ease;
        font-size: 0.85rem;
        white-space: nowrap;
    }
}
</style>
