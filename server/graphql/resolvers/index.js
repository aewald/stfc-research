exports.officersQueries = {
  officers: (root, args, ctx) => {
    return ctx.models.Officers.getAll();
  },
};
