declare global {
    namespace Form {
        interface Config {
            // The form data, in json format
            value?: string;

            // If the form should be compact or not
            compact?: boolean;

            // Default values to use when creating a new question, page or survey
            defaultValues?: {
                question?: any;
                page?: any;
                survey?: any;
            };

            // If an option to validate the form from FileMaker should be shown when creating a question
            validateFromFileMaker?: boolean;

            // The types of questions that can be added to the form
            // True to show all, false to show none, or an array of types to show
            questionTypes?: boolean|string[];

            // The options to show in the sidemenu to the right when editing a question
            // True to show all, false to show none, or an array of options to show
            propertyGrid?: boolean|string[];
            
            // Whether the form should autosave on edit or not
            isAutoSave?: boolean;

            // Whether to show the extra creator tabs or not, can be an array of tabs to show
            // Possible tabs: "logic", "json", "preview"
            tabs: boolean|("logic"|"json"|"preview")[];

            // The language of the form, can be more if needed
            locale: "no"|"en";

            // The script names to use for the form, used to run scripts in FileMaker
            scriptNames?: Form.ScriptNames;
            
            ignoreInfo: boolean;
            ignoreWarnings: boolean;
        }
    }

    // Make values accessible via window
    interface Window {
        _config?: Form.Config;
    }
}

export {}