import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { surveyLocalization } from "survey-react-ui";
import { useConfig } from "@context/Config";
import "survey-creator-core/i18n";
import { useMemo } from "react";
import { Serializer } from "survey-core";
import performScript from "@utils/performScript";
import { warn } from "@utils/log";

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
            // TODO: Add required before sending or something
        }

        const creatorOptions = {
            isAutoSave: config.isAutoSave,
            ...(
                typeof config.tabs == "boolean" ? {
                    showLogicTab: config.tabs,
                    showJSONEditorTab: config.tabs,
                    showTestSurveyTab: config.tabs
                } : ( 
                    {
                        showLogicTab: config.tabs.includes("logic"),
                        showJSONEditorTab: config.tabs.includes("json"),
                        showTestSurveyTab: config.tabs.includes("preview")
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

        const validatedQuestionTypes = Array.isArray(config.questionTypes) 
            && config.questionTypes.length > 0
                ? config.questionTypes 
                : [];

        validatedQuestionTypes.forEach((type) => {
            newCreator.toolbox.removeItem(type);
        });
        
        // Hide options in property grid
        if (config.questionPropertyGrid) {
            newCreator.onShowingProperty.add((_, options) => {
                options.canShow = config.questionPropertyGrid!.indexOf(options.property.name)=== -1;    
            });
        }

        // Hide tabs in list
        if (config.propertyGridTabs && Array.isArray(config.propertyGridTabs)) {
            newCreator.onSurveyInstanceCreated.add((_, { area, obj, survey }) => {
                if (area === "property-grid") {
                    console.log(survey.getAllPanels().map((panel: any) => panel.jsonObj.name));
                    console.log(survey.getAllPanels().map((panel: any) => panel.jsonObj.elements));

                    (config.propertyGridTabs as string[]).map((type) => {
                        const hideCategory = survey.getPanelByName(type);
                        if (hideCategory) {
                            hideCategory.delete();
                        }
                    });
                }
            });
        } else if (typeof config.propertyGridTabs === "boolean" && !config.propertyGridTabs) {
            newCreator.showPropertyGrid = false;
        }

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

            newCreator.JSON = surveyJson;
        }

        return newCreator;
    }, [config.locale, config.questionTypes, config.tabs, config.propertyGridTabs, config.questionPropertyGrid]); // Add deps that should trigger a re-render
    
    if (creator) {
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

            // TODO: endre spørsmålsnavn til Caption01 etc

            // Skjule spørsmålnavn, valg fra web, data, validering, språkvalg, json

            // Er nødvendig sende når lagres

            //"locale" "mode" "cookieName" "showNavigationButtons" (hele nav siden?) "questionsOrder" "timeLimit"

            // Hide navigation buttons / bare complete button

            if (config.defaultValues?.question) {
                Object.entries(config.defaultValues.question).forEach(([key, value]) => {
                    question[key] = value;
                });
            }
        });

        creator.saveSurveyFunc = (saveNo: number) => { // TODO: finish implementation
            config.value = JSON.stringify(creator.text);
            if (config.scriptNames?.autoSave) {
                performScript(config.scriptNames.autoSave, {
                    value: creator.text,
                    saveNo: saveNo,
                });
            }
        }
    }

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;