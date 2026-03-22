export const SERVICES_DATA = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description:
      'Autonomous AI agents that handle complex multi-step tasks without human intervention. From research agents to decision-making bots that operate 24/7.',
    features: [
      'Multi-step task orchestration',
      'Tool use and web browsing',
      'Memory and context retention',
      'Slack / Telegram integration',
      'Custom business logic',
    ],
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
    badge: 'Hot' as const,
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    description:
      'End-to-end WhatsApp business automation using the official Meta API. Build conversational flows, automate responses, and qualify leads at scale.',
    features: [
      'Official Meta Business API',
      'AI-powered conversational flows',
      'Lead qualification pipelines',
      'CRM integration (Zoho, HubSpot)',
      'Broadcast campaign automation',
    ],
    icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M11.5 2C6.813 2 3 5.813 3 10.5c0 1.526.404 2.96 1.107 4.2L3 21l6.493-1.107A8.458 8.458 0 0011.5 20.5c4.687 0 8.5-3.813 8.5-8.5S16.187 2 11.5 2z',
    badge: 'Popular' as const,
  },
  {
    id: 'n8n-workflows',
    title: 'n8n Workflows',
    description:
      'Custom n8n workflow automation connecting your entire business stack. Automate repetitive tasks across 400+ integrations with zero ongoing licensing cost.',
    features: [
      'Self-hosted n8n deployment',
      '400+ app integrations',
      'Error handling and retry logic',
      'Scheduled and webhook triggers',
      'Full workflow documentation',
    ],
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    badge: undefined,
  },
  {
    id: 'rag-llm',
    title: 'RAG / LLM Integration',
    description:
      'Retrieval-Augmented Generation systems that give AI models access to your private documents, databases, and knowledge bases for accurate, grounded responses.',
    features: [
      'Vector database setup (Pinecone, Weaviate)',
      'Document ingestion pipelines',
      'OpenAI / Claude / Llama integration',
      'Semantic search over private data',
      'Hallucination reduction strategies',
    ],
    icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
    badge: 'Hot' as const,
  },
  {
    id: 'web-scraping',
    title: 'Web Scraping',
    description:
      'Production-grade web scrapers for market intelligence, lead generation, price monitoring, and competitive analysis. Built to handle anti-bot measures and scale.',
    features: [
      'JavaScript-rendered page scraping',
      'Rotating proxies and headers',
      'Scheduled data extraction',
      'Structured data pipelines',
      'Rate limiting and anti-ban logic',
    ],
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    badge: undefined,
  },
  {
    id: 'security-audits',
    title: 'Security Audits',
    description:
      'Comprehensive ethical hacking and vulnerability assessments for web applications, APIs, and infrastructure. Detailed reports with remediation roadmaps.',
    features: [
      'OWASP Top 10 testing',
      'API and endpoint fuzzing',
      'Privilege escalation testing',
      'Detailed vulnerability report',
      'Post-fix verification included',
    ],
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    badge: undefined,
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description:
      'AI-powered image and video analysis for quality control, document extraction, face detection, and real-time object recognition in production systems.',
    features: [
      'OCR and document parsing',
      'Object detection and classification',
      'Real-time video analysis',
      'Custom model fine-tuning',
      'Edge deployment support',
    ],
    icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    badge: undefined,
  },
  {
    id: 'voice-ai',
    title: 'Voice AI',
    description:
      'Voice-enabled AI interfaces for IVR systems, voice assistants, call center automation, and real-time transcription with speaker diarization.',
    features: [
      'Real-time speech-to-text',
      'Text-to-speech with custom voice',
      'IVR and phone bot integration',
      'Multilingual support (Hindi, Bengali, English)',
      'Emotion and sentiment detection',
    ],
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
    badge: 'Popular' as const,
  },
  // ── Agentic AI ──────────────────────────────────────────
  {
    id: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    description:
      'Production multi-agent pipelines using CrewAI, LangGraph, and OpenAI Agents SDK. Specialized agents collaborating autonomously — research, code, review, and deploy without hand-holding.',
    features: [
      'CrewAI and LangGraph orchestration',
      'Agent-to-Agent (A2A) protocol support',
      'Tool use, memory, and planning loops',
      'Human-in-the-loop checkpoints',
      'Deployed on cloud or self-hosted',
    ],
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
    badge: 'Hot' as const,
  },
  {
    id: 'mcp-servers',
    title: 'MCP Server Development',
    description:
      'Custom Model Context Protocol (MCP) servers that extend AI assistants — Claude, Cursor, Copilot — with your own tools, data sources, and APIs. The fastest-growing AI integration standard in 2026.',
    features: [
      'Custom MCP tool and resource handlers',
      'Connect Claude / Cursor to your APIs',
      'Database and file system MCP servers',
      'Auth, rate limiting, and error handling',
      'Publish to MCP registry (10K+ servers)',
    ],
    icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
    badge: 'Hot' as const,
  },
  {
    id: 'browser-agents',
    title: 'AI Browser Automation',
    description:
      'AI-powered browser agents that navigate websites, fill forms, extract data, and complete multi-step web tasks autonomously. Built with Playwright + computer-use models for tasks no API can cover.',
    features: [
      'Playwright-based browser control',
      'Computer-use model integration',
      'Login, form fill, and click automation',
      'Screenshot-to-action pipelines',
      'Headless and headed deployment modes',
    ],
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    badge: undefined,
  },
  // ── AI Chatbot ──────────────────────────────────────────
  {
    id: 'chatbot-builder',
    title: 'AI Chatbot for Websites',
    description:
      'Custom AI chatbots trained on your business data — product docs, FAQs, pricing, policies. Embedded on your website with a chat widget, handling sales queries and support 24/7.',
    features: [
      'Trained on your documents and FAQs',
      'Chat widget embed (React or script tag)',
      'Lead capture with CRM handoff',
      'Escalation to human via WhatsApp/email',
      'Multi-language support',
    ],
    icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
    badge: 'Popular' as const,
  },
  // ── Automation ──────────────────────────────────────────
  {
    id: 'email-automation',
    title: 'Email Automation',
    description:
      'End-to-end email drip sequences, lead nurturing pipelines, and lifecycle campaigns. From cold outreach to post-purchase follow-ups — built, tested, and connected to your CRM.',
    features: [
      'Cold outreach sequences (10–20 step)',
      'Behaviour-triggered email flows',
      'CRM sync (HubSpot, Zoho, Mailchimp)',
      'A/B tested subject lines',
      'Unsubscribe and compliance handling',
    ],
    icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    badge: undefined,
  },
  {
    id: 'crm-automation',
    title: 'CRM Automation',
    description:
      'Automate your entire sales pipeline — lead assignment, deal stage triggers, follow-up reminders, and report generation. Works with Zoho, HubSpot, Pipedrive, and Airtable.',
    features: [
      'Lead scoring and auto-assignment',
      'Deal stage triggers and reminders',
      'Cross-platform CRM sync',
      'Automated pipeline reports',
      'Sales team Slack/WhatsApp alerts',
    ],
    icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6',
    badge: undefined,
  },
  {
    id: 'make-automation',
    title: 'Make (Integromat) Automation',
    description:
      'Visual scenario automation using Make — the go-to platform for ops teams needing complex branching, iterators, and high-volume data transformations without writing code.',
    features: [
      '1000+ app integrations',
      'Complex branching and filter logic',
      'High-volume scenario runs',
      'Error handling and alerting',
      'Migration from Zapier to Make',
    ],
    icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
    badge: undefined,
  },
  {
    id: 'zapier-automation',
    title: 'Zapier AI Automation',
    description:
      'Zapier workflows with AI steps built for non-technical teams and clients who want fast, reliable automations across 8,000+ apps — no infrastructure, zero maintenance.',
    features: [
      '8,000+ app integrations',
      'AI steps and Zapier Agents',
      'Instant trigger and filter setup',
      'Zap templates for common use cases',
      'Zapier Tables and Interfaces setup',
    ],
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    badge: undefined,
  },
  {
    id: 'airtable-automation',
    title: 'Airtable Automation',
    description:
      'Full Airtable setup — database design, automations, interfaces, and scripting. Turn spreadsheet chaos into a structured, automated ops hub your team actually uses.',
    features: [
      'Base architecture and schema design',
      'Native automation triggers and actions',
      'Interface and dashboard building',
      'Airtable scripting (custom JS)',
      'CRM, project tracker, or inventory setup',
    ],
    icon: 'M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 19.5m9.75-9.75c0 .621-.504 1.125-1.125 1.125H12m8.625-9.75c.621 0 1.125.504 1.125 1.125M20.625 3H12',
    badge: undefined,
  },
  // ── Data & Scraping ──────────────────────────────────────
  {
    id: 'data-pipelines',
    title: 'Data Pipelines & ETL',
    description:
      'Automated data pipelines that collect, transform, and sync data between APIs, databases, spreadsheets, and dashboards — on a schedule or real-time via webhooks.',
    features: [
      'REST / GraphQL API data sync',
      'Google Sheets + Airtable pipelines',
      'PostgreSQL / Supabase ETL',
      'Scheduled and webhook-triggered runs',
      'Data cleaning and deduplication',
    ],
    icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
    badge: undefined,
  },
  // ── Security ─────────────────────────────────────────────
  {
    id: 'api-pentesting',
    title: 'API Penetration Testing',
    description:
      'Deep security testing of REST and GraphQL APIs against OWASP API Top 10. Authentication bypass, injection, rate limiting, IDOR, and business logic flaws — all tested manually.',
    features: [
      'OWASP API Top 10 full coverage',
      'Authentication & JWT testing',
      'IDOR and privilege escalation',
      'Rate limiting and DoS vectors',
      'Detailed remediation report',
    ],
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    badge: undefined,
  },
  {
    id: 'vapt',
    title: 'Web App VAPT',
    description:
      'Full Vulnerability Assessment and Penetration Testing (VAPT) for web applications. Covers authentication, session management, injection, business logic, and third-party integrations.',
    features: [
      'Black-box and grey-box testing',
      'Burp Suite Pro + manual validation',
      'Business logic vulnerability testing',
      'CVSS-scored vulnerability report',
      'Post-fix re-testing included',
    ],
    icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
    badge: undefined,
  },
]

