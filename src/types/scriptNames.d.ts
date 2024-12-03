declare global {
    namespace Example {
        interface ScriptNames {
            // TODO: Define script names here, and rename namespace
            exampleScript: string;

            /** Only used if the script result shall be returned to JS */
            onJsRequest?: string;
            onJsError?: string;            
        }
    }
}

export {};