let input = document.querySelector("input");
let textarea = document.querySelector("textarea");
let select = document.getElementById("memoType");
const regex1 =
  /cujadescriçãoseinicianovértice([A-Z][0-9]+)decoordenadaEste([0-9.,]+)meNorte([0-9.,]+)/g;
const subregex1 =
  /[A-Z][0-9.,]+segueatéovértice([A-Z][0-9.,]+),decoordenadaUTME=([0-9.,]+)meN=([0-9.,]+)/g;
const regex2 = /([A-Z]+-[A-Z]-[0-9.]+),decoordenadasN([0-9.,]+)meE([0-9.,]+)/g;
const regexGeo =
  /([A-Z]+-[A-Z]-[0-9.]+||[A-Z][0-9.,]),georreferenciadonoSistemaGeodésicoBrasileiro,DATUM-SIRGAS2000,MC-45°W,decoordenadasN([0-9.,]+)meE([0-9.,]+)/g;
const regex3 =
  /([A-Z][0-9.,]+),definidopelascoordenadasE:([0-9.,]+)meN:([0-9.,]+)/g;
const regex4 = /ponto([0-9]+),comcoordenadaN-([0-9.]+)eE-([0-9.]+)/g;

var count = 0;
var file;
let textRegex = "Vertice;N;E\n";
input.addEventListener("change", () => {
  let files = input.files;
  if (files.length == 0) return;
  /* If any further modifications have to be made on theExtracted text. The text can be accessed using thefile variable. But since this is const, it is a readonly variable, hence immutable. To make any changes,changing const to var, here and In the reader.onloadfunction would be advisible */ file =
    files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    file = e.target.result;
    file = file.replace("(X)", "");
    file = file.replace("(Y)", "");
    file = file.replace(/ /g, "");
    const lines = file.split(/\r\n|\n/);
    textarea.value = lines.join("\n");
  };
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(file);
});
function gerarCoordXLS() {
  var escolha = select.options[select.selectedIndex].value;
  switch (escolha) {
    case "1":
      for (const match of file.matchAll(regex1)) {
        const NsemPonto = match[3].replace(/\./g, "");
        const EsemPonto = match[2].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      for (const match of file.matchAll(subregex1)) {
        const NsemPonto = match[3].replace(/\./g, "");
        const EsemPonto = match[2].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
    case "2":
      for (const match of file.matchAll(regex2)) {
        const NsemPonto = match[2].replace(/\./g, "");
        const EsemPonto = match[3].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
    case "3":
      for (const match of file.matchAll(regex3)) {
        const NsemPonto = match[3].replace(/\./g, "");
        const EsemPonto = match[2].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
    case "4":
      for (const match of file.matchAll(regexGeo)) {
        const NsemPonto = match[2].replace(/\./g, "");
        const EsemPonto = match[3].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      for (const match of file.matchAll(regex2)) {
        const NsemPonto = match[2].replace(/\./g, "");
        const EsemPonto = match[3].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
      case "5":
        for (const match of file.matchAll(regex4)) {
          textRegex = textRegex + `Ponto ${match[1]};${match[2]};${match[3]}\n`;
        }
        break;
  }
  const type = "xls";
  var data = new Blob([textRegex], { type });
  var url = window.URL.createObjectURL(data);
  const downloadLink = document.getElementById("download_linkXLS");
  downloadLink.href = url;
  downloadLink.click();
}
function gerarCoordTXT() {
  var escolha = select.options[select.selectedIndex].value;
  switch (escolha) {
    case "1":
      for (const match of file.matchAll(regex1)) {
        const NsemPonto = match[3].replace(/\./g, "");
        const EsemPonto = match[2].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      for (const match of file.matchAll(subregex1)) {
        const NsemPonto = match[3].replace(/\./g, "");
        const EsemPonto = match[2].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
    case "2":
      for (const match of file.matchAll(regex2)) {
        const NsemPonto = match[2].replace(/\./g, "");
        const EsemPonto = match[3].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
    case "3":
      for (const match of file.matchAll(regex3)) {
        const NsemPonto = match[3].replace(/\./g, "");
        const EsemPonto = match[2].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
    case "4":
      for (const match of file.matchAll(regexGeo)) {
        const NsemPonto = match[2].replace(/\./g, "");
        const EsemPonto = match[3].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      for (const match of file.matchAll(regex2)) {
        const NsemPonto = match[2].replace(/\./g, "");
        const EsemPonto = match[3].replace(/\./g, "");
        textRegex = textRegex + `${match[1]};${NsemPonto};${EsemPonto}\n`;
      }
      break;
      case "5":
        for (const match of file.matchAll(regex4)) {
          textRegex = textRegex + `Ponto ${match[1]};${match[2]};${match[3]}\n`;
        }
        break;
  }
  const type = "text/plain";
  var data = new Blob([textRegex], { type });
  var url = window.URL.createObjectURL(data);
  const downloadLink = document.getElementById("download_linkTXT");
  downloadLink.href = url;
  downloadLink.click();
}
