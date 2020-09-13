INSERT INTO users (username, email, password) 
VALUES ('bfannin', 'bfannin13@gmail.com', '$2b$05$JKO.9B.e2D.VLuy16eVvN.gI4Qug7r7gBWbDYalYA.EhZEIN1Cw22');

delete from users where id=3;

INSERT INTO settings (userId, prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)
VALUES (4, 4, 4, 4);

select * from settings where userid=4;

delete from settings where userid=4;

update settings (prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)
VALUES (6, 6, 6) where userid=4;

insert into user_tag (userid, tagid, datetime) Values (4, (SELECT id FROM tag WHERE tag='dark blue sky'), '2011-08-08');

SELECT tag.tag, count(tag.id) FROM user_tag 
JOIN tag ON tag.id = user_tag.tagid
WHERE 
        date_part('year', datetime) = 2020
AND     date_part('day', datetime) = 13
AND     date_part('month', datetime) = 9
AND userid = 4
GROUP BY tag.tag
ORDER BY count desc;

SELECT tag.tag, count(tag.tag) FROM user_tag
JOIN tag ON tag.id = user_tag.tagid
WHERE user_tag.datetime > NOW() - INTERVAL '10 days'
AND userid = 4
GROUP BY tag.tag
ORDER BY count desc
LIMIT 50;

select * from user_tag where datetime > NOW() - INTERVAL '10 years';