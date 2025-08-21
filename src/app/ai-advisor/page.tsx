import MarketSentimentAnalyzer from "@/components/ai/market-sentiment-analyzer";
import OptionAdvisor from "@/components/ai/option-advisor";
import SwingSuggester from "@/components/ai/swing-suggester";
import PageHeader from "@/components/page-header";

export default function AiAdvisorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Advisor"
        description="Leverage AI-powered tools for timely trade recommendations and swing trade setups."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <OptionAdvisor />
        <SwingSuggester />
      </div>
      <div>
        <MarketSentimentAnalyzer />
      </div>
    </div>
  );
}