export const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '25,000',
    priceNote: 'one-time project',
    description:
      'Perfect for small businesses needing one focused automation — a WhatsApp bot, a scraper, or a simple n8n workflow.',
    features: [
      'Single automation or bot',
      'Up to 3 integrations',
      '2-week delivery',
      '30 days post-launch support',
      'Documentation included',
      'WhatsApp or email support',
    ],
    highlighted: false,
    cta: 'Start a Project',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '75,000',
    priceNote: 'one-time project',
    description:
      'For growing businesses ready to automate an entire workflow — from lead gen to CRM sync to AI-powered customer support.',
    features: [
      'Up to 3 interconnected automations',
      'AI agent or RAG integration',
      'Unlimited integrations',
      '4-week delivery',
      '60 days post-launch support',
      'Priority response within 4 hours',
      'Monthly performance review',
    ],
    highlighted: true,
    cta: 'Get Started',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '2,00,000',
    priceNote: 'starting price',
    description:
      'Full-scale AI transformation. Custom AGI pipelines, dedicated infrastructure, security audits, and ongoing engineering retainer.',
    features: [
      'Unlimited automations and agents',
      'Custom LLM fine-tuning',
      'Security audit included',
      'Dedicated infrastructure setup',
      '90 days post-launch support',
      'Weekly sync calls',
      'SLA with uptime guarantee',
      'Source code ownership',
    ],
    highlighted: false,
    cta: 'Contact for Quote',
  },
]

