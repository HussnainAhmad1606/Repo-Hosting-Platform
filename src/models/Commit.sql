CREATE TABLE Commit (
    commit_id INT PRIMARY KEY,
    repo_id INT,
    user_id INT,
    commit_message TEXT NOT NULL,
    commit_date DATETIME NOT NULL,
    document_text TEXT, -- New field for storing changed document text
    FOREIGN KEY (repo_id) REFERENCES Repository(repo_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES `User`(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
ALTER TABLE `commit` CHANGE `commit_id` `commit_id` INT(11) NOT NULL AUTO_INCREMENT;

Create VIEW Commit_Repo_View AS 
SELECT
    c.commit_id,
    c.repo_id,
    c.user_id,
    u.username,
    c.commit_message,
    c.commit_date,
    c.document_text
FROM
    Commit c
JOIN
    `Users` u ON c.user_id = u.user_id;