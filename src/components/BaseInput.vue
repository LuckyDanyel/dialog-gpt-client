<script lang="ts" setup>
    import { computed, unref } from 'vue';

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void,
        (e: 'send-message', value: string): void,
    }>()

    const props = defineProps<{
        placeholder: string;
        modelValue: string;
        buttonDisabled: boolean;
    }>();

    const inputModel = computed({
        get: () => props.modelValue,
        set: (value) => {
            emit('update:modelValue', value);
        }
    })

    const handleButtonClick = () => {
        if(!props.buttonDisabled) {
            emit('send-message', unref(inputModel));
        }
    }

</script>

<template>
    <div class="base-input">
        <textarea
            :placeholder="placeholder"
            @keyup.enter="handleButtonClick"
            v-model="inputModel"
            class="base-input__input"
            autocomplete="false"
        ></textarea>
        <div 
            class="base-input__button"
            @click="handleButtonClick"
            :class="{
                'base-input__button_disabled': buttonDisabled,
            }"
        >

        </div>
    </div>
</template>


<style lang="scss" scoped>

    $buttonSize: 26px;
    $textAriaPaddingTop: 16px;
    .base-input {
        border-top: 1px solid #d8dee3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        &__input {
            resize: none;
            border: none;
            padding-top: $textAriaPaddingTop;
            padding-left: 12px;
            max-height: 70px;
            font-size: 14px;
            width: 100%;
            outline: none;
            padding-right: $buttonSize + 24px;
            font-family: $fontRegular;
            scrollbar-width: thin;

        }
        &__button {
            width: $buttonSize;
            height: $buttonSize;
            background-color: black;
            position: absolute;
            right: 16px;
            top: $textAriaPaddingTop;
            border-radius: 100%;
            color: #fff;
            background-color: #4e8cff;
            background-image: url('../icons/Arrow_light.svg');
            cursor: pointer;

            &_disabled {
                color: #fff;
                background-color: #d8dee3;
                cursor: default;
            }
        }
    }

</style>