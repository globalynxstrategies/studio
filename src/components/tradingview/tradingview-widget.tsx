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
  | 'stock_heatmap';

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
};

type TradingViewWidgetProps = {
  widgetOptions: any;
  widgetType: WidgetType;
};

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ widgetOptions, widgetType }) => {
  const container = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement('script');
    script.src = widgetType === 'advanced_chart' ? 'https://s3.tradingview.com/tv.js' : WIDGET_URLS[widgetType];
    script.type = 'text/javascript';
    script.async = true;

    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    
    const optionsWithTheme = { ...widgetOptions, theme: currentTheme, colorTheme: currentTheme };

    if (widgetType === 'advanced_chart') {
        script.onload = () => {
            if (container.current && 'TradingView' in window) {
                // @ts-ignore
                new window.TradingView.widget({
                    autosize: true,
                    ...optionsWithTheme,
                    container_id: container.current.id,
                });
            }
        };
    } else {
        script.innerHTML = JSON.stringify(optionsWithTheme);
    }

    // Clear previous widget
    while (container.current.firstChild) {
      container.current.removeChild(container.current.firstChild);
    }
    
    container.current.appendChild(script);

  }, [widgetOptions, widgetType, theme, resolvedTheme]);

  const minHeight = widgetOptions.minHeight || (widgetType === 'ticker_tape' ? 45 : 400);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ width: '100%', height: '100%', minHeight: `${minHeight}px` }}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default memo(TradingViewWidget);
