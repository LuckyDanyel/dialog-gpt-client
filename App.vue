<script setup lang="ts">
    import { ref } from 'vue';
    import Chat from './components/Chat.vue';
    import ChatHeader from './components/ChatHeader.vue';
    const isOpen = ref(false);

</script>


<template>
    <div class="app">
        <div 
            class="app__chat app_position"
            v-if="isOpen"
        >
            <div 
                class="app__chat-close"
                @click="isOpen = false"
            ></div>
            <Chat></Chat>
        </div>
        <div 
            v-if="!isOpen"
            @click="isOpen = true"
            class="app__chat-header app_position"
        >
            <ChatHeader :small="true"></ChatHeader>
        </div>

    </div>
</template>

<style lang="scss">
    .app {
        padding-top: 100px;
        &_position {
            position: fixed;
            bottom: 0;
            right: 50px;
        }
        &__chat {
            max-width: 340px;
            width: 100%;
        }
        &__chat-header {
            cursor: pointer;
            max-width: 250px;
            width: 100%;
        }
        &__chat-close {
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: absolute;
            width: 24px;
            height: 24px;
            background-color: black;
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
    }

</style>
