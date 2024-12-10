import { VisualizationPanel } from "survey-analytics";
import { useEffect, useState } from "react";
import { useConfig } from "@context/Config";
import { Model } from "survey-react-ui";
import { warn } from "@utils/log";
import "survey-core/i18n";

const FormVisualizer: FC = () => {
    const config = useConfig();
    const [survey, setSurvey] = useState<Model | null>(null);

    if (!config) return null;

    if (!config.value || !config.answers) {
        warn("No form value or answers provided, cannot render visualizer.");
        return null;
    }

    if (!survey) {
        setSurvey(new Model(config.value));
    }

    // useEffect so you can choose when to re-render
    useEffect(() => {
        if (!survey || !config.answers) return;

        console.log("recreate visualizer");

        const newVisualizer = new VisualizationPanel(
            survey.getAllQuestions(),
            JSON.parse(config.answers),
            {} // options, add to config later
        );

        newVisualizer.locale = config.locale;

        newVisualizer.render("visualizer");

        return () => {
            document.getElementById("visualizer")!.innerHTML = "";
        }
    }, [survey, config.answers, config.locale]);

    console.log("render visualizer");

    return <div id="visualizer" />;
}

export default FormVisualizer;