"use strict";

import powerbi from "powerbi-visuals-api";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactChatbot from './component';

import './../style/visual.less';

export class Visual implements powerbi.extensibility.visual.IVisual {
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;

  constructor(options: powerbi.extensibility.visual.VisualConstructorOptions) {
    this.reactRoot = React.createElement(ReactChatbot, { hostServices: options.host });
    this.target = options.element;

    ReactDOM.render(this.reactRoot, this.target);
  }

  
    public update(options: powerbi.extensibility.visual.VisualUpdateOptions) {}
  }

// //   public update(options: powerbi.extensibility.visual.VisualUpdateOptions) {}
//   public update(options: powerbi.extensibility.visual.VisualUpdateOptions) {
//     // Make API call
//     this.makeApiCall().then(response => {
//         // Process response and format as chatbot messages
//         const messages = response.map(msg => `<div class="message">${msg}</div>`).join('');
//         this.target.innerHTML = messages;
//     }).catch(error => {
//         console.error("Error fetching data:", error);
//     });
// }

// private makeApiCall(): Promise<string[]> {
//     // Replace 'your_api_endpoint' with your actual API endpoint
//     return fetch('https://api.openai.com/v1/chat/completions')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Assuming data is an array of chatbot messages
//             return data;
//         });
// }

// public update(options: powerbi.extensibility.visual.VisualUpdateOptions) {
//     // Extract user input from options
//     const userInput = options.dataViews[0].table.rows[0][0].toString(); // Assuming the user input is in the first row of the first column

//     // Make API call with user input
//     this.makeApiCall(userInput).then(response => {
//         // Process response and format as chatbot messages
//         const messages = response.map(msg => `<div class="message">${msg}</div>`).join('');
//         this.target.innerHTML = messages;
//     }).catch(error => {
//         console.error("Error fetching data:", error);
//     });
// }

// private makeApiCall(userInput: string): Promise<string[]> {
//     return fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer '
//         },
//         body: JSON.stringify({ text: userInput })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Assuming data is an array of chatbot messages
//         return data;
//     });
// }


// }
