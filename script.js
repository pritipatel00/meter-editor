
let canvas = new fabric.Canvas('canvas');
let imgInstance;

document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        fabric.Image.fromURL(event.target.result, function(img) {
            canvas.clear();
            img.scaleToWidth(500);
            imgInstance = img;
            canvas.setWidth(img.width);
            canvas.setHeight(img.height);
            canvas.add(imgInstance);
            canvas.sendToBack(imgInstance);
        });
    }
    reader.readAsDataURL(e.target.files[0]);
}

function performOCR() {
    if (!imgInstance) return alert("Please upload an image first.");
    const dataURL = canvas.toDataURL("image/jpeg");
    Tesseract.recognize(dataURL, 'eng').then(({ data: { text } }) => {
        alert("Detected Text:\n" + text);
    });
}

function addText() {
    const text = prompt("Enter text to add:");
    if (text) {
        const textbox = new fabric.Textbox(text, {
            left: 50,
            top: 50,
            fill: 'black',
            fontSize: 20,
            backgroundColor: 'rgba(255,255,255,0.6)',
            editable: true
        });
        canvas.add(textbox);
    }
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'edited_meter.png';
    link.href = canvas.toDataURL({
        format: 'png',
        quality: 1.0
    });
    link.click();
}
