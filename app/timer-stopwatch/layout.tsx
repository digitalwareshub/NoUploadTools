import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Timer & Stopwatch - Online Countdown Timer | Free Tool",
  description:
    "Free online timer and stopwatch with lap times, alarms, and presets. Perfect for workouts, studying, and productivity. Works offline in your browser.",
  keywords: [
    "online timer",
    "countdown timer",
    "stopwatch online",
    "free timer",
    "lap timer",
    "pomodoro timer",
    "workout timer",
    "kitchen timer"
  ],
  alternates: {
    canonical: `${siteUrl}/timer-stopwatch`
  },
  openGraph: {
    url: `${siteUrl}/timer-stopwatch`,
    type: "website",
    title: "Timer & Stopwatch - Online Countdown Timer | Free Tool",
    description:
      "Free online timer and stopwatch with lap times and alarms. 100% browser-based."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Timer & Stopwatch",
  url: `${siteUrl}/timer-stopwatch`,
  description:
    "Online timer and stopwatch with lap times, alarms, and quick presets.",
  applicationCategory: "UtilitiesApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Countdown timer",
    "Stopwatch with lap times",
    "Audio alarm notifications",
    "Quick timer presets",
    "Fullscreen mode",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the timer work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, once the page is loaded, the timer and stopwatch work entirely in your browser without needing an internet connection. They use your device's clock for accurate timing."
      }
    },
    {
      "@type": "Question",
      name: "Will the timer keep running if I switch tabs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the timer continues running in the background when you switch tabs or minimize the browser. The alarm will still sound when the timer completes."
      }
    },
    {
      "@type": "Question",
      name: "Can I use multiple timers at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The current implementation supports one timer at a time. However, you can open multiple browser tabs if you need to run multiple timers simultaneously."
      }
    },
    {
      "@type": "Question",
      name: "How accurate is the timer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The timer uses your browser's high-resolution timing APIs and is accurate to within milliseconds. It's suitable for most timing needs including workouts, cooking, and productivity sessions."
      }
    },
    {
      "@type": "Question",
      name: "What is the Pomodoro technique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pomodoro technique is a time management method using 25-minute focused work sessions followed by 5-minute breaks. After four sessions, take a longer 15-30 minute break. The preset timers include Pomodoro intervals."
      }
    },
    {
      "@type": "Question",
      name: "Is there a maximum timer duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can set timers up to 99 hours, 59 minutes, and 59 seconds. This is sufficient for most practical timing needs from quick kitchen timers to long study sessions."
      }
    }
  ]
};

export default function TimerStopwatchLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="timer-stopwatch-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="timer-stopwatch-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
