<script lang="ts" setup>

    defineProps<{
        text: string
    }>();

</script>

<template>
    <div class="message-loader">
        <div class="message-loader__loader"></div>
        <div class="message-loader__text"> {{ text }} </div>
    </div>
</template>

<style lang="scss">
    .message-loader {
        height: 100%;
        display: flex;
        align-items: flex-end;
        animation-name: MessageLoader;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        &__text {
            font-family: $fontRegular;
            font-size: 12px;
            color: #b7bfca;
        }

        @keyframes MessageLoader {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
            
        }
    }

</style>