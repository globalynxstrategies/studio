import OptionAdvisor from "@/components/ai/option-advisor";
import SwingSuggester from "@/components/ai/swing-suggester";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

export default function AiAdvisorPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Advisor"
        description="Leverage AI-powered tools for timely trade recommendations and swing trade setups."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <OptionAdvisor />
        <SwingSuggester />
      </div>
    </div>
  );
}
