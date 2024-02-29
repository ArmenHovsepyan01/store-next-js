import cheerio from 'cheerio';

export function extractErrorMessage(error: any) {
  const errorData = error.response.data;
  if (!errorData) return error.message;

  const $ = cheerio.load(errorData);

  const errorMessage = $('pre').text();

  return errorMessage.split('at')[0];
}
