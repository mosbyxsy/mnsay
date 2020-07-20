<template>
    <main>
        <div class="theme-default-content">
            <div>标签</div>
            <div class="catalog-tag-wrap">
                <div :class="['catalog-tag-item', {'catalog-tag-select': selectTag === item.tag}]" v-for="(item, index) in tagList" :key="index" @click="showTag(item)">
                    <div class="catalog-tag-name">{{item.tag}}</div>
                    <div class="catalog-tag-count">{{item.count}}</div>
                </div>
            </div>
            <div>时间线</div>
            <div>
                <div v-for="item in showList" :key="item.key">
                    <div>名称</div>
                    <div>时间</div>
                    <div>标签</div>
                    <br/>
                </div>
            </div>
            <Content/>
        </div>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                tagList: [],
                selectTag: 'all',
                showList: [],
                length: 5,
                num: 0
            }
        },
        methods: {
            showTag(item) {
                this.selectTag = item.tag;
                this.getList(0, item);
            },
            getList(num, item = this.tagList[0]) {
                this.showList = item.pages.slice(this.offset, this.length);
            }
        },
        mounted() {
            console.log(this.$page, this.$site);
            let tagMap = {}, sum = 0, tagList = [];
            this.$site.pages.forEach(item => {
                const tags = item.frontmatter.tags;
                if (tags) {
                    tags.forEach(tag => {
                        sum++;
                        if (!tagMap[tag]) {
                            tagMap[tag] = {
                                tag: tag,
                                count: 1,
                                pages: [item]
                            };
                            tagList.push(tagMap[tag]);
                        } else {
                            tagMap[tag].count++;
                            tagMap[tag].pages.push(item)
                        }
                    })
                }
            });
            tagList.unshift({
                tag: 'all',
                count: tagList.length,
                pages: this.$site.pages
            });
            this.tagList = tagList;
            console.log(JSON.stringify(tagList));
            this.getList(0);
        }
    }
</script>

<style lang="stylus" scoped>
    .catalog-tag-wrap {
        font-size 0
        .catalog-tag-item {
            display inline-block
            overflow hidden
            width 31.3%
            font-size 1rem
            text-align center
            cursor pointer
            border-radius 2rem
            box-sizing border-box
            padding 0.2rem
            box-shadow inset 0 0 5px #cccccc
            margin 1%
            &:hover {
                background #f5fbf8
            }
            &.catalog-tag-select {
                background #b9f1d7
            }
            .catalog-tag-name {
                font-size 1.2rem
                line-height 1.8rem
                font-weight 600
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            }
            .catalog-tag-count {
                font-size 1rem
                line-height 1.4rem
                font-weight 400
            }
        }
    }
    @media (max-width: $MQMobile) {

    }
</style>
