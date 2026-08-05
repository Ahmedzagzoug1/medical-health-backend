const paginate = (items, page = 1, limit = 7) => {
  const skip = (page - 1) * limit;

  return {
    total: items.length,
    data: items.slice(skip, skip + limit),
  };
};
module.exports=paginate;