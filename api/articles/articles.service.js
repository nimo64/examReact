const Article = require("./articles.model");
const bcrypt = require("bcrypt");
const userController = require("../users/users.controller");

class ArticleService {
  async getUserArticlesWithPopulate(userId) {
    try {
      const articles = await Article.find({ createdBy: userId }, "-password").populate("createdBy");
      return articles;
    } catch (err) {
      throw err;
    }
  }
  create(data) {
    const article = new Article(data);
    return article.save();
  }
  update(id, data) {
    return Article.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return Article.deleteOne({ _id: id });
  }
}

module.exports = new ArticleService();
