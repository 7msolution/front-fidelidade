import axios from 'axios'

const apiUrl = 'https://api.datastone.com.br/v1/persons'

const apiExternal = axios.create({baseURL : apiUrl,
    headers : {
        Authorization: "Token c0eff22d-d6c5-48e7-8d4e-10810d8f7bc5"
}
})


export default apiExternal