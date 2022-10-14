import {
  CaretDownOutlined,
  CaretUpOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';

const Sort = memo(({ onSort }) => {
  const [nameSort, setNameSort] = useState('DESC');
  const [prioritySort, setPrioritySort] = useState('DESC');

  const onChange = (type) => {
    if (type === 'name') {
      setNameSort((prev) => (prev === 'DESC' ? 'ASC' : 'DESC'));
      onSort({ type, sort: nameSort });
    } else if (type === 'priority') {
      setPrioritySort((prev) => (prev === 'DESC' ? 'ASC' : 'DESC'));
      onSort({ type, sort: prioritySort });
    }
  };

  console;

  return (
    <>
      <Button type="text" onClick={() => onChange('name')} className="blue-text">
        {nameSort === 'ASC' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
        Job Name
      </Button>
      <Button type="text" onClick={() => onChange('priority')} className="blue-text">
        {prioritySort === 'ASC' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        Job Priority
      </Button>
    </>
  );
});

Sort.propTypes = {
  onSort: PropTypes.func
};
Sort.displayName = 'Sort';

export default Sort;
