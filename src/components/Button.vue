<script lang="ts" setup>


const emit = defineEmits<{
    (e: 'click'): void;
}>()


</script>

<template>
    <div 
        class="Button"
        @click.stop.prevent="emit('click')"
    >
        <slot></slot>    
    </div>
</template>

<style lang="scss">
    .Button {
        padding: 12px;
        display: inline-block;
        font-size: 14px;
        border: 1px solid #4e8cff;
        border-radius: 6px;
        color: #4e8cff;
        font-family: $fontRegular;
        cursor: pointer;
    }

</style>