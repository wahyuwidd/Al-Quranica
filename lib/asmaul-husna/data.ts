
export const getAllAsmaulHusna = async () => {
    try{
        const fetchData = await fetch('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna')
        const data = await fetchData.json()
        return data.data
    }catch(err){
        console.log(err);
    }
}