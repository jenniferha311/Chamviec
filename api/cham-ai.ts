import { processChamAiChat } from '../src/server/chamAiService.ts';

// Vercel Serverless Function handler
export default async function handler(req: any, res: any) {
  // Setup CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'METHOD_NOT_ALLOWED',
      errorMessage: 'Chỉ chấp nhận phương thức POST',
      canRetry: false
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { message, profile, currentContext, chatHistory } = body;

    const result = await processChamAiChat({
      message,
      profile,
      currentContext,
      chatHistory
    });

    if (!result.success) {
      return res.status(result.error === 'EMPTY_MESSAGE' ? 400 : 500).json(result);
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Unhandled Vercel serverless error in /api/cham-ai:', error);
    return res.status(500).json({
      success: false,
      error: 'SERVER_EXCEPTION',
      errorMessage: 'Đã có sự cố bất ngờ trong quá trình xử lý yêu cầu.',
      errorDetail: error?.message || String(error),
      canRetry: true
    });
  }
}
