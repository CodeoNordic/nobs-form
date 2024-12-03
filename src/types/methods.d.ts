declare global {
    interface Window {
        onScriptResult(uuid: string, data: string): void;

        /** Initialize the component */
        init(config: string): void;

        // TODO: Rename Example to your namespace
        /** Set a specific value in the config */
        setConfigValue<K extends string & keyof Example.Config>(k: K, prop: Example.Config[K], type?: number): void;
    }
}

export {};