import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Modal, Popconfirm, Row, Space, Tag, Typography } from 'antd';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import Sort from '../../components/Dashboard/Sort';
import DataTable from '../../components/Datatable';
import { CreateForm, EditForm, FilterForm } from '../../components/Forms';
import { color } from '../../components/Helper';
import useViewport from '../../hooks/useViewport';
import { getPriority } from '../../redux/actions/mainAction';

const Dashboard = (props) => {
  const { getOnPriority } = props;
  const [cookies, setCookie] = useCookies(['data']);

  const [expires] = useState({
    maxAge: 31536000
  });
  const [jobList, setJobList] = useState(cookies.data);

  const { width } = useViewport();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectValues, setSelectValues] = useState({});

  // Delete Job
  const onDelete = (values) => {
    const filterData = cookies.data.filter((e) => e.key !== values.key);
    setCookie('data', filterData, expires);
    setJobList(filterData);
  };

  // Edit Job
  const onEdit = useCallback(
    (values) => {
      const filterData = cookies.data.filter((e) => e.key !== selectValues.key);
      const findData = cookies.data.find((e) => e.key === selectValues.key);
      const editData = {
        ...findData,
        jobPriority: values.jobPriority.substring(1),
        jobPriorityId: values.jobPriority.substring(0, 1)
      };
      setCookie('data', [...filterData, editData], expires);
      setJobList([...filterData, editData]);
      onCancel();
    },
    [selectValues, cookies.data]
  );

  // New Add Job
  const onCreate = useCallback(
    (values) => {
      const jobPriorityId = values.jobPriority.substring(0, 1);
      const key = cookies.data.length !== 0 ? Math.max(...cookies.data.map((e) => e.key)) + 1 : 1;
      const jobPriority = values.jobPriority.substring(1);

      setJobList([...cookies.data, { ...values, key, jobPriorityId, jobPriority }]);
      setCookie('data', [...cookies.data, { ...values, key, jobPriorityId, jobPriority }], expires);
    },
    [cookies.data]
  );

  // Job Name Search && Job Priority Sort
  const onFilter = useCallback(
    (value) => {
      const regex = new RegExp(`${value.jobName}`, 'i');
      const filtered = cookies.data.filter(
        (e) => value.jobPriority.includes(e.jobPriority) && regex.test(e.jobName)
      );
      setJobList(filtered);
    },
    [jobList]
  );

  const onSort = useCallback(
    ({ type, sort }) => {
      if (type === 'name') {
        const filtered = jobList.sort((a, b) => {
          return sort === 'ASC'
            ? a.jobName.localeCompare(b.jobName)
            : b.jobName.localeCompare(a.jobName);
        });
        setJobList([...filtered]);
      } else if (type === 'priority') {
        const filtered = jobList.sort((a, b) => {
          return sort === 'ASC'
            ? a.jobPriorityId - b.jobPriorityId
            : b.jobPriorityId - a.jobPriorityId;
        });
        setJobList([...filtered]);
      }
    },
    [jobList]
  );

  // Edit Modal Close
  const onCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'Job Name',
        dataIndex: 'jobName',
        key: 'jobName',
        sorter: (a, b) => a.jobName.localeCompare(b.jobName)
      },
      {
        title: 'Priority',
        key: 'priority',
        dataIndex: 'priority',
        sorter: (a, b) => a.jobPriorityId - b.jobPriorityId,
        render: (_, { jobPriority, jobPriorityId }) => {
          return (
            <>
              <Tag color={color(jobPriority)} key={jobPriorityId}>
                {jobPriority}
              </Tag>
            </>
          );
        }
      },

      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(record)}>
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectValues(record);
              }}
              icon={<EditOutlined />}
            />
          </Space>
        )
      }
    ],
    [cookies.data]
  );

  useEffect(() => {
    getOnPriority();
    if (!cookies.data) {
      setCookie('data', [], expires);
    } else {
      setCookie(
        'data',
        cookies.data.sort((a, b) => a.jobPriorityId - b.jobPriorityId),
        expires
      );
    }
  }, []);

  return (
    <>
      <Card bordered={false} title="Create New Job">
        <CreateForm onFinish={onCreate} />
      </Card>
      <Card
        bordered={false}
        title="Job List"
        extra={<span>{`(${jobList ? jobList.length : 0} / 3)`} </span>}>
        <Card bordered={false} className="filter-card">
          <FilterForm onFinish={onFilter} />
        </Card>
        {width > 768 ? (
          <DataTable columns={columns} data={jobList} size="size" pageSize={3} />
        ) : (
          <>
            <Sort onSort={onSort} />
            <List
              size="small"
              bordered={false}
              className="loadmore-list"
              dataSource={jobList}
              renderItem={(item) => (
                <Card
                  style={{ marginTop: 5 }}
                  size="small"
                  actions={[
                    <Popconfirm
                      key="delete"
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onDelete(item)}>
                      <DeleteOutlined key="setting" />
                    </Popconfirm>,
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectValues(item);
                      }}
                    />
                  ]}>
                  <Row>
                    <Col span={24}>
                      <Tag color={color(item.jobPriority)} key={item.jobPriorityId}>
                        {item.jobPriority}
                      </Tag>
                    </Col>
                    <Col span={24}>
                      <Typography.Paragraph>{item.jobName}</Typography.Paragraph>
                    </Col>
                  </Row>
                </Card>
              )}
            />
          </>
        )}
      </Card>
      <Modal title="Job Edit" open={isModalOpen} footer={false} onCancel={onCancel}>
        <EditForm values={selectValues} onCancel={onCancel} onFinish={onEdit} />
      </Modal>
    </>
  );
};

Dashboard.propTypes = {
  getOnPriority: PropTypes.func
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    getOnPriority: () => dispatch(getPriority())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
