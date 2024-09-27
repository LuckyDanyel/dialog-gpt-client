<script lang="ts" setup>
    import { ref, computed, unref, onMounted, nextTick, watch } from 'vue';
    import BaseInput from './BaseInput.vue';
    import { Message, MessageStatus, Settings } from '../types';
    import { getAnswer, getMessages, sendMessages, getSettings } from '../api';
    import MessageBlock from './MessageBlock.vue';
    import { delayWriting, delayReading, delayBeforeReading } from '../utils';
    import MessageLoader from './MessageLoader.vue';
    import InteractionButtons from './InteractionButtons.vue';
    import StartingButtons from './StartingButtons.vue';
    import ChatHeader from './ChatHeader.vue';

    const emit = defineEmits<{
        (e: 'close'): void,
    }>();

    const messageModel = ref('');
    const messages = ref<Message[]>([]);
    const isChatLoaded = ref(false);
    const dialogStatus = ref<'reading' | 'writing' | ''>('');
    const settings = ref<Settings | null>(null);
    const messageIdsStatus = ref<Record<string, MessageStatus>>({'': 'sent'}); 
    const chatBlockRef = ref<HTMLElement>();

    const dialogDisabled = computed(() => {
        const dialogSettings = unref(settings);
        if(!dialogSettings) return false
        const { answersLimit } = dialogSettings;
        const assistantMessage = unref(messages).filter((message) => message.role === 'assistant');
        return assistantMessage.length >= answersLimit;

    });
    const buttonDisabled = computed(() => !unref(messageModel));

    const dialogStatusText = computed(() => {
        if(unref(dialogStatus) === 'writing') return 'Администратор набирает сообщение';

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

    const scrollToDown = async () => { 
        const currentScroll = Math.ceil(chatBlockRef.value!.scrollTop + chatBlockRef.value!.clientHeight);
        const isScrollDown = currentScroll >= chatBlockRef.value!.scrollHeight;
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
            scrollToDown();
            const { message }= await sendMessages([{ text: unref(clientMessage.content[0].text.value) }]);
            clientMessage = message;
            messageIdsStatus.value[clientMessage.id] = 'delivered';
            changeClientMessage(clientMessage, messageIndex);
            await delayBeforeReading();
            messageIdsStatus.value[clientMessage.id] = 'read';
            await delayReading(clientMessage);
            dialogStatus.value = 'writing';
            scrollToDown()
            const assistantMessages = await getAnswer();
            await delayWriting(assistantMessages);
            messages.value.push(...assistantMessages);
            assistantMessages.forEach((assistantMessage) => {
                messageIdsStatus.value[assistantMessage.id] = 'read';
            });
            dialogStatus.value = '';
            scrollToDown();
        } catch (error) {
            console.log(error);
        } finally {
            dialogStatus.value = '';
        }
    };

    onMounted(async () => {
        try {
            const [dialogMessages, dialogSettings] = await Promise.all([getMessages(), getSettings()]);
            messages.value = dialogMessages.reverse();
            settings.value = dialogSettings;
            dialogMessages.forEach((message) => {
                unref(messageIdsStatus)[message.id] = 'read';
            });
        } catch (error) {
            
        } finally {
            isChatLoaded.value = true;
        }
    });

    const startDialog = (text: string) => {
        messageModel.value = text;
        onSendMessage();
    };

    defineExpose({
        scrollToDown,
    })

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
                :headerText="'Администратор ALFA DENT'"
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
                <StartingButtons
                    v-if="!messages.length && isChatLoaded"
                    @start-dialog="startDialog"
                />
                <InteractionButtons 
                    v-if="dialogDisabled"
                />
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
                :input-disabled="dialogDisabled"
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