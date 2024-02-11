import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.url) {
    const url = new URL(req.url);
    const filePath = url.searchParams.get('file');
    const imagePath = filePath ? filePath : '';

    const file = await fs.promises.readFile(imagePath, 'base64');
    return NextResponse.json(`data:image/webp;base64,${file}`);
  }

  const abs = path.resolve();
  return NextResponse.json(abs);
}
