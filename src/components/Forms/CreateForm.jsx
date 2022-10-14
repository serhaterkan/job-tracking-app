import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { memo } from 'react';
import { connect } from 'react-redux';

import { inputAlphaNumeric } from '../Helper';

const CreateForm = memo(({ onFinish, priority: { data, loading } }) => {
  return (
    <Form name="customized_form_controls" layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 4]}>
        <Col xl={16} lg={15} md={15} sm={24} xs={24}>
          <Form.Item
            name="jobName"
            required
            rules={[
              { validator: inputAlphaNumeric },
              { max: 255, message: 'Max 255 Character' },
              { required: true, message: 'Job Name is required' }
            ]}>
            <Input spellCheck={false} type="text" placeholder={'Job Name'} maxLength="255" />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={4} sm={24} xs={24}>
          <Form.Item
            name="jobPriority"
            required
            rules={[{ required: true, message: 'Priority is required' }]}>
            <Select placeholder={'Choose'} loading={loading}>
              {data.map((e) => (
                <Select.Option key={e.key + e.name}>{e.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xl={2} lg={3} md={4} sm={24} xs={24}>
          <Form.Item>
            <Button
              disabled={loading}
              block
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}>
              Create
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

CreateForm.propTypes = {
  priority: PropTypes.object,
  onFinish: PropTypes.func
};
CreateForm.defaultProps = {
  priority: {
    data: [],
    loading: true
  }
};

CreateForm.displayName = 'CreateForm';

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CreateForm);
