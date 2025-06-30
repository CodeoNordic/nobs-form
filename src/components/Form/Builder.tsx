import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { surveyLocalization } from "survey-react-ui";
import { useConfig } from "@context/Config";
import "survey-creator-core/i18n/norwegian";
import "survey-core/i18n/norwegian";
import { useMemo } from "react";
import { Serializer, slk } from "survey-core";
import performScript from "@utils/performScript";

const FormBuilder: FC = () => {
    const config = useConfig();

    if (!config) return null;

    if (config.licenseKey) {
        // Set the license key for the survey creator
        slk(config.licenseKey);
    }

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

        const creatorOptions = {
            isAutoSave: config.isAutoSave,
            ...(
                typeof config.tabs == "boolean" ? {
                    showLogicTab: config.tabs,
                    showJSONEditorTab: config.tabs,
                    showTestSurveyTab: config.tabs
                } : {
                    showLogicTab: config.tabs.includes("logic"),
                    showJSONEditorTab: config.tabs.includes("json"),
                    showTestSurveyTab: config.tabs.includes("preview")
                }
            )
        };

        // // Because it's "nb" instead of "no"
        const locale = config.locale === "en" ? "en" : "nb";
        editorLocalization.defaultLocale = locale;
        editorLocalization.currentLocale = locale;
    
        // // Normal here
        surveyLocalization.defaultLocale = config.locale;
        surveyLocalization.currentLocale = config.locale;
        surveyLocalization.supportedLocales = ["no", "en"];

        if (config.locale === "no") {
            // Some custom localizations for Norwegian
            (editorLocalization.locales as any)["nb"].qt.boolean = "Ja/Nei";
            (editorLocalization.locales as any)["nb"].qt.tagbox = "Rullegardinmeny med flere valg";
            (editorLocalization.locales as any)["nb"].pe.labelTrue = "\"Ja\" etikett";
            (editorLocalization.locales as any)["nb"].pe.labelFalse = "\"Nei\" etikett";
            (editorLocalization.locales as any)["nb"].pe.question.name = "Spørsmålsnavn";
            (editorLocalization.locales as any)["nb"].pe.question.title = "Spørsmålstittel";
            (editorLocalization.locales as any)["nb"].pv.inputType.number = "Tall";
            (editorLocalization.locales as any)["nb"].pv.hidden = "Skjult";
            (editorLocalization.locales as any)["nb"].pv.hide = "Skjul";
            (editorLocalization.locales as any)["nb"].pv.show = "Vis";
            (editorLocalization.locales as any)["nb"].pv.none = "Ingen";
            (editorLocalization.locales as any)["nb"].pv.asc = "Stigende";
            (editorLocalization.locales as any)["nb"].pv.desc= "Synkende";
            (editorLocalization.locales as any)["nb"].pv.default = "Standard";
            (editorLocalization.locales as any)["nb"].pv.top = "Topp";
            (editorLocalization.locales as any)["nb"].pv.bottom = "Bunn";
            (editorLocalization.locales as any)["nb"].pv.left = "Venstre";
            (editorLocalization.locales as any)["nb"].pv.collapsed = "Kollapset";
            (editorLocalization.locales as any)["nb"].pv.expanded = "Utvidet";
            (editorLocalization.locales as any)["nb"].pv.edit = "Redigering";
            (editorLocalization.locales as any)["nb"].pv.page = "Side";
            (editorLocalization.locales as any)["nb"].pv.survey = "Undersøkelse";
            (editorLocalization.locales as any)["nb"].pv.display = "Kun lesbart";
            (editorLocalization.locales as any)["nb"].pv.inherit = "Arv";
            (editorLocalization.locales as any)["nb"].pv.onNextPage = "Ved neste side";
            (editorLocalization.locales as any)["nb"].pv.onValueChanged = "Ved endring av verdi";
            (editorLocalization.locales as any)["nb"].pv.random = "Tilfeldig";
            (editorLocalization.locales as any)["nb"].pv.noPreview = "Ingen forhåndsvisning";
            (editorLocalization.locales as any)["nb"].pv.onComplete = "Ved fullføring";
            (editorLocalization.locales as any)["nb"].pv.onHidden = "Ved skjuling";
            (editorLocalization.locales as any)["nb"].pv.showAllQuestions = "Vis alle spørsmål";
            (editorLocalization.locales as any)["nb"].pv.showAnsweredQuestions = "Vis besvarte spørsmål";
            (editorLocalization.locales as any)["nb"].pv.underRowSingle = "Under raden, bare ett panel er synlig";
            (editorLocalization.locales as any)["nb"].p.navigationButtonsVisibility = "Navigasjonsknapper synlighet";
            (editorLocalization.locales as any)["nb"].p.validators = "Valideringsalternativer";
            (editorLocalization.locales as any)["nb"].p.choices = "Alternativer";
            (editorLocalization.locales as any)["nb"].triggers.completetrigger = "fullføre undersøkelse";
            (editorLocalization.locales as any)["nb"].triggers.setvaluetrigger = "sett verdi";
            (editorLocalization.locales as any)["nb"].triggers.copyvaluetrigger = "kopier verdi";
            (editorLocalization.locales as any)["nb"].pv.backgroundImageFit = {
                auto: "Auto",
                cover: "Dekk", 
                contain: "Tilpass",
                fill: "Fyll",
                tile: "Flislegg" 
            };
            (editorLocalization.locales as any)["nb"].pv.cover = "Dekk";
            (editorLocalization.locales as any)["nb"].pv.contain = "Tilpass";
            (editorLocalization.locales as any)["nb"].pv.fill = "Fyll";
            (editorLocalization.locales as any)["nb"].pehelp.logofit = "Velg mellom: \"Ingen\" - bildet opprettholder sin opprinnelige størrelse; \"Tilpass\" - bildet endres for å passe samtidig som størrelsesforholdet opprettholdes; \"Dekk\" - bildet fyller hele boksen mens du opprettholder størrelsesforholdet; \"Fyll\" - bildet strekkes for å fylle boksen uten å opprettholde størrelsesforholdet.";
            (editorLocalization.locales as any)["nb"].pehelp.imageFit = "Velg mellom: \"Ingen\" - bildet opprettholder sin opprinnelige størrelse; \"Tilpass\" - bildet endres for å passe samtidig som størrelsesforholdet opprettholdes; \"Dekk\" - bildet fyller hele boksen mens du opprettholder størrelsesforholdet; \"Fyll\" - bildet strekkes for å fylle boksen uten å opprettholde størrelsesforholdet.";
        }

        const newCreator = new SurveyCreator(creatorOptions);

        newCreator.survey.locale = config.locale;

        if (config.questionTypes !== undefined) {
            if (Array.isArray(config.questionTypes)) {
                // Hide question types listed in config
                config.questionTypes.forEach((type) => {
                    newCreator.toolbox.removeItem(type);
                });
            } else if (config.questionTypes === false) {
                // Hide all question types
                newCreator.toolbox.clearItems();
            }
        }
        
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

        if (config.value) {
            const surveyJson = JSON.parse(config.value);
            newCreator.JSON = surveyJson;
        } else {
            // Localizations for no
            let surveyJson = config.locale === "no" ? {
                completedHtml: "<h3>Takk for at du utførte undersøkelsen</h3>",
                completedBeforeHtml: "<h3>Du har allerede gjort ferdig undersøkelsen</h3>",
                loadingHtml: "<h3>Laster undersøkelse...</h3>",
                completeText: "Fullfør",
            } : {};

            if (config.defaultValues?.survey) {
                surveyJson = { ...surveyJson, ...config.defaultValues.survey };
            }

            newCreator.JSON = surveyJson;
        }

        return newCreator;
    }, [
        config.locale, 
        config.questionTypes, 
        config.tabs, 
        config.propertyGridTabs, 
        config.questionPropertyGrid
    ]); // Add deps that should trigger a re-render
    
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

            const getNestedQuestions = (elements: any[]) => {
                let nestedQuestions: any[] = [];

                elements.forEach((el) => { 
                    if (el.elements) {
                        nestedQuestions = nestedQuestions.concat(getNestedQuestions(el.elements));
                    } else {
                        nestedQuestions.push(el);
                    } 
                });

                return nestedQuestions;
            };

            if (!question.name.includes("Caption")) {
                const questions: any[] = [];
                const survey = JSON.parse(config.value || "{}");

                survey?.pages?.forEach((page: any) => {
                    questions.push(...getNestedQuestions(page.elements));
                });

                const highestIndex = questions.reduce((max, q) => {
                    const index = parseInt(q.name.replace(/^\D+/g, '')) || 0; // Extract number from name
                    return Math.max(max, index);
                }, 0);

                const num = (highestIndex + 1).toString().padStart(2, '0');
                question.name = `Caption${num}`;    
            }
            if (config.defaultValues?.question) {
                Object.entries(config.defaultValues.question).forEach(([key, value]) => {
                    question[key] = value;
                });
            }
        });

        if (config.hideCompleteButton) {
            creator.onSurveyInstanceCreated.add(function(_, options) {
                if(options.reason == "test") {
                    const completeAction = options.survey.navigationBar.getActionById("sv-nav-complete");
                    completeAction.visible = false;
                    options.survey.onCurrentPageChanged.add(() => {
                        completeAction.visible = false;
                    });
                }
            });
        }

        creator.saveSurveyFunc = (saveNo: number) => {
            console.log("Saving survey", saveNo);

            config.value = creator.text;
            if (config.scriptNames?.autoSave) {
                performScript(config.scriptNames.autoSave, {
                    value: creator.text,
                    saveNo: saveNo,
                }, undefined, true);
            }
        }
    }

    return <SurveyCreatorComponent creator={creator} />;
}

export default FormBuilder;