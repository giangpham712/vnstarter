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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150311154309) do

  create_table "categories", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "parent_id",  limit: 4,   null: false
  end

  add_index "categories", ["parent_id"], name: "index_categories_on_parent_id", using: :btree

  create_table "cities", force: :cascade do |t|
    t.string   "name",       limit: 255, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text     "body",         limit: 4294967295
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "project_id",   limit: 4
    t.integer  "commenter_id", limit: 4
  end

  add_index "comments", ["project_id"], name: "index_comments_on_project_id", using: :btree

  create_table "faqs", force: :cascade do |t|
    t.text     "question",   limit: 16777215, null: false
    t.text     "answer",     limit: 16777215, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "messages", force: :cascade do |t|
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "sender_id",   limit: 4
    t.integer  "receiver_id", limit: 4
    t.text     "body",        limit: 4294967295
  end

  add_index "messages", ["receiver_id"], name: "index_messages_on_receiver_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "pledges", force: :cascade do |t|
    t.integer  "pledger_id",    limit: 4
    t.integer  "project_id",    limit: 4
    t.float    "pledge_amount", limit: 24
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "pledges", ["pledger_id"], name: "index_pledges_on_pledger_id", using: :btree
  add_index "pledges", ["project_id"], name: "index_pledges_on_project_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title",              limit: 255
    t.text     "body",               limit: 4294967295
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.integer  "project_id",         limit: 4
    t.string   "image_file_name",    limit: 255
    t.string   "image_content_type", limit: 255
    t.integer  "image_file_size",    limit: 4
    t.datetime "image_updated_at"
  end

  add_index "posts", ["project_id"], name: "index_posts_on_project_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.string   "title",              limit: 100
    t.string   "short_description",  limit: 255
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "location",           limit: 255
    t.float    "funding_goal",       limit: 24
    t.integer  "duration",           limit: 4
    t.datetime "deadline"
    t.integer  "creator_id",         limit: 4
    t.string   "slug",               limit: 255
    t.string   "image_file_name",    limit: 255
    t.string   "image_content_type", limit: 255
    t.integer  "image_file_size",    limit: 4
    t.datetime "image_updated_at"
    t.boolean  "launched",           limit: 1,   default: false
    t.integer  "funding_status",     limit: 4,   default: 1
    t.integer  "category_id",        limit: 4
    t.datetime "launched_at"
    t.datetime "deleted_at"
    t.datetime "stopped_at"
  end

  add_index "projects", ["category_id"], name: "index_projects_on_category_id", using: :btree
  add_index "projects", ["creator_id"], name: "index_projects_on_creator_id", using: :btree

  create_table "rewards", force: :cascade do |t|
    t.float    "minimum_pledge_amount", limit: 24,                     null: false
    t.text     "description",           limit: 4294967295,             null: false
    t.integer  "limit_quantity",        limit: 4,          default: 0
    t.datetime "created_at",                                           null: false
    t.datetime "updated_at",                                           null: false
    t.integer  "project_id",            limit: 4,                      null: false
  end

  add_index "rewards", ["project_id"], name: "index_rewards_on_project_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", limit: 255,        null: false
    t.text     "data",       limit: 4294967295
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",        limit: 4
    t.integer  "taggable_id",   limit: 4
    t.string   "taggable_type", limit: 255
    t.integer  "tagger_id",     limit: 4
    t.string   "tagger_type",   limit: 255
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true, using: :btree
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string  "name",           limit: 255
    t.integer "taggings_count", limit: 4,   default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name",                   limit: 100
    t.string   "website",                limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "videos", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
