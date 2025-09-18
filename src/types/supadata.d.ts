import { supadata } from "@/utils/supadata/supadataClient";

declare module "@supadata/js" {
  interface JobResult<T> {
    content?: string;
  }
}
