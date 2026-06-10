fetch('http://localhost:3001/api/calculator/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
})
  .then(async res => {
    console.log('Error Status:', res.status);
    const text = await res.text();
    console.log('Response Body:', text);
  })
  .catch(err => {
    console.error('Fetch Error:', err);
  });
