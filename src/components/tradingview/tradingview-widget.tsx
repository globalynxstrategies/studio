
"use client";

import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from 'next-themes';

type WidgetType =
  | 'ticker_tape'
  | 'market_overview'
  | 'market_data'
  | 'economic_calendar'
  | 'crypto_market'
  | 'forex_cross_rates'
  | 'advanced_chart'
  | 'technical_analysis'
  | 'company_profile'
  | 'stock_heatmap'
  | 'crypto_heatmap'
  | 'forex_heatmap';


const WIDGET_URLS: Record<WidgetType, string> = {
  ticker_tape: 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
  market_overview: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
  market_data: 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js',
  economic_calendar: 'https://s3.tradingview.com/external-embedding/embed-widget-events.js',
  crypto_market: 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js',
  forex_cross_rates: 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js',
  advanced_chart: 'https://s3.tradingview.com/tv.js',
  technical_analysis: 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js',
  company_profile: 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js',
  stock_heatmap: 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
  crypto_heatmap: 'https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js',
  forex_heatmap: 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heatmap.js',
};

type TradingViewWidgetProps = {
  widgetOptions: any;
  widgetType: WidgetType;
};

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ widgetOptions, widgetType }) => {
  const container = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const hasRun = useRef(false);

  useEffect(() => {
    if (!container.current || hasRun.current) return;

    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    
    // Default options for all widgets
    const defaultOptions = {
        width: "100%",
        height: "100%",
        isTransparent: false,
    };
    
    // Merge theme and defaults into widget options
    const optionsWithTheme = { 
        ...defaultOptions,
        ...widgetOptions,
        theme: currentTheme, 
        colorTheme: currentTheme 
    };

    const script = document.createElement('script');
    script.src = WIDGET_URLS[widgetType];
    script.type = 'text/javascript';
    script.async = true;

    if (widgetType === 'advanced_chart') {
      script.onload = () => {
        if (container.current && 'TradingView' in window) {
          // @ts-ignore
          new window.TradingView.widget({
            autosize: true,
            ...optionsWithTheme,
            container: container.current,
          });
        }
      };
    } else {
      script.innerHTML = JSON.stringify(optionsWithTheme);
    }
    
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }
    container.current.appendChild(script);
    hasRun.current = true;

  }, [widgetOptions, widgetType, theme, resolvedTheme]);

  const minHeight = widgetOptions.minHeight || (widgetType === 'ticker_tape' ? 45 : 400);

  return (
    <div 
        ref={container}
        className="tradingview-widget-container h-full w-full" 
        style={{ minHeight: `${minHeight}px` }}
    />
  );
};

export default memo(TradingViewWidget);
