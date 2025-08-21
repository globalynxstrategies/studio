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
    // Assuming symbols are in format EXCHANGE:SYMBOLPAIR
    if (!inputSymbol.includes(':')) {
        setSymbol(`BITSTAMP:${inputSymbol.toUpperCase()}`);
    } else {
        setSymbol(inputSymbol.toUpperCase());
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader><CardTitle>Technical Analysis</CardTitle></CardHeader>
            <CardContent>
              <TradingViewWidget
                key={`tech-analysis-${symbol}`}
                widgetType="technical_analysis"
                widgetOptions={{
                  interval: "1D",
                  width: "100%",
                  isTransparent: false,
                  symbol: symbol,
                  showIntervalTabs: true,
                  locale: "en",
                  colorTheme: "light",
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader><CardTitle>Symbol Profile</CardTitle></CardHeader>
            <CardContent>
              <TradingViewWidget
                key={`company-profile-${symbol}`}
                widgetType="company_profile"
                widgetOptions={{
                  symbol: symbol,
                  width: "100%",
                  isTransparent: false,
                  colorTheme: "light",
                  locale: "en",
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Crypto Market Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="h-[600px] p-0">
            <TradingViewWidget
            widgetType="crypto_heatmap"
            widgetOptions={{
                dataSource: "Crypto",
                blockSize: "market_cap_calc",
                blockColor: "change_24h",
                locale: "en",
                symbolUrl: "",
                colorTheme: "light",
                hasTopBar: true,
                isDataSetEnabled: true,
                isZoomEnabled: true,
                hasSymbolInfo: true,
                isTransparent: false,
                width: "100%",
                height: "100%"
            }}
            />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Coins by Market Cap</CardTitle>
        </CardHeader>
        <CardContent className="h-[800px] p-0">
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
        </CardContent>
      </Card>
    </div>
  );
}
