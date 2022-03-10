const cheerio = require('cheerio');
const apiService = require('#src/service/api');

//import util from 'util';
//util.inspect.defaultOptions.depth = 3;

class ExtractNewsG1 {

  constructor() {
    //constantes
    this.URL = "https://g1.globo.com/";
    this.FILENAME = "newsG1";
  }

  async executa() {
    await this.loadHtmlPage();
    const infoHtml = this.getInfoHtml();

    return infoHtml;
  }

  async loadHtmlPage() {
    try {
      const { data: html } = await apiService.get(this.URL);
      this.html = html;

    } catch (error) {
      console.log(`Error: GetNewsG1:loadPageHtml > ${error.message}`);
    }
  }

  getInfoHtml() {

    const news = [];
    //-----------
    const $ = cheerio.load(this.html);
    let content_news = $('#bstn-launcher');

    $(content_news).find('.bastian-feed-item').each(function () {
      let item = $(this);

      let imagem = item.find('.bstn-fd-picture-image').attr('src');

      let subTitle = item.find('.feed-post-header-chapeu').text();

      let title = item.find('.feed-post-body-title a').text();
      let titleURL = item.find('.feed-post-body-title a').attr('href');

      //lista
      let subItens = []
      item.find('.bstn-relateditems .bstn-relateditem').each(function () {
        let title = $(this).find('a').text();
        let titleURL = $(this).find('a').attr('href');

        subItens.push({ title, titleURL });
      });

      let aMetadata = [];
      ['.feed-post-datetime', '.feed-post-metadata-section'].forEach((value) => {
        //I don't know why it only works with html() yet!
        let text = item.find('.feed-post-metadata').find(value).html();

        if (text) aMetadata.push(text.trim());
      });

      let metadata = (aMetadata.length > 1) ? aMetadata.join(' - ') : aMetadata.join('');

      news.push({
        imagem: (!imagem) ? '' : imagem,
        subTitle: (!subTitle) ? '' : subTitle,
        title,
        titleURL,
        subItens: JSON.stringify(subItens), //melhorar depois
        metadata,
      });

    });

    //console.log(news);
    return news;
  }

}

module.exports = ExtractNewsG1;