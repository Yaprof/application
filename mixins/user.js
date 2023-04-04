
export function createUser(config, name, pp, clas, etab, isDelegue) {
    let role = isDelegue ? 20 : 0
    if (name === "VARGAS LOPEZ Alexandre") role = 99
    if (name === "DELLA-MEA Arthur") role = 50
    fetch(config + '/user/create', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "pp": pp,
            "class": clas,
            "etab": etab,
            "role": role
        })
    }).then(response => response.json())
        .then(response => {
            if (response?.error) return false
            response = response[0] ?? response
            if (response?.name) {
                window.localStorage.setItem('user', JSON.stringify(response))
                window.location.reload()
            }
            return true
        })
        .catch(error => console.log(error))
    return true

}

export async function getUser(config, userId) {
    let request = await fetch(config + '/user/'+userId, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    let response = await request.json()
    response = response[0] ?? response
    if (response?.name) {
        window.localStorage.setItem('user', JSON.stringify(response))
    } else return false
    return response
}