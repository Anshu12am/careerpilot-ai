const groq = require('./groq.service.js');

module.exports.buildCoverLetter = async ({
  jobRole,
  companyName,
  tone,
  resume
}) => {

  const prompt = `
You are an expert HR recruiter and professional cover letter writer.

Write a cover letter for the following details.

Job Role:
${jobRole}

Company:
${companyName}

Preferred Tone:
${tone}

Candidate Resume:
${JSON.stringify(resume, null, 2) || 'No resume provided.'}

Instructions:
- Write the entire cover letter in a ${tone.toLowerCase()} tone.
- Address the hiring manager professionally.
- Explain why the candidate is interested in the role.
- Highlight relevant skills, education, projects and experience from the resume.
- Show enthusiasm for joining ${companyName}.
- End with a strong closing paragraph.
- Length should be around 300-500 words.
- Do NOT use markdown.
- Do NOT use bullet points.
- Do NOT add headings like "Introduction" or "Body".
- Return only the cover letter text.
`;

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.5,
    max_tokens: 700
  });

  return completion.choices[0].message.content;
};