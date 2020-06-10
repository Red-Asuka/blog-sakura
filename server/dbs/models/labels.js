import mongoose from 'mongoose'
const Schema = mongoose.Schema
const LabelsSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  alias: {
    type: String
  },
  description: {
    type: String
  },
  tag_url: {
    type: String
  }
})

export default mongoose.model('Labels', LabelsSchema)
