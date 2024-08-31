<script lang="ts" setup>

    const emit = defineEmits<{
        (e: 'close'): void,
    }>()

    withDefaults(defineProps<{
        small?: boolean,
        withCloseIcon?: boolean,
        headerText: string,
    }>(), {
        small: false,
        withClose: false,
    });
    

</script>

<template>
    <div 
        class="header"
        :class="{
            'header_small': small,
        }"
    >

        <div 
            v-if="withCloseIcon"
            @click="emit('close')"
            class="header__close"
        ></div>
        <div class="header__wrapper">
            <div class="header__photo" v-if="!small">

            </div>
            <div class="header__info"> 
                <div class="header__title"> {{ headerText }} </div>
                <div class="header__subtitle" v-if="!small"> +7 978 012 80 51 </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .header {
        min-height: $HEADER_HEIGHT;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 12px 16px;
        flex-direction: column;
        gap: 4px;
        background: rgb(5,58,155);
        background: linear-gradient(90deg, rgba(5,58,155,1) 0%, rgba(44,111,236,1) 100%);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
        width: 100%;

        &__photo {
            height: 36px;
            width: 36px;
            background-color: black;
            border-radius: 100%;
        }
        &__wrapper {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        &__info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        &__close {
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 100%;
            background-color: white;
            border: 1px solid black;
            left: -36px;
            display: flex;
            align-items: center;
            justify-content: center;

            &::before,
            &::after {
                position: absolute;
                content: '';
                display: block;
                width: 1px;
                height: 12px;
                background-color: black;
                
            }

            &::after {
                transform: rotate(-45deg);
            }
            &::before {
                transform: rotate(45deg);
            }
        }

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

        @media (max-width: $MOBILE_SIZE) {
            border-top-right-radius: 0px;
            border-top-left-radius: 0px;
            position: fixed;
            top: 0;
            left: 0;

            &__close {
                left: 10px;
                background-color: transparent;
                border: 1px solid transparent;
                box-shadow: none;

                &::before,
                &::after {
                    background-color: white;
                    height: 16px;
                
                }
            }
        }
    }

</style>