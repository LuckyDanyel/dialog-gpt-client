<script lang="ts" setup>
    import { ref, computed, unref, onMounted, nextTick } from 'vue';
    import BaseInput from './BaseInput.vue';
    import { Message, MessageStatus } from '../types';
    import { getAnswer, getMessages, sendMessages } from '../api';
    import MessageBlock from './MessageBlock.vue';
    import { delayWriting, delayReading, delayBeforeReading } from '../utils';
    import MessageLoader from './MessageLoader.vue';
    import ChatHeader from './ChatHeader.vue';

    const messageModel = ref('');
    const messages = ref<Message[]>([]);
    const dialogStatus = ref<'reading' | 'writing' | ''>('');
    const messageIdsStatus = ref<Record<string, MessageStatus>>({'': 'sent'}); 
    const chatBlockRef = ref<HTMLElement>() 

    const buttonDisabled = computed(() => !unref(messageModel));

    const counter = ref(0);

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
        await nextTick();
        chatBlockRef.value?.scrollTo(0, chatBlockRef.value.scrollHeight);
    };


    const changeMessage = (message: Message) => {
        const texts = message.content.map((content) => content.text.value);

        texts.forEach((text) => {
            const clientMessageIndex = unref(messages).findIndex((message) => message.content.find((content) => content.text.value === text));
            unref(messages)[clientMessageIndex] = message;
        });
    };

    const setCookie = (dialogId: string) => {
        document.cookie = `dialogId=${dialogId}; path=/; domain=luckydanyel.ru; secure`;
    };

    const onSendMessage = async () => {
        try {
            let clientMessage = createUserMessage(unref(messageModel));
            messages.value.push(clientMessage);
            messageModel.value = '';
            srollToDown();
            const { dialogId, message }= await sendMessages([{ text: unref(clientMessage.content[0].text.value) }]);
            setCookie(dialogId);
            clientMessage = message;
            messageIdsStatus.value[clientMessage.id] = 'delivered';
            changeMessage(clientMessage);
            await delayBeforeReading();
            messageIdsStatus.value[clientMessage.id] = 'read';
            dialogStatus.value = 'reading';
            srollToDown();
            await delayReading(clientMessage);
            dialogStatus.value = 'writing';
            const assistantMessage = await getAnswer();
            await delayWriting(assistantMessage);
            messages.value.push(assistantMessage);
            messageIdsStatus.value[assistantMessage.id] = 'read';
            srollToDown();
        } catch (error) {
            
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
        <ChatHeader></ChatHeader>
        <div 
            ref="chatBlockRef"
            class="chat__messages-container"
        >
            <div 
                class="chat__messages"
                v-for="message in messages"
            >
                <MessageBlock
                    :message="message"
                    :counter="counter"
                    :message-status="messageIdsStatus[message.id]"
                />
            </div>
            <MessageLoader
                v-if="dialogStatusText"
                :text="dialogStatusText"
            ></MessageLoader>
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
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
        overflow: hidden;
        width: 100%;
        padding-bottom: 12px;
        &__enter-message {
            margin-top: 4px;
        }

        &__messages-container {
            padding-top: 32px;
            padding-bottom: 12px;
            padding-left: 12px;
            padding-right: 6px;
            height: 360px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            grid-gap: 20px;
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

        &__messages {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

    }

</style>