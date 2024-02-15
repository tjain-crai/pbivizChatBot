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
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [
        { user: 'bot', text: 'Hello! I am a chatbot. Ask me anything related to Power BI.' }
      ],
      inputValue: '',
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  sendMessage = async () => {
    // Add your OpenAI API integration here
    // For now, let's just simulate a response
    const res = await fetch('https://mock-api.com/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
              {message.text}
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