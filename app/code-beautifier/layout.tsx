import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = "https://nouploadtools.com";

export const metadata: Metadata = {
  title: "Code Beautifier - Format JavaScript, HTML, CSS | Free Tool",
  description:
    "Beautify and format JavaScript, HTML, CSS, and JSON code. Customize indentation and style options. 100% browser-based - no uploads required.",
  keywords: [
    "code beautifier",
    "javascript formatter",
    "html beautifier",
    "css formatter",
    "json formatter",
    "code formatter online",
    "prettify code",
    "format code online"
  ],
  alternates: {
    canonical: `${siteUrl}/code-beautifier`
  },
  openGraph: {
    url: `${siteUrl}/code-beautifier`,
    type: "website",
    title: "Code Beautifier - Format JavaScript, HTML, CSS | Free Tool",
    description:
      "Beautify and format code with customizable options. 100% client-side processing."
  }
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Code Beautifier",
  url: `${siteUrl}/code-beautifier`,
  description:
    "Beautify and format JavaScript, HTML, CSS, and JSON code with customizable options.",
  applicationCategory: "DeveloperApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "JavaScript beautification",
    "HTML formatting",
    "CSS beautification",
    "JSON formatting",
    "Customizable indentation",
    "100% client-side processing"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What languages does this beautifier support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This beautifier supports JavaScript (including ES6+), HTML/XML, CSS/SCSS, and JSON. It uses js-beautify, a widely-used and reliable formatting library."
      }
    },
    {
      "@type": "Question",
      name: "Why should I beautify my code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beautified code is easier to read, debug, and maintain. Consistent formatting helps teams collaborate effectively and makes code reviews more efficient. It also helps identify syntax errors that might be hidden in minified code."
      }
    },
    {
      "@type": "Question",
      name: "Can I customize the formatting style?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can customize indentation (spaces or tabs), indent size, line width, brace style, and various language-specific options. These settings let you match your team's coding standards."
      }
    },
    {
      "@type": "Question",
      name: "Is my code secure when using this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all code formatting happens entirely in your browser. Your code is never sent to any server, making it safe to use with proprietary or sensitive code."
      }
    },
    {
      "@type": "Question",
      name: "Can I minify code with this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool is designed for beautification (making code readable). For minification (making code smaller), you would need a dedicated minifier tool that removes whitespace and shortens variable names."
      }
    },
    {
      "@type": "Question",
      name: "Does beautifying change how my code works?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, beautification only changes whitespace and formatting. It doesn't alter the logic or functionality of your code. The beautified code will execute exactly the same as the original."
      }
    }
  ]
};

export default function CodeBeautifierLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="code-beautifier-webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Script
        id="code-beautifier-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
