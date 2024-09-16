<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    const tipsText = ["Здравствуйте", "Готова помочь"];
    const tipText = ref('');

    const startTipsVisible = async () => {
        const tipsCount = Number(sessionStorage.getItem('tips-timeout-count'));
        if(tipsCount === 2) {
            tipText.value = '';
            return;
        }
        await new Promise((res) => {
            setTimeout(() => {
                tipText.value = tipsText[tipsCount];
                res(null);
                startTipsVisible();
            }, 5000);
        });
        const count = tipsCount + 1;
        sessionStorage.setItem('tips-timeout-count', `${count}`);
    }


    onMounted(() => {
        startTipsVisible();
    })

</script>

<template>
    <div class="chat-icon">
        <Transition>
            <div 
                class="chat-icon__container"
                v-if="tipText"
            >
                <div class="chat-icon__text"> {{ tipText }} </div>
                <div class="chat-icon__triangle"></div>
                <div class="chat-icon__triangle_shadow"></div>
            </div>
        </Transition>
    </div>

</template>

<style lang="scss" scoped>
    .chat-icon {
        width: 65px;
        height: 65px;
        background-image: url('../icons/chat-icon.svg');
        background-repeat: no-repeat;
        cursor: pointer;


        .v-enter-active,
        .v-leave-active {
          transition: opacity 0.5s ease;
        }

        .v-enter-from,
        .v-leave-to {
          opacity: 0;
        }

        .v-enter-to,
        .v-leave-from {
          opacity: 1;
        }

        &__container {
            padding: 12px;
            box-shadow: 3px 4px 7px rgba(0, 0, 0, 0.25);
            position: absolute;
            min-width: min-content;
            background-color: white;
            border-radius: 8px;
            top: -50px;
            right: 35px;
        }

        &__triangle {
            position: absolute;
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 20px solid  white;
            border-radius: 0 0 5px 0; /* Закругление угла */
            right: 0;
            bottom: -9px;
            transform: rotate(45deg);
            overflow: hidden;
        }
        &__triangle_shadow {
            width: 20px;
            height: 20px;
            position: absolute;
            box-shadow: 3px 19px 11px rgba(0, 0, 0, 0.3);
            background-color: transparent;
            bottom: 0px;
            right: 11px;
            z-index: -1;
        }

        &__text {
            font-size: 16px;
            font-family: $fontRegular;
            white-space: nowrap;
        }
    }
</style>