export const CASE_STUDIES_DATA = [
  {
    id: 'ecommerce-operations',
    client: 'MegaMart India',
    industry: 'E-commerce',
    tech: ['WhatsApp Business API', 'Shopify', 'Zoho CRM', 'OpenAI GPT-4o', 'n8n'],
    problem:
      'A mid-size D2C brand was manually processing 800+ customer support queries daily, leading to 48-hour response times and high churn.',
    solution:
      'Deployed a WhatsApp AI support agent integrated with their Shopify store and Zoho CRM. The agent handles order tracking, returns, and FAQs autonomously, escalating only edge cases.',
    results: [
      { metric: 'Response time reduced', value: '48h → 4min', context: 'Immediate from day 1' },
      { metric: 'Support tickets handled by AI', value: '87%', context: 'Without any human' },
      { metric: 'Customer satisfaction score', value: '+34%', context: 'Within 90 days' },
      { metric: 'Support cost saved (Year 1)', value: '12L INR', context: 'vs. 3-agent team cost' },
    ],
  },
  {
    id: 'realestate-leads',
    client: 'Shubham Properties',
    industry: 'Real Estate',
    tech: ['Meta Ads API', 'WhatsApp Business API', 'Google Calendar API', 'GPT-4o', 'Airtable'],
    problem:
      'A Kolkata-based real estate developer was losing qualified leads because their sales team could not follow up fast enough. Leads from ads went cold within hours.',
    solution:
      'Built an AI outreach agent that instantly responds to Facebook and Google ad leads via WhatsApp, qualifies them with 5 dynamic questions, scores them, and books site visits directly into the sales calendar.',
    results: [
      { metric: 'Lead response time', value: '< 30 sec', context: 'Was 4–6 hours manually' },
      { metric: 'Qualified leads increase', value: '+210%', context: 'In first 60 days' },
      { metric: 'Site visit bookings', value: '3× more', context: 'Same ad spend' },
      { metric: 'Sales team hours saved/week', value: '40 hrs', context: 'Redirected to closings' },
    ],
  },
  {
    id: 'logistics-scraping',
    client: 'FleetLink Logistics',
    industry: 'Logistics',
    tech: ['Playwright', 'Python', 'Google Sheets API', 'n8n', 'Telegram Bot API'],
    problem:
      'A freight brokerage needed real-time competitor pricing from 12 different portals to win bids. Manual monitoring was impossible to keep up with.',
    solution:
      'Deployed a distributed scraping system running every 30 minutes across all competitor portals, feeding data into a Google Sheets dashboard with automated alerts when pricing shifted beyond a threshold.',
    results: [
      { metric: 'Competitor portals monitored', value: '12 live', context: 'Updated every 30 min' },
      { metric: 'Bid win rate improvement', value: '+28%', context: 'Within first quarter' },
      { metric: 'Estimated revenue lift (annual)', value: '~22L INR', context: 'Based on won bids delta' },
      { metric: 'Research hours eliminated/week', value: '20 hrs', context: 'Fully automated' },
    ],
  },
  {
    id: 'edtech-automation',
    client: 'Bodhi Learning',
    industry: 'EdTech',
    tech: ['n8n', 'WhatsApp Business API', 'OpenAI GPT-4o', 'LMS Webhook', 'Airtable'],
    problem:
      'An online coaching platform struggled with student drop-off after enrollment. No automated engagement system existed to keep students on track.',
    solution:
      'Built a full n8n workflow integrating their LMS with WhatsApp. Students receive AI-generated daily study nudges, quiz reminders, performance reports, and motivational messages tailored to their progress.',
    results: [
      { metric: 'Course completion rate', value: '41% → 79%', context: 'Across all cohorts' },
      { metric: 'Daily active student increase', value: '+65%', context: 'In first 45 days' },
      { metric: 'Support queries reduced', value: '–58%', context: 'AI handles FAQs' },
      { metric: 'Net Promoter Score (NPS)', value: '22 → 69', context: '+47 pts in one semester' },
    ],
  },
]

