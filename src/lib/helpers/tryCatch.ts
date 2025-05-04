export default async function tryCatch<T>(fn: () => Promise<T>): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    console.error("An error occurred:", error);
    return undefined; 
  }
}