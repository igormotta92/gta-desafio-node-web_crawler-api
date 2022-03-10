class extractModel {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async create(notice) {

    const {
      imagem, subTitle, title, titleURL, subItens, metadata
    } = notice;

    //console.log(imagem, subTitle, title, titleURL, subItens, metadata);
    //return;

    const sql = `
        INSERT INTO notices (imagem, subTitle, title, titleURL, subItens, metadata) 
        VALUES (?,?,?,?,?,?) 
        `;
    const [result] = await this.dbConnection.execute(
      sql,
      [imagem, subTitle, title, titleURL, subItens, metadata],
    );
    return result.insertId;
  }

  async search(query) {
    let sql = `SELECT * FROM \`notices\` WHERE 1 = 1 `;

    const params = [];

    if (typeof query.q != 'undefined') {
      sql += "AND (`subTitle` like ? OR `title` like ? OR `titleURL` like ? OR `subItens` like ? OR `metadata` like ?);";
      params.push(`%${query.q}%`);
      params.push(`%${query.q}%`);
      params.push(`%${query.q}%`);
      params.push(`%${query.q}%`);
      params.push(`%${query.q}%`);
    }

    //console.log(sql, params);

    const [result] = await this.dbConnection.execute(sql, params);
    return result;
  }
}

module.exports = extractModel;
