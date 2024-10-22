<script setup>
import Header from "./Header.vue";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
</script>
<template>
    <div class="container mx-auto">
        <Header />
        <NavBar />
        <div class="my-5 px-3">
            <slot></slot>
        </div>
        <Footer />
    </div>
</template>