<template>
    <ul id="default-layout">
        <li v-for="page in $pagination.pages">
            <router-link class="page-link" :to="page.path">{{ page.title }}</router-link>
        </li>
    </ul>
</template>