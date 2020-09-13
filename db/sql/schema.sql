drop table if exists user_tag;
drop table if exists tag;
drop table if exists settings;
drop table if exists users;

CREATE TABLE users (
        id serial NOT NULL,
        username CHAR(128),
        email CHAR(128),
        password CHAR(60),
        CONSTRAINT user_pk PRIMARY KEY(id)
);

CREATE TABLE tag (
        id serial NOT NULL,
        tag CHAR(64),
        CONSTRAINT tag_pk PRIMARY KEY(id)
);

CREATE TABLE settings (
        id serial NOT NULL,
        userId INT NOT NULL,
        prompt_frequency_hrs INT,
        analysis_frequency_hrs INT,
        check_limit_hrs INT,
        CONSTRAINT settings_pk PRIMARY KEY(id),
        CONSTRAINT user_settings_fk FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE user_tag (
        id serial NOT NULL,
        userId INT NOT NULL,
        tagId INT NOT NULL,
        datetime TIMESTAMP NOT NULL,
        CONSTRAINT user_tag_pk PRIMARY KEY(id),
        CONSTRAINT user_tag_user_fk FOREIGN KEY(userId) REFERENCES users(id),
        CONSTRAINT user_tag_tag_fk FOREIGN KEY(tagId) REFERENCES tag(id)
);

