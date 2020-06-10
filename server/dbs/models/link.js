import mongoose from 'mongoose'
const Schema = mongoose.Schema
const LinkSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  siteurl: {
    type: String,
    require: true
  },
  link_type: {
    type: String,
    require: true
  }
})

export default mongoose.model('Link', LinkSchema)
