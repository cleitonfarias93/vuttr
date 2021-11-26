import React, { useEffect, useState } from 'react';

// Services
import { getTools } from 'services/VuttrService';

// Semantic UI components
import { Button } from 'semantic-ui-react';

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
    <div className="App">
      <ol>
        {tools.map((tool) => (
          <ul key={tool.id}>{tool.description}</ul>
        ))}
      </ol>
      <Button>Entrar</Button>
    </div>
  );
};

export default App;
