import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

function s2ab(s) {
  var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
  var view = new Uint8Array(buf); //create uint8array as viewer
  for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
  return buf;
}

export default class XlsxService {
  static downloadXlsx(exercises) {
    const wb = this.createBook("отчёты");

    this.generate(wb, exercises);

    return this.downloadSheets(wb);
  }
  static createBook(name) {
    var wb = utils.book_new();
    wb.Props = {
      Title: name,
      Subject: name,
      Author: "Alex",
      CreatedDate: new Date(2017, 12, 19),
    };
    return wb;
  }

  static addTosheet(wb, name, mat) {
    wb.SheetNames.push(name);
    var ws_data = mat;
    var ws = utils.aoa_to_sheet(ws_data);
    wb.Sheets[name] = ws;
  }

  static download(name, wbout) {
    return saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
  }

  static downloadSheets(wb) {
    var wbout = write(wb, { bookType: "xlsx", type: "binary" });

    return this.download("отчёты", wbout);
  }

  static generate(wb, exercises) {
    const mat = [];
    const headers = ["Клиент", "Дата", "Тип занятия"];

    mat[0] = headers;

    exercises.forEach((exercise) => {
      mat.push([
        exercise.client.fio,
        exercise.date,
        exercise.exerciseInfo.name,
      ]);
    });

    this.addTosheet(wb, "Занятия", mat);
  }
}
