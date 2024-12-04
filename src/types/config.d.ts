declare global {
    namespace Form {
        interface Config {
            // The form data, in json format
            value?: string;

            // The version of the form
            type: 'viewer'|'builder';

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