import * as React from 'react';
interface Message {
    user: string;
    text: string;
}
interface Props {
    hostServices: any;
    tableData: {
        categories: any[];
        measures: any[];
        categoryColumns: string[];
        measureColumns: string[];
    } | null;
}
interface State {
    messages: Message[];
    inputValue: string;
    showMessage: boolean;
}
export default class ReactChatbot extends React.Component<Props, State> {
    constructor(props: Props);
    sendMessage: () => Promise<void>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): React.JSX.Element;
    private addBotMessage;
}
export {};
