const FormatPrice = ({ price })=>{
    return Intl.NumberFormat('en-BD',{
        style:'currency',
        currency: 'BDT',
        minimumFractionDigits: 0
    }).format(price)
}

export default FormatPrice