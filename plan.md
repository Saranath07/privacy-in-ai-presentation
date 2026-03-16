# Enhanced Plan: Privacy in Generative AI (90-min Interactive Workshop)

## Context
Audience: Data science students (small group, 5-20). They need a thorough ML/DL foundations intro before diving into privacy. Everything is a React presentation -- no Jupyter notebooks. All demos are animated React components. Heavy on meaningful animations, minimal text on slides. User will provide images as needed.

---

## Design Principles
- **Animation-first:** Every concept gets a visual animation, not bullet points. Text is minimal -- just key phrases.
- **No Jupyter/notebooks:** All "demos" (GPT-2 extraction, membership inference, DP model comparison) are animated React simulations with typewriter effects, animated charts, etc.
- **Interactive games** are React components with timers, inputs, and live calculations
- **Slide framework:** Use a React presentation library (e.g., Spectacle, reveal.js-react, or custom) with Framer Motion for animations

---

## Restructured Flow

### ACT 1: Hook + Foundations (0-20 min)

**[0-3 min] Opening Hook: "Watch This" -- Animated GPT-2 Extraction**
- React animation simulating a terminal/chat interface
- Typewriter effect: a prefix is typed in, then the model "generates" a real person's name, address, phone/fax number character by character
- Dramatic pause. Red highlight on the personal info as it appears.
- No explanation yet. Just: "We'll come back to why this happens."
- **Animation:** Terminal-style typing effect with cursor, text appearing character by character, PII highlighted in red with a pulse effect

**[3-18 min] ML/DL Foundations (Thorough, Animated)**

Each concept gets its own animated slide(s):

1. **Supervised Learning (3-6 min)**
   - Animation: Data points flow in from the left -> pass through a "black box" -> predictions come out on the right
   - Show f(x) = y with animated arrows
   - Examples animate in: email -> spam/not spam, image -> cat/dog
   - Audience question: "What other examples can you think of?"

2. **Deep Learning (6-10 min)**
   - Animation: The black box "opens up" to reveal layers of neurons
   - Neurons light up as data flows through them (forward pass animation)
   - Show how early layers detect simple patterns, deeper layers detect complex ones
   - Animation: image -> edge detection -> shapes -> faces (progressive feature extraction)

3. **Gradient Descent (10-14 min)**
   - Animation: A ball rolling down a landscape (loss surface), finding the valley
   - Each step: gradient arrow appears, ball moves, loss decreases
   - Show training loop animation: data in -> compute loss -> gradient -> update weights -> repeat
   - **Key animation:** Zoom into one gradient update -- show that the gradient "carries" information from the specific training example. Fingerprint visual: a gradient with a data-point's "stamp" on it.

4. **Generative AI (14-18 min)**
   - LLM animation: tokens appear one at a time, each conditioned on all previous tokens. Show the autoregressive "chain" building a sentence.
   - Diffusion animation: pure noise gradually denoises into a clear image (step by step)
   - Key point (animated text): "These models are trained on MASSIVE datasets. And they remember more than you'd think."

**[18-20 min] Bridge to Privacy**
- Animation: The neural network from earlier, but now "fingerprints" of training data are glowing inside the weights
- Zoom into one fingerprint -- it reveals a person's data
- Callback: replay the GPT-2 hook animation briefly
- Animated text: "The model memorized real data. Can we stop this?"

---

### ACT 2: The Privacy Problem (20-35 min)

**[20-22 min] Interactive Poll: "AI Art or Stolen Photo?"**
- Full-screen image display, one at a time
- Animated reveal: after audience votes, the "answer" slides in with a side-by-side comparison (generated vs. training image)
- Transition animation showing the pixel-similarity between them
- **React component:** Image carousel with flip/reveal animation, vote counter

**[22-24 min] "Why Not Just Use Safe Data?"**
- Animated scenario cards that flip in:
  - Card 1: "Hospital needs tumor detection AI" -- shows medical scan
  - Card 2: "The best training data? Real patient scans." -- HIPAA/GDPR badge appears
  - Card 3: "Off-the-shelf data causes distribution shift" -- animated chart showing accuracy drop
- Quick audience question before revealing

**[24-35 min] GAME 1: The De-Anonymization Challenge**
- **React component with animations:**
  - Left panel: Anonymized data table with rows that "pulse" when hovered
  - Right panel: Target bio cards that can be dragged or clicked to match
  - Countdown timer (4 min) with animated progress bar
  - When time's up: correct matches animate with green checkmarks, wrong ones with red X
  - Score reveal animation per group
- Reveal slide: Latanya Sweeney story with animated newspaper headline effect
- Key animated text: "Stripping names is NOT anonymization."
- *Need from user:* No images needed -- all data is text-based in styled tables/cards

---

### ACT 3: Attacks -- Become the Attacker (35-50 min)

**[35-38 min] Two Types of Attacks (Animated)**
- Split-screen animation:
  - Left: **Data Extraction** -- model icon with data literally "leaking" out of it (dripping animation)
  - Right: **Membership Inference** -- detective icon with magnifying glass examining model outputs