export const PORTFOLIO_ITEMS = [
  {
    id: 'bharat-monitor',
    title: 'BharatMonitor',
    description:
      'An AI-powered news aggregator that monitors 200+ Indian news sources, classifies articles by topic and sentiment, and delivers personalized briefings via Telegram and email at scheduled times.',
    tech: ['Python', 'OpenAI GPT-4', 'Playwright', 'FastAPI', 'Redis', 'PostgreSQL', 'Telegram Bot API'],
    status: 'Live' as const,
    link: undefined,
  },
  {
    id: 'agi-prototype',
    title: 'AGI Prototype — Project Shakti',
    description:
      'A research prototype demonstrating goal-directed autonomous behavior: multi-agent task decomposition, self-correction loops, and tool-use chaining across 15+ external APIs. Not production software.',
    tech: ['Python', 'LangGraph', 'Claude 3.5', 'Pinecone', 'Docker', 'FastAPI', 'Redis'],
    status: 'Private' as const,
    link: undefined,
  },
  {
    id: 'whatsapp-hr-bot',
    title: 'WhatsApp HR Bot',
    description:
      'A full-featured HR automation bot for a 500-employee manufacturing company. Handles leave requests, salary slip delivery, onboarding, policy FAQs, and escalation routing — all over WhatsApp.',
    tech: ['Meta Cloud API', 'n8n', 'Google Sheets', 'OpenAI', 'Node.js', 'Airtable'],
    status: 'Live' as const,
    link: undefined,
  },
  {
    id: 'ecommerce-scraper',
    title: 'E-commerce Price Intelligence',
    description:
      'Monitors 50,000+ product listings across Flipkart, Amazon, Meesho, and niche D2C stores. Tracks price changes, stock levels, and seller ratings. Sends alerts for competitive pricing shifts.',
    tech: ['Python', 'Playwright', 'Bright Data', 'PostgreSQL', 'Grafana', 'Celery', 'Redis'],
    status: 'Beta' as const,
    link: undefined,
  },
  {
    id: 'security-audit-platform',
    title: 'Security Audit Platform',
    description:
      'Internal tooling for automated vulnerability assessment. Orchestrates OWASP testing tools, aggregates findings, deduplicates CVEs, and generates structured PDF reports with severity-ranked remediation steps.',
    tech: ['Python', 'Burp Suite API', 'OWASP ZAP', 'FastAPI', 'PostgreSQL', 'WeasyPrint'],
    status: 'Private' as const,
    link: undefined,
  },
  {
    id: 'sekkhoai',
    title: 'SekkhoAI Education Platform',
    description:
      'AI-powered learning platform built for Bengali and Indian regional language students. Provides AI tutoring, adaptive quizzes, doubt resolution in Bengali, and affordable course access for Tier 2/3 city learners.',
    tech: ['Next.js', 'OpenAI', 'Bengali NLP', 'PostgreSQL', 'Razorpay', 'Vercel', 'Framer Motion'],
    status: 'Beta' as const,
    link: 'https://sekkhoai.com',
  },
]

