import React, { useState } from 'react';
import debounce from 'lodash.debounce';

// Semantic UI Components
import { Checkbox, Input, Button, Icon, CheckboxProps } from 'semantic-ui-react';

// Models
import { SearchParams } from 'models';

// Style
import './SubHeader.scss';

interface Props {
  onChangeSearch: (params: SearchParams) => void;
  openModal: () => void,
}

const SubHeader: React.FC<Props> = ({ onChangeSearch, openModal }) => {
  const [isSelectedTags, setIsSelectedTags] = useState<boolean>(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params: SearchParams = {};
    if (isSelectedTags) {
      params.tags_like = event.target.value;
    } else {
      params.q = event.target.value;
    }
    onChangeSearch(params);
  };

  const handleChangeCheckBox = (
    event: React.FormEvent<HTMLInputElement>,
    { checked }: CheckboxProps,
  ) => {
    setIsSelectedTags(!!checked);
  };

  const debounceOnchange = debounce(handleChangeInput, 500);

  return (
    <div className="sub-header">
      <div className="sub-header__search">
        <Input icon="search" placeholder="search" onChange={debounceOnchange} />
        <Checkbox
          label="search in tags"
          onChange={handleChangeCheckBox}
        />
      </div>
      <Button className="sub-header__button-add" onClick={openModal}>
        <Icon name="plus" />
        <span>Add</span>
      </Button>
    </div>
  );
};

export default SubHeader;
