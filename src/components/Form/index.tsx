import { useConfig } from "@context/Config";
import FormBuilder from "./Builder";

const Form: FC = () => {
    const config = useConfig();
    
    if (!config) return null;
    
    console.log("render form");

    return <FormBuilder /> 
            
}

export default Form;