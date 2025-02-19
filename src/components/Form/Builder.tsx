import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { surveyLocalization } from "survey-react-ui";
import { useConfig } from "@context/Config";
import "survey-creator-core/i18n";
import { useMemo } from "react";
import { Serializer } from "survey-core";

const FormBuilder: FC = () => {
    const config = useConfig();

    if (!config) return null;

    // useMemo so you can choose when to re-render
    const creator = useMemo(() => {
        if (config.validateFromFileMaker) {
            Serializer.removeProperty("question", "validateFromFileMaker");
            Serializer.addProperty("question", {
                name: "validateFromFileMaker",
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
            const surveyJson = JSON.parse(config.value);
            newCreator.JSON = surveyJson;
        } else {
            // Localizations for no
            let surveyJson = config.locale === "no" ? {
                completedHtml: "<h3>Takk for at du utførte undersøkelsen</h3>",
                completedBeforeHtml: "<h3>Du har allerede gjort ferdig undersøkelsen</h3>",
                loadingHtml: "<h3>Laster undersøkelse...</h3>",
                completeText: "Fullfør"
            } : {};

            if (config.defaultValues?.survey) {
                surveyJson = { ...surveyJson, ...config.defaultValues.survey };
            }

            // Set default survey 
            newCreator.JSON = surveyJson;
        }

        return newCreator;
    }, [config.locale, config.questionTypes, config.tabs]); // Add deps that should trigger a re-render
    
    if (creator && config.propertyGrid) {
        // Show only the selected properties in the property grid
        creator.onShowingProperty.add(function (_, options) {
            options.canShow = config.propertyGrid === true || (
                Array.isArray(config.propertyGrid) 
                    && config.propertyGrid.indexOf(options.property.name) > -1
            );
        });

        // Set default values for pages
        creator.onPageAdded.add(function (_, options) {
            const page = options.page;

            if (page.elements.length === 0 && config.defaultValues?.page) {
                Object.entries(config.defaultValues.page).forEach(([key, value]) => {
                    (page as any)[key] = value;
                });
            }
        });

        // Set default values for questions
        creator.onQuestionAdded.add((_, options) => {
            const question = options.question;
          
            if (config.defaultValues?.question) {
                Object.entries(config.defaultValues.question).forEach(([key, value]) => {
                    question[key] = value;
                });
            }
        });
    }

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;