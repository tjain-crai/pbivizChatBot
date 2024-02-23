"use strict";

import powerbi from "powerbi-visuals-api";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactChatbot from './component';
import * as d3 from "d3";

import { VisualSettings } from './settings';

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;

import './../style/visual.less';

export class Visual implements IVisual {
    private target: HTMLElement;
    private settings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.settings = new VisualSettings(); // Initialize settings here

        // Render React component
        this.renderReactComponent(options);
    }

    public update(options: VisualUpdateOptions) {
        // Update settings if necessary
        if (options && options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];
            const metadata = dataView.metadata;
            const objects = metadata && metadata.objects;

            this.settings = this.extractSettings(objects);
        }
    }

    private renderReactComponent(options: VisualConstructorOptions) {
        ReactDOM.render(
            React.createElement(ReactChatbot, {
                hostServices: options.host,
                settings: this.settings
            }),
            this.target
        );
    }

    private extractSettings(objects: powerbi.DataViewObjects): VisualSettings {
        let visualSettings: VisualSettings = new VisualSettings();

        if (objects && objects.apiKeySettings) {
            const apiKey = objects.apiKeySettings.apiKey as string;
            if (apiKey) {
                visualSettings.apiKey = apiKey;
            }
        }

        return visualSettings;
    }
}