export const VOICE_SCRIPTS: Record<string, string> = {
  home: "Hi, I'm Chiranjib — India's leading AI automation specialist. I build autonomous AI systems that actually work for your business. Whether you need a WhatsApp bot, an AI agent, or a full automation pipeline, I deliver production-ready solutions. Explore the site to see my work, or hit the hire button to start a project.",
  services:
    "Here are the automation services I specialize in. From AI agents and WhatsApp bots to RAG systems, web scraping, and security audits — everything I build is production-grade and tailored to your business context.",
  pricing:
    "My pricing starts at 25,000 rupees for focused automation projects and goes up to 2 lakh or more for enterprise-scale AI transformations. I don't believe in vague retainers — every project has a defined scope and outcome.",
  about:
    "Let me tell you about my background. I started coding in 2020 and quickly moved into AI automation. I've worked with 50-plus clients across India, built AGI prototypes, launched SekkhoAI, and now focus on helping Indian businesses unlock real value from automation.",
  hire: "Ready to automate your business? Tell me about your project — what you're doing today manually, what outcome you want, and your budget range. I'll come back with a clear plan and timeline.",
}

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Discovery Call',
    description:
      'We talk for 30 to 45 minutes. I ask questions about your current process, the bottlenecks, the tools you already use, and the outcome you want. No sales pitch — just understanding.',
    duration: '1 day',
    clientDoes: 'Explain current workflow and pain points',
    iDo: 'Map the process, identify automation opportunities, ask clarifying questions',
  },
  {
    step: 2,
    title: 'Architecture Design',
    description:
      'I design the full technical blueprint — which tools, which APIs, what data flows where, where AI is used, and where simple logic is better. You get a written architecture document before I write a single line of code.',
    duration: '2–3 days',
    clientDoes: 'Review and approve the proposed architecture',
    iDo: 'Draft system diagram, select tech stack, estimate complexity and timelines',
  },
  {
    step: 3,
    title: 'Development',
    description:
      'I build the system in sprints, sharing updates every 2 to 3 days. You can test partial builds as they come. No black boxes — you always know what is done and what is next.',
    duration: '1–4 weeks',
    clientDoes: 'Test partial builds, provide feedback, confirm business logic',
    iDo: 'Build integrations, write automation logic, set up infrastructure',
  },
  {
    step: 4,
    title: 'Testing and QA',
    description:
      'Before handoff, I run the system through edge cases, failure scenarios, and load conditions. I document known limitations and set up monitoring and alerting.',
    duration: '3–5 days',
    clientDoes: 'Run user acceptance testing in a staging environment',
    iDo: 'Automated testing, error handling verification, performance profiling',
  },
  {
    step: 5,
    title: 'Launch and Support',
    description:
      'Deployment to production with me present. Post-launch, I monitor the system for the first week, fix any issues immediately, and provide documentation and training for your team.',
    duration: '30–90 days support',
    clientDoes: 'Go live and use the system, report any issues',
    iDo: 'Monitor, maintain, fix bugs, onboard your team, provide documentation',
  },
]

