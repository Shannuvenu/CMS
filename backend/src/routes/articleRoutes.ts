import express from "express";

import {
  fetchArticles,
  fetchDraftArticles,
  fetchPublishedArticles,
  fetchArticleById,
  fetchArticlesByCategory,
  fetchAuthorArticles,
  dashboardStats,
  search,
  addArticle,
  update,
  publish,
  like,
  remove,
} from "../controllers/articleController";

const router = express.Router();

router.get(
  "/category/:category",
  fetchArticlesByCategory
);

router.get(
  "/search/:keyword",
  search
);

router.get(
  "/author/:author",
  fetchAuthorArticles
);

router.get(
  "/stats",
  dashboardStats
);

// Get all articles
router.get("/", fetchArticles);

// Get draft articles
router.get("/drafts", fetchDraftArticles);

// Get published articles
router.get("/published", fetchPublishedArticles);

// Create article
router.post("/", addArticle);

// Update article
router.put("/:id", update);

// Publish article
router.put("/:id/publish", publish);

// Like article
router.put("/:id/like", like);

router.get("/:id", fetchArticleById);

// Delete article
router.delete("/:id", remove);

export default router;