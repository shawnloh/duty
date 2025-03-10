const Promise = require("bluebird");
const mongoose = require("mongoose");
const PersonnelPoint = require("./personnelPoint");
const Schema = mongoose.Schema;

const PointSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for point schema"],
      trim: true,
      unique: true,
      uppercase: true
    }
  },
  { timestamps: true }
);

PointSchema.pre("remove", { query: true }, async function() {
  const current = this;
  const found = await PersonnelPoint.find({ pointSystem: current._id }).exec();

  Promise.all(
    found.map(async doc => {
      await doc.remove();
    })
  );
});

module.exports = mongoose.model("Point", PointSchema);
