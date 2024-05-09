import { notFound } from "next/navigation";

export const getAllSurah = async () => {
    try {
        const fetchSurah = await fetch('https://api.quran.gading.dev/surah');
        if (!fetchSurah.ok) {
            return notFound();
        }
        const data = await fetchSurah.json();
        return data.data;
    } catch (error) {
        throw error;
    }
}

export const getSurahById = async (id: string) => {
    if (id) {
        try {
            const fetchSurah = await fetch(`https://api.quran.gading.dev/surah/${id}`);
            if (!fetchSurah.ok) {
                return notFound();
            }
            const data = await fetchSurah.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching Surah:', error);
            throw error; 
        }
    } else {
        return notFound();
    }
}
