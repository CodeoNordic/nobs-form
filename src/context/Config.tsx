import { createContext, useContext, useEffect, useState } from 'react';
import performScript, { loadCallbacks } from '@utils/performScript';
import { warn } from '@utils/log';

const defaultConfig: Partial<Form.Config> = {
    locale: 'no',
    questionTypes: true,
    propertyGridTabs: true,
    tabs: true,
    isAutoSave: true
};

// Parses the JSON from FileMaker into a readable config
const parseConfig = (cfg: string = '{}') => {
    try {
        const config = JSON.parse(cfg) as Form.Config;

        Object.keys(defaultConfig).forEach((key) => {
            (config as RSAny)[key] ??= defaultConfig[key as keyof Form.Config];
        });

        return config;
    } catch(err) {
        console.error(err);
    }
}

// Runs any script that was attempted called before the config was loaded
const runLoadCallbacks = () => loadCallbacks.length && loadCallbacks.forEach(cb => {
    cb();
    loadCallbacks.splice(loadCallbacks.indexOf(cb), 1);
});

// FileMaker may call init before useEffect can assign the function
// This acts as a failsafe
window.init = cfg => {
    const parsedConfig = parseConfig(cfg);
    if (!parsedConfig) return;

    window._config = parsedConfig;
    runLoadCallbacks();
};

// Validates the config object every time it's set or updated
const validateConfig = (config: any): Form.Config => {
    const validLocales = ['en', 'no'];
    const validTabs = ['logic', 'json', 'preview'];

    const validatedConfig = { ...defaultConfig, ...config };
  
    // Validate 'locale'
    if (!validLocales.includes(validatedConfig.locale)) {
      warn(`Invalid locale "${validatedConfig.locale}", defaulting to "${defaultConfig.locale}"`);
      validatedConfig.locale = defaultConfig.locale;
    }

    if (config.value) {
        try {
            JSON.parse(config.value);
        } catch (e) {
            warn("Failed to parse form value, will start with empty form.", e);
            
            if (config.scriptNames?.invalidJson) {
                performScript(config.scriptNames.invalidJson);
            }

            validatedConfig.value = '';
        }
    }

    if (config.questionTypes) {
        try {
            if (!Array.isArray(config.questionTypes) && typeof config.questionTypes !== 'boolean') {
                throw new Error("Not an array or boolean");
            }
        } catch (e) {
            warn("Failed to parse question types, defaulting to true (show all)", e);
            validatedConfig.questionTypes = true;
        }
    }

    if (config.propertyGrid) {
        try {
            if (!Array.isArray(config.propertyGrid) && typeof config.propertyGrid !== 'boolean') {
                throw new Error("Not an array or boolean");
            }
        } catch (e) {
            warn("Failed to parse question types, defaulting to true (show all)", e);
            validatedConfig.propertyGrid = true;
        }
    }

    if (config.tabs !== undefined) {
        if (typeof config.tabs === 'boolean') {
            validatedConfig.tabs = config.tabs;
        } else if (Array.isArray(config.tabs)) {
            const filteredTabs = config.tabs.filter((tab: string) => {
                if (!validTabs.includes(tab)) {
                    warn(`Invalid tab for creator "${tab}", won't use`);
                    return false;
                }
                return true;
            });
        
            if (filteredTabs.some((t: string, i: number) => t !== validatedConfig.tabs[i])) {
                validatedConfig.tabs = filteredTabs;
            }
        } else  {
            warn("Invalid tabs for creator, defaulting to true (show all)");
            validatedConfig.tabs = true;
        }
    }

    // Add additional validation
  
    return validatedConfig;
  };

const ConfigContext = createContext<State<Form.Config|null>>([null, () => {}]);
const ConfigProvider: FC = ({ children }) => {
    const [config, setConfigState] = useState<Form.Config | null>(null);

    // Validate before setting
    const setConfig = (newConfig: React.SetStateAction<Form.Config | null>) => {
        setConfigState((prevConfig) => {
            const updatedConfig = typeof newConfig === 'function' ? newConfig(prevConfig) : newConfig;
            return updatedConfig ? validateConfig(updatedConfig) : null;
        });
    };

    useEffect(() => {
        if (window._config !== undefined) setConfig(window._config);

        window.init = cfg => {
            const parsedConfig = parseConfig(cfg);
            if (!parsedConfig) return;

            window._config = parsedConfig;
            setConfig(parsedConfig);

            runLoadCallbacks();
        }
    }, []);

    // Update window._config upon change
    useEffect(() => {
        window._config = config || undefined;
    }, [config]);

    //if (!config) return null;
    return <ConfigContext.Provider value={[config, setConfig]}>
        {children}
    </ConfigContext.Provider>
}

export const useConfig = () => {
    const [config] = useContext(ConfigContext);
    return config;
}

export const useConfigState = () => {
    const ctx = useContext(ConfigContext);
    return ctx;
}

export default ConfigProvider;