import { notFound } from "next/navigation";

export const ListDoa = [{
    id: 1,
    title: {
        en: 'Daily Prayer',
        id: 'Doa Harian',
    },
    description: 'Doa Harian',
    link: {
        en: '/en/doa/daily-prayer',
        id: '/id/doa/doa-harian',
    },
    read: {
        en: '35 Readings',
        id: '35 Bacaan',
    },
    slug: {
        en: 'daily-prayer',
        id: 'doa-harian'
    }
},
{
    id: 2,
    title: {
        en: 'Choice Prayer',
        id: 'Doa Pilihan',
    },
    description: 'Doa Pilihan',
    link: {
        en: '/en/doa/choice-prayer',
        id: '/id/doa/doa-pilihan',
    },
    read: {
        en: '5 Readings',
        id: '5 Bacaan',
    },
    slug: {
        en: 'choice-prayer',
        id: 'doa-pilihan'
    }
},
{
    id: 3,
    title: {
        en: 'Quran Prayer',
        id: 'Doa Quran',
    },
    description: 'Doa-Quran',
    link: {
        en: '/en/doa/quran-prayer',
        id: '/id/doa/doa-quran',
    },
    read: {
        en: '33 Readings',
        id: '33 Bacaan',
    },
    slug: {
        en: 'quran-prayer',
        id: 'doa-quran'
    }
},
{
    id: 4,
    title: {
        en: 'Worship Prayer',
        id: 'Doa Ibadah',
    },
    description: 'Doa Ibadah',
    link: {
        en: '/en/doa/worship-prayer',
        id: '/id/doa/doa-ibadah',
    },
    read: {
        en: '6 Readings',
        id: '6 Bacaan',
    },
    slug: {
        en: 'worship-prayer',
        id: 'doa-ibadah'
    }
},
{
    id: 5,
    title: {
        en: 'Hajj Prayer',
        id: 'Doa Haji',
    },
    description: 'Doa Haji',
    link: {
        en: '/en/doa/hajj-prayer',
        id: '/id/doa/doa-haji',
    },
    read: {
        en: '16 Readings',
        id: '16 Bacaan',
    },
    slug: {
        en: 'hajj-prayer',
        id: 'doa-haji'
    }
},
{
    id: 6,
    title: {
        en: 'Other Prayer',
        id: 'Doa Lainnya',
    },
    description: 'Doa Lainnya',
    link: {
        en: '/en/doa/other-prayer',
        id: '/id/doa/doa-lainnya',
    },
    read: {
        en: '8 Readings',
        id: '8 Bacaan',
    },
    slug: {
        en: 'other-prayer',
        id: 'doa-lainnya'
    }
}];



export const ListDoaByTitle = async (title:string) => {
    try {
        const fetchSurah = await fetch(`https://api.dikiotang.com/doa/${title}`);
        if (!fetchSurah.ok) {
            return notFound()
        }
        const data = await fetchSurah.json();
        return data.data
    } catch (error) {
        console.error('Error fetching ListData:', error);
        throw error; 
    }
}