import ProductModel from './Product_Model.js';
import mongoose from 'mongoose'
const inventorySchema = new mongoose.Schema({


  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductModel, // Reference to Product model
    required: true
  },

  userPhone: {
    type: String,
    maxlength: 13,
    required: true
  },  

  ownerEmail: {
    type: String,
    maxlength: 255,
    required: true,

  },
  duration: {
    type: String,
    maxlength: 50,
    required: true
  },
  returnDate: {
    type: String,
    maxlength: 10,
    default: null
  },
  idProof: {
    type: String,
    default: "",
    required: true
  },
  productStatus: {
    type: String,
    maxlength: 50,
    default: "rented"
  },
  rentedDate: {
    type: Date,
    default: Date.now
  }


});

// module.exports = mongoose.model('Inventory', inventorySchema);

const InventoryModel = mongoose.model('Inventory', inventorySchema)
export default InventoryModel
