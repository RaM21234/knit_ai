import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';

const Home = () => {
    const [problem, setProblem] = useState('');
    const [response, setresponse] = useState('');
    const [loading, setloading] = useState(false);


    const [loading1, setloading1] = useState(false);
    const [number_of_days, setNumberOfDays] = useState('7');
    const [destination, setDestination] = useState('Thailand');
    const [itinerary, setItinerary] = useState('');

    const serverurl = 'https://knit-ai-backend2.onrender.com'
    const handleSubmit = async (event) => {
        setloading(true)
        event.preventDefault();
        const payload = {
            messages: [
                { role: "system", content: "You are a helpful Assistant." },
                { role: "user", content: `solve this ${problem}` }
            ],
            model: { name: "openai/gpt-4" },
            variables: [{ name: "problem", value: problem }]
        };

        try {
            const response = await axios.post(`${serverurl}/solve-problem`, payload);
            console.log(response?.data?.responseText);
            setresponse(response?.data?.responseText)

        } catch (error) {
            console.error('Error sending POST request', error);
        } finally {
            setloading(false)
        }
    };



    const planTrip = async () => {
        try {
            setloading1(true)
            const payload = {
                messages: [
                    {
                        role: "system",
                        content: "Imagine you are the best travel planner in the world, who has traveled all the countries and knows everything about popular places to go, hidden gems, the best time to go, cultural places, outdoor activities, romantic destinations and activities, historic locations, and museums, wildlife attractions, cuisines to try and things and places to shop."
                    },
                    {
                        role: "user",
                        content: `I am planning to have a ${number_of_days}-day trip to ${destination}. We like to visit popular locations as well as offbeat hidden gems...`
                    }
                ],
                model: { name: "openai/gpt-4-1106-preview" },
                variables: [
                    { name: "number_of_days", value: number_of_days },
                    { name: "destination", value: destination }
                ]
            }
            const response = await axios.post(`${serverurl}/travel-planner`, payload,);
            console.log(response?.data?.responseText)
            setItinerary(response?.data?.responseText);
        } catch (error) {
            console.error('Error fetching itinerary', error);
        } finally {
            setloading1(false)
        }
    };

    return (
        <div >
            <div
                style={{
                    background:
                        'rgb(2, 0, 36)',
                    background:
                        'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)',
                }}

                className=" py-6 flex flex-col justify-center sm:py-12">
                <p class="text-white text-center mb-16 font-serif text-5xl font-extrabold">Knit Ai </p>
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Prompt Submission Form</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <form onSubmit={handleSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                                    <div className="relative">

                                        <p>Write a query you want to know?</p>

                                        <p>Like:
                                            <br /> Who is Virat Kohli?
                                            <br /> Who is Cristiano Ronaldo?
                                            <br /> How to print from 1 to 10 in c++ using a while loop?
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="problem"
                                            value={problem}
                                            onChange={e => setProblem(e.target.value)}
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-300"
                                            placeholder="Problem"
                                        />
                                        <label htmlFor="problem" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Problem</label>
                                    </div>
                                    <div className="relative">
                                        <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                    <div>Response </div>
                                    {loading ? <p className="text-sm text-blue-500">Loading...</p> : response && (
                                        <div className="text-sm text-blue-500">
                                            {response}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    background:
                        'rgb(2, 0, 36)',
                    background:
                        'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)',
                }}
                className="  py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Trip Planning Form</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">

                                        <p>Write a query for planning a trip mentioning the destination and the no of days ?</p>

                                        <p>Like:
                                            <br /> 7 days trip to Thailand
                                            <br /> 5 days trip to Paris
                                        </p>
                                    </div>
                                    <div className="relative">

                                        <input
                                            type="text"
                                            value={number_of_days}
                                            onChange={e => setNumberOfDays(e.target.value)}
                                            placeholder="Number of Days"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-300"
                                        />
                                        <label htmlFor="number_of_days" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Number of Days</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={destination}
                                            onChange={e => setDestination(e.target.value)}
                                            placeholder="Destination"
                                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-300"
                                        />
                                        <label htmlFor="destination" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Destination</label>
                                    </div>
                                    <div className="relative">
                                        <button onClick={planTrip} className="bg-blue-500 text-white rounded-md px-2 py-1">Plan Trip</button>
                                    </div>
                                    {loading1 ? <p className="text-sm text-blue-500">Loading...</p> : itinerary && <div className="text-sm text-blue-500">{itinerary}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default Home





