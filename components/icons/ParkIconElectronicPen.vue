<template>
    <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#icon-8c8a8117f53a01d)"><rect x="35.1924" y="5.32239" width="12" height="38" rx="6" transform="rotate(45 35.1924 5.32239)" fill="none" :stroke="color" :stroke-width="strokeWidth"/><path d="M18 23L26 31" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 43L12 37" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round"/><rect x="33.2679" y="12.3397" width="4" height="4" rx="2" transform="rotate(30 33.2679 12.3397)" :fill="color"/></g><defs><clipPath id="icon-8c8a8117f53a01d"><rect width="48" height="48" :fill="color"/></clipPath></defs></svg>
</template>

<script>
export default {
    name: "ParkIconElectronicPen",
    props: {
        size: {
            type: [Number, String],
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
    },
}
</script>
