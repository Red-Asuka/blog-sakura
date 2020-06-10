import mongoose from 'mongoose'
const Schema = mongoose.Schema
const SortSchema = new Schema({
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
  sort_url: {
    type: String
  }
})

export default mongoose.model('zj_sort', SortSchema)
