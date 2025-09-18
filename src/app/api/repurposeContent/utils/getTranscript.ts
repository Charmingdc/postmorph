import { supadata } from "@/utils/supadata/supadataClient";

export async function getTranscript(videoUrl: string): Promise<string> {
  try {
    const transcriptResult = await supadata.transcript({
      url: videoUrl,
      lang: "en",
      text: true,
      mode: "native"
    });

    // Handle async jobs for long videos
    if ("jobId" in transcriptResult) {
      let jobStatus = await supadata.transcript.getJobStatus(
        transcriptResult.jobId
      );

      const start = Date.now();
      while (
        jobStatus.status !== "completed" &&
        jobStatus.status !== "failed" &&
        Date.now() - start < 30000
      ) {
        await new Promise(res => setTimeout(res, 2000));
        jobStatus = await supadata.transcript.getJobStatus(
          transcriptResult.jobId
        );
      }

      if (jobStatus.status === "completed") {
        return jobStatus.content || "";
      }
      if (jobStatus.status === "failed") {
        throw new Error(jobStatus.error || "Transcript job failed");
      }
      throw new Error("Transcript job timed out");
    }

    // Small/medium videos: direct result
    return transcriptResult.content || "";
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("429")) {
        throw new Error(
          "We're currently experiencing high traffic. Please try again later."
        );
      }
      throw new Error(error.message || "Transcript fetch failed");
    }
    throw new Error("Unknown error while fetching transcript");
  }
}
