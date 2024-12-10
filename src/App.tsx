import Form from '@components/Form';
import { useConfig } from '@context/Config';

const App: FC = () => {
    const config = useConfig();

    if (!config) return null;

    console.log("render app");

    return <Form />;
}

export default App;