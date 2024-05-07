CREATE TABLE Repository (
    repo_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    user_id INT,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES `users`(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE `repository` CHANGE `repo_id` `repo_id` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `repository` CHANGE `created_at` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;




CREATE VIEW Repository_User_View
AS
    SELECT r.repo_id, r.name AS repository_name, r.description, r.created_at, u.user_id, u.username, u.email
    FROM Repository r INNER JOIN users u ON r.user_id = u.user_id;