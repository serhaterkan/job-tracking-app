export const inputAlphaNumeric = (_, e) => {
  if (e !== undefined && e !== '') {
    if (e.trim() === '') {
      return Promise.reject(new Error('Job Name is required'));
    }
    const value = e ? e.replace(/[^0-9a-zA-ZwığüşöçĞÜŞÖÇİ., ]+/gi, '') : '';
    if (e !== value) {
      return Promise.reject(new Error('Entry Alphanumeric Only'));
    }
  }

  return Promise.resolve('success');
};

export const color = (type) => {
  switch (type) {
    case 'Urgent':
      return '#e83d6d';
    case 'Regular':
      return '#f1a824';
    case 'Trival':
      return '#108ee9';
    default:
      return 'gray';
  }
};
