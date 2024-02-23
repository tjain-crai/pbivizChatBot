import * as React from 'react';
import { VisualSettings } from './settings';
export interface Message {
    user: string;
    text: string;
}
export interface Props {
    hostServices: any;
    settings: VisualSettings;
}
export interface State {
    messages: Message[];
    inputValue: string;
}
export default class Chatbot extends React.Component<Props, State> {
    constructor(props: Props);
    sendMessage: () => Promise<void>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): React.JSX.Element;
}
