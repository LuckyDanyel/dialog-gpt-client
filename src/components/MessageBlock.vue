<script lang="ts" setup>
    import { computed } from 'vue';
    import { Message, MessageStatus } from '../types';


    const props = defineProps<{
        message: Message,
        messageStatus: MessageStatus,
    }>();

    const changeStarsToBold = (text: string): string => {
        return text.replace(/\*\*(.*?)\*\*/g, "$1");
    };

    const modifyText = (text: string): string => {
        let result = '';
        result = changeStarsToBold(text);

        return result;
    }

    const time = computed(() =>  {
        const milisiconds = props.message.created_at * 1000;
        const zero = new Date(milisiconds).getMinutes() < 10 ? '0' : '';
        return `${new Date(milisiconds).getHours()}:${zero}${new Date(milisiconds).getMinutes()}`
    })


    const modifiedMessageContent = computed(() => props.message.content.map((content) => {
        return {
            ...content,
            text: {
                ...content.text,
                value: modifyText(content.text.value),
            }
        }
    }));

</script>

<template>
    <div class="message">
        <div 
            v-for="content in modifiedMessageContent"
            class="message__block"
            :class="`message__block_${message.role}`"
        >
            <div 
                class="message__text"
                :class="`message__text_${message.role}`"
            >
                <p>{{ content.text.value }}</p>
                <div class="message__info">
                    <div 
                        class="message__time"
                        :class="`message__time_${message.role}`"
                    >
                        {{ time }}
                    </div>
                    <div 
                        :class="[
                            'message_status',
                            `message_status-${messageStatus}`
                        ]"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .message {
        width: 100%;

        &__text {
            max-width: 80%;
            padding: 12px 16px;
            background-color: #f1f0f0;
            border-radius: 6px;
            font-family: $fontRegular;
            font-size: 14px;

            &_user {
                color: #fff;
                background-color: #4e8cff;
            }
            &_assistant {
                color: #222d38;
                justify-content: flex-start;
                white-space: pre-wrap;
            }
        }

        &__info {
            margin-top: 4px;
            display: flex;
            justify-content: flex-end;
            gap: 4px;
        }

        &__block {
            display: flex;
            width: 100%;
            

            &_user {
                justify-content: flex-end;

                .message_status-sent {
                    background-image: url('../icons/user-sent.svg');
                }
                .message_status-read {
                    background-image: url('../icons/user-read.svg');
                }
                .message_status-delivered {
                    background-image: url('../icons/user-delivered.svg');
                    opacity: 0.5;
                }
            }
            &_assistant {
                justify-content: flex-start;

                .message_status-read {
                    background-image: url('../icons/assistant-read.svg');
                }
            }
        }

        &__time {
            display: flex;
            justify-content: flex-end;
            font-size: 12px; 

            &_user {
                color: #fff9;
            }
            &_assistant {
                color: #9d9e9f;
            }
        }
        &_status {
            width: 15px;
            height: 14px;
        }

    }

</style>