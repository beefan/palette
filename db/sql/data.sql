INSERT INTO users (username, email, password) 
VALUES ('bfannin', 'bfannin13@gmail.com', '$2b$05$JKO.9B.e2D.VLuy16eVvN.gI4Qug7r7gBWbDYalYA.EhZEIN1Cw22');

delete from users where id=3;

INSERT INTO settings (userId, prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)
VALUES (4, 4, 4, 4);

select * from settings where userid=4;

delete from settings where userid=4;

update settings (prompt_frequency_hrs, analysis_frequency_hrs, check_limit_hrs)
VALUES (6, 6, 6) where userid=4;

insert into user_tag (userid, tagid, datetime) Values (4, 9, NOW());

