import powerbi from "powerbi-visuals-api";
import './../style/visual.less';
export declare class Visual implements powerbi.extensibility.visual.IVisual {
    private target;
    private reactRoot;
    constructor(options: powerbi.extensibility.visual.VisualConstructorOptions);
    update(options: powerbi.extensibility.visual.VisualUpdateOptions): void;
}
