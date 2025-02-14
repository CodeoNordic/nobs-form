declare global {
    namespace Form {
        interface Config {
            // The form data, in json format
            value?: string;

            // The current answers to the form, updated along the way. 
            // Use to continue where the user left off 
            answerData?: string; 

            // Array of all answers to the form, used for visualizing the form
            answers?: string;

            // If the form should be compact or not
            compact?: boolean;

            defaultValues?: {
                // The default values to use when creating a new question
                question?: any;
                // The default values to use when creating a new page
                page?: any;
                // The default values to use when creating a new survey
                survey?: any;
            };

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
            tabs?: boolean|("logic"|"json"|"preview")[];

            // The language of the form, can be more if needed
            locale: "no"|"en";

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