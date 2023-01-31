"use strict";

const nume = document.querySelector("#nume");
const prenume = document.querySelector("#prenume");
const fiulFiica1 = document.querySelector("#fiulFiica1");
const fiulFiica2 = document.querySelector("#fiulFiica2");
const cnp = document.querySelector("#cnp");
const serieCI = document.querySelector("#serieCI");
const nrCI = document.querySelector("#nrCI");
const eliberat = document.querySelector("#eliber");
const dataEliberarii = document.querySelector("#dataEliber");
const locNastere = document.querySelector("#locNastere");
const judNastere = document.querySelector("#judNastere");
const strada = document.querySelector("#strada");
const oras = document.querySelector("#oras");
const judDomiciliu = document.querySelector("#judDomiciliu");
const tara = document.querySelector("#tara");
const nr = document.querySelector("#nr");
const bl = document.querySelector("#bl");
const sc = document.querySelector("#sc");
const et = document.querySelector("#et");
const ap = document.querySelector("#ap");
const nrTelefon = document.querySelector("#nrTelefon");
const eMail = document.querySelector("#eMail");
const marca = document.querySelector("#marca");
const tip = document.querySelector("#tip");
const caroseria = document.querySelector("#caroseria");
const vin = document.querySelector("#vin");
const anFabricatie = document.querySelector("#anFabricatie");
const cilindree = document.querySelector("#cilindree");
const culoare = document.querySelector("#culoare");
const combustibil = document.querySelector("#combustibil");
const serieCIV = document.querySelector("#serieCIV");
const serieMotor = document.querySelector("#serieMotor");

// extracts current date in dd.mm.yyy format
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = dd + "." + mm + "." + yyyy;

const { PDFDocument } = PDFLib;
document.querySelector("#itl-005").addEventListener(
  "click",

  // calls for external pdf
  async function pdfDocumentModifyer() {
    const formUrl =
      "https://www.transfernow.net/en/dltransfer?utm_source=20230131crnynkwT";
    const formPdfBytes = await fetch(formUrl, {
      mode: "no-cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        // "Content-Type": "application/pdf",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      // redirect: 'follow', // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    // fills required text fields on the form document
    form.getTextField("numePrenume").setText(`${nume.value} ${prenume.value}`);
    form.getTextField("serieCI").setText(serieCI.value);
    form.getTextField("nrCI").setText(nrCI.value);
    form.getTextField("cnp").setText(cnp.value);
    form.getTextField("judDomiciliu").setText(judDomiciliu.value);
    form.getTextField("locDomiciliu").setText(oras.value);
    form.getTextField("str").setText(strada.value);
    form.getTextField("nrDomiciliu").setText(nr.value);
    form.getTextField("bl").setText(bl.value);
    form.getTextField("sc").setText(sc.value);
    form.getTextField("et").setText(et.value);
    form.getTextField("ap").setText(ap.value);
    form.getTextField("nrTelefon").setText(nrTelefon.value);
    form.getTextField("email").setText(eMail.value);
    form.getTextField("semnatura").setText(`${nume.value} ${prenume.value}`);
    form.getTextField("marcaTip").setText(`${marca.value} ${tip.value}`);
    form.getTextField("serieSasiu").setText(vin.value);
    form.getTextField("serieMotor").setText(serieMotor.value);
    form.getTextField("capCilindrica").setText(cilindree.value);
    form.getTextField("anFabricatie").setText(anFabricatie.value);
    form.getTextField("dataCurenta").setText(today);

    // generates new pdf document
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "declaratia-fiscala-cmpl.pdf", "application/pdf");
  }
);

document.querySelector("#ditl-sm-pf").addEventListener(
  "click",

  // calls for external pdf
  async function pdfDocumentModifyer() {
    const formUrl = "http://localhost:8000/imputernicire.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    // fills required text fields on the form document
    form.getTextField("nume").setText(nume.value);
    form.getTextField("prenume").setText(prenume.value);
    form.getTextField("fiulFiica1").setText(fiulFiica1.value);
    form.getTextField("fiulFiica2").setText(fiulFiica2.value);
    form.getTextField("cnp").setText(cnp.value.split("").join("  "));
    form.getTextField("serie").setText(serieCI.value);
    form.getTextField("nrCI").setText(nrCI.value);
    form.getTextField("eliberat").setText(eliberat.value);
    form.getTextField("locNastere").setText(locNastere.value);
    form.getTextField("judNastere").setText(judNastere.value);
    form.getTextField("str").setText(strada.value);
    form.getTextField("locDomiciliu").setText(oras.value);
    form.getTextField("judDomiciliu").setText(judDomiciliu.value);
    form.getTextField("nrDomiciliu").setText(nr.value);
    form.getTextField("bl").setText(bl.value);
    form.getTextField("sc").setText(sc.value);
    form.getTextField("et").setText(et.value);
    form.getTextField("ap").setText(ap.value);
    form.getTextField("telefon").setText(nrTelefon.value);
    form.getTextField("email").setText(eMail.value);
    form.getTextField("dataCurenta").setText(today);

    // extracting date from CNP and filling the date fields
    const lunaNastere = cnp.value.substr(3, 2);
    const ziNastere = cnp.value.substr(5, 2);
    const anNastere =
      cnp.value.substr(0, 1) == 1 || cnp.value.substr(0, 1) == 2
        ? `19${cnp.value.substr(1, 2)}`
        : `20${cnp.value.substr(1, 2)}`;
    form.getTextField("ziua").setText(cnp.value.substr(5, 2));
    form.getTextField("luna").setText(cnp.value.substr(3, 2));
    cnp.value && form.getTextField("anul").setText(anNastere);

    // generates new pdf document
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "imputernicire-ditl-sm-pf-cmpl.pdf", "application/pdf");
  }
);

