export const chatifyKnowledge = [
  {
    intent: 'greeting',
    patterns: [/hello/i, /hi/i, /hey/i, /greetings/i],
    reply: "Hello 👋 I’m ChatIFY AI, your smart assistant at IFYWIGATECHZ Academy. How can I help you today?"
  },
  {
    intent: 'query_courses',
    patterns: [/course/i, /learn/i, /training/i, /what do you teach/i],
    reply: "We offer Web Development, UI/UX Design, Digital Skills, and more. Which one are you interested in?"
  },
  {
    intent: 'query_price',
    patterns: [/price/i, /cost/i, /fee/i, /how much/i],
    reply: "Our course fees depend on the program. Please tell me the course you're interested in."
  },
  {
    intent: 'define_html',
    patterns: [/what is html/i, /^html$/i],
    reply: "HTML stands for HyperText Markup Language. It’s used to structure content on the web."
  },
  {
    intent: 'define_css',
    patterns: [/what is css/i, /^css$/i],
    reply: "CSS is used to style websites — colors, layouts, fonts, and responsiveness."
  }
]
