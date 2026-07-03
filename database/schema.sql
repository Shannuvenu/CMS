CREATE TABLE articles (

    id SERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    content TEXT NOT NULL,

    author VARCHAR(100) NOT NULL,

    published_date DATE NOT NULL,

    article_type VARCHAR(50) NOT NULL,

    status VARCHAR(20) DEFAULT 'draft',

    likes INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);