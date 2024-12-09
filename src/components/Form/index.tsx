import { useConfig } from "@context/Config";
import FormVisualizer from "./Visualizer";
import FormBuilder from "./Builder";
import FormViewer from "./Viewer";
import { warn } from "@utils/log";

const Form: FC = () => {
    const config = useConfig();

    if (!config) return null;

    if (config.type !== "builder" && config.type !== "viewer" && config.type !== "visualizer") {
        warn("Invalid form type, defaulting to viewer");
    }

    console.log("render form");

    return config.type === "builder" 
        ? <FormBuilder /> 
        : config.type === "visualizer" 
            ? <FormVisualizer /> 
            : <FormViewer />;
}

export default Form;