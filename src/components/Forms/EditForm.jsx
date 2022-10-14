import { Button, Form, Input, Row, Select, Space } from 'antd';
import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { connect } from 'react-redux';

const EditForm = memo(({ values, onCancel, onFinish, priority: { data, loading } }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      jobName: values.jobName,
      jobPriority: values.jobPriority
    });
  }, [values]);

  return (
    <Form form={form} name="edit_form_controls" layout="vertical">
      <Form.Item name="jobName" label="Job Name">
        <Input type="text" placeholder={'Job Name'} disabled value={values.jobName} />
      </Form.Item>
      <Form.Item name="jobPriority" label="Job Priority" required>
        <Select placeholder={'Choose'} loading={loading}>
          {data.map((e) => (
            <Select.Option key={e.key + e.name}>{e.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Space>
            <Button type="danger" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="primary"
              disabled={loading}
              onClick={() => onFinish(form.getFieldValue())}>
              Save
            </Button>
          </Space>
        </Row>
      </Form.Item>
    </Form>
  );
});

EditForm.propTypes = {
  priority: PropTypes.object,
  onFinish: PropTypes.func,
  onCancel: PropTypes.func,
  values: PropTypes.object
};
EditForm.defaultProps = {
  priority: {
    data: [],
    loading: true
  }
};

EditForm.displayName = 'EditForm';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(EditForm);