document.querySelector("#fisa-inmatriculare").addEventListener(
  "click",

  // calls for external pdf
  async function pdfDocumentModifyer() {
    const formUrl = "http://localhost:8000/fisa-de-inmatriculare-auto.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    // fills required text fields on the form document
    form.getTextField("numePrenume").setText(`${nume.value} ${prenume.value}`);
    form.getTextField("serieNrCI").setText(`${serieCI.value} ${nrCI.value}`);
    form.getTextField("fiulFiica1").setText(fiulFiica1.value);
    form.getTextField("fiulFiica2").setText(fiulFiica2.value);
    const ziNastere = cnp.value.substr(5, 2);
    const lunaNastere = cnp.value.substr(3, 2);
    const anNastere =
      cnp.value.substr(0, 1) == 1 || cnp.value.substr(0, 1) == 2
        ? `19${cnp.value.substr(1, 2)}`
        : `20${cnp.value.substr(1, 2)}`;
    cnp.value &&
      form
        .getTextField("dataNastere")
        .setText(`${ziNastere}.${lunaNastere}.${anNastere}`);
    form.getTextField("cnp").setText(cnp.value);
    form.getTextField("locNastere").setText(locNastere.value);
    oras.value &&
      form
        .getTextField("adresa")
        .setText(
          `${oras.value}, jud. ${judDomiciliu.value}, ${strada.value}, ${nr.value}, bl.${bl.value}, sc.${sc.value}, et.${et.value}, ap.${ap.value}`
        );
    form.getTextField("nrTelefon").setText(nrTelefon.value);
    form.getTextField("marca").setText(marca.value);
    form.getTextField("tip").setText(tip.value);
    form.getTextField("vin").setText(vin.value);
    form.getTextField("serieMotor").setText(serieMotor.value);
    form.getTextField("cilindree").setText(cilindree.value);
    form.getTextField("anFabricatie").setText(anFabricatie.value);
    form.getTextField("caroseria").setText(caroseria.value);
    form.getTextField("culoare").setText(culoare.value);
    form.getTextField("combustibil").setText(combustibil.value);
    form.getTextField("serieCIV").setText(serieCIV.value);

    // generates new pdf document
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "fisa-inmatriculare-cmpl.pdf", "application/pdf");
  }
);

document.querySelector("#contract-de-mandat").addEventListener(
  "click",

  // calls for external pdf
  async function pdfDocumentModifyer() {
    const formUrl = "http://localhost:8000/contract-de-mandat1.pdf";
    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    // fills required text fields on the form document
    form.getTextField("dataCurenta").setText(today);
    form.getTextField("numePrenume").setText(`${nume.value} ${prenume.value}`);
    form.getTextField("str").setText(strada.value);
    form.getTextField("locDomiciliu").setText(oras.value);
    form.getTextField("judDomiciliu").setText(judDomiciliu.value);
    form.getTextField("nrDomiciliu").setText(nr.value);
    form.getTextField("bl").setText(bl.value);
    form.getTextField("ap").setText(ap.value);
    form.getTextField("cnp").setText(cnp.value);
    form.getTextField("serieCI").setText(serieCI.value);
    form.getTextField("nrCI").setText(nrCI.value);
    form.getTextField("marca").setText(marca.value);
    form.getTextField("vin").setText(vin.value);

    // generates new pdf document
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "contract-de-mandat-cmpl.pdf", "application/pdf");
  }
);
