declare global {
    // TODO: Rename Example to your namespace
    namespace Example {
        interface Config {
            // TODO: Define config values here
            value: string;

            scriptNames: Example.ScriptNames;
            
            // should be kept, or remove from log file.
            ignoreInfo: boolean;
            ignoreWarnings: boolean;
        }
    }

    // Make values accessible via window
    interface Window {
        _config?: Example.Config;
    }
}

export {}