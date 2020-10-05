exports.officersQueries = {
  officers: (root, args, ctx) => {
    return ctx.models.Officers.getAll();
  },
  officer: (root, { id }, ctx) => {
    return ctx.models.Officers.getById(id);
  },
};
