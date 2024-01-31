const APIFeatures = require("./apiFeatures");

exports.sendRes = (res, status, data, results, msg, error = false) => {
  res.status(status).json({
    results: results,
    data: data,
    message: msg,
    error: error,
  });
};
exports.readAll = async (mainModel, req, res, populateOpt) => {
  try {
    const { parameter, value } = req.body;
    const searchBy = {};
    if (parameter && value) {
      searchBy[`${parameter}`] = {
        $regex: value,
        $options: "i",
      };
    }
    const features = new APIFeatures(
      mainModel.find(searchBy).populate(populateOpt),
      req.body
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;

    console.log("data: ", data);

    this.sendRes(
      res,
      200,
      data,
      data.length,
      " Request successfully served",
      false
    );
  } catch (err) {
    this.sendRes(res, 400, err, 0, "Something Went Wrong", true);
  }
};
