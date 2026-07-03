import { Request, Response } from "express";

import {
  getAllArticles,
  createArticle,
  getDraftArticles,
  getPublishedArticles,
  getArticleById,
  getArticlesByCategory,
  searchArticles,
  getAuthorArticles,
  getDashboardStats,
  updateArticle,
  deleteArticle,
  publishArticle,
  likeArticle,
} from "../services/articleService";

// GET ALL ARTICLES
export const fetchArticles = async (
  req: Request,
  res: Response
) => {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch articles",
    });
  }
};

// GET DRAFT ARTICLES
export const fetchDraftArticles = async (
  req: Request,
  res: Response
) => {
  try {
    const articles = await getDraftArticles();
    res.json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch drafts",
    });
  }
};

// CREATE ARTICLE
export const addArticle = async (
  req: Request,
  res: Response
) => {
  try {
    const article = await createArticle(req.body);

    res.status(201).json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create article",
    });
  }
};

// UPDATE ARTICLE
export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const article = await updateArticle(id, req.body);

    res.json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Update Failed",
    });
  }
};

// DELETE ARTICLE
export const remove = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const result = await deleteArticle(id);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Delete Failed",
    });
  }
};

// PUBLISH ARTICLE
export const publish = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const article = await publishArticle(id);

    res.json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error publishing article",
    });
  }
};
export const like = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const article = await likeArticle(id);

    res.json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to like article",
    });
  }
};
export const fetchPublishedArticles = async (
  req: Request,
  res: Response
) => {
  try {
    const articles = await getPublishedArticles();

    res.json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch published articles",
    });
  }
};
// GET SINGLE ARTICLE
export const fetchArticleById = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const article = await getArticleById(id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json(article);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch article",
    });
  }
};
export const fetchArticlesByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category = Array.isArray(req.params.category)
      ? req.params.category[0]
      : req.params.category;

    const articles = await getArticlesByCategory(category);

    res.json(articles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch category articles",
    });
  }
};
export const search = async (
  req: Request,
  res: Response
) => {
  try {
    const keyword = Array.isArray(req.params.keyword)
      ? req.params.keyword[0]
      : req.params.keyword;

    const articles = await searchArticles(keyword);

    res.json(articles);
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
    });
  }
};

export const fetchAuthorArticles =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const author = Array.isArray(req.params.author)
        ? req.params.author[0]
        : req.params.author;

      const articles =
        await getAuthorArticles(author);

      res.json(articles);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch author articles",
      });
    }
  };
  export const dashboardStats =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const stats =
        await getDashboardStats();

      res.json(stats);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch dashboard stats",
      });
    }
  };