import { motion } from "framer-motion"
import { Briefcase, TrendingUp, BarChart } from "lucide-react"

const Prospect = ({ data }) => {
    console.log("Here")
    if (!data) return null
    
    const { Overview, Metrics, "Career_Prospect": careerProspects } = data
    console.log(Overview, Metrics, careerProspects, data)
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 max-w-3xl mx-auto mt-8"
        >
        {/* Overview Section */}
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-500" />
            Overview
            </h2>
            <p className="text-gray-600 mt-2">{Overview}</p>
        </div>

        {/* Metrics Section */}
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <BarChart size={20} className="text-green-500" />
            Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
            {Object.entries(Metrics).map(([category, score]) => (
                <div key={category} className="text-gray-700 border border-gray-300 p-2 rounded-lg">
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">{category}</span>
                    <span className="text-xs font-semibold">{score}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / 10) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-green-500 rounded-full"
                    ></motion.div>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Career Prospects Section */}
        <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase size={20} className="text-yellow-500" />
            Career Prospects
            </h3>
            {careerProspects.length > 0 ? (
            <ul className="mt-3 space-y-3">
                {careerProspects.map((career, index) => (
                <li
                    key={index}
                    className="bg-blue-50 border border-blue-200 p-3 rounded-lg"
                >
                    <h4 className="text-lg font-medium text-gray-800">
                    {career.Title}
                    </h4>
                    <p className="text-gray-600 text-sm">{career.Desc}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-500 mt-2">No career prospects available.</p>
            )}
        </div>
        </motion.div>
    )
}

export default Prospect