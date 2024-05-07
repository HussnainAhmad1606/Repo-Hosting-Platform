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