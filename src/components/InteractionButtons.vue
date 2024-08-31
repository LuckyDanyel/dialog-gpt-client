<script lang="ts" setup>
import Button from './Button.vue'

const goToRecordPage = () => {
    window.open('https://xn--80aidvnonfb5g.xn--p1acf/#about');
};

</script>


<template>
    <div class="interaction-buttons">
        <div class="interaction-buttons__wrapper">
            <Button
                @click="goToRecordPage()"
            >
                Записаться на прием
            </Button>
        </div>
    </div>
</template>

<style lang="scss">
    .interaction-buttons {
        display: flex;
        justify-content: flex-end;
    }
    .interaction-buttons__wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

</style>