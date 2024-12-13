const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"// reference to the user collection 
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    status: {
      type: String,
      required:true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status Type`,
      },
    },
  },

  {   timestamps: true,  }
);

connectionRequestSchema.index({fromUserId : 1 ,toUserId : 1})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;
