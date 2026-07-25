const questions = [
  "Tell me about yourself.",
  "What are your strengths?",
  "Why should we hire you?",
  "Describe a challenging project you worked on.",
  "Where do you see yourself in five years?"
];

const getQuestions = (req, res) => {
  res.json(questions);
};

const submitAnswer = (req, res) => {
  const { answer } = req.body;

  console.log("Candidate Answer:", answer);

  res.json({
    message: "Answer received successfully.",
    score: Math.floor(Math.random() * 41) + 60
  });
};

module.exports = {
  getQuestions,
  submitAnswer
};