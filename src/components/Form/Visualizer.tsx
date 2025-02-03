import { VisualizationPanel } from "survey-analytics";
import { useConfig } from "@context/Config";
import { useEffect, useMemo } from "react";
import { Model } from "survey-react-ui";
import "survey-core/i18n";

const FormVisualizer: FC = () => {
    const config = useConfig();

    if (!config) return null;

    const survey = useMemo(() => {
        return new Model(config.value);
    }, [config.value]);

    // useEffect so you can choose when to re-render
    useEffect(() => {
        if (!survey || !config.answers) return;

        console.log("recreate visualizer");

        const newVisualizer = new VisualizationPanel(
            survey.getAllQuestions(),
            JSON.parse(config.answers),
            {
                allowDragDrop: config.visualizerOptions?.allowMoveQuestions,
                allowHideQuestions: config.visualizerOptions?.allowHideQuestions,
            }
        );

        newVisualizer.locale = config.locale;

        newVisualizer.render("visualizer");

        return () => {
            const visualizerElement = document.getElementById("visualizer");
            if (visualizerElement) {
                visualizerElement.innerHTML = "";
            }
        }
    }, [survey, config.answers, config.locale, config.visualizerOptions]);

    console.log("render visualizer", Date.now());

    return <div id="visualizer" />;
}

export default FormVisualizer;