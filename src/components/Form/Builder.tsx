import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";
import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/i18n";
import { useMemo } from "react";
import { surveyLocalization } from "survey-react-ui";
import { warn } from "@utils/log";

const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true
};

const FormBuilder: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    const creator = useMemo(() => {
        if (config.locale !== "en" && config.locale !== "no") {
            warn(`Invalid locale "${config.locale}", defaulting to "no"`);
            config.locale = "no";
        }
    
        // Because it's "nb" instead of "no"
        const locale = config.locale === "en" ? "en" : "nb";
        editorLocalization.defaultLocale = locale;
        editorLocalization.currentLocale = locale;
    
        // Normal here
        surveyLocalization.defaultLocale = config.locale;
        surveyLocalization.currentLocale = config.locale;
        surveyLocalization.supportedLocales = ["no", "en"];
    
        const newCreator = new SurveyCreator(creatorOptions);
    
        if (config.value) {
            newCreator.text = config.value;
        }
    
        newCreator.saveSurveyFunc = (
            saveNo: number,
            callback: (no: number, isSuccess: boolean) => void
        ) => {
            if (config.scriptNames?.autoSave) {
                performScript("autoSave", { value: newCreator.text });
            }
            if (newCreator.text !== config.value) {
                setConfig({ ...config, value: newCreator.text });
            }
            callback(saveNo, true);
        };
    
        return newCreator;
    }, [config.locale]); // Add deps that should trigger a re-render

    console.log("render builder");

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;