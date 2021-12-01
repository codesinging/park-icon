<template>
    <component :is="component" :size="size"></component>
</template>

<script setup>
import {defineAsyncComponent} from "vue";

const {name, size} = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [String,Number],
        default: 16
    },
    color: {
        type: String,
        default: 'currentColor'
    },
    strokeWidth: {
        type: [String, Number],
        default: 4
    },
})

const component = defineAsyncComponent(() => import(`./icons/ParkIcon${name}.vue`))
</script>

<style scoped>

</style>