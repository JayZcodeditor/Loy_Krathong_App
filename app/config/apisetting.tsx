const isProduction = process.env.NODE_ENV === 'production';

export const apiUrl = isProduction
    ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
    : process.env.NEXT_PUBLIC_API_URL;
