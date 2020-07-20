<template>
    <div class="live2d">
        <canvas id="live2d" width="280" height="250" :class="['live2d-dom', {'live2d-visible': visible}]"></canvas>
        <div :class="['live2d-button', {'live2d-show': buttonVisible}]" @click="change">Live</div>
    </div>
</template>

<script>
    import loadJs from '../util/loadJs';

    export default {
        data() {
            return {
                visible: false,
                buttonVisible: false
            }
        },
        methods: {
            change() {
                this.visible = !this.visible;
                if (this.visible) {
                    let r = Math.floor(Math.random() * 88);
                    loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/mumudadi/live2dw@latest/assets/live2d-widget-model-Pio/assets/" + r + ".json");
                }
            }
        },
        mounted() {
            window.onload = () => {
                loadJs("https://www.yating.online/res/js/live2d.js", () => {
                    this.buttonVisible = true;
                });
            };
        }
    }
</script>

<style lang="stylus" scoped>
    .live2d-dom {
        position fixed
        bottom 0
        right 0
        display none
    }
    .live2d-button {
        position fixed
        cursor pointer
        color: #fff
        display none
        background: #3eaf7c
        line-height: 2.2rem
        font-size: 1rem
        width: 2.2rem
        border-radius: 50%
        text-align: center
        right: 2.4rem
        bottom: 3.6rem
    }
    .live2d-visible, .live2d-show {
        display block
    }
    @media (max-width: $MQMobile) {
        .live2d-dom {
            display none
        }
        .live2d-button {
            display none
        }
    }
</style>
