import TradingViewWidget from "@/components/tradingview/tradingview-widget";
import { PositionSizer } from "@/components/dashboard/position-sizer";
import { RiskRewardCalculator } from "@/components/dashboard/risk-reward-calculator";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full">
        <TradingViewWidget
          widgetOptions={{
            "symbols": [
              { "proName": "FOREXCOM:SPXUSD", "title": "S&P 500" },
              { "proName": "FOREXCOM:NSXUSD", "title": "US 100" },
              { "proName": "FX_IDC:EURUSD", "title": "EUR to USD" },
              { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
              { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" }
            ],
            "showSymbolLogo": true,
            "isTransparent": false,
            "displayMode": "adaptive",
            "locale": "en"
          }}
          widgetType="ticker_tape"
        />
      </div>

      <PageHeader title="Dashboard" description="A high-level overview of market activities and your trading tools." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <TradingViewWidget
                widgetOptions={{
                  "isTransparent": false,
                  "width": "100%",
                  "height": "100%",
                  "minHeight": 400,
                  "locale": "en",
                  "tabs": [
                    {
                      "title": "Indices",
                      "symbols": [
                        { "s": "FOREXCOM:SPXUSD", "d": "S&P 500" },
                        { "s": "FOREXCOM:NSXUSD", "d": "US 100" },
                        { "s": "FOREXCOM:DJI", "d": "Dow 30" },
                        { "s": "INDEX:NKY", "d": "Nikkei 225" },
                        { "s": "INDEX:DEU40", "d": "DAX Index" },
                        { "s": "FOREXCOM:UKXGBP", "d": "UK 100" }
                      ],
                      "originalTitle": "Indices"
                    },
                    {
                      "title": "Futures",
                      "symbols": [
                        { "s": "CME_MINI:ES1!", "d": "S&P 500" },
                        { "s": "CME:6E1!", "d": "Euro" },
                        { "s": "COMEX:GC1!", "d": "Gold" },
                        { "s": "NYMEX:CL1!", "d": "WTI Crude Oil" },
                        { "s": "NYMEX:NG1!", "d": "Natural Gas" },
                        { "s": "CBOT:ZC1!", "d": "Corn" }
                      ],
                      "originalTitle": "Futures"
                    },
                    { "title": "Bonds", "symbols": [], "originalTitle": "Bonds" },
                    { "title": "Forex", "symbols": [], "originalTitle": "Forex" }
                  ]
                }}
                widgetType="market_overview"
              />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <Card className="h-full">
            <CardContent className="p-0 h-full">
              <TradingViewWidget
                widgetOptions={{
                  "width": "100%",
                  "height": "100%",
                  "minHeight": 400,
                  "symbolsGroups": [
                    {
                      "name": "My Watchlist",
                      "originalName": "My Watchlist",
                      "symbols": [
                        { "name": "NASDAQ:AAPL", "displayName": "Apple" },
                        { "name": "NASDAQ:GOOGL", "displayName": "Google" },
                        { "name": "NASDAQ:MSFT", "displayName": "Microsoft" },
                        { "name": "NASDAQ:TSLA", "displayName": "Tesla" },
                        { "name": "NASDAQ:NVDA", "displayName": "NVIDIA" },
                        { "name": "NYSE:V", "displayName": "Visa" }
                      ]
                    }
                  ],
                  "showSymbolLogo": true,
                  "isTransparent": false,
                  "locale": "en",
                  "displayMode": "adaptive"
                }}
                widgetType="market_data"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader><CardTitle>S&P 500 Technical Analysis</CardTitle></CardHeader>
            <CardContent className="h-[450px] p-0">
                <TradingViewWidget
                    widgetType="technical_analysis"
                    widgetOptions={{
                        "interval": "1D",
                        "symbol": "SP:SPX",
                        "showIntervalTabs": true,
                        "locale": "en",
                    }}
                />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>S&P 500 Fundamental Data</CardTitle></CardHeader>
            <CardContent className="h-[450px] p-0">
                <TradingViewWidget
                    widgetType="company_profile"
                    widgetOptions={{
                        "symbol": "SP:SPX",
                        "locale": "en",
                    }}
                />
            </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
            <Card className="h-full">
                <CardContent className="p-0 h-full">
                <TradingViewWidget
                    widgetOptions={{
                        "isTransparent": false,
                        "width": "100%",
                        "height": "100%",
                        "minHeight": 600,
                        "locale": "en",
                        "importanceFilter": "0,1"
                    }}
                    widgetType="economic_calendar"
                />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6">
            <PositionSizer />
            <RiskRewardCalculator />
        </div>
      </div>
    </div>
  );
}
