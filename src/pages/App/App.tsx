import React, { useEffect, useState } from 'react';

// Services
import {
  getTools,
  deleteTool,
  getToolsByQuery,
  postTool,
} from 'services/VuttrService';

// Semantic UI Components
import { Loader } from 'semantic-ui-react';

// Components
import Header from 'components/Header/Header';
import SubHeader from 'components/SubHeader';
import ToolItem from 'components/ToolItem';
import ModalCreate from 'components/ModalCreate';
import ModalRemove from 'components/ModalRemove';

// Models
import { ToolEntity, ToolModel, SearchParams, ModelForm } from 'models';

// Styles
import './App.scss';

const App: React.FC = () => {
  const [tools, setTools] = useState<ToolEntity[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModalRemove, setShowModalRemove] = useState<boolean>(false);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [currentTool, setCurrentTool] = useState<ToolEntity>(ToolModel);

  const fetchTools = async () => {
    setFetching(true);
    try {
      const response = await getTools();
      setTools(response.data);
    } catch (error) {
      alert('Error when trying to fetch tools');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const onConfirmModalCreate = async (tool: ModelForm) => {
    setLoading(true);

    try {
      await postTool(tool);
      fetchTools();
    } catch (error) {
      alert('Error while trying to create tool');
    } finally {
      setLoading(false);
      setShowModalCreate(false);
    }
  };

  const onConfirmModalRemove = async () => {
    setLoading(true);

    try {
      await deleteTool(currentTool.id);
      fetchTools();
    } catch (error) {
      alert('Error trying to delete tool');
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
      alert('Error when searching create tool');
    } finally {
      setLoading(false);
    }
  };

  const onRemove = (toolData: ToolEntity) => {
    setCurrentTool(toolData);
    setShowModalRemove(true);
  };

  const onCancelModalCreate = () => {
    setShowModalCreate(false);
  };

  const onCancelModalRemove = () => {
    setShowModalRemove(false);
  };

  return (
    <main className="app">
      <Header title="VUTTR" subTitle="Very Useful Tools to Remember" />

      <SubHeader
        onChangeSearch={getToolsBySearch}
        openModal={() => setShowModalCreate(true)}
      />

      <div className="app__content">
        {fetching || loading ? (
          <Loader active size="large" content="Carregando" />
        ) : (
          tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} onClickRemove={onRemove} />
          ))
        )}
      </div>

      <ModalCreate
        open={showModalCreate}
        onOk={onConfirmModalCreate}
        onClose={onCancelModalCreate}
        loading={loading}
      />

      <ModalRemove
        open={showModalRemove}
        tool={currentTool}
        onOk={onConfirmModalRemove}
        onClose={onCancelModalRemove}
        loading={loading}
      />
    </main>
  );
};

export default App;
