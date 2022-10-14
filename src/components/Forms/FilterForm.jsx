import { SearchOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { connect } from 'react-redux';

const FilterForm = memo(({ onFinish, priority: { data, loading } }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!loading) {
      form.setFieldsValue({
        jobPriority: data.map((e) => e.name)
      });
    }
  }, [loading]);

  return (
    <Form
      form={form}
      name="edit_form_controls"
      layout="vertical"
      initialValues={{
        jobName: ''
      }}>
      <Row gutter={[16, 4]}>
        <Col lg={18} md={18} sm={24} xs={24}>
          <Form.Item name="jobName" label="Job Name">
            <Input
              prefix={<SearchOutlined />}
              onChange={() => onFinish(form.getFieldValue())}
              type="text"
              placeholder={'Job Name'}
            />
          </Form.Item>
        </Col>
        <Col lg={6} md={6} sm={24} xs={24}>
          <Form.Item name="jobPriority" label="Job Priority">
            <Select
              placeholder={'Choose'}
              loading={loading}
              disabled={loading}
              onChange={() => onFinish(form.getFieldValue())}
              mode="multiple">
              {data.map((e) => (
                <Select.Option key={e.name}>{e.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

FilterForm.propTypes = {
  priority: PropTypes.object,
  onFinish: PropTypes.func
};
FilterForm.defaultProps = {
  priority: {}
};
FilterForm.displayName = 'FilterForm';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FilterForm);
