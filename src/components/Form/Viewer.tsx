import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";
import { Model, Survey } from "survey-react-ui";
import { warn } from "@utils/log";
import { useMemo } from "react";
import "survey-core/i18n";
import { Serializer } from "survey-core";
import fetchFromFileMaker from "@utils/fetchFromFilemaker";

const FormViewer: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    // useMemo so you can choose when to re-render
    const survey = useMemo(() => {
        const newSurvey = new Model(config.value);

        // Attempt to add existing answer data
        const prevData = config.answerData;
        if (prevData) {
            try {
                const data = JSON.parse(prevData);
                newSurvey.data = data;

                if (data.pageNo) {
                    newSurvey.currentPageNo = data.pageNo;
                }
            } catch (e) {
                warn("Failed to parse answer data, will start with empty data.", e);
            }
        }

        newSurvey.locale = config.locale;

        // Save answer data on answer and page change
        const saveAnswerData = (result: Model) => {
            const data = result.data;
            data.pageNo = result.currentPageNo;

            if (config.scriptNames?.onChange) {
                performScript("onChange", { result: data });
            }

            setConfig({ ...config, answerData: JSON.stringify(data) });
        }

        if (config.scriptNames?.validate) {
            console.log(Serializer.getAllPropertiesByName("question"))
            // Serializer.addProperty("question", {
            //     name: "validateFromFilemaker",
            //     displayName: config.locale == "en" ? "Validate from FileMaker" : "Valider fra FileMaker",
            //     default: false,
            //     visible: true,
            //     category: "validation",
            //     type: "boolean",
            // });
        }

        const validateQuestion = (_: any, options: any) => {
            console.log(options.question, options.question.validateFromFilemaker);

            if (
                options.question && 
                config.scriptNames?.validate && 
                (
                    options.question.validateFromFilemaker || 
                    options.question.validerFraFilemaker
                )
            ) {
                console.log("Validating question using filemaker.");

                options.error = "Nuh uh.";

                // fetchFromFileMaker(config.scriptNames.validate, {
                //     name: options.question.name,
                //     value: options.value as string,
                // }).then((res) => {
                    
                // }).catch((e) => {
                //     warn("Failed to validate question usinmg filemaker.", e);
                // });
            }
        };

        newSurvey.onValidateQuestion.add(validateQuestion);

        newSurvey.onValueChanged.add((result, options) => {
            saveAnswerData(result);
        });
        
        newSurvey.onCurrentPageChanged.add((result) => {
            saveAnswerData(result);
        });

        newSurvey.onComplete.add((result) => {
            let prevAnswers = JSON.parse(config.answers || "[]");

            if (!prevAnswers || !Array.isArray(prevAnswers)) {
                warn("Failed to parse previous answers, will start with empty array.");
                prevAnswers = [];
            }

            setConfig({ 
                ...config, 
                answers: JSON.stringify([...prevAnswers, result.data]) 
            });

            if (config.scriptNames?.onSubmit) {
                performScript("onSubmit", { result: result.data });
            }
        });
        
        return newSurvey;
    }, [config.value, config.locale]);

    console.log("render viewer");

    return <Survey model={survey} />;
}

export default FormViewer;