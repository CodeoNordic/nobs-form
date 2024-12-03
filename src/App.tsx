import Example from '@components/Example';
import { useConfig } from '@context/Config';

const App: React.FC = () => {
    const config = useConfig();

    if (!config) return null;

    // TODO: Change to your own component
    return <Example />
}

export default App;