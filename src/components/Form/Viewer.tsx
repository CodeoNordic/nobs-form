import { useConfigState } from "@context/Config";
import { Model, Survey } from "survey-react-ui";
import "survey-core/i18n";


const FormViewer: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config || !config.value) return null;

    const survey = new Model(config.value);

    survey.locale = config.locale;

    return <Survey model={survey} />;
}

export default FormViewer;