import mongoose from 'mongoose'
import ProductModel from './Product_Model.js';

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductModel,
    required: true
  },
  userPhone: {
    type: String,
    required: true,
    trim: true
  },  
  userEmail: {
    type: String,
    default: "",
    trim: true
  },
  ownerEmail: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true
  },
  returnDate: {
    type: String,
    default: null
  },
  idProof: {
    type: String,
    default: ""
  },
  productStatus: {
    type: String,
    default: "rented"
  },
  rentedDate: {
    type: Date,
    default: Date.now
  }
});

const InventoryModel = mongoose.model('Inventory', inventorySchema)
export default InventoryModel