- Each animates in with a brief description (1-2 lines max)

**[38-47 min] GAME 2: Membership Inference Guessing Game**
- **React component with animations:**
  - Sentence cards fly in one at a time
  - Each card has an animated confidence bar that fills up (like a loading bar) to its score
  - Audience guesses (show of hands or click-to-vote if participants have devices)
  - Reveal animation: card flips to show "IN TRAINING DATA" (green) or "NOT IN TRAINING DATA" (red)
  - Round 2: group scoreboard with animated score tallying
- Pre-computed confidence scores embedded in the component
- Key animated text: "You attacked a model with nothing but its output."

**[47-50 min] Why Models Memorize**
- Animated scaling chart: as model size increases (animated bar growing), memorization rate climbs
- As training epochs increase (animated progress bar), memorization rate climbs
- Animated text: "This is fundamental. Not a bug."

---

### ACT 4: The Defense -- Inventing Privacy with Coins (50-70 min)

**[50-62 min] GAME 3: The Coin Flip Survey (Randomized Response) -- CENTERPIECE**

- **React component (heavily animated):**
  - Step 1: Sensitive question appears with dramatic animation
  - Step 2: Animated decision tree builds itself node by node:
    - First coin flip (animated coin spin) -> HEADS branch lights up -> "Tell the truth"
    - First coin flip -> TAILS branch lights up -> second coin flip (another spin)
    - Second flip -> HEADS -> "Raise hand" / TAILS -> "Keep down"
  - Step 3: After audience plays, presenter enters hand count into an input
  - Step 4: Animated calculation walkthrough:
    - Total hands raised: [number] (appears)
    - Forced Yes (~1/4 of total): [calculated] (subtracts out with animation)
    - Truthful Yes: [remainder] (highlights)
    - Estimated true %: [result] (big animated reveal with confidence band)
  - Step 5: "Plausible Deniability" text with lock icon animation
  - Can run multiple rounds -- results animate onto a convergence chart

- Run 2-3 rounds with different questions
- Small group mitigation: button to "simulate 100 virtual participants" with animated dot visualization

**[62-70 min] From Coins to Algorithms: Differential Privacy**

All visuals, minimal text:

- **Slide 1 -- The Core Idea:** Animation of two databases (one with your data, one without) -> both pass through an algorithm -> outputs are nearly identical (overlapping result animations)
- **Slide 2 -- The Two Curves:** Two Gaussian curves animate in, nearly overlapping. Label: "With your data" and "Without your data." When they overlap = private. Animate them separating = not private.
- **Slide 3 -- Epsilon Dial (Interactive):**
  - **React component:** A large draggable slider labeled "Privacy Dial"
  - Drag left (small epsilon): curves animate to overlap more, "STRONG PRIVACY" text pulses green
  - Drag right (large epsilon): curves animate apart, "WEAK PRIVACY" text pulses red
  - Real-time animation as user drags
- **Slide 4 -- Sensitivity:** Animation of one person's data entering -> output shifts by a small amount (animated arrow). "How much can one person move the answer?"
- **Slide 5 -- Adding Noise:** Animation of the coin-flip noise from the game, but now applied to an algorithm's output. Noise particles scatter around the output. "Calibrated noise hides the individual."
- For DS students: one slide briefly showing Laplace mechanism formula with animated noise curve, but keep it optional/quick

---

### ACT 5: The Solution -- DP-SGD & Animated Demo (70-87 min)

**[70-75 min] DP-SGD: Making Training Private (Animated)**
- Callback animation: the gradient fingerprint from ACT 1 reappears
- Three-step animation sequence:
  1. **Clip:** Scissors animation cutting oversized gradients down to a maximum norm. Fingerprints shrink to uniform size.
  2. **Noise:** Noise particles (like static) are sprinkled onto the aggregated gradient. The fingerprint becomes blurry/unreadable.
  3. **Budget:** An animated "privacy meter" (like a fuel gauge) that depletes with each training step. When it hits zero, training stops.
- Each step builds on the previous one in a continuous animation

**[75-82 min] Animated Demo: Attack Fails on DP Model**
- **React component (no Jupyter):**
  - Split-screen with animated charts
  - Left: "Standard Model" -- animated bar chart showing confidence scores. Training data bars are clearly taller. A red "VULNERABLE" badge pulses.
  - Right: "DP Model" -- same animated bar chart but bars are nearly uniform. A green "PROTECTED" shield animation.
  - Transition: The membership inference "detective" from ACT 3 tries to attack both. On the left, detective succeeds (checkmark). On the right, detective fails (confused animation, question marks).
- **Privacy-Utility Tradeoff chart:** Animated line chart showing loss vs. epsilon. As privacy strengthens (epsilon shrinks), loss increases slightly but memorization drops dramatically. Two animated lines diverging.

**[82-87 min] Group Discussion: "Where Would You Set the Dial?"**
- 3 scenario cards animate in one at a time:
  1. Hospital: tumor detection with patient scans
  2. Social media: recommendation model on user posts
  3. University: plagiarism detector on student submissions
