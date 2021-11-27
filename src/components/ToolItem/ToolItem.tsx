import React from 'react';

// Models
import { ToolEntity } from 'models/toolEntity';

// Semantic UI Components
import { Icon, Button } from 'semantic-ui-react';

// Components
import Tag from 'components/Tag';

// Style
import './ToolItem.scss';

interface Props {
  tool: ToolEntity;
}

const ToolItem: React.FC<Props> = ({ tool }) => {
  console.log('ToolItem');
  return (
    <section className="tool-item">
      <header className="tool-item__header">
        <a className="title" href={tool.link}>
          <h2>{tool.title}</h2>
        </a>
        <Button className="button-remove">
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
