<script setup lang="ts">
    import { ref } from 'vue';
    import Chat from './components/Chat.vue';
    import ChatIcon from './components/ChatIcon.vue';
    import { MOBILE_SIZE } from './assets/variables.ts';
    const isOpen = ref(false);
    const chatRef = ref<any>(null);
    const buildId = import.meta.env.BUILD_ID;

    const bodyClass = `body-styles-${buildId}`;
    const bodyStyles = `
        .${bodyClass} {
            @media (max-width: ${MOBILE_SIZE}) {
                overflow: hidden;
                max-height: 100vh;
            }
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = bodyStyles;
    document.head.appendChild(style);

    const openChat = () => {
        isOpen.value = true;
        document.body.classList.add(bodyClass);
        chatRef.value.scrollToDown();
    };

    const closeChat = () => {
        isOpen.value = false;
        document.body.classList.remove(bodyClass);
    }

</script>


<template>
    <div class="app">
        <div 
            class="app__chat"
            v-show="isOpen"
        >
            <Chat
                ref="chatRef"
                @close="closeChat()"
            ></Chat>
        </div>
        <ChatIcon
            v-show="!isOpen"
            @click="openChat()"
            class="app__chat-trigger"
        ></ChatIcon>

    </div>
</template>

<style lang="scss" scoped>
    .app {
        z-index: 9999; 
        position: relative;
        &__chat {
            max-width: 340px;
            width: 100%;
            background-color: white;
            border-top-right-radius: 14px;
            border-top-left-radius: 14px;

            position: fixed;
            bottom: 0;
            right: 50px;
        }

        &__chat-trigger {
            position: fixed;
            right: 30px;
            bottom: 10px;
        }

        @media (max-width: $MOBILE_SIZE) {
            &__chat-header {
                display: none;
            }
            &__chat {
                right: 0;
                bottom: 0;
                top: 0;
                left: 0;
                max-width: 100%;
                max-height: 100vh;
                height: 100%;
            }
        }

    }

</style>
