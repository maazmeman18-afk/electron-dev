// "How it works" flow and "before / after" content for each service page.
// Plain descriptions of how the work flows; no prices, no invented results.
// Edit text here; the components in components/services/ only render it.

export type FlowStep = {
  title: string;
  /** One line shown on the step card. */
  text: string;
  /** What the visitor, customer or team does at this step. */
  actor: string;
  /** What the website, store, system or our team does for you. */
  system: string;
};

export type BeforeAfterRow = {
  area: string;
  before: string;
  after: string;
};

export type ServiceFlow = {
  heading: string;
  intro: string;
  actorLabel: string;
  systemLabel: string;
  steps: FlowStep[];
  takeaway: string;
  /** Optional: one step that feeds several others (shown as a highlight). */
  feeds?: { from: number; to: number[]; label: string };
  beforeAfter: {
    heading: string;
    beforeLabel: string;
    rows: BeforeAfterRow[];
    /** Honest note shown under the comparison. Always rendered. */
    note: string;
  };
};

export const serviceFlows: Record<string, ServiceFlow> = {
  "website-development": {
    heading: "How a visitor becomes an enquiry",
    intro:
      "A website earns its keep by turning searches into conversations. Here's the path one customer takes, and what we build at each step.",
    actorLabel: "What the visitor does",
    systemLabel: "What the website does for you",
    steps: [
      { title: "Search", text: "Types your service and city into Google", actor: "Searches for a service in their city", system: "SEO setup helps your page match the search" },
      { title: "Find", text: "Sees your site in results or Maps", actor: "Scans the results", system: "A clear title and description earn the click" },
      { title: "Land", text: "Opens the page on a phone", actor: "Opens your page, usually on mobile", system: "Loads fast and reads well on any screen" },
      { title: "Trust", text: "Checks your work and reviews", actor: "Looks at your work, reviews and team", system: "Shows real projects, testimonials and who you are" },
      { title: "Contact", text: "Taps WhatsApp, call or the form", actor: "Gets in touch", system: "Contact buttons on every page; the enquiry reaches you straight away" },
      { title: "Reply", text: "Gets your answer quickly", actor: "Waits for your reply", system: "Enquiry details arrive complete, so you can answer quickly" },
      { title: "Measure", text: "Analytics records the source", actor: "Nothing", system: "Analytics records which page and search brought the enquiry" },
      { title: "Improve", text: "Grow the pages that convert", actor: "Nothing", system: "You see what works and build more of it" },
    ],
    takeaway: "A website isn't finished at launch: every enquiry shows which pages and searches bring business.",
    beforeAfter: {
      heading: "Before and after a proper website",
      beforeLabel: "No site, an old site, or social media only",
      rows: [
        { area: "Being found", before: "Customers find competitors on Google first", after: "You appear when people search for your service in your city" },
        { area: "First impression", before: "Outdated design, broken on phones", after: "Clean, fast and professional on every device" },
        { area: "Trust", before: "Customers can't see your work or reviews", after: "Your work, testimonials and team shown clearly" },
        { area: "Getting in touch", before: "Hard to find a number; enquiries get lost", after: "WhatsApp, call and form on every page" },
        { area: "Answering questions", before: "The same questions on every call", after: "Pages and FAQs answer them before the customer calls" },
        { area: "Updating", before: "Waiting on a developer for every change", after: "Your team updates services, photos and offers itself" },
        { area: "Knowing what works", before: "No idea where enquiries come from", after: "Analytics shows which pages and searches bring business" },
      ],
      note: "These are the kinds of changes a proper website brings; the actual effect depends on your market and how you use it.",
    },
  },

  "e-commerce-development": {
    heading: "How an order flows through your store",
    intro:
      "An online store is more than product pages. Here's what happens from the first look to a repeat customer, and what the store handles at each step.",
    actorLabel: "What the customer does",
    systemLabel: "What the store does for you",
    steps: [
      { title: "Discover", text: "Finds you on Google, Instagram or an ad", actor: "Finds a product through search, social or an ad", system: "Product SEO and shareable product links bring them in" },
      { title: "Browse", text: "Filters by category, budget or style", actor: "Explores categories and products", system: "Clear categories, filters, photos and videos help them choose" },
      { title: "Cart", text: "Adds products and applies an offer", actor: "Adds to cart and uses a coupon", system: "Offers and coupons apply automatically" },
      { title: "Pay", text: "UPI, card, net banking or COD", actor: "Pays online or chooses cash on delivery", system: "A secure payment gateway; money reaches your bank account" },
      { title: "Confirm", text: "Gets a confirmation; stock updates", actor: "Receives an order confirmation", system: "Confirmation sent and stock reduced automatically" },
      { title: "Ship", text: "Your team packs and dispatches", actor: "Waits for dispatch", system: "Your team sees the order, packs it and marks it shipped" },
      { title: "Deliver", text: "Tracks the order to the door", actor: "Tracks the delivery", system: "Delivery status updates for the customer" },
      { title: "Return", text: "Reviews and repeat orders", actor: "Leaves a review and comes back", system: "Offers for repeat customers and reviews build the next sale" },
    ],
    takeaway: "The customer sees a smooth checkout; your team sees every order, payment and stock change in one admin panel.",
    beforeAfter: {
      heading: "Before and after an online store",
      beforeLabel: "Selling through Instagram DMs, calls and WhatsApp",
      rows: [
        { area: "Taking orders", before: "One chat at a time; orders get missed", after: "Customers order any time, even while you sleep" },
        { area: "Showing products", before: "Photos scattered across posts and chats", after: "Every product with photos, variants and details in one place" },
        { area: "Payments", before: "Transfer screenshots checked by hand", after: "Online payments confirmed automatically" },
        { area: "Stock", before: "Guessing what's available", after: "Stock updates with every order" },
        { area: "Order tracking", before: "Customers keep asking where their order is", after: "Status updates the customer can check" },
        { area: "Reach", before: "Only people who already follow you", after: "Customers searching on Google find your products" },
        { area: "Knowing what sells", before: "Rough memory", after: "Reports on top products, offers and where buyers came from" },
      ],
      note: "These are the kinds of changes an online store brings; the actual effect depends on your products and marketing.",
    },
  },

  "custom-business-software": {
    heading: "How data flows through your business",
    intro:
      "The real value of business software is that you enter information once and it flows everywhere it's needed. Here's how one sale moves through a connected system, the same flow we built for GUJJUBAZAR's showrooms.",
    actorLabel: "What your team does",
    systemLabel: "What the system does automatically",
    steps: [
      { title: "Enquiry", text: "Walk-in, call, WhatsApp or website", actor: "Notes who called or walked in", system: "Records the source: showroom, website, WhatsApp or referral" },
      { title: "Customer", text: "Saved in the CRM with source and salesman", actor: "Confirms name and phone", system: "Finds existing customers and keeps the full history in one place" },
      { title: "Bill", text: "One form: branch, items, delivery date", actor: "Fills one form: items, branch, salesman, delivery date", system: "Works out totals, numbers the bill and creates a shareable copy" },
      { title: "Payment", text: "Advance and balance tracked", actor: "Takes the advance", system: "Tracks paid and due amounts; shows who still owes what" },
      { title: "Stock", text: "Updated for that branch", actor: "Nothing", system: "Updates stock at that branch with the sale" },
      { title: "Delivery", text: "Scheduled and tracked", actor: "Confirms the delivery", system: "Keeps the delivery status visible to the team" },
      { title: "Dashboard", text: "Sales and profit by branch", actor: "The owner checks the numbers", system: "Shows sales, costs and profit by branch, salesman and source" },
      { title: "Follow-up", text: "Feedback and referrals", actor: "Follows up with the customer", system: "Keeps feedback and referral rewards in one place" },
    ],
    takeaway: "One entry, used five times: the details typed at the bill also update payments, stock, delivery, the dashboard and follow-ups.",
    feeds: { from: 2, to: [3, 4, 5, 6, 7], label: "One entry, used five times" },
    beforeAfter: {
      heading: "Before and after: what changes for your team",
      beforeLabel: "Sheets, notebooks and WhatsApp",
      rows: [
        { area: "Billing", before: "Handwritten or Excel bills; formats differ by branch", after: "One bill form for every branch; consistent, numbered bills" },
        { area: "Customer history", before: "Scattered across phones and chat groups", after: "Every customer's purchases, payments and feedback in one place" },
        { area: "Pending payments", before: "Someone keeps a list and has to remember", after: "Due amounts visible at a glance" },
        { area: "Stock", before: "Counted by hand; branches call each other", after: "Stock per branch, updated with every bill" },
        { area: "Owner's view", before: "Waiting for each branch's numbers at month-end", after: "Sales, costs and profit by branch whenever you look" },
        { area: "Salesmen and referrals", before: "Commissions and rewards worked out by hand", after: "Tracked in the system, with a portal for referral partners" },
        { area: "Decisions", before: "Based on memory and estimates", after: "Based on reports: which branch, product and source performs best" },
        { area: "New staff", before: "Learn each branch's own way of working", after: "Learn one system with clear roles" },
      ],
      note: "These are the kinds of changes connected software brings; the actual effect depends on your business and how the team uses it.",
    },
  },

  "seo-and-analytics": {
    heading: "How a search becomes an enquiry you can measure",
    intro:
      "SEO isn't magic. It's a chain, and each link can be improved and measured.",
    actorLabel: "What happens",
    systemLabel: "What we do",
    steps: [
      { title: "Search", text: "A customer searches your service and city", actor: "A customer searches for what you offer", system: "Keyword research finds the searches that bring buyers" },
      { title: "Crawl", text: "Google reads your site", actor: "Google reads your pages", system: "Technical SEO: speed, mobile, sitemap, structured data" },
      { title: "Rank", text: "Your page shows for that search", actor: "Google decides who to show", system: "On-page content, local SEO, reviews and links" },
      { title: "Click", text: "Your result wins the click", actor: "The customer picks a result", system: "Titles and descriptions written to earn the click" },
      { title: "Convert", text: "They call, WhatsApp or fill the form", actor: "The visitor decides to contact you", system: "Pages that answer questions, with clear contact buttons" },
      { title: "Track", text: "The enquiry and its source are recorded", actor: "An enquiry arrives", system: "GA4 and Search Console record which search and page brought it" },
      { title: "Report", text: "Searches, traffic and enquiries each month", actor: "You see the results", system: "A monthly report on searches, traffic and enquiries" },
      { title: "Improve", text: "Next month targets what works", actor: "The cycle repeats", system: "Next month's work focuses on what brings enquiries" },
    ],
    takeaway: "We measure the whole chain, so SEO is judged by enquiries, not by rankings alone.",
    beforeAfter: {
      heading: "Before and after SEO",
      beforeLabel: "Before SEO",
      rows: [
        { area: "On Google", before: "Competitors show up; you don't", after: "You appear for the services and cities you target" },
        { area: "Google Maps", before: "Missing or incomplete profile", after: "A complete Google Business Profile with reviews and posts" },
        { area: "Website health", before: "Slow pages and errors Google can't read", after: "Fast, error-free pages Google indexes properly" },
        { area: "Content", before: "Pages that don't answer customer questions", after: "Service pages and articles that match what people search" },
        { area: "Tracking", before: "No idea where enquiries come from", after: "Every enquiry traced to its search and page" },
        { area: "Decisions", before: "Guessing what to do next", after: "A monthly plan based on what brings enquiries" },
      ],
      note: "These are the kinds of changes SEO work brings; results depend on competition and take months, not days.",
    },
  },
};
