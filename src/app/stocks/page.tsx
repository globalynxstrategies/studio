"use client";

import { useState } from "react";
import PageHeader from "@/components/page-header";
import TradingViewWidget from "@/components/tradingview/tradingview-widget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StocksPage() {
  const [symbol, setSymbol] = useState("INTC");
  const [inputSymbol, setInputSymbol] = useState("INTC");

  const handleSymbolChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSymbol(inputSymbol.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Analysis"
        description="Deep dive into individual stocks with advanced charts and fundamental data."
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
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="max-w-xs"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Advanced Chart</CardTitle>
        </CardHeader>
        <CardContent className="h-[600px] p-0">
          <TradingViewWidget
            key={`advanced-chart-${symbol}`}
            widgetType="advanced_chart"
            widgetOptions={{
              symbol: symbol,
              interval: "D",
              timezone: "Etc/UTC",
              theme: "light",
              style: "1",
              locale: "en",
              enable_publishing: false,
              allow_symbol_change: true,
            }}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Technical Analysis</CardTitle>
            </CardHeader>
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
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
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
          <CardTitle>Stock Market Heatmap</CardTitle>
        </CardHeader>
        <CardContent className="h-[600px] p-0">
         <TradingViewWidget
            widgetType="stock_heatmap"
            widgetOptions={{
              "exchanges": [],
              "dataSource": "SPX500",
              "grouping": "sector",
              "blockSize": "market_cap_basic",
              "blockColor": "change",
              "locale": "en",
              "symbolUrl": "",
              "colorTheme": "light",
              "hasTopBar": true,
              "isDataSetEnabled": true,
              "isZoomEnabled": true,
              "hasSymbolInfo": true,
              "isTransparent": false,
              "width": "100%",
              "height": "100%"
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
