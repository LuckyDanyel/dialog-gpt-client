<script lang="ts" setup>
import Button from './Button.vue'

    const emit = defineEmits<{ (event: 'start-dialog', text: string): void }>();

    const buttons = ['Записаться к врачу', 'Узнать стоимость', 'График работы'];

</script>


<template>
    <div class="starting-buttons">
        <div class="starting-buttons__wrapper">
            <div 
                v-for="button in buttons"
                class="starting-buttons__button"
            >
                <Button
                   @click="emit('start-dialog', button)"
                >
                    {{ button }}
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .starting-buttons{
        display: flex;
        justify-content: flex-end;
    }
    .starting-buttons__wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .starting-buttons__button {
        display: flex;
        justify-content: flex-end;
    }

</style>