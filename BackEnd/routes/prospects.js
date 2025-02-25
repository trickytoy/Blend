import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { configDotenv } from "dotenv";

configDotenv();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const schema = {
  description: "Student overview including metrics, career prospects, and mentor suggestions",
  type: SchemaType.OBJECT,
  properties: {
    Overview: {
      type: SchemaType.STRING,
      description: "Summary of student based on metrics, career prospects, and mentor suggestions",
      nullable: false,
    },
    Metrics: {
      type: SchemaType.OBJECT,
      properties: {
        "AI/ML": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Web Development": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Security Engineering": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Network Engineering": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Database Engineering": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Algorithmic & Problem-Solving Skills": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Software Architecture & Design": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
        "Code Quality & Maintainability": { type: SchemaType.INTEGER, description: "Rating out of 10", minimum: 0, maximum: 10 },
      },
      required: [
        "AI/ML",
        "Web Development",
        "Security Engineering",
        "Network Engineering",
        "Database Engineering",
        "Algorithmic & Problem-Solving Skills",
        "Software Architecture & Design",
        "Code Quality & Maintainability"
      ],
    },
    "Career_Prospect": {
      type: SchemaType.ARRAY,
      description: "Potential career paths based on student metrics",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          Title: { type: SchemaType.STRING, description: "Career title", nullable: false },
          Desc: { type: SchemaType.STRING, description: "Reasoning behind the suggestion", nullable: false },
        },
        required: ["Title", "Desc"],
      },
    },
  },
  required: ["Overview", "Metrics", "Career_Prospect"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

let courses = ["COMP1511.Programming Fundamentals", "COMP1531.Software Engineering Fundamentals", "COMP1521.Computer Systems Fundamentals", "COMP2041.Software Construction: Techniques and Tools", "COMP2111.System Modelling and Design", "COMP2511.Object-Oriented Design & Programming", "COMP3311.Database Systems", "COMP6080 Frontend Development"]

export async function getCareerProspects(courses) {
    try {
      const result = await model.generateContent(
        `As a mentor, suggest career prospects based on the courses completed by this student: ${courses.join(', ')} for your response refer to the student in second person.`
      );
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error("Error generating career prospects:", error);
      throw new Error("Failed to generate career prospects");
    }
  }
