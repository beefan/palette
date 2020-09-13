async function postData(url='', data={}) {
    const response = await(fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }));
    return response.json();
}

async function getData(url='', data={}) {
    const response = await(fetch(url, {
        method: 'GET',
        body: JSON.stringify(data)
    }));
    return response.json();
}

module.exports = {
    postData,
    getData
}