import React from 'react';

// Semantic UI Components
import { Icon } from 'semantic-ui-react';

// Styles
import './Tag.scss';

interface Props {
  tag: string;
}

const Tag: React.FC<Props> = ({ tag }) => (
  <div className="tag-component">
    <Icon name="hashtag" />
    <span className="tag-component__title">{tag}</span>
  </div>
);

export default Tag;
