import Routers from './Routers';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
    <Routers />
    </SearchProvider>
  );
}

export default App;
