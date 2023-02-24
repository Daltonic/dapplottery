import React from "react";

const Result = () => {
  return (
    <div className="mx-auto py-16 bg-slate-100">
      <div className="flex flex-col justify-center items-center pb-10">
        <h1 className="text-2xl font-bold pb-4">Lettest lottery & Result</h1>
        <p className="text-sm text-slate-700 text-center">
          We bring a persolan and effective to every project we work on. <br />
          Which is why our client love why they keep coming back.
        </p>
      </div>
      <div className="flex flex-col-reverse sm:flex-row ">
        <div className="bg-white overflow-x-auto flex flex-col w-2/4 mx-auto p-5 rounded-md">
          <div className="pb-4 flex justify-start">
            <p className=" font-semibold text-2xl text-slate-700">
              Lottery Winning Numbers
            </p>
          </div>
          <table className="table-auto">
            <thead>
              <tr className="text-left">
                <th>lottery</th>
                <th>Draw Date</th>
                <th>Winning Numbers</th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill()
                .map((item, i) => (
                  <tr  key={i}>
                    <td className="font-semibold py-3">Cancer Charity</td>
                    <td className="font-semibold">15/01/2023</td>
                    <td>
                      <button
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-semibold text-xs leading-tight
                 uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
                   transition duration-150 ease-in-out "
                      >
                        20
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white flex flex-col w-70 mx-auto p-5 rounded-md sm:my-3">
          <div className="text-2xl font-bold text-slate-700">Our Winners</div>

          <div className="flex items-center space-x-3 pt-7">
            <div className="bg-amber-500 rounded-full h-12 w-12 flex items-center justify-center"></div>
            <div>
              <p className="font-semibold text-2xl text-slate-500">
                Jemmy White
              </p>
              <p className="font-semibold">Cancer Charity 15/01/2023</p>
            </div>
          </div>
          <div className="pb-10">
            <p className="text-green-300 py-3 font-bold">$181,557,581</p>
            <p className="text-sm text-slate-700">
              We bring a persolan and effective to every <br /> project we work
              on. Which is why our <br /> client love why they keep coming back.
            </p>
          </div>
          <div>
            <button className="bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md px-4 py-2">
              ALL WINNERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
