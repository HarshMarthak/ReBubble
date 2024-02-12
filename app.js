document.addEventListener('DOMContentLoaded', function () {
    // Define the QR codes and their associated boxes
    const qrCodes = ['qr1', 'qr2', 'qr3', 'qr4', 'qr5', 'qr6', 'qr7', 'qr8', 'qr9', 'qr10'];
    const boxes = Array.from({ length: qrCodes.length }, () => 'green'); // Initialize all boxes as green

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
        const index = qrCodes.indexOf(content);
        if (index !== -1) {
            toggleBoxState(index);
        } else {
            alert('Invalid QR Code');
        }
    });

    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
    }).catch(function (e) {
        console.error(e);
    });

    function toggleBoxState(index) {
        // Toggle the state of the box at the given index
        boxes[index] = boxes[index] === 'green' ? 'red' : 'green';
        updateBoxColors();
    }

    function updateBoxColors() {
        // Update the colors of the boxes based on their current state
        for (let i = 0; i < qrCodes.length; i++) {
            const box = document.getElementById(`box${i + 1}`);
            box.style.backgroundColor = boxes[i];
        }
    }
});
