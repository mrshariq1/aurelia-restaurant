import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { MENU_ITEMS, RESTAURANT_INFO } from './src/data/restaurantData.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent requirement
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback recommendation engine
function getLocalFallbackRecommendation(query: string, budget?: number, diet?: string, spice?: number) {
  const q = query.toLowerCase();
  let matches = [...MENU_ITEMS];

  if (diet === 'vegetarian') {
    matches = matches.filter(i => i.dietary.includes('vegetarian'));
  } else if (diet === 'vegan') {
    matches = matches.filter(i => i.dietary.includes('vegan'));
  } else if (diet === 'gluten-free') {
    matches = matches.filter(i => i.dietary.includes('gluten-free'));
  }

  if (spice !== undefined && spice >= 0) {
    matches = matches.filter(i => i.spicyLevel <= spice);
  }

  if (budget && budget > 0) {
    matches = matches.filter(i => i.price <= budget);
  }

  // Check keywords
  if (q.includes('wagyu') || q.includes('meat') || q.includes('beef') || q.includes('steak')) {
    matches = matches.filter(i => i.name.toLowerCase().includes('wagyu') || i.category === 'mains');
  } else if (q.includes('seafood') || q.includes('fish') || q.includes('scallop') || q.includes('crab')) {
    matches = matches.filter(i => i.name.toLowerCase().includes('scallop') || i.name.toLowerCase().includes('bass') || i.name.toLowerCase().includes('crab') || i.name.toLowerCase().includes('hamachi'));
  } else if (q.includes('pasta') || q.includes('tagliolini') || q.includes('noodle')) {
    matches = matches.filter(i => i.category === 'pasta');
  } else if (q.includes('pizza') || q.includes('truffle pizza')) {
    matches = matches.filter(i => i.category === 'pizza');
  } else if (q.includes('sweet') || q.includes('dessert') || q.includes('chocolate')) {
    matches = matches.filter(i => i.category === 'desserts');
  } else if (q.includes('cocktail') || q.includes('wine') || q.includes('drink')) {
    matches = matches.filter(i => i.category === 'drinks');
  }

  const selected = matches.slice(0, 3);
  let responseText = '';

  if (selected.length > 0) {
    const names = selected.map(s => `${s.name} ($${s.price})`).join(', ');
    responseText = `Welcome to Aurelia. Based on your preferences, our culinary team recommends: ${names}. Each course is prepared to order by our kitchen brigade with artisanal precision. May I arrange a table or reserve these tasting courses for your visit?`;
  } else {
    const signatures = MENU_ITEMS.filter(i => i.badge === 'Signature').slice(0, 2);
    responseText = `Allow me to recommend our acclaimed signatures: the ${signatures[0].name} ($${signatures[0].price}) paired with ${signatures[0].pairing || 'fine wine'}, followed by the ${signatures[1].name}. Let me know if you have specific dietary wishes or budget considerations.`;
  }

  return {
    response: responseText,
    suggestedDishes: selected.map(s => s.id)
  };
}

// AI Food Assistant API Endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { prompt, history, budget, diet, spice } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Valid prompt string is required' });
    }

    if (ai) {
      try {
        const menuContext = MENU_ITEMS.map(i => 
          `- ID: ${i.id} | Name: ${i.name} | Category: ${i.category} | Price: $${i.price} | Dietary: ${i.dietary.join(', ') || 'Standard'} | Spicy Level: ${i.spicyLevel}/3 | Description: ${i.description} | Wine Pairing: ${i.pairing || 'Sommelier Selection'}`
        ).join('\n');

        const systemInstruction = `You are the Head Maître d' and Sommelier at AURELIA, an acclaimed modern gastronomy and wine restaurant in the Downtown Reserve District.
Your tone is sophisticated, welcoming, warm, knowledgeable, concise, and refined.
Use the following menu database to answer guest questions, suggest pairings, recommend dishes based on taste, dietary restrictions, budget, or mood:
${menuContext}

Guest parameters:
- Budget ceiling: ${budget ? `$${budget}` : 'None specified'}
- Dietary requirements: ${diet || 'None'}
- Max Spice tolerance: ${spice !== undefined ? `${spice}/3` : 'Any'}

Format your response in a clear, brief, elegant paragraph. Mention specific dish names from the menu.
At the end of your response, on a new line, write:
RECOMMENDED_IDS: [comma-separated dish IDs, e.g. starter-1, main-1]
If no specific dish is directly recommended, write RECOMMENDED_IDS: none`;

        const fullPrompt = `${prompt}`;

        const geminiResponse = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        const rawText = geminiResponse.text || '';
        let cleanText = rawText;
        let suggestedIds: string[] = [];

        const idMatch = rawText.match(/RECOMMENDED_IDS:\s*([^\n\r]+)/i);
        if (idMatch && idMatch[1]) {
          cleanText = rawText.replace(/RECOMMENDED_IDS:[^\n\r]+/i, '').trim();
          const rawIds = idMatch[1].trim();
          if (rawIds.toLowerCase() !== 'none') {
            suggestedIds = rawIds.split(',').map(s => s.trim().replace(/[\[\]]/g, '')).filter(Boolean);
          }
        }

        return res.json({
          response: cleanText,
          suggestedDishes: suggestedIds
        });
      } catch (geminiError: any) {
        console.error('Gemini error, using fallback:', geminiError.message);
        const fallback = getLocalFallbackRecommendation(prompt, budget, diet, spice);
        return res.json(fallback);
      }
    } else {
      const fallback = getLocalFallbackRecommendation(prompt, budget, diet, spice);
      return res.json(fallback);
    }
  } catch (err: any) {
    console.error('Server assistant error:', err);
    res.status(500).json({ error: 'Internal culinary assistant error' });
  }
});

// Table Reservation API Endpoint
app.post('/api/reserve', (req, res) => {
  try {
    const { name, email, phone, date, time, guests, area, specialRequest } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: 'Please provide all required reservation fields.' });
    }

    const codeSuffix = Math.floor(10000 + Math.random() * 90000);
    const confirmationCode = `AUR-${codeSuffix}`;

    const reservation = {
      confirmationCode,
      name,
      email,
      phone,
      date,
      time,
      guests: Number(guests),
      area: area || 'Main Dining Room',
      specialRequest: specialRequest || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    res.json({
      success: true,
      message: 'Your table reservation has been honored and confirmed.',
      reservation,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Unable to process table reservation.' });
  }
});

// Newsletter Subscription API
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }
  res.json({
    success: true,
    message: 'Welcome to the Aurelia Private Cellar & Gastronomy Circle.'
  });
});

// Setup Vite or static serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, () => {
  console.log(`AURELIA Gastronomy server active on port ${PORT}`);
});
