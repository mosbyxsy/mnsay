<template>
    <div>
        <div class="robot" v-if="visible">
            <div class="robot-list">
                <div v-for="(item, index) in chatList" :key="index">
                    <div class="robot-ask">我：{{item.ask}}</div>
                    <br/>
                    <div class="robot-answer">机器人：{{item.answer}}</div>
                </div>
            </div>
            <div class="robot-pre">
                <span>例如：</span>
                <span class="robot-tag" @click="change">关闭</span>
                <span class="robot-tag" v-for="(item, index) in preList" :key="index" @click="preChat(index)">{{item}}</span>
                <span class="robot-tag" @click="toAbout">我要联系站长</span>
            </div>
            <div class="robot-form">
                <input type="text" placeholder="输入信息和我聊天吧" v-model.trim ="txt" @keyup.enter="chat" />
                <div class="robot-btn" @click="chat" @dblclick="change">发送</div>
                <audio id="robot-dom" hidden>
                    <source type="audio/mp3">
                    您的浏览器不支持 audio
                </audio>
            </div>
        </div>
        <div class="robot-hidden" v-else @click="change">
            chat
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                visible: false,
                preList: [
                    '笑话'
                ],
                chatList: [],
                txt: ''
            }
        },
        methods: {
            change() {
                this.visible = !this.visible;
                this.chatList = [];
                this.txt = '';
            },
            spank(ask, answer) {
                const audio = document.getElementById('robot-dom');
                audio.setAttribute("src", 'https://yating.online/mm/speech?text=' + answer);
                audio.play();
                this.chatList.push({
                    ask: ask,
                    answer: answer
                });
            },
            chat(ask) {
                const text = (typeof ask === "string") ? ask : this.txt.trim();
                if(!text){
                    return;
                } else if (text === "关闭") {
                    this.change();
                    return;
                }
                axios.get('https://yating.online/mm/dialogue', {
                    params: {
                        text: text
                    }
                }).then(result => {
                    const answer = result.data && result.data.text;
                    if (answer) {
                        this.spank(text, answer);
                        this.txt = '';
                    }
                });
            },
            preChat(index) {
                const text = this.preList[index];
                this.chat(text);
            },
            toAbout() {
                if (this.$page.path !== '/about.html') {
                    this.spank('我要联系站长', '马上帮您跳转');
                    this.$router.push('/about.html').catch(err => {});
                } else {
                    this.spank('我要联系站长', '您已经在关于我的界面了');
                }
            }
        },
        mounted() {}
    }
</script>

<style lang="stylus" scoped>
    .robot {
        width 14rem
        position fixed
        bottom 1rem
        right 1.5rem
        z-index 100
        background #f9fbfb
        padding 0 0.4rem 0.4rem
        border-radius 0.6rem
        .robot-list {
            position absolute
            bottom 4.4rem
            left 0
            line-height 1.2rem;
            font-size 0
            color #999999
            .robot-ask {
                padding: 0.5rem
                color #949593
                background #f9fbfb
                border-radius: 0.3rem
                display: inline-block
                margin-bottom 0.3rem
                font-size 0.8rem
            }
            .robot-answer {
                padding: 0.5rem
                color #6b6464
                background #f9fbfb
                border-radius: 0.3rem
                display: inline-block
                margin-bottom 0.4rem
                font-size 0.8rem
            }
        }
        .robot-pre {
            font-size 0.8rem
            line-height 2rem
            padding 0 0.4rem
            .robot-tag {
                color #949593
                border-radius 0.3rem
                margin-right 0.3rem
                cursor pointer
            }
        }
        .robot-form {
            height 2rem
            input {
                border-radius 0.2rem
                margin-right 0.2rem
                padding 0.5rem 0.6rem
                outline none
                border 1px solid #c4deaa
                font-size 0.8rem
                vertical-align top
                width 9.2rem
            }
            .robot-btn {
                display inline-block
                text-align center
                border-radius: 0.2rem
                cursor: pointer
                border: solid 1px #ffffff
                color: #ffffff
                background: #3eaf7c
                font-size 0.8rem
                width 2.6rem
                line-height 2rem
                vertical-align top
            }
        }
    }
    .robot-hidden {
        color: #ffffff
        background: #3eaf7c
        line-height 2.2rem
        font-size 1rem
        width 2.2rem
        border-radius 50%
        text-align center
        cursor pointer
        position fixed
        right 1.4rem
        bottom 1rem
    }
    @media (max-width: $MQMobile) {
        .robot {
            width 92%
            left 4%
            right 4%
            padding 0 0 1.4rem 0
            bottom 0
            .robot-list {
                bottom 5.6rem
            }
            .robot-form {
                input {
                    width calc(92% - 3rem)
                }
            }
        }
    }
</style>