export const WHY_US_POINTS = [
  {
    title: 'You Get an Implementer, Not a Consultant',
    description:
      'Most agencies sell strategy decks and hand off execution to junior developers. I write the code myself and am accountable for the outcome — not just the advice.',
    stat: '100% hands-on delivery',
  },
  {
    title: 'Deep Indian Business Context',
    description:
      'I understand the constraints of Indian SMBs — GST APIs, Razorpay flows, WhatsApp-first communication, regional language needs, and the reality of working with unreliable legacy software.',
    stat: '50+ Indian clients served',
  },
  {
    title: 'Transparent, Fixed Pricing',
    description:
      'No hourly billing surprises. Every project has a defined scope and a fixed price. If the scope changes, we discuss it openly before any extra work begins.',
    stat: 'Zero scope creep surprises',
  },
  {
    title: 'Direct Communication Always',
    description:
      'You talk to me — not an account manager, not a ticketing system. I respond on WhatsApp and Telegram within 4 hours during business days.',
    stat: 'Under 4-hour response time',
  },
  {
    title: 'Production-Ready From Day One',
    description:
      'I build for production, not demos. Error handling, retry logic, monitoring, and documentation are included by default — not as paid add-ons.',
    stat: '99.2% avg uptime on delivered systems',
  },
  {
    title: 'You Own Everything',
    description:
      'All code, credentials, and infrastructure belong to you from day one. No vendor lock-in, no monthly fees for access to your own system, no proprietary black boxes.',
    stat: 'Full source code delivery on all projects',
  },
]

export const EXPERTISE_SKILLS = [
  {
    category: 'AI / ML',
    skills: [
      { name: 'OpenAI API (GPT-4, Embeddings)', level: 96 },
      { name: 'LangChain / LangGraph', level: 90 },
      { name: 'RAG System Design', level: 93 },
      { name: 'Claude / Anthropic API', level: 92 },
      { name: 'Hugging Face Transformers', level: 78 },
      { name: 'Ollama / Local LLMs', level: 82 },
      { name: 'Computer Vision (OpenCV, YOLO)', level: 74 },
      { name: 'Speech Recognition / TTS', level: 80 },
    ],
  },
  {
    category: 'Automation',
    skills: [
      { name: 'n8n Workflow Automation', level: 97 },
      { name: 'WhatsApp Cloud API', level: 95 },
      { name: 'Web Scraping (Playwright, Puppeteer)', level: 94 },
      { name: 'Make (Integromat)', level: 85 },
      { name: 'Zapier Advanced', level: 80 },
      { name: 'API Integration Design', level: 96 },
      { name: 'Webhook Architecture', level: 91 },
    ],
  },
  {
    category: 'Development',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'TypeScript / JavaScript', level: 88 },
      { name: 'Next.js / React', level: 85 },
      { name: 'FastAPI / Node.js', level: 87 },
      { name: 'PostgreSQL / Redis', level: 83 },
      { name: 'Docker / Containerization', level: 80 },
      { name: 'Linux / VPS Management', level: 86 },
    ],
  },
  {
    category: 'Security',
    skills: [
      { name: 'OWASP Top 10 Testing', level: 88 },
      { name: 'Burp Suite', level: 85 },
      { name: 'Penetration Testing', level: 82 },
      { name: 'API Security Auditing', level: 87 },
      { name: 'OSINT Techniques', level: 80 },
    ],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'Chiranjib built our WhatsApp support bot in 3 weeks. It now handles 80 percent of our customer queries without any human involvement. The ROI was visible within the first month.',
    author: 'Priya Mehta',
    role: 'Head of Operations',
    company: 'MegaMart India',
    rating: 5,
  },
  {
    quote:
      'Our sales team was drowning in unqualified leads. The AI outreach agent Chiranjib built now pre-qualifies every lead from our ads and books site visits automatically. Conversion improved dramatically.',
    author: 'Rajesh Agarwal',
    role: 'Founder',
    company: 'Shubham Properties, Kolkata',
    rating: 5,
  },
  {
    quote:
      'Very professional, delivers on time, and the code is clean and well-documented. Unlike other freelancers, he actually explained how everything works and trained our team to maintain it.',
    author: 'Ananya Bose',
    role: 'CTO',
    company: 'Bodhi Learning',
    rating: 5,
  },
  {
    quote:
      'The security audit report was thorough — identified 14 vulnerabilities we had no idea existed. The remediation checklist was practical and Chiranjib was available throughout the fixing process.',
    author: 'Suresh Nair',
    role: 'IT Manager',
    company: 'FleetLink Logistics',
    rating: 5,
  },
]
