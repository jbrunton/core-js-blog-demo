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
"This blogging platform is intended to demonstrate some useful techniques for writing large scale Javascript applications, and this blog charts the design decisions taken and challenges encountered along the way.

## Design goals

There are a couple of key principles which guide the architecture of this application:

1. Code should adhere to the [DRY principle](http://en.wikipedia.org/wiki/Don't_repeat_yourself).
2. Authoring new pages, controllers, resources, etc. should require absolutely as little code as possible.

As a consequence of point 1, the code is necessarily loosely-coupled, with most elements being completely reusable (eg, most templates and view models), or extremely lightweight (eg, controllers).  And in most cases, both.

## Article series

1. Introduction
2. [Application Architecture](#posts/2/view)
3. [Automatic Event Registration](#posts/3/view)
",
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
    },
    {   title: 'Automatic Event Registration',
        leader: 'Beyond the mediator pattern.',
        content:
"## Why not mediate?

The mediator is a well known and useful pattern for allowing unrelated units of code to communicate in a loosely-coupled fashion.  However, without due care, its use can come at the expense of clear, readable code: _anything_ can subscribe to _any event_ from _anywhere_ in the codebase at _any time_.  Clearly, such code becomes difficult to reason about and maintain.

Automatic event registration (AER) is a useful pattern which improves upon mediators in 3 distinct ways:

1. **Clarity of code**: it is clear at a glance which events a module subscribes to.  Moreover, it's easy to enforce naming conventions for events across the application.
2. **Succinct code**: with event subscriptions handled automatically, you reduce the verbosity of your initialization code. 
3. **Module permissions**: coupled with the sandbox pattern, you can easily define a permissions structure for inter-module subscriptions, to ensure dependencies are clearly expressed and carefully managed.

## What does it look like?

Each module defines handlers for the events it wishes to subscribe to.  A common naming convention is used to distinguish events: in the case of this application, each event is prefixed with an ```@``` sign.  The subscriptions are then wired up automatically by the application core.

Here's an example module definition:

    app.core.define('MyModule', function(sandbox) {
        return {
            foo: function() {
                sandbox.publish('fooHappened');
            },
            '@fooHappened': function() {
                alert('Foo just happened!');
            }
        };
    });
    
In this example, the module defines a method ```foo```, which raises the _fooHappened_ event.  The ```@fooHappened``` handler is automatically subscribed to this event.

The application core also allows communication between modules.  Events are scoped according to the publishing module - the full name of the event in the above example is actually _MyModule.fooHappened_.  Modules may - if granted permission - subscribe to events from other modules by specifying the event name in full:

    app.core.define('MyModule', function(sandbox) {
        ...
        '@AnotherModule.barHappened': function() {
            alert('Bar just happened in AnotherModule');
        }
        ...
    });

If a module attempts to subscribe to an event it doesn't have permission for, an error is raised.  See [link goes here] for more details about the permissions model."
    }
])

tags_jbrunton = Tag.create([
    { tag: 'large-scale', blog_post: blog_posts_jbrunton[0] },
    { tag: 'javascript', blog_post: blog_posts_jbrunton[0] },
    { tag: 'single-page', blog_post: blog_posts_jbrunton[0] },
    { tag: 'javascript', blog_post: blog_posts_jbrunton[1] },
    { tag: 'DRY', blog_post: blog_posts_jbrunton[1] },
    { tag: 'javascript', blog_post: blog_posts_jbrunton[2] },
    { tag: 'AER', blog_post: blog_posts_jbrunton[2] }
])