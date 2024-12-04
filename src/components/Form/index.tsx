import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";
import { editorLocalization, SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/i18n/norwegian";

const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true
};

const Form: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    const creator = new SurveyCreator(creatorOptions);

    if (config.value) {
        creator.text = config.value;
    }

    editorLocalization.currentLocale = "nb";

    creator.saveSurveyFunc = (saveNo: number, callback: (saveNo: number, success: boolean) => void): void => { 
        if (config.scriptNames?.autoSave) {
            performScript("autoSave", {value: creator.text});
            setConfig({ ...config, value: creator.text });
        } else {
            setConfig({ ...config, value: creator.text });
        }
        callback(saveNo, true);
    }

    return (
        <SurveyCreatorComponent creator={creator} />
    )
}

export default Form;