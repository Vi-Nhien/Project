CREATE DATABASE HELLO

CREATE TABLE [User](
	PersonID int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
)

INSERT INTO [user](PersonID ,LastName ,FirstName ,Address)
VALUES (12,'HELLO', 'WORLD', '!!!')

SELECT * FROM [User]


INSERT INTO [user](PersonID ,LastName ,FirstName ,Address)
VALUES (124,'HELLO', 'KITTY', '!!!')


SELECT FirstName FROM [User] WHERE PersonID = 124



