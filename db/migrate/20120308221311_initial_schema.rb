class InitialSchema < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_name
      t.string :screen_name
      t.string :email
      t.string :password
      t.string :bio
      t.string :avatar_url

      t.timestamps
    end

    create_table :blogs do |t|
      t.string :title
      t.string :description
      t.references :user

      t.timestamps
    end
    add_index :blogs, :user_id
    
    create_table :blog_posts do |t|
      t.string :title
      t.string :leader
      t.string :content
      t.references :blog
      
      t.timestamps
    end
    add_index :blog_posts, :blog_id
    
    create_table :tags do |t|
      t.string :tag
      t.references :blog_post
    end
    add_index :tags, :blog_post_id
  end
end