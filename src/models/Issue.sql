CREATE TABLE Issue (
    issue_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    repo_id INT,
    user_id INT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    closed_at DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (repo_id) REFERENCES repository(repo_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

ALTER TABLE `issue` CHANGE `issue_id` `issue_id` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `issue` CHANGE `created_at` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `issue` CHANGE `updated_at` `updated_at` DATETIME NULL;
ALTER TABLE `issue` CHANGE `closed_at` `closed_at` DATETIME NULL;

CREATE VIEW Issue_User_View
AS
    SELECT i.issue_id, i.title, i.description, i.repo_id, i.user_id, u.username AS reporter_username, u.email AS reporter_email,
        i.created_at, i.updated_at, i.closed_at, i.status
    FROM Issue i INNER JOIN users u ON i.user_id = u.user_id;