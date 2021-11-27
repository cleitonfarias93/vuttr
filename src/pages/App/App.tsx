import React, { useEffect, useState } from 'react';

// Services
import { getTools, deleteTool } from 'services/VuttrService';

// Semantic UI Components
import { Loader, Dimmer } from 'semantic-ui-react';

// Components
import Header from 'components/Header/Header';
import ToolItem from 'components/ToolItem';
import ModalRemove from 'components/ModalRemove';

// Models
import { ToolEntity, ToolModel } from 'models/toolEntity';

// Styles
import './App.scss';

const App: React.FC = () => {
  const [tools, setTools] = useState<ToolEntity[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalRemove, setShowModalRemove] = useState<boolean>(false);
  const [currentTool, setCurrentTool] = useState<ToolEntity>(ToolModel);

  const fetchTools = async () => {
    try {
      const response = await getTools();
      setTools(response.data);
    } catch (error) {
      // Todo tratar erro com toast
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const onRemove = (toolData: ToolEntity) => {
    setCurrentTool(toolData);
    setShowModalRemove(true);
  };

  const onCancelModalRemove = () => {
    setShowModalRemove(false);
  };

  const onConfirmModalRemove = async () => {
    setLoading(true);

    try {
      await deleteTool(currentTool.id);
      fetchTools();
    } catch (error) {
      // Todo tratar erro com toast
      console.log(error);
    } finally {
      setLoading(false);
      setShowModalRemove(false);
    }
  };

  if (fetching || loading) {
    return (
      <Dimmer active>
        <Loader active inline="centered" />
      </Dimmer>
    );
  }

  return (
    <main className="App">
      <Header title="VUTTR" subTitle="Very Useful Tools to Remember" />

      {tools.map((tool) => (
        <ToolItem key={tool.id} tool={tool} onClickRemove={onRemove} />
      ))}

      <ModalRemove
        open={showModalRemove}
        tool={currentTool}
        onOk={onConfirmModalRemove}
        onClose={onCancelModalRemove}
      />
    </main>
  );
};

export default App;
