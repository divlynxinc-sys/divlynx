/**
 * Blog content lives here as structured blocks rather than markdown, so there
 * is no parser dependency and the prerenderer emits identical HTML to the SPA.
 *
 * Block types: p | h2 | h3 | ul | ol | quote | note
 */

export const POSTS = [
  {
    slug: "claude-ai-in-production",
    title: "Claude AI in production: where it fits and where it does not",
    excerpt:
      "Claude is capable at analysis, writing, coding and tool use, but choosing a model is only one part of a reliable production system. The surrounding workflow matters more.",
    date: "2026-10-29",
    readingMinutes: 7,
    tags: ["Claude AI", "AI engineering", "Production"],
    body: [
      { type: "p", text: "Claude is often evaluated as a chat interface: paste in a difficult document, ask for code, or compare two strategies. Production use is different. The model sits inside a system with permissions, source data, tools, failure states and a budget. That system determines whether a strong demo becomes dependable software." },
      { type: "h2", text: "Start with the job, not the model" },
      { type: "p", text: "Claude is a good candidate when the work depends on understanding long or messy context, producing careful language, reasoning across several constraints, or deciding which tool to use next. It is less useful when an ordinary database query, rules engine or deterministic script can produce the correct answer faster and more cheaply." },
      { type: "ul", items: ["Document review where the source material is too varied for rigid parsing", "Research and synthesis with links back to evidence", "Coding work that requires reading, editing and validating across a repository", "Customer or operations workflows where the model can gather context before proposing an action"] },
      { type: "h2", text: "Tools turn a model into a system" },
      { type: "p", text: "A model can describe what should happen. A tool lets it retrieve the customer record, search the knowledge base, create the draft, or update the ticket. Keep every tool narrow, clearly named and explicit about its inputs. A tool called update_customer is harder to govern than separate tools for adding a note, changing an address and closing an account." },
      { type: "note", text: "Treat tool descriptions as part of the product. Ambiguous names and overlapping capabilities create unreliable behaviour even when the model is excellent." },
      { type: "h2", text: "Design for review and recovery" },
      { type: "p", text: "The safest first version separates recommendation from execution. Claude can assemble evidence and draft the next action while a person approves anything that sends externally, changes money, deletes data or affects a customer. Log the prompt, tool calls, tool results and final outcome so failures can be reproduced rather than debated." },
      { type: "h2", text: "The production checklist" },
      { type: "ol", items: ["Define a measurable success condition for the task", "Give the model the smallest useful set of tools and data", "Require structured outputs where another system consumes the result", "Add time, cost and iteration limits", "Test ordinary cases, missing data, conflicting instructions and tool failures", "Escalate high-impact or uncertain actions to a person"] },
      { type: "quote", text: "The model is the reasoning engine. Reliability comes from the permissions, data contracts, evaluations and recovery paths around it." },
    ],
  },
  {
    slug: "ai-skills-vs-tools",
    title: "AI skills and tools: the difference that makes agents easier to maintain",
    excerpt:
      "Tools give an agent capabilities. Skills give it reusable operating knowledge. Keeping those two layers separate produces clearer, safer systems.",
    date: "2026-10-22",
    readingMinutes: 6,
    tags: ["AI skills", "Tool use", "Architecture"],
    body: [
      { type: "p", text: "Skills and tools are frequently grouped together because both expand what an AI system can do. They solve different problems. A tool is an interface to an action or source of data. A skill is a reusable set of instructions, checks and supporting knowledge for completing a type of work well." },
      { type: "h2", text: "A tool provides capability" },
      { type: "p", text: "Search the CRM, read a file, send an email, run a query and create an invoice are tools. Each should have a small contract: a clear purpose, typed inputs, a predictable response and an honest error. The model chooses a tool, but your application still controls authentication, execution and permissions." },
      { type: "h2", text: "A skill provides method" },
      { type: "p", text: "A proposal-review skill might explain which documents to inspect, how to compare scope against pricing, which risks to flag, what evidence to cite and the required output format. It can reuse several tools without embedding their credentials or implementation details." },
      { type: "ul", items: ["Tool: fetch the signed contract. Skill: review a proposal against the contract.", "Tool: query support tickets. Skill: prepare a weekly customer-risk digest.", "Tool: edit repository files. Skill: implement and verify an accessibility fix."] },
      { type: "h2", text: "Why the separation matters" },
      { type: "p", text: "When process knowledge is buried inside tool code, every policy change becomes a deployment. When API details are buried inside a skill, instructions become brittle and credentials become harder to govern. Separate layers let operations teams improve the method while engineers maintain secure integrations." },
      { type: "note", text: "A skill should state when it applies, what success looks like, which evidence is required and when the agent must stop for approval." },
      { type: "h2", text: "A practical design sequence" },
      { type: "ol", items: ["Write the successful human workflow in plain language", "Extract the external actions and data access into narrow tools", "Package the repeatable judgment and checks as a skill", "Give the agent only the tools required for that skill", "Evaluate the final business outcome, not just whether each tool call succeeded"] },
      { type: "quote", text: "Tools define what the agent can do. Skills define how your organisation wants the work done." },
    ],
  },
  {
    slug: "what-makes-an-ai-agent",
    title: "What makes an AI agent different from a chatbot?",
    excerpt:
      "An agent does more than answer. It manages a multi-step task, chooses tools, checks progress and knows when to finish or hand control back.",
    date: "2026-10-15",
    readingMinutes: 6,
    tags: ["AI agents", "Automation", "Guardrails"],
    body: [
      { type: "p", text: "A conversational interface does not automatically make software an agent. A chatbot answers a turn. An agent owns progress toward a goal: it decides what information is missing, chooses an allowed action, observes the result and continues until the task is complete or needs a person." },
      { type: "h2", text: "The minimum useful agent" },
      { type: "ul", items: ["A goal and instructions that define success", "Tools for retrieving information or taking approved actions", "State so the system knows what has already happened", "A loop that can plan, act, observe and decide what comes next", "Guardrails and an escalation path when confidence or authority runs out"] },
      { type: "h2", text: "Use a workflow when the path is known" },
      { type: "p", text: "If every invoice follows the same validation and approval steps, normal workflow code is easier to test and cheaper to run. Put a model inside a step only where interpretation is needed. Letting a model rediscover a fixed process on every run adds variability without adding value." },
      { type: "h2", text: "Use an agent when the path depends on what it finds" },
      { type: "p", text: "Incident investigation is a better agent candidate. The next action depends on logs, recent deployments, service health and earlier tool results. The path cannot be fully enumerated in advance, but the permissions, limits and definition of done still can." },
      { type: "note", text: "Autonomy should be scoped, not absolute. Give an agent freedom to choose the next diagnostic step without automatically giving it permission to restart production." },
      { type: "h2", text: "Single agent before multi-agent" },
      { type: "p", text: "Multiple specialist agents can help when work has genuinely different contexts or evaluation criteria, such as research, drafting and compliance review. They also multiply handoffs, latency and debugging effort. Begin with one agent and split only when the traces show a clear separation of concerns." },
      { type: "h2", text: "Measure the task, not the conversation" },
      { type: "p", text: "A fluent answer is not the outcome. Track completion rate, human corrections, unsafe attempts, time to resolution, tool failures and cost per successful task. Those numbers reveal whether the agent is operating software or merely producing convincing text." },
      { type: "quote", text: "An agent is useful when it can make bounded decisions between steps. If the path is fixed, build a workflow." },
    ],
  },
  {
    slug: "agentic-ai-without-the-hype",
    title: "Agentic AI without the hype: a practical architecture",
    excerpt:
      "Agentic AI is a design pattern, not a magic product category. Here is the smallest architecture that can plan, act, recover and remain governable.",
    date: "2026-10-08",
    readingMinutes: 8,
    tags: ["Agentic AI", "System design", "Evaluations"],
    body: [
      { type: "p", text: "Agentic AI describes systems in which a model has some control over the sequence of work. That can be valuable when the route to an outcome changes with each case. It also means the application must handle uncertainty, permissions and recovery explicitly." },
      { type: "h2", text: "The smallest responsible architecture" },
      { type: "ol", items: ["Receive a goal and convert it into an explicit task state", "Load only the context relevant to the current decision", "Offer a small set of permissioned tools", "Execute one action and record the observation", "Check completion, limits and escalation conditions", "Repeat only while the expected value of another step remains positive"] },
      { type: "h2", text: "Keep state outside the prompt" },
      { type: "p", text: "Prompts are context, not a database. Store task status, approvals, artifacts and tool outcomes in application state. The model should receive a useful view of that state on each turn, while your system remains the source of truth." },
      { type: "h2", text: "Permissions belong to the application" },
      { type: "p", text: "The model may request a refund, deployment or outbound message. Code decides whether that request is allowed, requires approval or must be rejected. This is the same separation used in conventional secure software: intelligence proposes; policy authorises." },
      { type: "h2", text: "Every loop needs a budget" },
      { type: "ul", items: ["Maximum number of model turns and tool calls", "Time and token budgets", "Per-tool rate and spend limits", "A repeated-failure detector", "A clear final state for success, partial completion and escalation"] },
      { type: "note", text: "A stop condition is a product feature. Without one, an agent can continue exploring after the task is already uneconomical or impossible." },
      { type: "h2", text: "Evaluate trajectories, not only final answers" },
      { type: "p", text: "Two agents can reach the same answer through very different paths. Review whether the system chose appropriate tools, respected permissions, cited the right evidence, avoided unnecessary steps and recovered cleanly from failure. A correct final sentence does not excuse a dangerous trajectory." },
      { type: "h2", text: "Where to begin" },
      { type: "p", text: "Choose one bounded workflow with recoverable mistakes and a visible owner. Run the agent in recommendation mode, collect traces, turn recurring failures into tests, and add write permissions one action at a time. Production autonomy is earned through evidence." },
      { type: "quote", text: "The goal is not maximum autonomy. It is the minimum autonomy required to complete useful work reliably." },
    ],
  },
  {
    slug: "how-to-choose-your-first-automation",
    title: "How to choose the first process worth automating",
    excerpt:
      "Most automation projects fail because the wrong process was picked, not because the technology was wrong. Here is the filter we use before quoting anything.",
    date: "2026-06-18",
    readingMinutes: 6,
    tags: ["AI automation", "Process design"],
    body: [
      {
        type: "p",
        text: "Almost every automation project that goes badly went wrong before a single line of code was written. The team picked a process that looked painful rather than one that was actually a good candidate, and everything downstream inherited that mistake.",
      },
      {
        type: "p",
        text: "We run every prospective project through the same four questions. If a process fails two of them, we say so and suggest a different starting point, it is a much cheaper conversation than the one six weeks later.",
      },
      { type: "h2", text: "1. Does it happen often enough to matter?" },
      {
        type: "p",
        text: "Frequency beats duration. A five-minute task done ninety times a week is a far better target than a two-day task done twice a year. The two-day task feels more painful when you are doing it, which is exactly why teams nominate it, but the annual saving is smaller and the edge cases are worse, because nobody remembers how it works.",
      },
      {
        type: "p",
        text: "A rough floor: if the task does not consume at least five hours a week across the team, the payback period usually stretches past the point where anyone still cares.",
      },
      { type: "h2", text: "2. Are the rules written down, or in someone's head?" },
      {
        type: "p",
        text: "This is the question that kills the most candidates. If the process depends on a person knowing that this particular client always wants the invoice split, and that supplier's dates are in American format, then you do not have a process, you have an expert. Automating around an undocumented expert produces a system that is confidently wrong.",
      },
      {
        type: "p",
        text: "The fix is not to abandon the idea. It is to spend the first week writing the rules down. That document has value whether or not you automate anything, which is why we hand it over regardless.",
      },
      { type: "h2", text: "3. What does being wrong cost?" },
      {
        type: "p",
        text: "Sort your candidates by blast radius. Drafting a reply that a human approves before it sends is low risk. Issuing a refund is not. Start where a mistake is embarrassing rather than expensive, prove the thing works, and move up.",
      },
      {
        type: "note",
        text: "A useful rule: anything that moves money, sends something to a customer, or cannot be undone gets a human approval step in version one. You can remove it later once you have the numbers to justify it.",
      },
      { type: "h2", text: "4. Is the data already somewhere a machine can reach?" },
      {
        type: "p",
        text: "If the input arrives as a PDF attached to an email, that is workable. If it arrives as a photo of a screen sent over WhatsApp, you are signing up for an OCR project you did not plan. Check where the data actually lives before you scope the automation, not after.",
      },
      { type: "h2", text: "The shape of a good first project" },
      {
        type: "p",
        text: "Put those four together and a good first candidate looks like this: it happens many times a week, the rules can be written down in an afternoon, a mistake is recoverable, and the data arrives in a structured or semi-structured form.",
      },
      {
        type: "ul",
        items: [
          "Inbound enquiry triage, high volume, clear rules, a human still sends the reply",
          "Invoice and receipt extraction into your accounting system, with a review queue",
          "Weekly reporting that someone currently assembles by hand from three dashboards",
          "First-line support answers drawn from documentation you already maintain",
        ],
      },
      {
        type: "quote",
        text: "The best first automation is boring, frequent and reversible. Save the ambitious one for when the team trusts the system.",
      },
      {
        type: "p",
        text: "The point of project one is not the saving. It is to prove to the people who have to live with the system that it behaves predictably. Get that right and the second project is a much easier conversation.",
      },
    ],
  },

  {
    slug: "n8n-vs-zapier-vs-make",
    title: "n8n vs Zapier vs Make: an honest comparison",
    excerpt:
      "Three tools that look interchangeable on a feature grid and behave nothing alike once your workflows get complicated. Where each one earns its place.",
    date: "2026-05-27",
    readingMinutes: 8,
    tags: ["n8n", "Workflow tooling"],
    body: [
      {
        type: "p",
        text: "We build on all three depending on the client, so this is not a pitch for a favourite. Each one is genuinely the right answer for a particular situation, and each becomes expensive, in money or in patience, outside it.",
      },
      { type: "h2", text: "Zapier: the fastest path to something working" },
      {
        type: "p",
        text: "Zapier has the largest integration catalogue and by far the gentlest learning curve. If your automation is a straight line, this happens, then that happens, someone non-technical can build it before lunch and it will keep running.",
      },
      {
        type: "p",
        text: "Where it stops being the right tool is branching and volume. Pricing is per task, and a task is counted generously, so a workflow that fans out across several steps multiplies faster than people expect. Teams routinely discover this at renewal.",
      },
      {
        type: "ul",
        items: [
          "Best for: simple linear automations, non-technical owners, uncommon SaaS integrations",
          "Watch out for: per-task pricing at volume, limited branching, hard to version or review",
        ],
      },
      { type: "h2", text: "Make: visual complexity, at a price" },
      {
        type: "p",
        text: "Make handles branching, iteration and error routing far more comfortably than Zapier, and its canvas makes a complicated flow genuinely readable. Operations-based pricing tends to work out cheaper than Zapier at mid volume.",
      },
      {
        type: "p",
        text: "The trade-off is that complex Make scenarios become their own skill. Debugging a large scenario means clicking through modules, and moving logic between environments is awkward. It is a powerful tool that quietly becomes a single point of knowledge in a team.",
      },
      { type: "h2", text: "n8n: the one you can own" },
      {
        type: "p",
        text: "n8n is the one we reach for most, for one specific reason: you can self-host it. Your workflows, credentials and the data passing through them stay inside your own infrastructure. For anyone in healthcare, finance, legal or the public sector, that is not a preference, it is the whole decision.",
      },
      {
        type: "p",
        text: "It also has a code node, which matters more than it sounds. Every visual tool eventually meets a transformation its interface cannot express. In n8n you write six lines of JavaScript and move on; elsewhere you build a monument out of seventeen modules.",
      },
      {
        type: "note",
        text: "n8n's licence is fair-code, not classic open source. Self-hosting for your own internal use is fine. Reselling it as a hosted product for others is not. Read the terms if you plan anything commercial around it.",
      },
      {
        type: "p",
        text: "The cost is real, though: self-hosting means you own uptime, upgrades and backups. If nobody on your team wants that job, n8n Cloud exists, or one of the other two is a better fit.",
      },
      { type: "h2", text: "How we actually decide" },
      {
        type: "ol",
        items: [
          "Does sensitive data pass through the workflow? If yes, self-hosted n8n, and the conversation is largely over.",
          "Is the workflow genuinely linear and low volume? Zapier, do not over-engineer it.",
          "Is it branch-heavy but the team has no appetite for infrastructure? Make, or n8n Cloud.",
          "Will engineers maintain this long term? n8n, because workflows live in version control alongside everything else.",
        ],
      },
      {
        type: "quote",
        text: "Pick the cheapest tool that will still be the right answer in eighteen months. Migrations cost more than licences.",
      },
      {
        type: "p",
        text: "One last point that matters more than any feature comparison: whichever you choose, keep the business logic documented outside the tool. The tool will change. The rules about how your company handles a late invoice should not have to be rediscovered when it does.",
      },
    ],
  },

  {
    slug: "what-ai-voice-agents-cost",
    title: "What an AI voice agent actually costs to run",
    excerpt:
      "Vendors quote a per-minute rate. The real number includes telephony, transcription, the model, and the calls it hands to a human. Here is the full arithmetic.",
    date: "2026-04-30",
    readingMinutes: 7,
    tags: ["AI voice agents", "Pricing"],
    body: [
      {
        type: "p",
        text: "The question we get asked most often about voice agents is what they cost. The honest answer is that the headline per-minute rate is roughly half the real number, and the half nobody quotes is the half that varies most between businesses.",
      },
      { type: "h2", text: "The four things you pay for" },
      {
        type: "p",
        text: "Every voice agent call bills across four separate layers, and they stack:",
      },
      {
        type: "ul",
        items: [
          "Telephony, carrying the call itself, billed per minute, plus the number rental",
          "Speech to text, turning the caller's audio into text the model can read",
          "The language model, reasoning over the conversation and deciding what to do",
          "Text to speech, the voice your caller hears, priced per character or per second",
        ],
      },
      {
        type: "p",
        text: "As a rule of thumb in mid-2026, a straightforward reception-style call lands somewhere between eight and twenty cents a minute all in, depending mostly on which voice and which model you choose. A premium voice can cost more than the reasoning does.",
      },
      { type: "h2", text: "The costs that are not per-minute" },
      {
        type: "p",
        text: "This is where budgets go wrong. Three line items sit outside the per-minute rate and usually dominate the first year.",
      },
      { type: "h3", text: "Escalations" },
      {
        type: "p",
        text: "Some percentage of calls will be handed to a person. That is a feature, not a failure, but it means you are paying for both the agent's attempt and the human's time. Model your cost per resolved call, not your cost per minute, or you will flatter the numbers.",
      },
      { type: "h3", text: "Integration work" },
      {
        type: "p",
        text: "An agent that cannot see your calendar or write to your CRM is an expensive answering machine. The build cost is dominated by wiring it into the systems where the work actually lands, and that is a one-off engineering project, not a subscription.",
      },
      { type: "h3", text: "Evaluation and tuning" },
      {
        type: "p",
        text: "You need to listen to real calls, find the ones that went wrong, and fix them. Budget ongoing time for this. Teams that skip it end up with an agent that quietly degrades as the business changes around it.",
      },
      {
        type: "note",
        text: "Ask any vendor for their escalation rate and their average handle time on a comparable deployment. If they cannot produce both, they have not measured the thing that determines your bill.",
      },
      { type: "h2", text: "When the arithmetic works" },
      {
        type: "p",
        text: "Voice agents pay for themselves fastest where call volume is high, calls are short and repetitive, and the cost of a missed call is concrete. Appointment booking, opening hours, order status, reservation changes, out-of-hours triage.",
      },
      {
        type: "p",
        text: "They pay off slowest where every call is different, emotionally charged, or where the caller has already tried the website and failed. Those callers want a person, and giving them a machine costs you more than the call.",
      },
      {
        type: "quote",
        text: "The strongest case for a voice agent is rarely cost per call. It is the calls you currently never answer.",
      },
      {
        type: "p",
        text: "For most of the businesses we work with, the compelling number was not the saving on staffed hours. It was the third of inbound calls that previously rang out after six and were never returned.",
      },
    ],
  },

  {
    slug: "rag-in-production",
    title: "RAG in production: what actually breaks",
    excerpt:
      "Retrieval-augmented generation demos beautifully and degrades quietly. The failure modes we see most, and what to do about each one.",
    date: "2026-03-22",
    readingMinutes: 8,
    tags: ["AI automation", "Engineering"],
    body: [
      {
        type: "p",
        text: "Retrieval-augmented generation is the standard way to make a model answer questions about your own documents. It is also the thing we are most often called in to repair, because the gap between a convincing demo and a system people trust is much wider than it looks.",
      },
      { type: "h2", text: "Failure one: retrieval is the problem, not the model" },
      {
        type: "p",
        text: "When a RAG system gives a wrong answer, the instinct is to blame the model or rewrite the prompt. Usually the model answered perfectly well using the wrong three paragraphs. If the retrieval step did not surface the right source, no amount of prompt engineering will save the answer.",
      },
      {
        type: "p",
        text: "Measure retrieval separately. Build a set of real questions with the documents that should be returned, and score whether they appear in the top results at all. Fix that number before touching anything else.",
      },
      { type: "h2", text: "Failure two: chunking that cuts the meaning in half" },
      {
        type: "p",
        text: "Splitting documents every 500 characters is the default in every tutorial, and it routinely severs a table from its heading or a clause from the condition that qualifies it. The retrieved chunk is then technically relevant and practically misleading.",
      },
      {
        type: "ul",
        items: [
          "Split on document structure, headings, sections, list boundaries, before falling back to length",
          "Keep the heading trail in each chunk so the model knows what it is reading",
          "Store tables whole, even when that makes them large",
          "Overlap adjacent chunks so a sentence spanning a boundary is not lost",
        ],
      },
      { type: "h2", text: "Failure three: nobody deletes anything" },
      {
        type: "p",
        text: "This is the one that bites six months in. Someone updates a policy document, the new version is indexed, and the old one is still sitting there. Now retrieval returns both, and the model confidently cites last year's rules.",
      },
      {
        type: "note",
        text: "Version and timestamp every chunk at ingestion, and make the pipeline that adds documents also responsible for removing the versions they replace. Stale content is worse than missing content, because it looks like an answer.",
      },
      { type: "h2", text: "Failure four: no honest way to say 'I don't know'" },
      {
        type: "p",
        text: "A model asked a question with no supporting document will still produce fluent prose. Unless you explicitly instruct it to refuse, and give it a confidence signal from the retrieval step to refuse on, it will fill the gap. Users lose trust faster from one confident fabrication than from twenty honest refusals.",
      },
      { type: "h2", text: "Failure five: it is never evaluated again" },
      {
        type: "p",
        text: "The system was tested carefully at launch and never since. Meanwhile the documents changed, the model provider shipped an update, and the questions people ask drifted. Without a regression suite that runs on a schedule, degradation is invisible until someone complains.",
      },
      {
        type: "quote",
        text: "Cite sources in every answer. It is the cheapest trust mechanism you can build, and it turns your users into your evaluation team.",
      },
      { type: "h2", text: "The short version" },
      {
        type: "ol",
        items: [
          "Measure retrieval quality on its own, before end-to-end answer quality",
          "Chunk along document structure, not character counts",
          "Make deletion a first-class part of the ingestion pipeline",
          "Let the system refuse, and show its sources when it does not",
          "Keep a regression set and run it on every change to documents, prompts or models",
        ],
      },
    ],
  },

  {
    slug: "self-hosting-n8n",
    title: "Self-hosting n8n: when it is worth the trouble",
    excerpt:
      "Running your own n8n gives you data control and predictable costs, and hands you uptime, upgrades and backups. A straight look at both sides.",
    date: "2026-02-14",
    readingMinutes: 6,
    tags: ["n8n", "Infrastructure"],
    body: [
      {
        type: "p",
        text: "Self-hosting n8n is genuinely the right call for a lot of the companies we work with, and genuinely the wrong one for others. The deciding factor is rarely technical ability. It is whether anyone will own the thing after launch.",
      },
      { type: "h2", text: "The case for running it yourself" },
      {
        type: "p",
        text: "Three arguments carry real weight.",
      },
      {
        type: "ul",
        items: [
          "Data residency, customer records never leave infrastructure you control, which resolves most compliance conversations before they start",
          "Cost shape, you pay for a server, not per execution, so a workflow that fires ten thousand times a day costs the same as one that fires ten times",
          "No ceiling, execution time, payload size and concurrency are yours to configure rather than tiers to buy",
        ],
      },
      {
        type: "p",
        text: "The cost argument is the one people underestimate. High-frequency workflows on usage-priced platforms get expensive in a way that is hard to predict in advance, and impossible to reverse quickly once you depend on them.",
      },
      { type: "h2", text: "The case against" },
      {
        type: "p",
        text: "You are now running a production service. That means upgrades, certificate renewals, database backups you have actually tested restoring, and someone who notices when it stops.",
      },
      {
        type: "p",
        text: "The failure we see most often is not a server falling over. It is an n8n instance that was set up by someone who has since left, running a version two years old, with credentials nobody can rotate because nobody knows what would break.",
      },
      { type: "h2", text: "What a sane setup looks like" },
      {
        type: "ol",
        items: [
          "Postgres as the database, never the default SQLite, for anything beyond experimenting",
          "Queue mode with separate worker processes once you are running meaningful volume",
          "Automated encrypted backups of both the database and the encryption key, the key alone makes credentials recoverable",
          "A reverse proxy handling TLS, with the editor behind authentication and ideally not on the public internet",
          "Workflows exported to version control, so a broken change can be reverted like any other",
          "A staging instance, because testing a workflow change in production is testing it on your customers",
        ],
      },
      {
        type: "note",
        text: "Back up the encryption key separately from the database and verify a restore. A database backup without the key leaves you with a complete list of workflows and no working credentials.",
      },
      { type: "h2", text: "A reasonable middle path" },
      {
        type: "p",
        text: "Start on n8n Cloud. Build the workflows, prove they earn their keep, and find out what your real execution volume is. Move to self-hosted when either the bill or a compliance requirement makes the case for you.",
      },
      {
        type: "quote",
        text: "Self-host when you have a reason. Migrating later is a weekend; guessing wrong at the start costs months.",
      },
      {
        type: "p",
        text: "Either way, keep workflows in version control from day one. It is the decision that makes every subsequent decision reversible.",
      },
    ],
  },
];

export const POSTS_BY_DATE = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export function findPost(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
