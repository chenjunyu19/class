'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    let fs = require('fs');
    let jsonFile = think.RESOURCE_PATH + '/static/data.json';
    let data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
    let post = this.post();
    this.assign('wx', /MicroMessenger/i.test(this.userAgent()) || think.env == 'development');
    if (this.isPost() && this.assign('wx')) {
      if (post.id) {
        if (post.add) {
          let d = new Date();
          data[post.id].finished.push({ name: post.add, time: (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() });
          fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8');
          return this.end('<script>alert(\'提交成功，感谢您的支持！\');history.back();</script>');
        }
        if (post.del) {
          data[post.id].finished.splice(post.del - 1, 1);
          fs.writeFileSync(jsonFile, JSON.stringify(data), 'utf-8');
          return this.end('<script>alert(\'删除成功！\');history.back();</script>');
        }
      }
    }
    this.assign('title', '初二（4）班接龙');
    this.assign('data', data);
    //auto render template file index_index.html
    return this.display();
  }
}