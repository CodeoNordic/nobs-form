import { useConfig } from "@context/Config";
import FormViewer from "./Viewer";
import FormBuilder from "./Builder";
import { warn } from "@utils/log";

const Form: FC = () => {
    const config = useConfig();

    if (!config) return null;

    if (config.type !== "builder" && config.type !== "viewer") {
        warn("Invalid form type, defaulting to viewer");
    }

    console.log("render form");

    return config.type === "builder" ? <FormBuilder /> : <FormViewer />;
}

export default Form;