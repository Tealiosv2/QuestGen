document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const data = document.getElementById('dataInput').value;

    fetch('http://localhost:3000/api/send-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
});