interface dataProps{
    places:string[] | undefined
}

export default function PlaceCard({places}:dataProps) {

    console.log(places)
    places = places ? places : ['not Found']
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto">
        <div className="relative bg-purple-400 text-white px-2 py-2">
          <div className="relative">
            <h3 className="font-bold">Recommendations Near Place</h3>
          </div>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {places.map((place, index) => (
              <li key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h4 className="text-gray-600 font-semibold">{place}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  