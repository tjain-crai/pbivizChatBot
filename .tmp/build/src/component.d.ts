import * as React from 'react';
interface Message {
    user: string;
    text: string;
}
interface Props {
    hostServices: any;
}
interface State {
    messages: Message[];
    inputValue: string;
}
export default class Chatbot extends React.Component<Props, State> {
    constructor(props: Props);
    sendMessage: () => Promise<void>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
