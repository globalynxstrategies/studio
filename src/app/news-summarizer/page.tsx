import NewsSummarizer from "@/components/ai/news-summarizer";
import PageHeader from "@/components/page-header";

export default function NewsSummarizerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI News Summarizer"
        description="Get concise summaries of financial news articles to quickly grasp key insights."
      />
      <NewsSummarizer />
    </div>
  );
}
