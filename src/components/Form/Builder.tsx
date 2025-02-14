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

        const validatedQuestionTypes = Array.isArray(config.questionTypes) 
            && config.questionTypes.length > 0
                ? config.questionTypes 
                : [];

        const creatorOptions = {
            isAutoSave: true,
            questionTypes: validatedQuestionTypes,
            ...(
                config.tabs && typeof config.tabs == "boolean" ? {
                    showLogicTab: true,
                    showJSONEditorTab: true,
                    showTestSurveyTab: true
                } : ( 
                    config.tabs 
                        && Array.isArray(config.tabs) 
                        && config.tabs.length > 0 
                    ? {
                        showLogicTab: config.tabs.includes("logic"),
                        showJSONEditorTab: config.tabs.includes("json"),
                        showTestSurveyTab: config.tabs.includes("preview")
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
        if (config.questionTypes === false || (Array.isArray(config.questionTypes) && config.questionTypes.length === 0)) {
            newCreator.toolbox.clearItems();
        }

        if (config.value) {
            try {
                const surveyJson = JSON.parse(config.value);
                newCreator.JSON = surveyJson;
            } catch (e) {
                // fallback if the JSON is invalid
                newCreator.text = config.value;
            }
        } else if (config.defaultValues?.survey) {
            newCreator.JSON = config.defaultValues.survey;
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
    }, [config.locale, config.questionTypes, config.tabs]); // Add deps that should trigger a re-render
    
    // Show only the selected properties in the property grid
    if (creator && config.propertyGrid) {
        creator.onShowingProperty.add(function (_, options) {
            options.canShow = config.propertyGrid === true || (
                Array.isArray(config.propertyGrid) 
                    && config.propertyGrid.indexOf(options.property.name) > -1
            );
        });

        creator.onPageAdded.add(function (_, options) {
            const page = options.page;
          
            if (config.defaultValues?.question) {
                Object.entries(config.defaultValues.page).forEach(([key, value]) => {
                    (page as any)[key] = value;
                });
            }

        });

        
        creator.onQuestionAdded.add((_, options) => {
            const question = options.question;
          
            if (config.defaultValues?.question) {
                Object.entries(config.defaultValues.question).forEach(([key, value]) => {
                    question[key] = value;
                });
            }
        });
    }

    console.log("render builder", Date.now());

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;