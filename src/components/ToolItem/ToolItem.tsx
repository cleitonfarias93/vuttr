import React from 'react';

// Models
import { ToolEntity } from 'models';

// Semantic UI Components
import { Icon, Button } from 'semantic-ui-react';

// Components
import Tag from 'components/Tag';

// Style
import './ToolItem.scss';

interface Props {
  tool: ToolEntity;
  onClickRemove: (tool: ToolEntity) => void;
}

const ToolItem: React.FC<Props> = ({ tool, onClickRemove }) => {
  const handleRemove = () => {
    onClickRemove(tool);
  };

  return (
    <section className="tool-item">
      <header className="tool-item__header">
        <a className="title" href={tool.link}>
          <h3>{tool.title}</h3>
        </a>
        <Button className="button-remove" onClick={handleRemove}>
          <Icon name="close" />
          remove
        </Button>
      </header>

      <article className="tool-item__content">
        <p>{tool.description}</p>
      </article>

      <footer className="tool-item__footer">
        {tool.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </footer>
    </section>
  );
};

export default ToolItem;
