import { useConfigState } from "@context/Config";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";

const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true
};

const Form: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    const creator = new SurveyCreator(creatorOptions);

    if (config.text) {
        creator.text = config.text;
    }

    creator.saveSurveyFunc = (saveNo: number, callback: (saveNo: number, success: boolean) => void): void => { 
        console.log('saveSurveyFunc', saveNo, creator.text);
        setConfig({ ...config, text: creator.text });
        callback(saveNo, true);
    }

    return (
        <SurveyCreatorComponent creator={creator} />
    )
}

export default Form;