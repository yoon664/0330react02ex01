import React, { useEffect, useState } from "react";
import MbtiProfile from "./MbtiProfile";

function MbtiResult({name, mbti}) {
  const [mbtiData, setMbtiData] = useState(null);

  useEffect(()=>{
    const fetchMbtiData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/seik1224/data-zelda/main/mbti.json');
        const data = await response.json();
        // console.log(data);

        const result = data.find((item)=>item.type === mbti)
        console.log(result);
        setMbtiData(result);
      } catch(err) {
        console.error('MBTI오류', err);
      }
    }
    fetchMbtiData();
  }, [mbti]);

   
  return (
    <div className="text-center">
      <div className="flex flex-col justify-center items-center relative z-10">
        {
          mbtiData &&
          <>
            <img
              className="w-[200px] bg-blend-darken"
              src={process.env.PUBLIC_URL + mbtiData.image}
              alt={mbtiData.type}
            />
            <h2
              className="text-2xl font-bold mb-4 px-6 py-2 -mt-10 rounded-full border-[6px] bg-white box-border"
              style={{ borderColor: mbtiData.color, color: mbtiData.color }}
            >
              {name}
            </h2>
          </>
        }
        
      </div>

      <MbtiProfile />
    </div>
  );
}

export default MbtiResult;