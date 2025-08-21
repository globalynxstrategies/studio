import PageHeader from "@/components/page-header";
import TradingViewWidget from "@/components/tradingview/tradingview-widget";

export default function ForexPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Forex Market"
        description="Analyze real-time forex cross rates for major and minor currency pairs."
      />
      <div className="h-[800px]">
        <TradingViewWidget
          widgetType="forex_cross_rates"
          widgetOptions={{
            "width": "100%",
            "height": "100%",
            "currencies": [
              "EUR",
              "USD",
              "JPY",
              "GBP",
              "CHF",
              "AUD",
              "CAD",
              "NZD"
            ],
            "isTransparent": false,
            "colorTheme": "light",
            "locale": "en"
          }}
        />
      </div>
    </div>
  );
}
