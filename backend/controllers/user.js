import express from 'express';
import OpenAI from 'openai';


const sendMessage = async (req, res) => { 
    const textMessage = req.body.text;
   
  const openai = new OpenAI({
    apiKey: process.env.API_KEY
  });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ "role": "user", "content": textMessage }],
      max_tokens: 100
    });

    res.send(response.choices[0].message.content);
  } catch (error) {
     
    res.send(error.error.message)
  }
}
export default sendMessage;