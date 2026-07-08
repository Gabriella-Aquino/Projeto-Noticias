export function toAuthUrl(restUrl: string): string {
  return restUrl.replace('/rest/v1/', '/auth/v1/');
}
