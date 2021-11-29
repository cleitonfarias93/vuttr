/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactNode, useState } from 'react';
import * as Yup from 'yup';

// Semantic UI Components
import { Modal, Icon, Button } from 'semantic-ui-react';

// Formik
import { Formik, Form, Field, useField } from 'formik';

// Models
import { ModelForm } from 'models';

// Styles
import './ModalCreate.scss';

interface Props {
  open: boolean;
  onOk: (tool: ModelForm) => void;
  onClose: () => void;
  loading: boolean;
}

const ModalCreate: React.FC<Props> = ({ open, onOk, onClose, loading }) => {
  const [tags, setTags] = useState<string>('');

  const initialValues: ModelForm = {
    title: '',
    link: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Tool name is required'),
    link: Yup.string()
      .url('Tool link must be a valid URL')
      .required('Tool link is required'),
    description: Yup.string().required('Tool description is required'),
  });

  const onSubmit = (tool: ModelForm) => {
    const splittedTags = tags.split('/');

    const params: ModelForm = {
      ...tool,
      tags: splittedTags,
    };
    onOk(params);
  };

  const updateTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  return (
    <Modal
      className="modal-create"
      open={open}
      onClose={onClose}
      closeIcon
      dimmer="blurring"
    >
      <Modal.Header>
        <Icon name="plus" />
        <span>Add new tool</span>
      </Modal.Header>

      <Modal.Content>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="form__input">
                <label className="label-input">Tool name *</label>
                <Field name="title" />
                {errors.title && touched.title && (
                  <span className="message-error">{errors.title}</span>
                )}
              </div>

              <div className="form__input">
                <label className="label-input">Tool link *</label>
                <Field
                  className="link"
                  name="link"
                  placeholder="http://site.com"
                />
                {errors.link && touched.link && (
                  <span className="message-error">{errors.link}</span>
                )}
              </div>

              <div className="form__input">
                <label className="label-input">Tool description *</label>
                <Field
                  className="description"
                  name="description"
                  component="textarea"
                  rows="4"
                />
                {errors.description && touched.description && (
                  <span className="message-error">{errors.description}</span>
                )}
              </div>

              <div className="form__input">
                <label className="label-input">Tool tags</label>
                <Field
                  name="tags"
                  placeholder="use '/' to separate the tags eg: js/react"
                  onChange={updateTags}
                />
              </div>

              <div className="form__action">
                <Button loading={loading} disabled={loading} type="submit">
                  Add
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default ModalCreate;
