const mongoose = require("mongoose");
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
      type: String
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
    // pioneerQuantity: {
    //   type: Number,
    //   required: [true, 'Pioneer(s) quantity is required'],
    //   default: 0,
    // },
    // wspecsQuantity: {
    //   type: Number,
    //   required: [true, 'Specialist(s) quantity is required'],
    //   default: 0,
    // },
    // officerQuantity: {
    //   type: Number,
    //   required: [true, 'Officer(s) quantity is required'],
    //   default: 0,
    // },

    // statusNotAllowed: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Status',
    // }],
    // onlyStatus: {
    //   type: Boolean,
    //   default: false,
    // },
    // platoons: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Platoon',
    // }],
    // ranks: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Rank',
    // }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
