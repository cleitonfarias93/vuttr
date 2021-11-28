import React, { useEffect, useState } from 'react';

// Services
import { getTools, deleteTool, getToolsByQuery } from 'services/VuttrService';

// Semantic UI Components
import { Loader, Dimmer } from 'semantic-ui-react';

// Components
import Header from 'components/Header/Header';
import SubHeader from 'components/SubHeader';
import ToolItem from 'components/ToolItem';
import ModalRemove from 'components/ModalRemove';

// Models
import { ToolEntity, ToolModel, SearchParams } from 'models';

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

  const getToolsBySearch = async (params: SearchParams) => {
    setLoading(true);
    try {
      const response = await getToolsByQuery(params);
      setTools(response.data);
    } catch (error) {
      // Todo tratar erro com toast
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onRemove = (toolData: ToolEntity) => {
    setCurrentTool(toolData);
    setShowModalRemove(true);
  };

  const onCancelModalRemove = () => {
    setShowModalRemove(false);
  };

  return (
    <main className="app">
      <Header title="VUTTR" subTitle="Very Useful Tools to Remember" />

      <SubHeader onChangeSearch={getToolsBySearch} />

      <div className="app__content">
        {fetching || loading ? (
          <Loader active size="large" content="Carregando" />
        ) : (
          tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} onClickRemove={onRemove} />
          ))
        )}
      </div>

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
