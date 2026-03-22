export interface ServiceDemoProps {
  serviceId: string
  title: string
  tagline: string
  category: string
  problem: string
  solution: string
  resultText: string
  metric: string
  metricLabel: string
  quote: string
  quotePerson: string
  painTags: string[]
  buildDays: string
}

export const SERVICE_DEMO_DATA: Record<string, ServiceDemoProps> = {
  'multi-agent-systems': {
    serviceId: 'multi-agent-systems',
    title: 'Multi-Agent Systems',
    tagline: 'Autonomous AI pipelines that run your business',
    category: 'Agentic AI',
    problem:
      'Complex workflows need multiple AI models working together — but building and orchestrating them requires deep LangGraph/CrewAI expertise your team doesn\'t have.',
    solution:
      'Custom multi-agent pipelines using CrewAI, LangGraph, or AutoGen. Each agent has a role, memory, and tools. Fully autonomous, 14-21 day delivery.',
    resultText: 'End-to-end autonomous pipelines shipped',
    metric: '21',
    metricLabel: 'days to production',
    quote:
      'We had 4 separate tools doing parts of our research workflow. Chiranjib built one multi-agent system that replaced all of them. Our analysts now do in 20 minutes what used to take 2 days.',
    quotePerson: 'Vikram A., Research & Investment Firm, Mumbai',
    painTags: ['2 days per report', 'Tool sprawl chaos', 'Analysts burned out'],
    buildDays: '21 days',
  },

  'mcp-servers': {
    serviceId: 'mcp-servers',
    title: 'MCP Server Dev',
    tagline: 'Give AI models real tools to work with',
    category: 'Agentic AI',
    problem:
      'Your AI assistant can\'t access your internal data, APIs, or tools — it\'s trapped in a chat box with no real capabilities.',
    solution:
      'Custom Model Context Protocol servers that give Claude/GPT direct access to your databases, APIs, calendars, CRMs, and custom tools.',
    resultText: 'AI connected to your full tool ecosystem',
    metric: '48',
    metricLabel: 'hrs to first MCP',
    quote:
      'Our Claude instance was useless without access to our internal systems. Chiranjib built an MCP server in under 48 hours. Now our AI actually knows our product, our clients, our calendar. It\'s a completely different tool.',
    quotePerson: 'Neha P., Product Lead, B2B SaaS Startup, Hyderabad',
    painTags: ['AI stuck in a sandbox', '48hrs to unlock', 'Zero real capabilities'],
    buildDays: '2 days',
  },

  'browser-agents': {
    serviceId: 'browser-agents',
    title: 'AI Browser Agents',
    tagline: 'AI that browses the web like a human',
    category: 'Agentic AI',
    problem:
      'Repetitive web tasks — form fills, data extraction, site monitoring — eat 20+ hours/week of your team\'s time.',
    solution:
      'Autonomous browser agents using Playwright + AI. They navigate, click, fill forms, extract data, and handle dynamic sites — 24/7 without supervision.',
    resultText: 'Human-level web automation, zero supervision',
    metric: '20+',
    metricLabel: 'hrs/week saved',
    quote:
      'We used to have a junior employee spend 4 hours every morning filling forms and extracting competitor data. The browser agent does it overnight, perfectly, and I get a clean report in my inbox by 8am.',
    quotePerson: 'Rohit D., E-commerce Operations Head, Ahmedabad',
    painTags: ['4hrs manual daily', 'Stale competitor data', 'Junior staff on grunt work'],
    buildDays: '7 days',
  },

  'chatbot-builder': {
    serviceId: 'chatbot-builder',
    title: 'AI Chatbot Builder',
    tagline: 'Branded AI on your website in days',
    category: 'Agentic AI',
    problem:
      'Your website visitors leave without getting answers. Support tickets pile up. Your team answers the same 50 questions every day.',
    solution:
      'Custom no-code/low-code AI chatbots trained on your docs, FAQs, and products. Deployed on your site in 5-7 days.',
    resultText: '80% of support queries handled automatically',
    metric: '80%',
    metricLabel: 'queries automated',
    quote:
      'Before the chatbot, my support team was drowning in the same repetitive questions. Within a week of launch, 80% of tickets disappeared. My team now only handles real escalations. It paid for itself in the first month.',
    quotePerson: 'Kavya R., Customer Success Director, EdTech Platform, Pune',
    painTags: ['50 repeated questions/day', 'Support team drowning', 'Leads leaving unanswered'],
    buildDays: '7 days',
  },

  'ai-agent': {
    serviceId: 'ai-agent',
    title: 'AI Agent Development',
    tagline: 'Autonomous agents that execute multi-step tasks',
    category: 'AI & LLM',
    problem:
      'You need AI that doesn\'t just chat — it actually does things. Research, write, search, decide, and act — without hand-holding.',
    solution:
      'Custom autonomous agents with memory, tool use, and multi-step reasoning. Integrated with your APIs and data sources. 14-21 day build.',
    resultText: 'Fully autonomous task execution',
    metric: '14',
    metricLabel: 'days to deploy',
    quote:
      'I wanted an agent that could research a company, write a personalised outreach email, and log it to our CRM — all by itself. Chiranjib built exactly that. Our sales team went from 20 outreach emails a day to 200.',
    quotePerson: 'Aditya N., Sales Director, B2B Tech Company, Bangalore',
    painTags: ['20 outreaches/day limit', 'Research taking hours', 'CRM always outdated'],
    buildDays: '14 days',
  },

  'rag-llm': {
    serviceId: 'rag-llm',
    title: 'RAG & LLM Integration',
    tagline: 'Your data + AI = instant knowledge base',
    category: 'AI & LLM',
    problem:
      'Your team wastes hours searching internal docs, past projects, and knowledge bases for answers that should take seconds.',
    solution:
      'Retrieval-Augmented Generation system built on your docs, PDFs, Notion, Confluence — any data source. Semantic search + LLM answers.',
    resultText: 'Instant answers from your entire knowledge base',
    metric: '10x',
    metricLabel: 'faster knowledge retrieval',
    quote:
      'Our support team used to search through 500-page PDFs and email chains to find answers for clients. Now they just ask the AI and get the exact answer in 3 seconds. We cut our average response time from 4 hours to 12 minutes.',
    quotePerson: 'Siddharth R., Legal Tech CTO, Delhi',
    painTags: ['4hr avg response time', '500-page manual searches', 'Junior staff errors'],
    buildDays: '10 days',
  },

  'langchain': {
    serviceId: 'langchain',
    title: 'LangChain Development',
    tagline: 'Complex LLM chains built to production standard',
    category: 'AI & LLM',
    problem:
      'You need AI pipelines that chain multiple steps — summarize, classify, extract, route — but LangChain\'s complexity slows your team down.',
    solution:
      'Production LangChain applications with chains, agents, memory, and custom tools. Clean architecture, tested, documented.',
    resultText: 'Production LangChain apps in 10-14 days',
    metric: '100%',
    metricLabel: 'test coverage',
    quote:
      'Our internal dev team spent 3 weeks trying to build a LangChain pipeline and it kept breaking in production. Chiranjib rebuilt it in 12 days, added proper test coverage, and it has not failed once in 4 months.',
    quotePerson: 'Manish T., CTO, HealthTech Startup, Chennai',
    painTags: ['3 weeks wasted internally', 'Pipeline crashing in prod', 'No test coverage'],
    buildDays: '12 days',
  },

  'voice-agent': {
    serviceId: 'voice-agent',
    title: 'Voice AI Agent',
    tagline: 'AI that listens, thinks, and speaks',
    category: 'AI & LLM',
    problem:
      'Phone calls and voice interactions can\'t be automated — so your team handles hundreds of repetitive calls, demos, and support queries manually.',
    solution:
      'End-to-end voice AI pipelines: speech-to-text → LLM reasoning → text-to-speech. Real-time or async, integrated with your phone system.',
    resultText: 'Human-quality voice AI handling your calls',
    metric: '200ms',
    metricLabel: 'response latency',
    quote:
      'We were paying 3 telecallers to handle appointment reminders and basic FAQ calls. The voice agent replaced that entire workflow. It sounds natural, handles objections, and books slots into our calendar automatically. We save ₹1.8L per month.',
    quotePerson: 'Dr. Sneha M., Clinic Chain Owner, Nagpur',
    painTags: ['₹1.8L/month on telecallers', '300 repetitive calls/day', 'Booking errors daily'],
    buildDays: '14 days',
  },

  'n8n-workflow': {
    serviceId: 'n8n-workflow',
    title: 'n8n Workflow Automation',
    tagline: '400+ integrations, zero code required',
    category: 'Automation',
    problem:
      'Your team manually copies data between apps, triggers emails by hand, and spends hours on tasks that should run automatically.',
    solution:
      'Custom n8n workflows connecting your entire tech stack. 400+ integrations — Slack, Gmail, Notion, Airtable, HubSpot, and more. 5-10 day delivery.',
    resultText: 'Full tech stack connected and automated',
    metric: '400+',
    metricLabel: 'integrations available',
    quote:
      'Our entire lead pipeline is now automated. A lead fills a form, it goes into HubSpot, gets scored by AI, triggers a Slack alert, sends a personalised email, and books a discovery call — all without anyone touching it. 6 hours of manual work every day — gone.',
    quotePerson: 'Priya K., SaaS Founder, Bangalore',
    painTags: ['6hrs manual daily', 'Leads going cold', 'Data lost between tools'],
    buildDays: '7 days',
  },

  'make-automation': {
    serviceId: 'make-automation',
    title: 'Make Automation',
    tagline: 'Visual workflows that actually get built',
    category: 'Automation',
    problem:
      'Your Zapier bill is exploding, or your current automations keep breaking and nobody knows how to fix them.',
    solution:
      'Make (Integromat) scenarios built by an expert — visual, maintainable, cost-effective. Complex multi-step workflows in 3-7 days.',
    resultText: 'Cost-effective automation that stays running',
    metric: '60%',
    metricLabel: 'lower than Zapier cost',
    quote:
      'We were paying $400/month on Zapier for broken automations that someone had to babysit. Chiranjib migrated everything to Make in 5 days, cut our bill by 60%, and nothing has broken since. I wish I had done this 2 years ago.',
    quotePerson: 'Ankit S., Operations Lead, D2C Brand, Delhi',
    painTags: ['$400/month Zapier bill', 'Automations breaking weekly', 'No one to fix them'],
    buildDays: '5 days',
  },

  'zapier-automation': {
    serviceId: 'zapier-automation',
    title: 'Zapier Automation',
    tagline: 'Business workflows on autopilot',
    category: 'Automation',
    problem:
      'You know Zapier exists but can\'t build the right Zaps, or your current automation breaks every time an app updates.',
    solution:
      'Expert Zapier setup — complex multi-step Zaps with filters, formatters, paths, and error handling. Business-critical workflows that don\'t break.',
    resultText: 'Bulletproof Zapier workflows, maintained',
    metric: '3',
    metricLabel: 'day turnaround',
    quote:
      'I had been meaning to set up Zapier for 6 months but kept procrastinating because it felt complicated. Chiranjib set up 8 Zaps in 3 days that now save my team 15 hours a week. I don\'t know why I waited so long.',
    quotePerson: 'Pooja V., Agency Owner, Surat',
    painTags: ['6 months of procrastination', '15hrs/week wasted', 'Tools never talking to each other'],
    buildDays: '3 days',
  },

  'airtable-automation': {
    serviceId: 'airtable-automation',
    title: 'Airtable + AI',
    tagline: 'Your database that thinks for itself',
    category: 'Automation',
    problem:
      'Your Airtable is a mess of manual data entry, no automation, and team members duplicating work across tabs.',
    solution:
      'Airtable with AI automations — auto-classify records, trigger actions, generate summaries, sync with external apps. Your database becomes active.',
    resultText: 'Smart database that runs workflows automatically',
    metric: '5',
    metricLabel: 'days to transform',
    quote:
      'Our Airtable was basically a fancy spreadsheet. Now it auto-tags every lead, generates a client brief, triggers onboarding emails, and updates our project tracker — all from one form submission. My team\'s jaw dropped when they saw the demo.',
    quotePerson: 'Ruchika B., Creative Agency Founder, Kolkata',
    painTags: ['Manual data entry 3hrs/day', 'Duplicate records everywhere', 'Team ignoring the CRM'],
    buildDays: '5 days',
  },

  'whatsapp-bot': {
    serviceId: 'whatsapp-bot',
    title: 'WhatsApp Bot',
    tagline: 'Turn conversations into conversions',
    category: 'Automation',
    problem:
      'Your team manually handles 200+ WhatsApp messages daily — qualifying leads, answering FAQs, scheduling calls. Hours wasted, leads lost.',
    solution:
      'Custom WhatsApp Bot via Meta Business API — AI qualifies leads, sends broadcast sequences, books calls, syncs to your CRM automatically.',
    resultText: '847 leads/month automated, 12hrs saved daily',
    metric: '847',
    metricLabel: 'leads/month',
    quote:
      'We went from manually replying to 200 WhatsApp messages a day to our bot handling everything — qualification, FAQs, site visits, follow-ups. Chiranjib delivered in 10 days. Our conversion rate jumped 40% because we stopped losing leads to slow replies.',
    quotePerson: 'Arjun M., Real Estate Agency, Pune',
    painTags: ['200 manual messages/day', 'Leads lost to slow replies', '12hrs/day wasted'],
    buildDays: '10 days',
  },

  'email-automation': {
    serviceId: 'email-automation',
    title: 'Email Automation',
    tagline: 'Drip sequences that convert while you sleep',
    category: 'Automation',
    problem:
      'Your email list is cold, your follow-ups are manual, and you\'re leaving money on the table with every lead who doesn\'t hear from you.',
    solution:
      'AI-personalized drip sequences with behavioral triggers — welcome series, nurture campaigns, re-engagement flows. 5-10 day setup.',
    resultText: 'Automated sequences running 24/7',
    metric: '3x',
    metricLabel: 'email open rate lift',
    quote:
      'We had 8,000 people on our email list and were doing exactly nothing with them. Chiranjib set up a 12-email nurture sequence with behavioural triggers. In the first 30 days we made ₹4.2L from a list we had completely ignored.',
    quotePerson: 'Tanmay G., Online Course Creator, Jaipur',
    painTags: ['8,000 cold subscribers', '₹0 from email list', 'Zero follow-up system'],
    buildDays: '7 days',
  },

  'crm-automation': {
    serviceId: 'crm-automation',
    title: 'CRM Automation',
    tagline: 'Your sales pipeline on autopilot',
    category: 'Automation',
    problem:
      'Your CRM data is always outdated, deal stages are wrong, and your sales team spends 3hrs/day on data entry instead of selling.',
    solution:
      'Full CRM automation on Zoho or HubSpot — auto-assign leads, update deal stages, trigger follow-ups, generate reports. 7-14 day implementation.',
    resultText: 'Sales team focused on selling, not data entry',
    metric: '3hrs',
    metricLabel: 'saved per rep/day',
    quote:
      'My salespeople hated the CRM because they spent more time updating it than selling. After Chiranjib automated it, deal stages update automatically, follow-ups trigger on their own, and my team finally trusts the data. Pipeline accuracy went from 40% to 95%.',
    quotePerson: 'Suresh K., Sales VP, Manufacturing SME, Coimbatore',
    painTags: ['3hrs/day on data entry', 'Pipeline data 40% wrong', 'Sales team avoiding CRM'],
    buildDays: '10 days',
  },

  'web-scraping': {
    serviceId: 'web-scraping',
    title: 'Web Scraping',
    tagline: 'Any data from any website, at scale',
    category: 'Data & Scraping',
    problem:
      'You need competitor prices, lead lists, market data, or job listings — but manual collection takes days and goes stale immediately.',
    solution:
      'Production web scrapers with anti-bot bypass (rotating proxies, browser fingerprinting, CAPTCHA handling). Fresh data delivered to your database.',
    resultText: 'Thousands of records extracted daily, automatically',
    metric: '50k+',
    metricLabel: 'records/day',
    quote:
      'We were paying a team of 3 people to manually compile competitor pricing every week. Chiranjib built a scraper that pulls 50,000 SKU prices every night and loads it directly into our dashboard. We made our first pricing strategy decision based on real-time data within a week.',
    quotePerson: 'Harsh V., Head of Growth, Retail Startup, Mumbai',
    painTags: ['3-person manual team', 'Week-old stale data', '50k SKUs to track'],
    buildDays: '7 days',
  },

  'data-pipelines': {
    serviceId: 'data-pipelines',
    title: 'Data Pipelines & ETL',
    tagline: 'Raw data in, clean insights out',
    category: 'Data & Scraping',
    problem:
      'Your data lives in 10 different places, nobody trusts the numbers, and every report takes a week to build because it\'s all manual.',
    solution:
      'Automated ETL pipelines that extract from any source, transform and clean, load to your data warehouse. Scheduled, monitored, alerting on failure.',
    resultText: 'Single source of truth, updated automatically',
    metric: '99.9%',
    metricLabel: 'pipeline uptime',
    quote:
      'Every Monday our data team spent the entire day manually pulling reports from 6 different systems. Chiranjib built an ETL pipeline that does it overnight. By Monday morning, the dashboard is already updated. We got an entire day back every single week.',
    quotePerson: 'Divya S., Head of Analytics, Logistics Company, Hyderabad',
    painTags: ['6 siloed data sources', 'Full Monday wasted on reports', 'Leaders distrust the numbers'],
    buildDays: '14 days',
  },

  'ethical-hacking': {
    serviceId: 'ethical-hacking',
    title: 'Ethical Hacking',
    tagline: 'Find vulnerabilities before attackers do',
    category: 'Security',
    problem:
      'You\'ve built a product but have no idea if it\'s secure. One breach could destroy your reputation, lose customer data, and cost millions.',
    solution:
      'Full penetration testing — network, web app, social engineering. OWASP Top 10, CVE checks, custom attack scenarios. Detailed report in 3-7 days.',
    resultText: 'Complete vulnerability assessment delivered',
    metric: 'OWASP',
    metricLabel: 'Top 10 checked',
    quote:
      'We were about to close a Series A and the investor asked for a security audit. Chiranjib ran a full pentest in 5 days, found 3 critical vulnerabilities we had no idea about, and gave us a remediation report we could show investors. The deal closed.',
    quotePerson: 'Karan M., Founder & CEO, FinTech Startup, Mumbai',
    painTags: ['Series A at risk', '3 critical vulns hidden', 'Investor audit in 5 days'],
    buildDays: '5 days',
  },

  'api-pentesting': {
    serviceId: 'api-pentesting',
    title: 'API Pentesting',
    tagline: 'Your API endpoints, battle-tested',
    category: 'Security',
    problem:
      'Your REST or GraphQL API handles sensitive data but has never been security tested. Auth flaws, injection attacks, and rate limiting gaps are hiding.',
    solution:
      'Deep API security audit — authentication bypass, injection testing, rate limiting, IDOR, mass assignment. Full report with proof-of-concept exploits.',
    resultText: 'Every API endpoint tested and secured',
    metric: '100%',
    metricLabel: 'endpoint coverage',
    quote:
      'Chiranjib found an IDOR vulnerability in our API that would have let any user access any other user\'s data. We had 80,000 users on the platform. The fix took 2 hours. The damage if it had been exploited would have been catastrophic. Best ₹30,000 I ever spent.',
    quotePerson: 'Rahul T., Backend Lead, Consumer App, Bangalore',
    painTags: ['80k users at risk', 'IDOR hiding in plain sight', 'Zero security testing ever done'],
    buildDays: '5 days',
  },

  'vapt': {
    serviceId: 'vapt',
    title: 'Web App VAPT',
    tagline: 'Full vulnerability assessment & report',
    category: 'Security',
    problem:
      'You need a formal security certification or due diligence report before a funding round, enterprise deal, or compliance audit.',
    solution:
      'Complete VAPT — automated scanning + manual testing + business logic flaws. Executive summary + technical report + remediation roadmap. 7-14 days.',
    resultText: 'Board-ready security report delivered',
    metric: '7',
    metricLabel: 'day turnaround',
    quote:
      'An enterprise client demanded a VAPT report before signing a ₹50L contract. We had 10 days. Chiranjib ran the full assessment, delivered an executive summary and technical report, and we sent it to the client on day 8. Contract signed. ROI was 1,567%.',
    quotePerson: 'Meera J., CEO, B2B SaaS Company, Noida',
    painTags: ['₹50L deal on the line', '10-day enterprise deadline', 'No prior security audit'],
    buildDays: '7 days',
  },
}

export function getServiceData(serviceId: string): ServiceDemoProps {
  return SERVICE_DEMO_DATA[serviceId] ?? SERVICE_DEMO_DATA['whatsapp-bot']
}
