const dateHelper = () => {
    let currentDate = new Date()
    let date = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let year = currentDate.getFullYear()
    let hour = currentDate.getHours()
    let minute = currentDate.getMinutes()
    let second = currentDate.getSeconds()
    let dateString = `${date}-${month}-${year} ${hour}:${minute}:${second}`
    return dateString
}

export default dateHelper