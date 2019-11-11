window.lookup = {};

// read file as utf-8 and generate the width lookup object
function handleFile (file) {
  var reader = new FileReader();

  reader.readAsText(file, "UTF-8");
  reader.onload = function(e) {
    window.lookup = make_lookup_object(reader.result);
  };
}

// expects the format char=number per line (ex: A=9)
function make_lookup_object (text_from_file) {
  var text_array = text_from_file.split('\n');
  var lookup = {};

  for (let i = 0; i < text_array.length; i++) {
    if (text_array[i].charAt(0) === '=') {
      lookup[text_array[i].charAt(0)] = Number(text_array[i].split('=')[2]);
    } else {
      lookup[text_array[i].charAt(0)] = Number(text_array[i].split('=')[1]);
    }
  }
  return lookup;
}

// calculates width of textarea and updates result
function calc_width () {
  var lines = test.value.split('\n');
  var widths = [];

  for (let i = 0; i < lines.length; i++) {
    widths.push( calc_line( lines[i] ) );
  }
  result.innerHTML = "<pre>" + widths.join('\n') + "</pre>";
}

// calculate width of a line of text
function calc_line (line) {
  var width = 0;

  for (let i = 0; i < line.length; i++) {
    width = width + window.lookup[line[i]];
  }
  return width;
}

$(document).ready(function() {
  var test = $("#test");
  var result = $("#result");
});
