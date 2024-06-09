export default async () => ({
  swagger: (await import('./swagger')).default,
});
