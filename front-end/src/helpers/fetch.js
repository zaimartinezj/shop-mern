export const fetchWithoutToken = (endpoint, payload, method='GET') => {

    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`

    if(method==='GET'){
    return fetch(url)
    }
    
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

}

export const fetchWithToken = (endpoint, payload, method='GET') => {

    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`

    if (method==='GET' || payload===""){
        return fetch(url, {
            method,
            headers: {
                'x-token': localStorage.getItem('token')
            }
        })
    }

    return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': localStorage.getItem('token')
        },
        body: JSON.stringify(payload)
    })

}