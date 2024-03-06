import * as React from 'react';
// import 'dotenv/config';

interface Message {
  user: string;
  text: string;
}


interface Props {
  hostServices: any;
  // categories: any[]; // Array of arrays for multiple categories
  // measures: any[]; // Array of arrays for multiple measures
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

const apiKey = "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";

// const apiKey = process.env.REACT_APP_API_KEY;

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

    const { tableData } = this.props;


    // Associate measures with their corresponding columns
    // const measureColumnData = tableData.measureColumns.reduce((acc, column, index) => {
    //   acc[column] = tableData.measures[index];
    //   return acc;
    // }, {} as { [key: string]: any });

    // // Format the data to send to the API
    // const requestData = {
    //   categories: tableData.categories,
    //   measures: measureColumnData
    // };

    // console.log("First showing the tabluar data created")
    // console.log(requestData)
    // console.log("Now showing trhe json version of it")
    // console.log(JSON.stringify(requestData))


    const records = tableData.categories[0].map((category: string, index: number) => {
      const record: any = { Category: category };
      tableData.measureColumns.forEach((measureColumn: string, columnIndex: number) => {
        record[measureColumn] = tableData.measures[columnIndex][index];
      });
      return record;
    });

    const dataJson = JSON.stringify(records);

    console.log(Date.now())
    console.log("First showing the tabluar data created")
    console.log(records)
    console.log("Now showing trhe json version of it")
    console.log(dataJson)

      // Construct the request body
      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputValue  + JSON.stringify(records)}],
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
                 'Authorization': `Bearer ${apiKey}`},
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
