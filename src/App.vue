<script setup lang="ts">
    import { ref } from 'vue';
    import Chat from './components/Chat.vue';
    import ChatHeader from './components/ChatHeader.vue';
    const isOpen = ref(false);
    const chatRef = ref<HTMLElement>();

</script>


<template>
    <div class="app">
            <div 
                class="app__chat"
                v-show="isOpen"
            >
            <Chat
                ref="chatRef"
                @close="isOpen = false"
            ></Chat>
            </div>
        <div 
            v-show="!isOpen"
            @click="isOpen = true"
            class="app__chat-trigger"
        >
            <ChatHeader 
                class="app__chat-header"
                :small="true"
            ></ChatHeader>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    .app {
        &__chat {
            max-width: 340px;
            width: 100%;

            position: fixed;
            bottom: 0;
            right: 50px;
        }
        &__chat-trigger {
            cursor: pointer;
            max-width: 250px;
            width: 100%;

            position: fixed;
            bottom: 0;
            right: 50px;
        }


        @media (max-width: $MOBILE_SIZE) {
            &__chat-header {
                display: none;
            }
            &__chat-trigger {
                width: 52px;
                height: 52px;
                background-image: url('./icons/chat-icon.svg');
                background-repeat: no-repeat;
                right: 10px;
            }
            &__chat {
                right: 0px;
                max-width: 100%;
                max-height: 100vh;
                height: 100%;
            }
        }

    }

</style>
