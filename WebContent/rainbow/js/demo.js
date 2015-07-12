// PSA: this code is very cobbled together and is probably only for brave coders :)...

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();
    // Read in the image file as a data URL.
    reader.onload = function(event) {
      var uploaded =  new Image();
      uploaded.src = event.target.result
      Prideify(uploaded)
      var dz = document.getElementById('drop-zone')

      dz.innerHTML = '';
      dz.classList.add('uploaded')
      dz.appendChild(uploaded);
    };
    reader.readAsDataURL(f);
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  this.classList.add('hover')
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('dragleave', function() {
  this.classList.remove('hover');
}, false);
dropZone.addEventListener('drop', handleFileSelect, false);

var urlInput = document.getElementById('image-url-fetcher');
urlInput.addEventListener('keyup', function() {
  var uploaded =  new Image();
  uploaded.src = this.value;
  uploaded.onload = function() {
    Prideify(uploaded, { crossOriginProxy: true })
    var dz = document.getElementById('drop-zone')

    dz.innerHTML = '';
    dz.classList.add('uploaded')
    dz.appendChild(uploaded);
  }
})