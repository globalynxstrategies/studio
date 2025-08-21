"use client";

import { useState } from "react";
import PageHeader from "@/components/page-header";
import TradingViewWidget from "@/components/tradingview/tradingview-widget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ForexPage() {
    const [symbol, setSymbol] = useState("FX:EURUSD");
    const [inputSymbol, setInputSymbol] = useState("EURUSD");
  
    const handleSymbolChange = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!inputSymbol.includes(':')) {
        setSymbol(`FX:${inputSymbol.toUpperCase()}`);
      } else {
        setSymbol(inputSymbol.toUpperCase());
      }
    };

    return (
        <div className="space-y-6">
        <PageHeader
            title="Forex Market"
            description="Analyze real-time forex rates with advanced tools and charts."
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
                placeholder="Enter Forex pair (e.g., EURUSD)"
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
                            locale: "en",
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <Card>
            <CardHeader><CardTitle>Forex Heatmap</CardTitle></CardHeader>
            <CardContent className="h-[600px] p-0">
                <TradingViewWidget
                    widgetType="forex_heatmap"
                    widgetOptions={{
                        "width": "100%",
                        "height": "100%",
                        "currencies": [ "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY" ],
                        "isTransparent": false,
                        "locale": "en",
                    }}
                />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Forex Cross Rates</CardTitle>
            </CardHeader>
            <CardContent className="h-[800px] p-0">
                <TradingViewWidget
                    widgetType="forex_cross_rates"
                    widgetOptions={{
                    "width": "100%",
                    "height": "100%",
                    "currencies": [ "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD" ],
                    "isTransparent": false,
                    "locale": "en"
                    }}
                />
            </CardContent>
        </Card>
        </div>
    );
}
