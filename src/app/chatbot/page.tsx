import Chatbot from "@/components/ai/chatbot";
import PageHeader from "@/components/page-header";

export default function ChatbotPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader
        title="Trading Chatbot"
        description="Ask me anything about trading, market analysis, or financial concepts."
      />
      <div className="flex-1 min-h-0">
        <Chatbot />
      </div>
    </div>
  );
}
