import { useConfig } from "@context/Config";
import FormVisualizer from "./Visualizer";
import FormBuilder from "./Builder";
import FormViewer from "./Viewer";

const Form: FC = () => {
    const config = useConfig();
    
    if (!config) return null;

    console.log("render form");

    return config.type === "builder" 
        ? <FormBuilder /> 
        : config.type === "visualizer" 
            ? <FormVisualizer /> 
            : <FormViewer />;
}

export default Form;