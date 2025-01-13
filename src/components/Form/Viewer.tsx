import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";
import { Model, Survey } from "survey-react-ui";
import { warn } from "@utils/log";
import { useMemo } from "react";
import "survey-core/i18n";


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

        newSurvey.onValueChanged.add((result) => {
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