import { pool } from "../config/database";
import { Article } from "../models/Article";

export const getAllArticles = async (): Promise<Article[]> => {
  const result = await pool.query(
    "SELECT * FROM articles ORDER BY published_date DESC"
  );

  return result.rows;
};

export const createArticle = async (
  article: Article
): Promise<Article> => {
  const result = await pool.query(
    `INSERT INTO articles
    (title, content, author, published_date, article_type)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`,
    [
      article.title,
      article.content,
      article.author,
      article.published_date,
      article.article_type,
    ]
  );

  return result.rows[0];
};
export const updateArticle = async (
  id: number,
  article: {
    title: string;
    content: string;
    author: string;
    published_date: string;
    article_type: string;
  }
) => {
  const result = await pool.query(
    `UPDATE articles
     SET title=$1,
         content=$2,
         author=$3,
         published_date=$4,
         article_type=$5
     WHERE id=$6
     RETURNING *`,
    [
      article.title,
      article.content,
      article.author,
      article.published_date,
      article.article_type,
      id,
    ]
  );

  return result.rows[0];
};
export const deleteArticle = async (id: number) => {
  await pool.query(
    "DELETE FROM articles WHERE id = $1",
    [id]
  );

  return { message: "Article Deleted Successfully" };
};
export const publishArticle = async (id: number) => {
  const query = `
    UPDATE articles
    SET status='published'
    WHERE id=$1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};
export const getDraftArticles = async () => {
  const result = await pool.query(
    "SELECT * FROM articles WHERE status='draft' ORDER BY created_at DESC"
  );

  return result.rows;
};
export const likeArticle = async (id: number) => {
  const result = await pool.query(
    `
    UPDATE articles
    SET likes = likes + 1
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rows[0];
};
export const getPublishedArticles = async () => {
  const result = await pool.query(
    `
      SELECT *
      FROM articles
      WHERE status = 'published'
      ORDER BY published_date DESC
    `
  );

  return result.rows;
};
export const getArticleById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT *
    FROM articles
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};
export const searchArticles = async (
  keyword: string
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM articles
    WHERE
      status = 'published'
      AND
      (
        title ILIKE $1
        OR
        content ILIKE $1
      )
    `,
    [`%${keyword}%`]
  );

  return result.rows;
};
export const getAuthorArticles = async (
  author: string
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM articles
    WHERE author = $1
    ORDER BY published_date DESC
    `,
    [author]
  );

  return result.rows;
};
export const getDashboardStats = async () => {
  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_articles,
      COUNT(*) FILTER (WHERE status='published') AS published,
      COUNT(*) FILTER (WHERE status='draft') AS drafts,
      COALESCE(SUM(likes), 0) AS total_likes
    FROM articles
  `);

  return result.rows[0];
};
export const getArticlesByCategory = async (
  category: string
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM articles
    WHERE article_type = $1
      AND status = 'published'
    ORDER BY published_date DESC
    `,
    [category]
  );

  return result.rows;
};