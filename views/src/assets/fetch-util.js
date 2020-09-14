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
    return response;
}

async function getData(url='', data={}) {
    const response = await(fetch(url, {
        method: 'GET',
        credentials: 'include',
        body: JSON.stringify(data)
    }));
    return response;
}

module.exports = {
    postData,
    getData
}