# Retno Safinaeni — personal website guide

## Purpose and decisions

Build a bilingual personal website with two content pages:

- `/`: an introduction to Retno as a person, a product/project manager, and a Prudential insurance agent.
- `/prudential`: a focused introduction to Retno's insurance work and approach.

The future domain is `retnosafinaeni.com`. It is a planned domain, not a confirmed registration. Confirm the preferred spelling and spacing of Retno's display name before launch.

The central connection is a working habit: understand people, examine details, explain choices clearly, and follow through. Product/project work provides evidence of these habits. Insurance credentials and actual service practices provide separate evidence of insurance expertise.

Desired impression: approachable, thoughtful, meticulous, clear, contemporary, and trustworthy. Give visitors enough information to understand Retno without presenting a full résumé or an insurance catalogue.

## Reference direction

- Overall structure: [Adrian Sterling](https://adrian-sterling.framer.website/). Adapt the sequence of introduction, personal background, working process, evidence, and contact. Retain the restrained portrait size. Remove the large city backdrop and repeated sales sections.
- Insurance approach: [Marcus Whitfield](https://marcus-whitfield.framer.website/). Adapt its focus on a named person, an understandable process, and what a visitor can expect. Replace wealth-management framing with Retno's actual insurance role and scope.

These are design references, not purchased assets or permission to reproduce their source, photography, testimonials, claims, or distinctive layouts. Create an original implementation. Their fictional example statistics and credentials must never become Retno's content.

## How both pages fit together

Use one visual identity, one navigation system, and one conversational voice. The homepage introduces the whole person; the insurance page gives depth to one part of her work.

Homepage navigation: name/logo, About, Experience, Insurance, Contact, language toggle. About and Experience can be section links; Insurance opens `/prudential`. Keep the mobile navigation compact.

Insurance navigation: the same name/logo linking home, My Approach, Process, FAQ, Contact, language toggle. Section links stay on `/prudential`. Include a quiet “More about me” link back home.

Show both roles near the top of the homepage. Avoid making insurance feel like an unrelated banner added to a work portfolio. Give each role a clear card and destination: product/project experience scrolls to the work section; insurance opens its own page. Do not imply Retno offers freelance PM services unless confirmed.

Use a small portrait near the introduction, approximately 160–220 px wide on desktop and 96–144 px on mobile. A waist-up or candid environmental photograph also works in the About section. Avoid a full-screen face, stock advisor portraits, and cutout figures spanning the screen.

## Color and visual system

Use soft pink and sky blue as a shared atmosphere. They should support readable content rather than make every section a colorful panel.

| Token       | Value     | Intended use                                               |
| ----------- | --------- | ---------------------------------------------------------- |
| Canvas      | `#FAFAFC` | Main page background                                       |
| Surface     | `#FFFFFF` | Cards and readable content areas                           |
| Soft pink   | `#F9E4EE` | Small accents and diffuse background glows                 |
| Sky blue    | `#DFF0FC` | Secondary accents and calm section backgrounds             |
| Soft lilac  | `#EEE9FA` | Occasional bridge between pink and blue                    |
| Ink         | `#253244` | Headings and primary text                                  |
| Muted ink   | `#556477` | Supporting text; verify contrast in context                |
| Action blue | `#285C83` | Primary buttons and links                                  |
| Border      | `#E3E7EE` | Decorative card boundaries; not the sole control indicator |

Starting balance: roughly 75% neutral surfaces, 20% pale color, 5% stronger accents. A possible hero backdrop is `linear-gradient(125deg, #F9E4EE 0%, #FAFAFC 48%, #DFF0FC 100%)`, with most text over the neutral area. Check contrast over the actual gradient, not just the individual endpoint colors.

Homepage: pink and blue in balance. Insurance page: slightly more sky blue, with the same pink accents to preserve continuity. Use an approved Prudential logo only when an authorized asset is supplied; preserve its official colors. Do not repaint it pastel or let its presence suggest this is Prudential's corporate website.

Typography: use a restrained serif for major headings, such as Lora, paired with a clear sans serif such as Inter. Keep body text at least 16 px, line height around 1.6, and reading width around 60–70 characters. Prefer locally served fonts or a robust system fallback.

Use generous spacing, rounded cards around 20–28 px, fine borders, and restrained shadows. Futuristic character comes from slow diffuse gradients, subtle layered surfaces, and responsive hover states. Keep actual text surfaces mostly opaque. Avoid loading sequences, scroll hijacking, custom cursors, constant floating text, and decorative 3D objects competing with the story.

Motion: short 160–240 ms control feedback and restrained 300–500 ms entrances. Respect `prefers-reduced-motion`; content must remain visible without animation or JavaScript.

## Page 1 — introduction `/`

### 1. Hero: who I am

Show name, both roles, one clear headline, a two-sentence introduction, small portrait, and two actions: “Get to know me” and “Explore insurance support.” Avoid claiming to be a certified planner or independent advisor unless verified.

Draft Indonesian:

> Memahami kebutuhan. Merapikan detail. Membantu menentukan langkah.
>
> Saya Retno. Saya bekerja di bidang manajemen produk dan proyek, serta sebagai agen asuransi Prudential. Dalam keduanya, saya berusaha memahami kebutuhan, menjelaskan pilihan dengan jelas, dan menindaklanjuti setiap detail dengan saksama.

Draft English:

> Understanding people. Thinking through the details. Making the next step clearer.
>
> I'm Retno, a product and project manager and a Prudential insurance agent. Across both roles, I focus on understanding people's needs, explaining choices clearly, and following through on the details.

These are proposed positioning statements for Retno to review, not independently verified biography.

### 2. A little about me

A short first-person story connecting the two roles. Explain what Retno enjoys about understanding different perspectives and bringing clarity to complexity. Add two or three genuine personal details supplied by Retno: an interest, a small everyday habit, or what she cares about outside work. Do not invent hobbies, family circumstances, or motivations.

### 3. Two ways I work with people

Two equally considered cards:

- Product & projects: understanding needs, aligning people from different backgrounds, clarifying priorities, and coordinating delivery. Link to selected experience below.
- Insurance: understanding an individual's circumstances, explaining relevant options and limitations, and outlining the support Retno actually provides. Link to `/prudential`.

### 4. Selected experience

Two or three concise examples: situation → Retno's contribution → verified outcome. Favor an example of resolving ambiguity and an example of coordinating stakeholders. Allow expandable details or linked documents if available; do not create additional content pages by default. Show only information approved for public use. Omit invented metrics and confidential material.

### 5. How I approach things

Three compact principles, each grounded in an example or actual practice:

- Listen and clarify before proposing a solution.
- Work through details and explain trade-offs.
- Agree on next steps and follow through.

Include one or two genuine attributed recommendations if available and authorized. Omit the section if no evidence is supplied; do not display template quotes.

### 6. Contact

Offer distinct paths: a professional contact/LinkedIn link and an insurance conversation link. Keep the language welcoming. Show real destinations only; never ship a fake WhatsApp number or a button that silently does nothing.

## Page 2 — insurance `/prudential`

### 1. Hero: reassurance through clarity

State Retno's actual role and affiliation visibly. Use a small portrait and one primary action to ask a question or arrange a conversation.

Draft Indonesian:

> Pilihan proteksi lebih jelas, saat kebutuhan Anda dipahami.
>
> Saya Retno, agen asuransi Prudential. Saya ingin membantu Anda memahami pilihan proteksi, termasuk manfaat, biaya, dan ketentuannya, agar Anda punya dasar yang jelas sebelum mengambil keputusan.

Draft English:

> Clearer protection choices start with understanding your needs.
>
> I'm Retno, a Prudential insurance agent. My aim is to help you understand your protection options, including their benefits, costs, and terms, so you can make an informed decision.

Use these statements only after Retno confirms they accurately describe her work.

### 2. The person you will speak with

A short explanation of how Retno's product/project background shapes her preparation, questions, documentation, and communication. Pair this with supplied, current insurance credentials and an official verification destination where available. Keep corporate work experience distinct from insurance qualifications.

### 3. What we can discuss

Use three or four questions rather than a grid of products: what protection someone already has, what matters to them, what budget they are comfortable discussing, and what policy wording they want explained. Confirm the topics match Retno's scope. Avoid asking visitors to submit medical or financial details on the public website.

### 4. What the process looks like

1. Initial conversation: understand the questions and context.
2. Review: identify relevant options within Retno's scope.
3. Explanation: discuss benefits, premiums, exclusions, waiting periods, and other applicable terms using current approved materials.
4. Next steps and support: explain application and ongoing assistance that Retno actually offers.

Never promise acceptance, claim approval, guaranteed returns, or benefits beyond the policy. This is a website content requirement, not a statement of current regulatory requirements.

### 5. Evidence and useful answers

Show supplied credentials, a short explanation of actual support, and authorized testimonials if available. FAQ topics: what happens during a first conversation; whether someone can ask about existing coverage; what materials they should prepare; how to verify affiliation; and what support is available after purchase. Answers require Retno's input. Link official product materials rather than inventing policy summaries.

### 6. A low-pressure invitation

Suggested CTA: “Tanyakan dulu” / “Ask a question.” A secondary link can say “Kenali saya lebih dekat” / “More about me.” Use the confirmed contact channel. No artificial scarcity, countdowns, automatic popups, or repeated booking demands.

### 7. Identity and footer

Clearly identify this as Retno's personal website and accurately describe her relationship with the relevant Prudential entity. Confirm the entity, role wording, logo permissions, credential display, and applicable publication requirements before launch. Include verified official links. Do not present an unverified disclaimer as legally sufficient. If adding forms or analytics, determine the actual privacy requirements and data handling before enabling collection.

## Indonesian and English voice

Default to Indonesian. Use a visible `ID | EN` switch and translate the whole interface, including navigation, buttons, accessible labels, metadata, empty states, and validation messages. Avoid bilingual paragraphs displayed together.

Keep only two content pages. Suggested language URLs: `/` and `/prudential` for Indonesian, `/?lang=en` and `/prudential?lang=en` for English. Preserve the language when moving between pages; reload and direct links must work. Implement server-rendered or statically generated language output where the stack supports it. If separate language search indexing becomes a priority, revisit locale paths and canonical/hreflang handling deliberately.

Write Indonesian first and adapt English for the same meaning and warmth. Do not translate word for word. Use “saya” and “Anda” as the default public-facing Indonesian voice; keep sentence structure conversational. Avoid stiff phrases such as “solusi holistik,” “sinergi,” and “mengoptimalkan perjalanan Anda.” Use specific actions: memahami, menjelaskan, memeriksa, mendampingi. Avoid “pasti cair,” “tanpa risiko,” “terbaik,” or unsupported authority claims.

| Intent           | Indonesian            | English               |
| ---------------- | --------------------- | --------------------- |
| About            | Tentang saya          | About me              |
| Work             | Pengalaman & proyek   | Experience & projects |
| Insurance        | Asuransi bersama saya | Insurance with me     |
| Process          | Cara saya mendampingi | How I support you     |
| Contact          | Mari terhubung        | Let's connect         |
| Initial question | Tanyakan dulu         | Ask a question        |

Keep factual meaning identical between languages, especially role titles, credentials, availability, benefits, costs, limitations, and scope of support. Have Retno review both versions.

## Content needed from Retno

- Preferred public name, exact job titles, and approved short biography.
- Portrait and one optional candid photograph, with permission to use them.
- Two or three public-safe project examples, dates, contributions, and outcomes.
- Two or three real personal details she wants to share.
- Exact insurance affiliation/entity, current credentials, permitted public identifiers, and verification links.
- Confirmed service scope, process, after-purchase support, and FAQ answers.
- Authorized recommendations/testimonials with attribution approved by their authors.
- Professional contact links and insurance contact channel.
- Authorized brand assets and any applicable publishing guidance.

Missing content should be tracked in an editorial checklist. For a private draft, label placeholders clearly. Before public launch, remove unresolved sections or resolve their content; never publish fake facts or placeholder contact destinations.

## Acceptance criteria

- Two content pages with coherent navigation, shared identity, and working direct URLs.
- Both roles are immediately understandable on the homepage; `/prudential` focuses on insurance.
- Complete ID and EN content; no mixed-language interface or unsupported claims.
- Pink and sky blue remain visible but restrained; readable text and clear action hierarchy.
- Modest portrait size and meaningful personal details, with no fabricated biography.
- Useful evidence of care and competence, with professional and insurance credentials accurately distinguished.
- Works at 360 px, 390 px, 768 px, and 1440 px without horizontal scrolling or clipped text.
- Keyboard navigation, visible focus, semantic headings, meaningful alternative text, sufficient contrast, and reduced-motion support.
- No dead links, broken images, fake counters, placeholder testimonials, or unreviewed product claims.
- Review screenshots of both pages in both languages on mobile and desktop.
- Use appropriate targeted checks; record limitations and outstanding editorial decisions.
- Commit completed task changes after verification on the authorized branch; do not push or deploy without authorization.
