import { useConfigState } from "@context/Config";
import { Model, Survey } from "survey-react-ui";
import "survey-core/i18n";
import performScript from "@utils/performScript";
import { useMemo } from "react";
import { warn } from "@utils/log";


const FormViewer: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config || !config.value) return null;

    const survey = useMemo(() => {
        const newSurvey = new Model(config.value);

        const prevData = config.answerData;
        if (prevData) {
            try {
                const data = JSON.parse(prevData);
                newSurvey.data = data;

                if (data.pageNo) {
                    newSurvey.currentPageNo = data.pageNo;
                }
            } catch (e) {
                warn("Failed to parse answer data, will init with empty data.", e);
            }
        }

        newSurvey.locale = config.locale;

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