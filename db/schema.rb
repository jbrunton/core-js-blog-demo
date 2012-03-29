# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120308221311) do

  create_table "blog_posts", :force => true do |t|
    t.string   "title"
    t.string   "leader"
    t.string   "content"
    t.integer  "blog_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "blog_posts", ["blog_id"], :name => "index_blog_posts_on_blog_id"

  create_table "blogs", :force => true do |t|
    t.string   "title"
    t.string   "description"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "blogs", ["user_id"], :name => "index_blogs_on_user_id"

  create_table "tags", :force => true do |t|
    t.string  "tag"
    t.integer "blog_post_id"
  end

  add_index "tags", ["blog_post_id"], :name => "index_tags_on_blog_post_id"

  create_table "users", :force => true do |t|
    t.string   "user_name"
    t.string   "screen_name"
    t.string   "email"
    t.string   "password"
    t.string   "bio"
    t.string   "avatar_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
