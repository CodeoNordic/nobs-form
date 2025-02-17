import { useConfig } from "@context/Config";
import FormBuilder from "./Builder";

const Form: FC = () => {
    const config = useConfig();
    
    if (!config) return null;
    
    return (
        <div className={config.compact ? "compact" : ""}> 
            <FormBuilder /> 
        </div>
    )
            
}

export default Form;