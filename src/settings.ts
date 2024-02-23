"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import Model = formattingSettings.Model;
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;

export class VisualSettings extends Model {
    public apiKey: string = "";
}

// export class VisualSettings extends Model {
//     public apiKey: string = "";
// }
