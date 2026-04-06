const mongoose = require("mongoose");
const Career = require("./models/Career");

const mongoURI = "mongodb://skilluser:Skill1234@ac-eylxgyu-shard-00-00.acggyub.mongodb.net:27017,ac-eylxgyu-shard-00-01.acggyub.mongodb.net:27017,ac-eylxgyu-shard-00-02.acggyub.mongodb.net:27017/?ssl=true&replicaSet=atlas-gojk6n-shard-0&authSource=admin&retryWrites=true&w=majority";

const seedData = [
  {
    title: "AI Engineer",
    skills: ["Mathematics for AI", "Python for Machine Learning", "Neural Networks & Deep Learning", "Computer Vision", "Natural Language Processing", "Deployment & MLOps"],
    resources: [
      {
        subject: "Neural Networks",
        youtube: ["https://youtu.be/aircAruvnKk", "https://youtu.be/IHZwWFHWa-w"],
        pdfs: ["https://www.deeplearningbook.org/"]
      },
      {
         subject: "Deployment",
         youtube: ["https://youtu.be/G2R2T694NRA"],
         pdfs: ["https://christophergs.com/machine%20learning/2020/03/14/how-to-deploy-machine-learning-models/"]
      }
    ]
  },
  {
    title: "Data Scientist",
    skills: ["Statistical Inference", "SQL & NoSQL Databases", "Data Visualization (Tableau/D3)", "Predictive Modeling", "Big Data (Spark/Hadoop)", "Ethical AI & Data Privacy"],
    resources: [
      {
        subject: "Visualization",
        youtube: ["https://youtu.be/2LhoCfjm8R4"],
        pdfs: ["https://shubalndavies.files.wordpress.com/2016/11/storytelling-with-data-a-data-visualization-guide-for-business-professionals.pdf"]
      }
    ]
  },
  {
    title: "UX Designer",
    skills: ["User Research Theory", "Information Architecture", "Wireframing (Figma/Adobe XD)", "Interaction Design", "Prototyping & Usability Testing", "Design Systems & Tokens"],
    resources: [
      {
        subject: "Figma Mastery",
        youtube: ["https://youtu.be/jwCm9Jal088"],
        pdfs: ["https://www.interaction-design.org/literature/topics/ux-design"]
      }
    ]
  },
  {
    title: "Full Stack Developer",
    skills: ["Advanced React & State", "Node.js System Design", "PostgreSQL & Persistence", "Cloud Deployment (AWS/Vercel)", "System Architecture & Scalability", "Security & Encryption"],
    resources: [
       {
          subject: "System Design",
          youtube: ["https://youtu.be/i53Gi_K397I"],
          pdfs: ["https://github.com/donnemartin/system-design-primer"]
       }
    ]
  }
];

mongoose.connect(mongoURI)
  .then(async () => {
    console.log("Connected to MongoDB for seeding...");
    await Career.deleteMany({});
    await Career.insertMany(seedData);
    console.log("Database seeded successfully with premium roadmaps.");
    process.exit();
  })
  .catch(err => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
