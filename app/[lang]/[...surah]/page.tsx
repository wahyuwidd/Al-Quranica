import { SurahItem } from "@/types/surah-type";
import { SurahDetail } from "@/components/Surah/detail";
import { SurahRoom } from "@/components/Surah/room";
import { getSurahById } from "@/lib/surah/data";
import { Metadata } from "next";
import meta from "@/metadata.json";

type Props = {
  params: { surah: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const surah = params.surah[0]
  let Data = surah.charAt(0).toUpperCase() + surah.slice(1)
  return {
    title: `Surah ${Data}: Arab, Latin, dan Terjemah | ${meta.name}`,
    description: `${meta.description}`,
  };
};


const Page = async ({ params }: { params: { lang: string; surah: string[] } }) => {
  const surahId = params.surah[1]
  const data = await getSurahById(surahId) as SurahItem
    return (
      <div>
        <SurahDetail surahId={data.number} CurrentLang={params.lang}/>
        <SurahRoom data={data} CurrentLang={params.lang} />
      </div>
    )
  }

  

  export default Page