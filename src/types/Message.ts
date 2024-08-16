
interface Text {
    value: string,
    annotations: string[];
}

export interface TextContentBlock {
    text: Text;
    type: 'text';
}

export type MessageContent = TextContentBlock;

export interface Message {
    id: string;
    created_at: number;
    content: MessageContent[];
    role: 'user' | 'assistant';
}

export type MessageStatus = 'sent' | 'read' | 'delivered';