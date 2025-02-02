import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/Sidebar';
import MediaGrid from './components/MediaGrid';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="flex w-screen items-center overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-gray-800 min-h-screen">
          <MediaGrid />
        </main>
      </div>
    </Provider>
  );
};

export default App;