# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user_jbrunton = User.create(
    user_name: 'jbrunton',
    screen_name: 'John Brunton',
    email: 'jbrunton@zipcar.co.uk',
    bio: "software engineer for Zipcar UK, with interests in art, technology, politics, and international development.",
    avatar_url: 'https://twimg0-a.akamaihd.net/profile_images/1435862198/Screen_shot_2011-07-10_at_6.41.49_PM_reasonably_small.png'
)

blog_jbrunton = Blog.create(
    title: 'Large Scale JS Applications',
    description: 'Exploring ways to structure large scale client-side apps',
    user: user_jbrunton
)

blog_posts_jbrunton = BlogPost.create([
    {   title: 'Introduction',
        leader: "So what's this all about?",
        content:
"This blogging platform demonstrates some useful techniques for writing large scale Javascript applications, and this blog charts the design decisions taken and challenges encountered along the way.

## Design Goals

There are a few principles which the architecture of this application will follow:

1. Code should adhere to the [DRY principle](http://en.wikipedia.org/wiki/Don't_repeat_yourself).
2. Authoring new pages, controllers and resources should require as little code as possible.

As a consequence of point 1, the code is necessarily loosely-coupled, with most elements being completely reusable (eg, most templates and view models), or extremely lightweight (eg, controllers).",
        blog: blog_jbrunton
    },
    {   title: 'Application Architecture',
        leader: 'A high-level description of the design patterns and architecture used.',
        content:
"## The module pattern

A module is simply an object which may be registered with the application, and which may listen for and raise events. A typical module might look like this:

    var loggingModule = {
        '@Application.initialize': function(app) {
            this.ready();
        },
        
        '@*.*': function(eventName) {
            console.log(eventName + ' raised');
        }
    };
    
A module may be registered with the application by use of the `app.registerModule()` method. This will make the application aware of the module, and will automatically subscribe the module to any of the events it provides handlers for.",
        blog: blog_jbrunton
    }
])

tags_jbrunton = Tag.create([
    { tag: 'large-scale', blog_post: blog_posts_jbrunton[0] },
    { tag: 'javascript', blog_post: blog_posts_jbrunton[0] },
    { tag: 'single-page', blog_post: blog_posts_jbrunton[0] },
    { tag: 'javascript', blog_post: blog_posts_jbrunton[1] },
    { tag: 'DRY', blog_post: blog_posts_jbrunton[1] }
])