import httpClient from '../core/http'

const showMainPage = async () => {
    // request main page article list1
    const response: string|null = await httpClient.get('https://google.com/')
    console.log(response)
    // if success
    //     remove body content
    //     show list
    // else
    //     show error message
}

export default showMainPage
