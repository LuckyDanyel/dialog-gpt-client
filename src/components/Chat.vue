<script lang="ts" setup>
    import { ref, computed, unref, onMounted, nextTick, onUpdated } from 'vue';
    import BaseInput from './BaseInput.vue';
    import { Message, MessageStatus } from '../types';
    import { getAnswer, getMessages, sendMessages } from '../api';
    import MessageBlock from './MessageBlock.vue';
    import { delayWriting, delayReading, delayBeforeReading } from '../utils';
    import MessageLoader from './MessageLoader.vue';
    import ChatHeader from './ChatHeader.vue';

    const emit = defineEmits<{
        (e: 'close'): void,
    }>()

    const messageModel = ref('');
    const messages = ref<Message[]>([]);
    const dialogStatus = ref<'reading' | 'writing' | ''>('');
    const messageIdsStatus = ref<Record<string, MessageStatus>>({'': 'sent'}); 
    const chatBlockRef = ref<HTMLElement>();

    const buttonDisabled = computed(() => !unref(messageModel));

    const dialogStatusText = computed(() => {
        if(unref(dialogStatus) === 'reading') return 'Оператор читает сообщения';
        if(unref(dialogStatus) === 'writing') return 'Оператор набирает сообщение';

        return '';
    });

    const createUserMessage = (text: string): Message => {
        return {
            id: '',
            created_at: Date.now() / 1000,
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: {
                        value: text,
                        annotations: [],
                    }
                },
            ]
        }
    };

    const srollToDown = async () => {
        const isScrollDown = Math.floor(chatBlockRef.value!.scrollTop + chatBlockRef.value!.clientHeight) === chatBlockRef.value?.scrollHeight;
        if(isScrollDown) {
            await nextTick();
            chatBlockRef.value?.scrollTo(0, chatBlockRef.value.scrollHeight);
        }
    };


    const changeClientMessage = (message: Message, index: number) => {
        unref(messages)[index] = message;
    };

    const onSendMessage = async () => {
        try {
            let clientMessage = createUserMessage(unref(messageModel));
            messages.value.push(clientMessage);
            const messageIndex = messages.value.length - 1;
            messageModel.value = '';
            await srollToDown();
            const { message }= await sendMessages([{ text: unref(clientMessage.content[0].text.value) }]);
            clientMessage = message;
            messageIdsStatus.value[clientMessage.id] = 'delivered';
            changeClientMessage(clientMessage, messageIndex);
            await srollToDown();
            await delayBeforeReading();
            messageIdsStatus.value[clientMessage.id] = 'read';
            dialogStatus.value = 'reading';
            await srollToDown();
            await delayReading(clientMessage);
            dialogStatus.value = 'writing';
            const assistantMessage = await getAnswer();
            await delayWriting(assistantMessage);
            messages.value.push(assistantMessage);
            messageIdsStatus.value[assistantMessage.id] = 'read';
            await srollToDown();
        } catch (error) {
            console.log(error);
        } finally {
            dialogStatus.value = '';
        }
    };

    onMounted(async () => {
        try {
            const dialogMessages = await getMessages();
            messages.value = dialogMessages.reverse();
            dialogMessages.forEach((message) => {
                unref(messageIdsStatus)[message.id] = 'read';
            });
        } catch (error) {
            
        }
    });

</script>

<template>
    <div class="chat">
        <div 
            class="chat__header_height"
        >
            <ChatHeader
                ref="headerRef"
                class="chat__header"
                :with-close-icon="true"
                @close="emit('close')"
            ></ChatHeader>
        </div>
        <div
            ref="chatBlockRef"
            class="chat__messages-wrapper"
        >
            <div></div>
            <div 
                class="chat__messages-container"
            >
                <div 
                    class="chat__messages"
                    v-for="message in messages"
                >
                    <MessageBlock
                        :message="message"
                        :message-status="messageIdsStatus[message.id]"
                    />
                </div>
                <MessageLoader
                    v-if="dialogStatusText"
                    :text="dialogStatusText"
                ></MessageLoader>
            </div>
        </div>
        <div class="chat__enter-message">
            <BaseInput
                v-model="messageModel"
                :placeholder="'Введите сообщение'"
                :button-disabled="buttonDisabled"
                @send-message="onSendMessage"
            ></BaseInput>
        </div>
    </div>

</template>


<style lang="scss" scoped>
    .chat {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 100%;
        padding-bottom: 12px;
        &__enter-message {
            margin-top: 4px;
        }

        &__messages-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 360px;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background-color: #b7bfca;
            }

            &::-webkit-scrollbar-track {
                border-radius: 10px;
                background-color: #dee4ec;
            }
        }

        &__messages-container {
            padding-top: 32px;
            padding-bottom: 12px;
            padding-left: 12px;
            padding-right: 12px;
            display: flex;
            flex-direction: column;
            grid-gap: 20px;

        }
        &__header_height {
            min-height: $HEADER_HEIGHT;
        }

        &__messages {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        
        @media (max-width: $MOBILE_SIZE) {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            max-height: 100vh;
            height: 100%;

            &__messages-wrapper {
                flex-grow: 1;
                height: auto;
            }
            &__header {
                padding-left: 50px;
            }
        }

    }

</style>