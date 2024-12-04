declare global {
    namespace Form {
        interface Config {
            // The form data, in json format
            value?: string;

            scriptNames: Form.ScriptNames;
            
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