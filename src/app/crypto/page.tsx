
"use client";

import { useState } from "react";
import PageHeader from "@/components/page-header";
import TradingViewWidget from "@/components/tradingview/tradingview-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function CryptoPage() {
  const [symbol, setSymbol] = useState("BITSTAMP:BTCUSD");
  const [inputSymbol, setInputSymbol] = useState("BTCUSD");

  const handleSymbolChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedSymbol = inputSymbol.toUpperCase();
    if (!formattedSymbol.includes(':')) {
        setSymbol(`BITSTAMP:${formattedSymbol}`);
    } else {
        setSymbol(formattedSymbol);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cryptocurrency Market"
        description="Analyze the crypto market with advanced tools and real-time data."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Symbol Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSymbolChange} className="flex gap-2">
            <Input
              value={inputSymbol}
              onChange={(e) => setInputSymbol(e.target.value)}
              placeholder="Enter crypto symbol (e.g., BTCUSD)"
              className="max-w-xs"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="h-[450px]">
            <CardHeader><CardTitle>Technical Analysis</CardTitle></CardHeader>
            <CardContent className="h-full p-0">
              <TradingViewWidget
                key={`tech-analysis-${symbol}`}
                widgetType="technical_analysis"
                widgetOptions={{
                  interval: "1D",
                  symbol: symbol,
                  showIntervalTabs: true,
                  locale: "en",
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-[450px]">
            <CardHeader><CardTitle>Fundamental Data</CardTitle></CardHeader>
            <CardContent className="h-full p-0">
              <TradingViewWidget
                key={`company-profile-${symbol}`}
                widgetType="company_profile"
                widgetOptions={{
                  symbol: symbol,
                  locale: "en",
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="h-[600px]">
        <CardHeader>
            <CardTitle>Crypto Market Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="h-full p-0">
            <TradingViewWidget
            widgetType="crypto_heatmap"
            widgetOptions={{
                dataSource: "Crypto",
                blockSize: "market_cap_calc",
                blockColor: "change_24h",
                locale: "en",
                symbolUrl: "",
                hasTopBar: true,
                isDataSetEnabled: true,
                isZoomEnabled: true,
                hasSymbolInfo: true,
            }}
            />
        </CardContent>
      </Card>

      <Card className="h-[800px]">
        <CardHeader>
          <CardTitle>Top Coins by Market Cap</CardTitle>
        </CardHeader>
        <CardContent className="h-full p-0">
          <TradingViewWidget
            widgetType="crypto_market"
            widgetOptions={{
              "defaultColumn": "overview",
              "screener_type": "crypto_mkt",
              "displayCurrency": "USD",
              "locale": "en",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
