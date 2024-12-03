import Form from '@components/Form';
import { useConfig } from '@context/Config';

const App: React.FC = () => {
    const config = useConfig();

    if (!config) return null;

    return <Form />
}

export default App;