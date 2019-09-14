export interface Config {
  telldusPublicKey: string;
  telldusPrivateKey: string;
  telldusToken: string;
  telldusTokenSecret: string;
  url: string;
  format: string;
  hostedGraphiteKey?: string;
}
