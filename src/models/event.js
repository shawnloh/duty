const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      required: [true, "Event Name is required"],
      type: String,
      trim: true
    },
    date: {
      required: [true, "Date is required"],
      type: String,
      validate: {
        validator: function(date) {
          return moment(date, "DD-MM-YYYY", true).isValid();
        },
        message: function({ value }) {
          return "date: " + value + " must be DD-MM-YYYY format";
        }
      }
    },
    pointSystem: {
      type: Schema.Types.ObjectId,
      ref: "Point",
      required: [true, "Type of points system is required"]
    },
    pointsAllocation: {
      type: Number,
      required: [true, "Please allocate points to give for this system"]
    },
    personnels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Person"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
