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
    };
}
interface State {
    messages: Message[];
    inputValue: string;
}
export default class ReactChatbot extends React.Component<Props, State> {
    constructor(props: Props);
    sendMessage: () => Promise<void>;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): React.JSX.Element;
}
export {};
