import { useConfigState } from "@context/Config";
import performScript from "@utils/performScript";

// TODO: Replace example and rename file
const Example2: FC = () => {
    const [config, setConfig] = useConfigState();

    if (!config) return null;

    return <div>
        <p>{config.value}</p>
        <button onClick={() => setConfig({ ...config, value: 'new value' })}>Change Value</button>
        {config.scriptNames.exampleScript && <div>
            <p>{config.scriptNames.exampleScript}</p>
            <button onClick={() => {
                performScript("exampleScript", { param: config.value || 'no value' });
            }}>Run script</button>
        </div>}

    </div>
}

export default Example2;