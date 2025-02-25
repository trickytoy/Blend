import express from "express";
import { getCareerProspects } from "./prospects.js"; // Import function
import initialNodes from "../data/temp_nodes.json" assert { type: "json" };
import initialEdges from "../data/temp_edges.json" assert { type: "json" };

const router = express.Router();

router.get('/api/graph', (req, res) => {
    res.status(200).json({
        initialNodes: initialNodes,
        initialEdges: initialEdges
    });
});

router.post('/api/prospect', async (req, res) => {
    try {
        const { formattedCourses } = req.body;
        console.log("data", formattedCourses)
        if (!formattedCourses || !Array.isArray(formattedCourses)) {
            return res.status(400).json({ error: "Invalid input. 'courses' must be an array." });
        }

        const careerProspects = await getCareerProspects(formattedCourses);
        console.log(careerProspects)
        res.status(200).json(careerProspects);
    } catch (error) {
        console.error("Error in /api/prospect:", error);
        res.status(500).json({ error: "Failed to generate career prospects" });
    }
});

export default router;
