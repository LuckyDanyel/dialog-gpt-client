<script lang="ts" setup>

    withDefaults(defineProps<{
        small?: boolean
    }>(), {
        small: false,
    });
    

</script>

<template>
    <div 
        class="header"
        :class="{
            'header_small': small,
        }"
    >
        <div class="header__title"> Напишите ваше сообщене </div>
        <div class="header__subtitle" v-if="!small"> Операторы онлайн </div>
    </div>
</template>


<style lang="scss" scoped>
    .header {
        min-height: 60px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 0 16px;
        flex-direction: column;
        gap: 4px;
        background: rgb(5,58,155);
        background: linear-gradient(90deg, rgba(5,58,155,1) 0%, rgba(44,111,236,1) 100%);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
        width: 100%;

        &__title, &__subtitle {
            color: white;
            font-family: $fontRegular;
        }

        &__title {
            font-size: 14px;
        }

        &__subtitle {
            font-size: 12px;
            opacity: 0.5;
        }

        &_small {
            min-height: 40px;
        }
    }

</style>