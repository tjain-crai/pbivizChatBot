import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import Model = formattingSettings.Model;
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
export declare class CircleSettings extends FormattingSettingsCard {
    circleColor: formattingSettings.ColorPicker;
    circleThickness: formattingSettings.NumUpDown;
    name: string;
    displayName: string;
    slices: FormattingSettingsSlice[];
}
export declare class Settings extends Model {
    circle: CircleSettings;
    cards: FormattingSettingsCard[];
}
