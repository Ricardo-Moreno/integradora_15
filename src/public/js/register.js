const form = document.getElementById('registerForm');
console.log(form)
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    console.log(data)
    data.forEach((value, key) => obj[key] = value);
    console.log(obj)
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => console.log(json));
})

