CREATE TABLE users (
    user_id int PRIMARY KEY AUTO_INCREMENT,
    username varchar(50) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    created_at datetime NOT NULL,
    last_login datetime NOT NULL
);

ALTER TABLE `users` CHANGE `created_at` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `users` CHANGE `last_login` `last_login` DATETIME NULL DEFAULT NULL;
