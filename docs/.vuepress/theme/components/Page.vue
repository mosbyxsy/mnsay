<template>
    <Catalog v-if="$page.frontmatter.catalog"/>
    <main v-else class="page">
        <slot name="top" />

        <Content class="theme-default-content" />
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
    </main>
</template>

<script>
    import PageEdit from '@theme/components/PageEdit.vue'
    import PageNav from '@theme/components/PageNav.vue'
    import Catalog from "@theme/components/Catalog.vue";

    export default {
        components: { PageEdit, PageNav, Catalog },
        props: ['sidebarItems'],
        mounted () {

        },
        methods: {

        }
    }
</script>

<style lang="stylus">
    .page
        padding-bottom 2rem
        display block

</style>
