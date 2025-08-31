import { Supadata } from "@supadata/js";

export const supadata = new Supadata({
  apiKey: process.env.SUPADATA_API_KEY!
});
