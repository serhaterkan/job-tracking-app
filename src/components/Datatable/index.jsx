import { Table } from 'antd';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const DataTable = memo((props) => {
  const { columns, data, size, pageSize } = props;
  return (
    <Table columns={columns} dataSource={data} size={size} pagination={{ pageSize: pageSize }} />
  );
});

DataTable.propTypes = {
  columns: PropTypes.array,
  size: PropTypes.string,
  pageSize: PropTypes.number,
  data: PropTypes.array
};

DataTable.defaultProps = {
  columns: [],
  size: 'small',
  pageSize: 20,
  data: []
};
DataTable.displayName = 'DataTable';
export default DataTable;
