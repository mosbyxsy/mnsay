<template>
    <div>
        <component :is="layout" />
        <Live2D v-if="!isMobile"/>
        <Robot />
    </div>
</template>

<script>
    import Vue from 'vue';
    import isMobile from 'is-mobile';
    import Robot from '@theme/components/Robot.vue';
    import Live2D from "../components/Live2D";
    import { setGlobalInfo } from '@app/util';

    export default {
        name: 'GlobalLayout',
        components: {
            Robot,
            Live2D
        },
        data () {
            return {
                isMobile : true
            };
        },
        computed: {
            layout () {
                const layout = this.getLayout();
                setGlobalInfo('layout', layout);
                return Vue.component(layout);
            }
        },
        methods: {
            getLayout () {
                if (this.$page.path) {
                    const layout = this.$page.frontmatter.layout;
                    if (layout && (this.$vuepress.getLayoutAsyncComponent(layout)
                        || this.$vuepress.getVueComponent(layout))) {
                        return layout;
                    }
                    return 'Layout';
                }
                return 'NotFound';
            }
        },
        mounted () {
            this.isMobile = isMobile();
            console.log(this.$site.pages.map(item => item.title))
        }
    }
</script>