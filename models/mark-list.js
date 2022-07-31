const Mark = require('./mark');

class MarkList {
  constructor() {
    this._markList = {};
  }

  get markList() {
    return this._markList;
  }

  createMark(mark) {
    return (this._markList[mark.id] = new Mark(mark.id, mark.lng, mark.lat));
  }

  moveMark(marckDrag) {
    this._markList[marckDrag.id].lng = marckDrag.lng;
    this._markList[marckDrag.id].lat = marckDrag.lat;
  }

  deleteMark(id) {
    delete this._markList[id];
  }
}

module.exports = MarkList;
