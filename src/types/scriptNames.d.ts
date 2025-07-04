declare global {
    namespace Form {
        interface ScriptNames {
            /** Script to be ran when autosave triggers */
            autoSave?: string;

            /** Script to be ran if the JSON is invalid */
            invalidJson?: string;

            /** Only used if the script result shall be returned to JS */
            onJsRequest?: string;
            onJsError?: string;            
        }
    }
}

export {};