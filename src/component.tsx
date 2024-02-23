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
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [
        { user: 'bot', text: 'Hello! I am your Viz chatbot. Ask me anything related to the data.' }
      ],
      inputValue: '',
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  sendMessage = async () => {
    // Add your OpenAI API integration here
    // For now, let's just simulate a response
    const { apiKey } = this.props.settings;
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
                 'Authorization': 'Bearer ${apiKey}'},
      body: JSON.stringify({ text: this.state.inputValue }),
    });

    const data = await res.json();
    this.setState((prevState) => ({
      messages: [...prevState.messages, { user: 'user', text: prevState.inputValue }, { user: 'bot', text: data.text }],
      inputValue: '',
    }));
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { messages, inputValue } = this.state;
  
    return (
      <div className="chatbot-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.user}`}>
              {message.user === 'bot' && (
                <div className="bot-message">
                  <div className="openai-logo" /> {/* Apply openai-logo class here */}
                  <div>{message.text}</div>
                </div>
              )}
              {message.user === 'user' && message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            className="input"
            value={inputValue}
            onChange={this.onInputChange}
          />
          <button className="send-button" onClick={this.sendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  }
  
}