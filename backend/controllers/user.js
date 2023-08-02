import { User } from "../models/user.js";
import excel from "exceljs";
import async from "async";
import fs from "fs";
import { insertCandidates } from "../utils/insertCandidates.js";

//upload file function gets called when user uploads file
export const uploadFile = async (req, res) => {
  if (req?.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    // If the file type is not xlsx type, delete the uploaded file and send an error response
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting the file:', err);
      }
      res.status(400).send('Only xlsx files are allowed.');
    });
    return;
  }
  
  try {
    const workbook = new excel.Workbook();

    //reading the xlsx file from request
    workbook.xlsx.readFile(req.file.path).then(async () => {
      const worksheet = workbook.getWorksheet(1);
      const candidates = [];

      //inserting the candidates and ignoring first row as it will have only column headings
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          candidates.push({ ...row.values });
        }
      });

      //mapping through candidates eleminating duplicates and inserting them into the database
      async.eachSeries(candidates, insertCandidates, (err) => {
        //deleting the file after it is processed
        fs.unlink(req.file.path, () => {});

        if (err) res.status(400).json({ name: err.name, message: err.message });
        else {
          //returning success response
          res
            .status(200)
            .json({ success: true, message: "File Succesfully uploaded" });
        }
      });
    });
  } catch (error) {
    //returning failure response with error details
    res.status(400).json({ success: false, error: error.message });
  }
};
