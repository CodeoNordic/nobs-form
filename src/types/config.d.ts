declare global {
    namespace Form {
        interface Config {
            value: string;

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