// @ts-expect-error : Supadata types are missing or mismatched in the installed version.
// Using the library as per official documentation; types will be updated when Supadata releases proper type definitions.
import { Supadata } from "@supadata/js";

export const supadata = new Supadata({
  apiKey: process.env.SUPADATA_API_KEY!
});
