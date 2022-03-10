const { Router } = require('express');

const ExtractNewsG1 = require('#src/extract/extracts/ExtractNewsG1');

class ExtractController {
  constructor(extractModel) {
    this.extractModel = extractModel;
  }

  buildRouter() {
    const router = Router();
    router.get('/doExtract', this.extractHandle.bind(this));
    router.get('/list', this.listNoticesHandle.bind(this));
    return router;
  }

  async extractHandle(req, res) {
    const extractNewsG1 = new ExtractNewsG1();
    const notices = await extractNewsG1.executa();

    for (let notice of notices) {
      await this.extractModel.create(notice);
    }

    res.send();
  }

  async listNoticesHandle(req, res) {
    const { query } = req;
    const data = await this.extractModel.search(query);
    //console.log(data);
    res.send(data);
  }

}

module.exports = ExtractController;
