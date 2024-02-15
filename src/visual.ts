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