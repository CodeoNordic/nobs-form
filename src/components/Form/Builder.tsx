import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { surveyLocalization } from "survey-react-ui";
import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";
import "survey-creator-core/i18n";
import { useMemo } from "react";

const FormBuilder: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    // useMemo so you can choose when to re-render
    const creator = useMemo(() => {
        const creatorOptions = {
            isAutoSave: true,
            questionTypes: config.questionTypes,
            ...(config.creatorTabs && typeof config.creatorTabs == "boolean" ? {
                showLogicTab: true,
                showJSONEditorTab: true,
                showTestSurveyTab: true
            } : ( config.creatorTabs && Array.isArray(config.creatorTabs) && config.creatorTabs.length > 0 ? {
                showLogicTab: config.creatorTabs.includes("logic"),
                showJSONEditorTab: config.creatorTabs.includes("json"),
                showTestSurveyTab: config.creatorTabs.includes("preview")
            } : {
                showLogicTab: false, 
                showJSONEditorTab: false, 
                showTestSurveyTab: false 
            }))
        };

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
            try {
                const surveyJson = JSON.parse(config.value);
                surveyJson.clearInvisibleValues = "onHidden";
                newCreator.JSON = surveyJson;
            } catch (e) {
                // fallback
                newCreator.text = config.value;
            }
        }

        // Autosave function
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
    }, [config.locale, config.questionTypes, config.creatorTabs]); // Add deps that should trigger a re-render

    console.log("render builder");

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;