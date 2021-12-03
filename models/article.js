// modules setup
const mongoose = require('mongoose');
const fs = require('fs');
const converter = require('json-2-csv');
const spawn = require('child_process').spawn;

// mongodb model setup
const articleSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const ArticleSchema = mongoose.model('article', articleSchema);

class Article {

  constructor( owner, title, content ) {
    this.owner = owner;
    this.title = title;
    this.content = content;
  };

  async save() {
    // let process = spawn('python', ['/ml_algorithms/main.py', this.content]);
    // process.stdout.on('data', (data) => {
    // console.log(data);
    // this.content = data;
    // });
    return Promise.resolve(ArticleSchema(this).save());
  };

  static async findArticles(uid) {
    return Promise.resolve(ArticleSchema.find( {owner: uid} ));
  };

  static async deleteArticleById(id) {
    return Promise.resolve(ArticleSchema.deleteOne( {_id: id} ));
  };

  static async jsonToCSV(article) {
    converter.json2csv(article, (err, csv) => {
      if (err) {
        throw err;
      };
      fs.writeFileSync(`${article.owner}.csv`, csv);
    });
  };
};

module.exports = Article;
