import React from 'react';

// Semantic UI Components
import { Modal, Icon, Button } from 'semantic-ui-react';

// Models
import { ToolEntity } from 'models';

// Styles
import './ModalRemove.scss';

interface Props {
  tool: ToolEntity;
  open: boolean;
  onOk: () => void;
  onClose: () => void;
}

const ModalRemove: React.FC<Props> = ({ tool, open, onOk, onClose }) => (
  <Modal
    className="modal-remove"
    open={open}
    onClose={onClose}
    dimmer="blurring"
  >
    <Modal.Header>
      <Icon name="close" />
      <span>Remove tool</span>
    </Modal.Header>

    <Modal.Content>
      <span>
        Are you sure you want to remove
        <strong>
          &nbsp;
          {tool?.title}
        </strong>
        ?
      </span>
    </Modal.Content>

    <Modal.Actions>
      <Button className="button-cancel" onClick={onClose}>
        Cancel
      </Button>
      <Button className="button-success" onClick={onOk}>
        Yes, remove
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalRemove;
