import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Link_categorySchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  link_id: {
    type: String,
    unique: true,
    require: true
  }
})

export default mongoose.model('Link_category', Link_categorySchema)
