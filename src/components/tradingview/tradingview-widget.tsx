
"use client";

import React, { useEffect, useRef, memo, useState } from 'react';
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
  id?: string;
};

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ widgetOptions, widgetType, id }) => {
  const container = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [uniqueId, setUniqueId] = useState(id || `tradingview_${widgetType}_placeholder`);

  useEffect(() => {
    // Generate a unique ID on the client side to prevent hydration mismatch
    if (!id) {
      setUniqueId(`tradingview_${widgetType}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [id, widgetType]);


  useEffect(() => {
    if (!container.current || uniqueId.includes('placeholder')) return;

    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    
    const defaultOptions = {
        width: "100%",
        height: "100%",
        isTransparent: false,
    };
    
    const optionsWithTheme = { 
        ...defaultOptions,
        ...widgetOptions,
        theme: currentTheme === 'dark' ? 'dark' : 'light', 
        colorTheme: currentTheme === 'dark' ? 'dark' : 'light',
    };

    const script = document.createElement('script');
    script.src = WIDGET_URLS[widgetType];
    script.type = 'text/javascript';
    script.async = true;
    script.id = `${uniqueId}-script`;

    // Clean up previous script if it exists
    const existingScript = document.getElementById(script.id);
    if (existingScript) {
        existingScript.remove();
    }

    if (widgetType === 'advanced_chart') {
      // Advanced chart uses a different initialization method.
      // We check if the TradingView object is available on the window.
      if (typeof window.TradingView !== 'undefined') {
        // @ts-ignore
        new window.TradingView.widget({
          autosize: true,
          ...optionsWithTheme,
          container_id: uniqueId,
        });
      } else {
        // If not, we load the script and then initialize.
        script.onload = () => {
          if ('TradingView' in window) {
            // @ts-ignore
            new window.TradingView.widget({
              autosize: true,
              ...optionsWithTheme,
              container_id: uniqueId,
            });
          }
        };
      }
    } else {
      script.innerHTML = JSON.stringify(optionsWithTheme);
    }
    
    // Clear the container and append the new script.
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }
    container.current.appendChild(script);

  }, [widgetOptions, widgetType, theme, resolvedTheme, uniqueId]);

  const minHeight = widgetOptions.minHeight || (widgetType === 'ticker_tape' ? 45 : 400);

  return (
    <div 
        id={uniqueId}
        ref={container}
        className="tradingview-widget-container h-full w-full" 
        style={{ minHeight: `${minHeight}px` }}
    />
  );
};

export default memo(TradingViewWidget);