- Each card has the epsilon slider from earlier -- audience discusses where they'd set it
- No right answers -- animated "spectrum" visualization showing different valid positions

---

### ACT 6: Wrap-up (87-90 min)

**[87-89 min] Narrative Recap -- Animated Timeline**
- A horizontal timeline animates across the screen, each milestone appearing with its icon:
  - "Model leaked a real address" (terminal icon)
  - "You de-anonymized records in 4 minutes" (detective icon)
  - "You attacked with just confidence scores" (chart icon)
  - "You invented DP with a coin flip" (coin icon)
  - "The attack failed on a DP model" (shield icon)
- Final animated text: "The question is no longer whether AI leaks data. It does. The question is whether we choose to do something about it."

**[89-90 min] Q&A + Resources**
- Animated resource links slide in

---

## Interactive Beats Summary

| Time | Type | Activity |
|------|------|----------|
| 0-3 | Animated Demo | GPT-2 extraction typewriter effect |
| 3-18 | Animated Lecture | ML/DL foundations with audience Q&A |
| 20-22 | Audience Poll | "AI art or stolen photo?" with flip reveals |
| 24-35 | Game 1 | De-anonymization challenge (drag & match) |
| 38-47 | Game 2 | Membership inference (confidence bar reveals) |
| 50-62 | Game 3 | Coin-flip randomized response (physical + animated) |
| 62-70 | Interactive Slider | Epsilon dial exploration |
| 75-82 | Animated Demo | DP model attack comparison |
| 82-87 | Discussion | "Where would you set the dial?" |

---

## React Components Needed

### Interactive Game Components
1. **GPT2ExtractionDemo** -- Terminal-style typewriter animation, PII highlight in red with pulse
2. **ImagePoll** -- Full-screen image carousel, vote counter, flip-reveal animation showing AI vs. real
3. **DeAnonymizationGame** -- Draggable/clickable matching interface, data table + bio cards, 4-min animated timer, score reveal
4. **MembershipInferenceGame** -- Sentence cards with animated confidence bars, flip-to-reveal, group scoreboard
5. **CoinFlipCalculator** -- Animated decision tree (coin spin animations), hand-count input, step-by-step arithmetic animation, convergence chart
6. **EpsilonDial** -- Large draggable slider with real-time animated Gaussian curves, privacy strength indicator

### Animated Visualization Components
7. **NeuralNetworkDiagram** -- Animated forward pass with lighting neurons, progressive feature extraction
8. **GradientDescentAnimation** -- Ball rolling on loss surface, gradient arrows, training loop
9. **AutoregressiveGeneration** -- Tokens appearing one by one in a chain
10. **DiffusionDenoising** -- Noise-to-image step animation
11. **GradientFingerprint** -- Gradient carrying a data "stamp", used in foundations and DP-SGD sections
12. **DPSGDSteps** -- Three-step animation (clip scissors, noise particles, privacy meter gauge)
13. **AttackComparison** -- Split-screen animated bar charts (standard vs. DP model), detective character animation
14. **PrivacyUtilityTradeoff** -- Animated dual-line chart (loss vs. memorization as epsilon changes)
15. **NarrativeTimeline** -- Horizontal animated timeline with milestone icons for recap

### Slide Infrastructure
16. **SlideLayout** -- Base slide component with consistent styling, transitions between slides
17. **AnimatedText** -- Text that fades/slides in with configurable timing (for key phrases, not paragraphs)
18. **ScenarioCard** -- Flip-in cards for discussion scenarios with embedded epsilon slider

---

## Images Needed from User
- Diffusion model forgery examples (AI-generated images + their training data matches) for the "AI Art or Stolen Photo?" poll
- (Optional) Medical scan examples for the "Why sensitive data?" section
- Everything else can be built with React animations, styled components, and SVG graphics

---

## Tech Stack
- **React** (Vite or CRA for scaffolding)
- **Framer Motion** for animations (or React Spring)
- **Presentation framework:** Spectacle (by Formidable) or custom slide navigation
- **Styling:** Tailwind CSS or styled-components
- **Charts:** Recharts or D3 for animated charts (confidence bars, tradeoff curves, Gaussian curves)
- **Math rendering:** KaTeX (lightweight) for occasional formulas

---

## Key Files
- `/Users/saranathp/privacy-in-ai-presentation/plan.md` -- Original plan (content reference)
- `/Users/saranathp/privacy-in-ai-presentation/lecture1.pdf` -- Source visuals reference

---

## Fallback Mitigations
- **GPT-2 demo:** It's an animation, not live inference -- no failure risk
- **Too few people for coin-flip stats:** "Simulate 100" button in CoinFlipCalculator
- **No coins:** React app coin-flip generator on each person's phone
- **Time overrun:** Discussion segment (82-87) is the buffer

---

## Verification
1. `npm run dev` -- navigate through all slides with keyboard arrows
2. Test each interactive component in isolation (timer, calculator, epsilon slider, polls)
3. Verify all animations are smooth (60fps target with Framer Motion)
4. Dry run the coin-flip game with test inputs
5. Full 90-min timing rehearsal
