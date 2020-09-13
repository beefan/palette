# Palette Journal 🎨

Daily journaling apps are too complex. 
When I'm at my best I can keep up with entering my mood, attaching pictures, and selecting my activities from pre-populated lists.
What about when I'm not good? Then, I just refuse to deploy my conscious mind for self-analysis. It's exhausting work!

### ➡️People need minimalistic way to track their mood that takes no cognitive effort.
And when they come back for a taste of self-analysis, they need a simple visual that allows them to take in an understanding of their patterns without an enduring conscious analysis of paragraphs of text. 

Technology should work with our minds to help us get better, not against them.

### ➡️If journals are for us, why do we write in ways that are readable to others?
Well, it's only natural. How else can we look back and know what we were thinking and feeling? 
Language is an imperfect translation from thought to text. What if we could get closer to raw thought? 

...images, associations, loosely coupled symbolic representations...

I say dog, you think 🐕. The word is associated with the image of what the word means. These associations are consistent across languages, but individuals or groups can warp the associations intentionally or through culturation. 

### ➡️So what?
**Palette 🎨** is a simple journal app that lives in the abstract. 
* Journal in tags -- word:image associations
* Embed whatever meaning you want into those tags. 
* Speak from your subconscious now, and later use analysis view to quickly spot personal trends and learn about your mind.

---

# 🛑 Whoa! Way too much copy for a Github README! Where's the code info?

Ok, okay

* db/
    * `database.js` connects the app to a postgres database
    * data access is separated into `Tag.js`, `User.js`, and `Settings.js` for queries accessing respective tables
    * sql/
        * contains the database schema and some queries used for testing/development
* routes/ 
    * Express router is used to separate routes into multiple files, again separated by which database table they will ultimately access.
* views/ 
    * nothing functional now (*9-13-2020*)--will be expanded or deleted in favor of a better front-end. 
* app.js 
    * express node server. 
* package.json
    * User login and management - passport, passport-local, bycrpyt
    * Data access to postgres database - pg 
    * Cookie/Session management - express-session, cookie-parser
    * Environment variables - dotenv

to run: 
```
cd palette-journal
npm install
node app.js
```

Postman was used to test all current routes.

### knowledge I leaned on
* [passport documentation](http://www.passportjs.org/docs/authenticate/)
* [node-postgress documentation](https://node-postgres.com/features/queries)
* [miku86 connecting express and postgres](https://dev.to/miku86/nodejs-postgresql-how-to-connect-our-database-to-our-simple-express-server-without-an-orm-10o0)
* [how to separate node pg client into another file](https://stackoverflow.com/questions/58420985/how-do-i-separate-node-pg-client-into-another-file)
* [authenticating with node.js, passport, postgres](https://medium.com/@timtamimi/getting-started-with-authentication-in-node-js-with-passport-and-postgresql-2219664b568c)
* [restful api with nodejs and passport](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)