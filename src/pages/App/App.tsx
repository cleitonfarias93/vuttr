import React, { useEffect, useState } from 'react';

// Services
import { getTools } from 'services/VuttrService';

// Components
import Header from 'components/Header/Header';
import ToolItem from 'components/ToolItem';

// Models
import { ToolEntity } from 'models/toolEntity';

// Styles
import './App.scss';

const App: React.FC = () => {
  const [tools, setTools] = useState<ToolEntity[]>([]);

  const fetchTools = async () => {
    try {
      const response = await getTools();
      setTools(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return (
    <main className="App">
      <Header title="VUTTR" subTitle="Very Useful Tools to Remember" />
      {tools.map((tool) => (
        <ToolItem key={tool.id} tool={tool} />
      ))}
    </main>
  );
};

export default App;
