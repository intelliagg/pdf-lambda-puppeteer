import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";

export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} event - The object that comes for lambda which includes the http's attributes
   * @returns {Array<any>} array of Structure Instructions
   */
  static buildEvidencefiles: GeneratorFunction = async (event) => {
    const options = {
        format: "A4",
        printBackground: true,
        margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
      };

    try {
      let url = event.pathParameters.url;
      const pdf = await Helper.getPDFBuffer(url, options);
      return {
        headers: {
          "Content-type": "application/pdf",
          "Content-Disposition": "attachment; filename='filename.pdf'"
        },
        statusCode: 200,
        body: pdf.toString("base64"),
        isBase64Encoded: true,
      };
    } catch (error) {
      console.error("Error : ", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error,
          message: "Something went wrong",
        }),
      };
    }
  };
}
