import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { surveyLocalization } from "survey-react-ui";
import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";
import "survey-creator-core/i18n";
import { useMemo } from "react";
import { Serializer } from "survey-core";

const FormBuilder: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    // useMemo so you can choose when to re-render
    const creator = useMemo(() => {
        if (config.scriptNames?.validate) {
            Serializer.removeProperty("question", "validateFromFilemaker");
            Serializer.addProperty("question", {
                name: "validateFromFilemaker",
                displayName: config.locale == "en" ? "Validate from FileMaker" : "Valider fra FileMaker",
                default: false,
                visible: true,
                category: "validation",
                type: "boolean",
            });
        }

        const validatedQuestionTypes = Array.isArray(config.creatorOptions?.questionTypes) 
            && config.creatorOptions?.questionTypes.length > 0
                ? config.creatorOptions?.questionTypes 
                : [];

        const creatorOptions = {
            isAutoSave: true,
            questionTypes: validatedQuestionTypes,
            ...(
                config.creatorOptions?.tabs && typeof config.creatorOptions?.tabs == "boolean" ? {
                    showLogicTab: true,
                    showJSONEditorTab: true,
                    showTestSurveyTab: true
                } : ( 
                    config.creatorOptions?.tabs 
                        && Array.isArray(config.creatorOptions?.tabs) 
                        && config.creatorOptions?.tabs.length > 0 
                    ? {
                        showLogicTab: config.creatorOptions.tabs.includes("logic"),
                        showJSONEditorTab: config.creatorOptions.tabs.includes("json"),
                        showTestSurveyTab: config.creatorOptions.tabs.includes("preview")
                    } : {
                        showLogicTab: false, 
                        showJSONEditorTab: false, 
                        showTestSurveyTab: false 
                    }
                )
            )
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

        // Hide question types if set to false or empty array
        if (config.creatorOptions?.questionTypes === false || (Array.isArray(config.creatorOptions?.questionTypes) && config.creatorOptions?.questionTypes.length === 0)) {
            newCreator.toolbox.clearItems();
        }

        if (config.value) {
            try {
                const surveyJson = JSON.parse(config.value);
                surveyJson.clearInvisibleValues = "onHidden";
                newCreator.JSON = surveyJson;
            } catch (e) {
                // fallback if the JSON is invalid
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
    }, [config.locale, config.creatorOptions?.questionTypes, config.creatorOptions?.tabs]); // Add deps that should trigger a re-render
    
    // Show only the selected properties in the property grid
    if (creator && config.creatorOptions?.propertyGrid) {
        creator.onShowingProperty.add(function (_, options) {
            options.canShow = config.creatorOptions?.propertyGrid === true || (
                Array.isArray(config.creatorOptions?.propertyGrid) 
                    && config.creatorOptions?.propertyGrid.indexOf(options.property.name) > -1
            );
        });
    }

    console.log("render builder", Date.now());

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;