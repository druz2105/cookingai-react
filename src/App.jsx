import { useState } from 'react'
import axios from "axios";

function App() {
    const [input, setInput] = useState("");
    const [loader, setLoader] = useState(false);
    const [responses, setResponses] = useState([]);

    const callApi = async (query) => {
        try {
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/echo`;
            const res = await axios.post(apiUrl, {
                query: query,
            });
            return res.data;
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
            const commonResponse = `AI: Here is the response to '${input}'`;
            setResponses([...responses, { user: input, commonResponse: commonResponse, ai: "Sorry, I couldn't find a relevant response to your query. Please try rephrasing your question for better results." }]);
            setInput("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const response = await callApi(input);
        console.log(response, "response>>>>>>>>>>>>");
        if (input.trim()) {
            // Simulate AI response
            const commonResponse = `AI: Here is the response to '${input}'`;
            setResponses([...responses, { user: input, commonResponse: commonResponse, ai: response.result ? response.result : null }]);
            setInput("");
        }
        setLoader(false)
    };

    return (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 min-h-screen flex flex-col items-center p-4">
            <header className="bg-orange-500 text-white w-full py-6 text-center shadow-lg">
                <h1 className="text-4xl font-bold">Cooking & Restaurant AI</h1>
                <p className="text-lg italic">Your personal chef and dining assistant</p>
            </header>

            <main className="flex-grow w-full max-w-3xl mt-6">
                <div className="bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-orange-600 text-center">Ask me about recipes, cooking tips, or restaurant suggestions!</h2>

                    <div className="space-y-6 mb-8">
                        {responses.map((response, index) => (
                            <div key={index} className="bg-yellow-100 p-4 rounded-lg shadow-md">
                                <p className="text-gray-800 font-medium">You: {response.user}</p>
                                <p className="text-gray-800 font-medium">{response.commonResponse}</p>
                                <p className="text-orange-600">{response.ai}</p>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}
                        className="flex items-center gap-3 p-4 bg-gray-100 border-t rounded-b-lg shadow-md">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-grow p-3 border-none rounded-full bg-white shadow-inner text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                            placeholder="Type your question..."
                        />
                        <button
                            type="submit"
                            disabled={loader} // Disable the button while loader is active
                            className="bg-orange-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loader ? (
                                <span
                                    className="animate-spin w-6 h-6 border-4 border-t-4 border-white rounded-full"></span> // Spinner while loading
                            ) : (
                                "Send"
                            )}
                        </button>
                    </form>
                </div>
            </main>

            <footer className="w-full text-center py-6 mt-6 text-gray-600 text-sm">
                &copy; 2024 Cooking & Restaurant AI. Bon Appétit!
            </footer>
        </div>
    );
}

export default App
