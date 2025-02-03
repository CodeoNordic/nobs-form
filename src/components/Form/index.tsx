import { useConfig } from "@context/Config";
import FormVisualizer from "./Visualizer";
import FormBuilder from "./Builder";
import FormViewer from "./Viewer";
import { warn } from "@utils/log";

const Form: FC = () => {
    const config = useConfig();
    
    if (!config) return null;

    if (config.type === "visualizer" && (!config.value || !config.answers)) {
        warn("No form value or answers provided, cannot render visualizer.");
        return null;
    }
    
    if (config.type === "viewer" && !config.value) {
        warn("No form value provided, cannot render form.");
        return null
    }
    
    console.log("render form", Date.now());

    return config.type === "builder" 
        ? <FormBuilder /> 
        : config.type === "visualizer" 
        ? <FormVisualizer /> 
        : <div className={`formviewer ${config.compact ? "compact" : ""}`}>
            <FormViewer />
        </div>;
            
}

export default Form;