let input = document.querySelector("input");
let textarea = document.querySelector("textarea");
let select = document.getElementById("memoType");
const regex =
  /\b([A-Z]\d+|[A-Z]+-[A-Z]-\d{1,6}[A-Z]?|[A-Z]-?\d{1,4}[A-Z]?|ponto \d+|[A-Z]\d+|[A-Z] \d+|vértice \d+)\b(, de .*?| de.*?|, georreferenciado.*?| com.*?)\b\b(\d+\.\d+\.\d+,\d+|\d+\.\d+,\d+|\d+\.\d+|\d+,\d+).*?\b(\d+\.\d+\.\d+,\d+|\d+\.\d+,\d+|\d+\.\d+|\d+,\d+)/g;
const regex2 = /\b(PV-V-\d{4}|[A-Z] ?-?\d+|ponto \d+)\b.*?\b(\d+\.\d+\.\d+,\d+|\d+\.\d+,\d+|\d+\.\d+|\d+,\d+).*?\b(\d+\.\d+\.\d+,\d+|\d+\.\d+,\d+|\d+\.\d+|\d+,\d+)/g;  
const regex3 = /((inicia no vértice (PV-V-\d{4}|[A-Z]-?\d+))|(até o vértice (PV-V-\d{4}|[A-Z]-?\d+))).*?\b(\d+\.\d+\.\d+,\d+|\d+\.\d+,\d+|\d+\.\d+|\d+,\d+).*?\b(\d+\.\d+\.\d+,\d+|\d+\.\d+,\d+|\d+\.\d+|\d+,\d+)/g;

var file;
var file1;
let textRegex;
input.addEventListener("change", () => {
  let files = input.files;
  if (files.length == 0) return;
  /* If any further modifications have to be made on theExtracted text. The text can be accessed using thefile variable. But since this is const, it is a readonly variable, hence immutable. To make any changes,changing const to var, here and In the reader.onloadfunction would be advisible */
  file = files[0];
  file1 = files[0];
  let reader = new FileReader();
  reader.onload = (e) => {
    file = e.target.result;
    file1 = e.target.result;
    file = file.replace(/\  /g, " ");
    file = file.replace(/\./g, "")
    //file1 = file1.replace(/\,/g, "");
    file1 = file1.replace(/\  /g, " ");
    file1 = file1.replace(/\./g, ",")
    const lines = file.split(/\r\n|\n/);
    textarea.value = lines.join("\n");
  };
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(file);
});


function gerarCoordTXT() {
  textRegex = "";
  var escolha = select.options[select.selectedIndex].value;
  switch (escolha) {
    case "1":
      for (const match of file.matchAll(regex)) {
        textRegex = textRegex + `${match[1]};${match[3]};${match[4]}\n`;
      }
      break;

    case "2":
        for (const match of file1.matchAll(regex2)) {
          textRegex = textRegex + `${match[1]};${match[2]};${match[3]}\n`;
        }
        break;

    case "3":
       for (const match of file.matchAll(regex3)) {
        if(match[3]!=null)
        textRegex = textRegex + `${match[3]};${match[6]};${match[7]}\n`;
        else
        textRegex = textRegex + `${match[5]};${match[6]};${match[7]}\n`;

       }
       break;
  }
  const type = "text/plain";
  var data = new Blob([textRegex], { type });
  var url = window.URL.createObjectURL(data);
  const downloadLink = document.getElementById("download_linkTXT");
  downloadLink.href = url;
  downloadLink.click();
};


function gerarCoordXLS() {
  textRegex = "";
  var escolha = select.options[select.selectedIndex].value;
  switch (escolha) {
    case "1":
      for (const match of file.matchAll(regex)) {
        textRegex = textRegex + `${match[1]};${match[3]};${match[4]}\n`;
      }
      break;

    case "2":
        for (const match of file1.matchAll(regex2)) {
          textRegex = textRegex + `${match[1]};${match[2]};${match[3]}\n`;
        }
        break;

    case "3":
       for (const match of file.matchAll(regex3)) {
        textRegex = textRegex + `${match[1]};${match[2]};${match[3]}\n`;
       }
       for (const match of file.matchAll(subregex3)) {
        textRegex = textRegex + `${match[1]};${match[2]};${match[3]}\n`;
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
