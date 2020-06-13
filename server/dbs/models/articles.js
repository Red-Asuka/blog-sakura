import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ArticleSchema = new Schema({
  post_title: {
    type: String,
    require: true
  },
  sort_id: {
    type: String,
    require: true
  },
  post_bg: {
    type: String,
    require: true
  },
  post_description: {
    type: String,
    require: true
  },
  post_content: {
    type: String,
    require: true
  },
  post_contentMarkdown: {
    type: String,
    require: true
  },
  post_tags: {
    type: Array,
    require: true
  },
  post_views: {
    //浏览量
    type: Number,
    default: 0,
    require: true
  },
  post_comment_count: {
    //评论数
    type: Number,
    default: 0,
    require: true
  },
  post_date: {
    //发表时间
    type: Date,
    default: Date.now,
    require: true
  },
  post_like_count: {
    //点赞数
    type: Number,
    default: 0,
    require: true
  }
})

export default mongoose.model('article', ArticleSchema)
