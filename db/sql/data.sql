-- insert a test user
INSERT INTO users (username, email, password) 
VALUES ('bfannin', 'bfannin13@gmail.com', '$2b$05$JKO.9B.e2D.VLuy16eVvN.gI4Qug7r7gBWbDYalYA.EhZEIN1Cw22');

-- delete a test user
delete from users where id=3;

-- insert test settings
INSERT INTO settings (userId, prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)
VALUES (4, 4, 4, 4);

-- select settings for user
select * from settings where userid=4;

-- delete settings for user
delete from settings where userid=4;

-- update user settings
update settings (prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)
VALUES (6, 6, 6) where userid=4;

-- inserts into user_tag for testing
insert into tag (tag) VALUES ('new') RETURNING id;
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='huggy'), '2020-03-12');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='dog'), '2020-08-08');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='huggy'), '2020-08-08');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='dark blue sky'), '2020-08-18');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='grrr'), '2020-08-18');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='lunnnnnch'), '2020-08-28');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='dog'), '2020-08-28');
insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='huggy'), '2020-08-28');

-- select tags for specific day
SELECT tag.tag, count(tag.id) FROM user_tag 
JOIN tag ON tag.id = user_tag.tagid
WHERE 
        date_part('year', datetime) = 2020
AND     date_part('day', datetime) = 13
AND     date_part('month', datetime) = 9
AND userid = 4
GROUP BY tag.tag
ORDER BY count desc;

SELECT tag.tag, count(tag.id) FROM user_tag
JOIN tag ON tag.id = user_tag.tagid
WHERE DATE(user_tag.datetime) = '2020-9-13'
AND userid = 4
GROUP BY tag.tag
ORDER BY count desc;

-- select tags from last X days
SELECT tag.tag, count(tag.tag) FROM user_tag
JOIN tag ON tag.id = user_tag.tagid
WHERE user_tag.datetime > NOW() - INTERVAL '10 days'
AND userid = 4
GROUP BY tag.tag
ORDER BY count desc
LIMIT 50;

-- select cousin tags (tags entered on same day as)
-- -- -- select all dates entered for particular tag
select tag.tag, user_tag.datetime FROM user_tag
JOIN tag ON tag.id = user_tag.tagid
WHERE tag.tag = 'dog';

-- -- -- select all tags also entered on those days
select tag.tag, DATE(user_tag.datetime) FROM user_tag 
JOIN tag ON tag.id = user_tag.tagid
WHERE user_tag.datetime 
        IN ( SELECT DATE(user_tag.datetime) 
                FROM user_tag 
                JOIN tag on tag.id = user_tag.tagid 
                WHERE tag.tag = 'dog' )
AND tag.tag != 'dog';

-- -- -- select the number of times those tags share an entry date
select tag.tag, count(tag.tag) FROM user_tag 
JOIN tag ON tag.id = user_tag.tagid
WHERE DATE(user_tag.datetime)
        IN ( SELECT DATE(user_tag.datetime)
                FROM user_tag 
                JOIN tag on tag.id = user_tag.tagid 
                WHERE tag.tag = 'new'
                AND user_tag.userid = 4 )
AND tag.tag != 'new'
AND user_tag.userid = 4
GROUP BY tag.tag
ORDER BY count desc;

-- what would second cousins look like?
-- -- -- select all tags also entered on those days
select tag.tag FROM user_tag 
JOIN tag ON tag.id = user_tag.tagid
WHERE DATE(user_tag.datetime)
        IN ( SELECT DATE(user_tag.datetime)
                FROM user_tag 
                JOIN tag on tag.id = user_tag.tagid 
                WHERE tag.tag = 'dog' )
AND tag.tag != 'dog'
GROUP BY tag.tag;

-- -- -- select all dates of those tags 
SELECT DATE(user_tag.datetime) FROM user_tag 
JOIN tag ON tag.id = user_tag.tagid
WHERE tag.tag 
        IN (select tag.tag FROM user_tag 
                JOIN tag ON tag.id = user_tag.tagid
                WHERE DATE(user_tag.datetime)
                        IN ( SELECT DATE(user_tag.datetime) 
                                FROM user_tag 
                                JOIN tag on tag.id = user_tag.tagid 
                                WHERE tag.tag = 'dog' )
                AND tag.tag != 'dog'
                GROUP BY tag.tag )
GROUP BY DATE(user_tag.datetime);

-- -- select tags that occur on these days
SELECT tag.tag, count(tag.tag) FROM user_tag
JOIN tag ON tag.id = user_tag.tagid
WHERE DATE(user_tag.datetime) 
        IN ( SELECT DATE(user_tag.datetime) FROM user_tag 
                JOIN tag ON tag.id = user_tag.tagid
                WHERE tag.tag 
                        IN (select tag.tag FROM user_tag 
                                JOIN tag ON tag.id = user_tag.tagid
                                WHERE DATE(user_tag.datetime)
                                        IN ( SELECT DATE(user_tag.datetime) 
                                                FROM user_tag 
                                                JOIN tag on tag.id = user_tag.tagid 
                                                WHERE tag.tag = 'new'
                                                AND user_tag.userid = 4 )
                                AND tag.tag != 'new'
                                AND user_tag.userid = 4
                                GROUP BY tag.tag )
                AND user_tag.userid = 4
                GROUP BY DATE(user_tag.datetime)
        )
AND user_tag.userid = 4
GROUP BY tag.tag
ORDER BY count desc;

