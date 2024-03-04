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

export default class ReactChatbot extends React.Component<Props, State> {
  
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
    const { inputValue } = this.state;
      // Construct the request body
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputValue }],
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6
    };

    try {
    // For now, let's just simulate a response
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
                 'Authorization': `Bearer `},
      // body: JSON.stringify({ text: this.state.inputValue }),
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
  }

    const data = await res.json();

    this.setState((prevState) => ({
      messages: [...prevState.messages, { user: 'user', text: prevState.inputValue }, { user: 'bot', text: data.choices[0].message.content }],
      inputValue: '',
    }));
  } catch (error) {
    console.error('Error:', error);
}
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
                  <div className="openai-logo" /> 
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
