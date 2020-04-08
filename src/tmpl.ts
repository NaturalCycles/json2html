export function wrapHtml(html: string): string {
  return `<html>
<head>
<style>
  /*! modern-normalize | MIT License | https://github.com/sindresorhus/modern-normalize */
  html{box-sizing:border-box}*,::after,::before{box-sizing:inherit}:root{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'}hr{height:0}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{padding:0}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}

  body {
    background-color: #f5f5f5;
    margin: 14px;
    color: #111;
  }

  body * {
    font-size: 16px;
  }

  table {
    width: 100%;
    border: 1px solid #ddd;
  }
  
  table.jsonType--level1 {
    border: none;
  }

  td {
    vertical-align1: top;
    padding1: 4px;
  }

  tr:nth-child(odd) {
    background-color: #f5f5f5;
  }

  tr:nth-child(even) {
    background-color: #fff;
  }

  .jsonType--number {
    afont-family: "Courier New";
    color: #5286BC;
  }

  .jsonType--string {
    font-style: italic;
  }

  .jsonType--null,
  .jsonType--undefined {
    afont-family: "Courier New";
    font-style: italic;
    color: #bc5783;
  }
  
  .jsonType--arraySpace {
    margin: 10px 0;
  }

  .jsonType--key {
    width: 1%;
    vertical-align: top;
    text-align: right;
    padding: 4px 12px 4px 12px;
    font-weight: bold;
    colora: #000;
  }

  tr[data-type=object]>.jsonType--key,
  tr[data-type=array][data-of=object]>.jsonType--key {
    padding-top: 6px;
  }

  .jsonType--value {
    padding: 4px 0 4px 10px;
    aborder-left: 1px solid #ccc;
  }

  .jsonType--value > table,
  .jsonType--value > div > table {
    margin: -4px -16px -4px -10px;
  }

</style>
</head>
<body>
${html}
</body>
</html>
`
}
