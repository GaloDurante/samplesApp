import PDFDocument from "pdfkit";
import type { FullSample } from "../../types/sample.js";
import { formatISODate, getImagePath, parseScientificName } from "../util.js";

export async function generateCertificatePdfBuffer(data: FullSample): Promise<Buffer> {
  const imagePath = getImagePath();

  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 30, bottom: 40, left: 40, right: 40 },
    });

    const buffers: Buffer[] = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => resolve(Buffer.concat(buffers)));

    const greenColor = "#1B4D3E";
    const borderColor = "#aaaaaa";
    const textColor = "#222222";
    const thinWidth = 0.3;

    /* =========================
       HEADER
    ========================= */
    doc.image(imagePath, 40, 30, { fit: [250, 150] });

    doc.y = doc.y + 120;

    doc.fillColor(textColor).font("Helvetica").fontSize(11).text("CERTIFICADO DE ANÁLISIS", { align: "center" });

    const lineY = doc.y + 2;
    doc.lineWidth(0.5).strokeColor(borderColor).moveTo(40, lineY).lineTo(555, lineY).stroke();

    doc.moveDown(0.75);
    doc
      .fontSize(9)
      .font("Helvetica")
      .text("Laboratorio Inscripto en el Registro Nacional de Comercio y Fiscalización de Semillas N°1/8039", {
        align: "center",
      });

    /* =========================
       INFORMACIÓN DEL SOLICITANTE
    ========================= */

    let y = doc.y + 5;
    const infoTableHeight = 55;
    const headerHeight = 15;

    // Dibujar el rectángulo principal
    doc.lineWidth(thinWidth).strokeColor(borderColor).rect(40, y, 515, infoTableHeight).stroke();

    doc
      .moveTo(40, y + headerHeight)
      .lineTo(555, y + headerHeight)
      .stroke();

    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .text("Información del Solicitante", 40, y + 4, {
        width: 515,
        align: "center",
      });

    const contentY = y + headerHeight + 5;
    doc.fontSize(9);

    doc
      .font("Helvetica-Bold")
      .text("Nombre del Solicitante: ", 45, contentY, { continued: true })
      .font("Helvetica")
      .text(data.client?.name ?? "");

    const row2Y = contentY + 15;
    doc
      .font("Helvetica-Bold")
      .text("Especie / Cultivar / Categoría: ", 45, row2Y, { continued: true })
      .font("Helvetica")
      .text(data.colloquialSpecie || data.cultivar || "");

    doc
      .font("Helvetica-Bold")
      .text("Marca y Nº de Lote: ", 340, row2Y, { continued: true })
      .font("Helvetica")
      .text(`${data.mark ?? ""} ${data.lotNumber ?? ""}`);

    y += infoTableHeight + 15;

    /* =========================
       TABLA DE DATOS DEL LOTE
    ========================= */

    const tableTop = y;
    const colWidth = 515 / 4;
    const hHeight = 25;
    const dataHeight = 30;
    const rowHeight = hHeight + dataHeight;

    doc.lineWidth(thinWidth).strokeColor(borderColor);

    doc.rect(40, tableTop, 515, rowHeight * 2).stroke();

    for (let i = 1; i < 4; i++) {
      doc
        .moveTo(40 + colWidth * i, tableTop)
        .lineTo(40 + colWidth * i, tableTop + rowHeight * 2)
        .stroke();
    }

    doc
      .moveTo(40, tableTop + rowHeight)
      .lineTo(555, tableTop + rowHeight)
      .stroke();

    doc
      .moveTo(40, tableTop + hHeight)
      .lineTo(555, tableTop + hHeight)
      .stroke();
    doc
      .moveTo(40, tableTop + rowHeight + hHeight)
      .lineTo(555, tableTop + rowHeight + hHeight)
      .stroke();

    doc.font("Helvetica-Bold").fontSize(8.5);

    const titles1 = ["Peso del Lote", "Nº de Envases", "Fecha de Muestreo", "Otras Referencias"];
    const titles2 = ["N° de Precinto", "Fecha de Recepción", "Fecha de Finalización de los ensayos", "Nº Análisis"];

    titles1.forEach((t, i) => {
      doc.text(t, 40 + colWidth * i, tableTop + 5, {
        width: colWidth,
        align: "center",
        lineGap: -2,
      });
    });

    titles2.forEach((t, i) => {
      doc.text(t, 40 + colWidth * i, tableTop + rowHeight + 5, {
        width: colWidth,
        align: "center",
        lineGap: -2,
      });
    });

    doc.font("Helvetica").fontSize(9);
    const textOffset = 8;

    // Values row 1
    doc.text("-", 40, tableTop + hHeight + textOffset, { width: colWidth, align: "center" });
    doc.text("-", 40 + colWidth, tableTop + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });
    doc.text("-", 40 + colWidth * 2, tableTop + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });
    doc.text(data.otherReferences ?? "-", 40 + colWidth * 3, tableTop + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });

    // Values row 2
    doc.text(data.sealNumber ?? "-", 40, tableTop + rowHeight + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });
    doc.text(formatISODate(data.entryDate) ?? "-", 40 + colWidth, tableTop + rowHeight + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });
    doc.text(formatISODate(data.testEndDate) ?? "-", 40 + colWidth * 2, tableTop + rowHeight + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });
    doc.text(data.sampleNumber ?? "", 40 + colWidth * 3, tableTop + rowHeight + hHeight + textOffset, {
      width: colWidth,
      align: "center",
    });

    /* =========================
       RESULTADOS DE LOS ANÁLISIS
    ========================= */

    y += infoTableHeight + 70;
    const resBaseY = y;
    const gridHeight = 85;
    doc.lineWidth(thinWidth).strokeColor(borderColor).rect(40, resBaseY, 515, 120).stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("Resultados de los Análisis", 40, resBaseY + 5, { align: "center" });
    doc
      .moveTo(40, resBaseY + 18)
      .lineTo(555, resBaseY + 18)
      .stroke();
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .text(`Especie (nombre científico): `, 45, resBaseY + 23, { continued: true });

    const nameTokens = parseScientificName(data.specie ?? "-");
    nameTokens.forEach((token, index) => {
      const isLast = index === nameTokens.length - 1;
      doc.font(token.italic ? "Helvetica-Oblique" : "Helvetica").text(`${token.text}${isLast ? "" : " "}`, {
        continued: !isLast,
      });
    });

    doc
      .moveTo(40, resBaseY + 35)
      .lineTo(555, resBaseY + 35)
      .stroke();

    const gridY = resBaseY + 35;
    const pWidth = 130;
    const gWidth = 310;
    const dWidth = 50;

    doc
      .moveTo(40 + pWidth, gridY)
      .lineTo(40 + pWidth, gridY + gridHeight)
      .stroke();
    doc
      .moveTo(40 + pWidth + gWidth, gridY)
      .lineTo(40 + pWidth + gWidth, gridY + gridHeight)
      .stroke();

    doc
      .moveTo(40, gridY + 15)
      .lineTo(40 + pWidth + gWidth, gridY + 15)
      .stroke();

    doc
      .moveTo(40, gridY + 30)
      .lineTo(40 + pWidth, gridY + 30)
      .stroke();
    doc
      .moveTo(40 + pWidth + dWidth, gridY + 30)
      .lineTo(40 + pWidth + gWidth, gridY + 30)
      .stroke();
    doc
      .moveTo(40 + pWidth + gWidth, gridY + 30)
      .lineTo(555, gridY + 30)
      .stroke();

    doc
      .moveTo(40, gridY + 55)
      .lineTo(555, gridY + 55)
      .stroke();

    doc.font("Helvetica-Bold").fontSize(9);
    doc.text("Pureza", 40, gridY + 4, { width: pWidth, align: "center" });
    doc.text("Germinación", 40 + pWidth, gridY + 4, { width: gWidth, align: "center" });
    doc.text("Contenido de Humedad", 40 + pWidth + gWidth, gridY + 4, {
      width: 515 - pWidth - gWidth,
      align: "center",
    });

    doc.text("(% en Peso)", 40, gridY + 19, { width: pWidth, align: "center" });
    doc.text("(% en Número)", 40 + pWidth + dWidth, gridY + 19, { width: gWidth - dWidth, align: "center" });

    doc
      .moveTo(40 + pWidth + dWidth, gridY + 15)
      .lineTo(40 + pWidth + dWidth, gridY + gridHeight)
      .stroke();
    doc.text("Número\nde Días", 40 + pWidth, gridY + 35, { width: dWidth, align: "center" });
    doc.text("(%)", 40 + pWidth + gWidth, gridY + 38, { width: 515 - pWidth - gWidth, align: "center" });

    doc.fontSize(9);
    const subLabelsY = gridY + 35;
    const pSub = pWidth / 3;
    for (let i = 1; i < 3; i++)
      doc
        .moveTo(40 + pSub * i, gridY + 30)
        .lineTo(40 + pSub * i, gridY + gridHeight)
        .stroke();

    doc.text("Semilla\nPura", 40, subLabelsY, { width: pSub, align: "center" });
    doc.text("Materia\nInerte", 40 + pSub, subLabelsY, { width: pSub, align: "center" });
    doc.text("Otras\nsemillas", 40 + pSub * 2, subLabelsY, { width: pSub, align: "center" });

    const gSub = (gWidth - dWidth) / 5;
    for (let i = 1; i < 5; i++)
      doc
        .moveTo(40 + pWidth + dWidth + gSub * i, gridY + 30)
        .lineTo(40 + pWidth + dWidth + gSub * i, gridY + gridHeight)
        .stroke();

    const gLabels = [
      "Plántulas\nNormales",
      "Semillas\nDuras",
      "Semillas\nFrescas",
      "Plántulas\nAnormales",
      "Semillas\nMuertas",
    ];
    gLabels.forEach((l, i) =>
      doc.text(l, 40 + pWidth + dWidth + gSub * i, subLabelsY, { width: gSub, align: "center" }),
    );

    doc.font("Helvetica").fontSize(9);

    const dataY = gridY + 62;

    // 1. Purity data (3 columns)
    doc.text(data.purity?.seedPure ?? "-N-", 40, dataY, { width: pSub, align: "center" });
    doc.text(data.purity?.inertMatter ?? "-N-", 40 + pSub, dataY, { width: pSub, align: "center" });
    doc.text(data.purity?.otherSeeds ?? "-N-", 40 + pSub * 2, dataY, { width: pSub, align: "center" });

    // 2. Germination (6 columns)
    doc.text(data.germination?.daysNumber?.toString() ?? "-N-", 40 + pWidth, dataY, { width: dWidth, align: "center" });

    const germinationData = [
      data.germination?.normalSeedlings?.toString() ?? "-N-",
      data.germination?.hardSeeds?.toString() ?? "-N-",
      data.germination?.freshSeeds?.toString() ?? "-N-",
      data.germination?.abnormalSeedlings?.toString() ?? "-N-",
      data.germination?.deadSeeds?.toString() ?? "-N-",
    ];

    germinationData.forEach((val, i) => {
      doc.text(val, 40 + pWidth + dWidth + gSub * i, dataY, {
        width: gSub,
        align: "center",
      });
    });

    // 4. Humidity
    doc.text(data.humidity?.humidity?.toString() ?? "-N-", 40 + pWidth + gWidth, dataY, {
      width: 515 - pWidth - gWidth,
      align: "center",
    });

    /* =========================
       DETERMINACIONES
    ========================= */
    y = gridY + gridHeight + 15;
    doc.fontSize(9);

    doc.moveTo(40, y).lineTo(555, y).lineWidth(thinWidth).strokeColor(borderColor).stroke();
    doc
      .font("Helvetica-Bold")
      .text("Clase de Materia Inerte:", 40, y + 5, { continued: true })
      .font("Helvetica")
      .text(data.purity?.typeInertMatter ?? "-");

    y += 35;
    doc.moveTo(40, y).lineTo(555, y).stroke();
    doc
      .font("Helvetica-Bold")
      .text("Otras semillas:", 40, y + 5, { continued: true })
      .font("Helvetica")
      .text(data.purity?.otherSeeds ?? "-");

    y += 35;
    doc.moveTo(40, y).lineTo(555, y).stroke();
    doc
      .font("Helvetica-Bold")
      .text("Otras Determinaciones: ", 40, y + 5, { continued: true })
      .font("Helvetica")
      .text(data.otherDeter ?? "-");

    y += 65;
    doc.font("Helvetica-Bold").fontSize(8);

    /* =========================
       SELECTOR
    ========================= */

    doc.text("ESTE CERTIFICADO SI", 40, y);

    const cbSize = 10;
    doc
      .lineWidth(0.5)
      .strokeColor(borderColor)
      .rect(130, y - 2, cbSize, cbSize)
      .stroke();

    doc.text("NO", 150, y);

    doc.rect(170, y - 2, cbSize, cbSize).stroke();
    doc
      .font("Helvetica")
      .fontSize(9)
      .text("X", 172.5, y - 1);

    doc.font("Helvetica-Bold").fontSize(9).text("AMPARA LA TOTALIDAD DEL LOTE", 190, y);

    y = doc.y + 10;

    /* =========================
       FIRMA
    ========================= */

    doc.lineWidth(thinWidth).strokeColor(borderColor).rect(40, y, 515, 85).stroke();
    doc
      .moveTo(190, y)
      .lineTo(190, y + 85)
      .stroke();
    doc
      .moveTo(340, y)
      .lineTo(340, y + 85)
      .stroke();
    doc
      .moveTo(40, y + 20)
      .lineTo(555, y + 20)
      .stroke();

    doc.text("Lugar y País", 40, y + 5, { width: 150, align: "center" });
    doc.text("Fecha de Emisión", 190, y + 5, { width: 150, align: "center" });
    doc.text("Firma del Director Técnico", 340, y + 5, { width: 215, align: "center" });

    doc.font("Helvetica").text("San Vicente, Santa Fe, Argentina", 40, y + 35, { width: 150, align: "center" });
    doc.text(formatISODate(data.testEndDate) ?? "-", 190, y + 35, { width: 150, align: "center" });

    /* =========================
       FOOTER
    ========================= */
    const footerY = 780;
    const footerHeight = 15;

    doc.rect(40, footerY, 515, footerHeight).fill(greenColor);

    doc
      .fillColor("#fff")
      .fontSize(9)
      .font("Helvetica")
      .text(
        "Tel: (03492) 471563 o (03492) 15665167 · brodarebeca@hotmail.com · Gálvez 130 · San Vicente · Santa Fe",
        40,
        footerY + 4,
        {
          width: 515,
          align: "center",
        },
      );

    doc.end();
  });
}
