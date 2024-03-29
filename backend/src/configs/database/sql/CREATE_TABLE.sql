CREATE TABLE IF NOT EXISTS users (
	ID VARCHAR(20) PRIMARY KEY,
	NAME VARCHAR(50) UNIQUE NOT NULL,
	PASSWORD VARCHAR(255) NOT NULL,
	CREATED_AT TIMESTAMP NOT NULL,
	LAST_LOGIN TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS todo_list(
    ID_TODO SERIAL PRIMARY KEY,
    ID_USER VARCHAR(20) NOT NULL,
    TITLE VARCHAR(50) NOT NULL,
    DESCRIPTION TEXT NOT NULL,
    CREATED_AT TIMESTAMP NOT NULL,
    FOREIGN KEY (ID_USER) REFERENCES users(ID)
);