import { useConfigState } from "@context/Config";
import { Model, Survey } from "survey-react-ui";
import "survey-core/i18n";
import performScript from "@utils/performScript";


const FormViewer: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config || !config.value) return null;

    const survey = new Model(config.value);

    survey.locale = config.locale;
    survey.onComplete.add((result) => {
        if (config.scriptNames?.onSubmit) {
            performScript("onSubmit", { result: result.data });
        }
    })  
    
    console.log("render viewer");

    return <Survey model={survey} />;
}

export default FormViewer;