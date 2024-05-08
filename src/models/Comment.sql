CREATE TABLE Comment (
    comment_id INT PRIMARY KEY,
    issue_id INT,
    user_id INT,
    comment_text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (issue_id) REFERENCES Issue(issue_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
ALTER TABLE `comment` CHANGE `comment_id` `comment_id` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `comment` CHANGE `created_at` `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;


CREATE VIEW Issue_Comment_View AS
SELECT
    c.comment_id,
    c.issue_id,
    i.title AS issue_title,
    c.comment_text,
    c.created_at AS comment_created_at,
    c.updated_at AS comment_updated_at,
    u.user_id,
    u.username,
    u.created_at AS user_created_at,
    u.last_login
FROM
    Comment c
INNER JOIN
    Issue i ON c.issue_id = i.issue_id
INNER JOIN
    users u ON c.user_id = u.user_id