<template>
    <main>
        <div class="theme-default-content">
            <div class="catalog-tag-title">标签</div>
            <div class="catalog-tag-wrap">
                <div :class="['catalog-tag-item', {'catalog-tag-select': selectTag === item.tag}]"
                     v-for="(item, index) in tagList"
                     :key="index"
                     @click.stop="showTag(item)">
                    <span class="catalog-tag-name">{{item.tag}}</span>
                    <span class="catalog-tag-count">({{item.count}})</span>
                </div>
            </div>
            <hr/>
            <div class="catalog-tag-title">时间线</div>
            <div>
                <div class="catalog-item" v-for="item in showList" :key="item.key" @click="showDetail(item)">
                    <div class="catalog-item-img" v-if="item.frontmatter.img">
                        <img :src="item.frontmatter.img" :alt="item.title"/>
                    </div>
                    <div class="catalog-item-content">
                        <div class="catalog-item-title">{{item.title || "文章"}}</div>
                        <div class="catalog-item-tags" v-if="item.frontmatter.tags">
                            <span v-for="tag in item.frontmatter.tags" :key="tag" @click.stop="showTag(tagMap[tag])">{{tag}}</span>
                        </div>
                        <div class="catalog-item-time" v-if="item.lastUpdated">{{item.lastUpdated}}</div>
                        <div class="catalog-item-abstract" v-if="item.excerpt">{{getExcerpt(item.excerpt)}}</div>
                    </div>
                </div>
            </div>
            <div class="catalog-pagination" v-if="hasPagination">
                <button v-if="hasPrev" @click="getList(page - 1 )">上一页</button>
                <button v-if="hasNext" @click="getList(page + 1)">下一页</button>
                <input v-model="page"/>
                <button @click="getList(page)">跳转</button>
            </div>
            <Content/>
        </div>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                tagMap: {},
                tagList: [],
                selectTag: 'all',
                showList: [],
                length: 10,
                pages: [],
                page: 1
            }
        },
        computed: {
            hasPagination() {
                return this.pages.length > this.length;
            },
            hasPrev() {
                return this.page > 1;
            },
            hasNext() {
                return this.page * this.length < this.pages.length;
            }
        },
        methods: {
            showTag(item) {
                this.selectTag = item.tag;
                this.pages = item.pages;
                this.getList(1);
            },
            showDetail(item) {
                this.$router.push(item.path).catch(err => {});
            },
            getList(page) {
                const offset = (page - 1) * this.length;
                if (offset >= 0 && offset < this.pages.length) {
                    this.page = page;
                    this.showList = this.pages.slice(offset, offset + this.length);
                }
            },
            getExcerpt(text) {
                try {
                    const index = text.indexOf('</h1>');
                    (index > -1) && (text = text.substring(index + 6));
                    return text.replace(/<[^>]*>/g, '');
                } catch (e) {
                    return null;
                }
            }
        },
        mounted() {
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
                count: this.$site.pages.length,
                pages: this.$site.pages
            });
            tagList.forEach(item => {
                item.pages && item.pages.sort((a, b) => {
                    const x = new Date(a['lastUpdated']).valueOf();
                    const y = new Date(b['lastUpdated']).valueOf();
                    return y - x;
                })
            });
            this.tagList = tagList;
            this.tagMap = tagMap;
            this.showTag(tagList[0]);
            console.log(this.$site.pages);
        }
    }
</script>

<style lang="stylus" scoped>
    .catalog-tag-title {
        line-height 3rem
        font-size 1.2rem
    }
    .catalog-tag-wrap {
        font-size 0
        .catalog-tag-item {
            display inline-block
            overflow hidden
            font-size 1rem
            text-align center
            cursor pointer
            border-radius 1rem
            padding 0.2rem 1rem
            box-shadow inset 0 0 5px #cccccc
            margin-right 0.6rem
            margin-bottom 0.6rem
            &:hover {
                background #f5fbf8
            }
            &.catalog-tag-select {
                background #b9f1d7
            }
            .catalog-tag-name {
                font-size 1.2rem
                line-height 1.8rem
                vertical-align middle
                max-width 10rem
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                display inline-block
            }
            .catalog-tag-count {
                font-size 1rem
                line-height 1.4rem
                vertical-align middle
            }
        }
    }
    .catalog-item {
        position relative
        padding 0.6rem
        border-radius 0.6rem
        box-shadow inset 0 0 5px #cccccc
        overflow hidden
        margin-bottom 1rem
        white-space nowrap
        cursor pointer
        .catalog-item-img {
            width 6rem
            height 6rem
            float left
            margin-right 0.6rem
            img {
                width 100%
                height 100%
                border none
            }
        }
        .catalog-item-content {
            overflow hidden
            .catalog-item-title {
                line-height 1.8rem
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                font-size 1.2rem
            }
            .catalog-item-tags {
                line-height 1.4rem
                font-size 0.8rem
                cursor pointer
                color #717171
                span {
                    margin-right 0.6rem
                }
            }
            .catalog-item-time {
                line-height 1.4rem
                font-size 0.8rem
                color #717171
            }
            .catalog-item-abstract {
                line-height 1.4rem
                font-size 0.8rem
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                color #717171
            }
        }
    }
    .catalog-pagination {
        text-align center
        button {
            margin 0 0.3rem
            height 2rem
            outline none
            cursor pointer
            vertical-align middle
        }
        input {
            width 2rem
            margin 0 0.3rem
            height 1.6rem
            outline none
            vertical-align middle
        }
    }
    @media (max-width: $MQMobile) {

    }
</style>
