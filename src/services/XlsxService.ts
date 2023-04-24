import { utils, WorkBook, write } from "xlsx";
import { saveAs } from "file-saver";
import { Exercise } from "@/types/entitys/Exercise";
class XlsxService {
  private static s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }
  static downloadXlsx(exercises: Exercise[]) {
    const wb = this.createBook("отчёты");

    this.generate(wb, exercises);

    return this.downloadSheets(wb);
  }
  private static createBook(name: string) {
    const wb = utils.book_new();
    wb.Props = {
      Title: name,
      Subject: name,
      Author: "Alex",
      CreatedDate: new Date(2017, 12, 19),
    };
    return wb;
  }

  private static addTosheet(wb: WorkBook, name: string, mat: any[]) {
    wb.SheetNames.push(name);
    const ws_data = mat;
    const ws = utils.aoa_to_sheet(ws_data);
    wb.Sheets[name] = ws;
  }

  static download(name: string, wbout: WorkBook) {
    return saveAs(
      new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }),
      name + ".xlsx"
    );
  }

  static downloadSheets(wb: WorkBook) {
    const wbout = write(wb, { bookType: "xlsx", type: "binary" });

    return this.download("отчёты", wbout);
  }

  static generate(wb: WorkBook, exercises: Exercise[]) {
    const mat = [];
    const headers = ["Клиент", "Дата", "Тип занятия"];

    mat[0] = headers;

    exercises.forEach((exercise) => {
      mat.push([
        exercise.client.auth?.fio,
        exercise.date,
        exercise.exerciseInfo.name,
      ]);
    });

    this.addTosheet(wb, "Занятия", mat);
  }
}

export default XlsxService;
