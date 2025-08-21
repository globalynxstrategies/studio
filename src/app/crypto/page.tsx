import PageHeader from "@/components/page-header";
import TradingViewWidget from "@/components/tradingview/tradingview-widget";

export default function CryptoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cryptocurrency Market"
        description="Overview of the cryptocurrency market, including top coins by market cap."
      />
      <div className="h-[800px]">
        <TradingViewWidget
          widgetType="crypto_market"
          widgetOptions={{
            "width": "100%",
            "height": "100%",
            "defaultColumn": "overview",
            "screener_type": "crypto_mkt",
            "displayCurrency": "USD",
            "colorTheme": "light",
            "locale": "en",
            "isTransparent": false
          }}
        />
      </div>
    </div>
  );
}
