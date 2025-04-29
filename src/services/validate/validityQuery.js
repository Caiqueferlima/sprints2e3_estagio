exports.validityQuery = (queries) => {
  for (const key in queries) {
    if (!queries[key]) {
      switch (key) {
        case 'begin_date':
          queries[key] = '18510718';
          break;
        case 'end_date':
          queries[key] = '20240707';
          break;
        case 'sort':
          queries[key] = 'newest';
          break;
        default:
          return false;
      }
    }
  }
  return queries;
};
