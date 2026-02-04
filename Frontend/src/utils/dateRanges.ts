export const getLast7DaysRange = ()=>{
    const startDate = new Date()
    const endDate = new Date()

    startDate.setDate(endDate.getDate()-7)
    startDate.setHours(0,0,0,0)

    return{
        startDate:startDate.toISOString(),
        endDate:endDate.toISOString()
    }
}