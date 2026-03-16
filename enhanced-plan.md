 Enhanced Plan: Privacy in Generative AI (90-min Interactive Workshop)

 Context

 Audience: Data science students (small group, 5-20). They need a thorough ML/DL foundations intro before diving into
 privacy. The presentation should be example-first, interactive, and run entirely locally. Built as a React slide
 deck.

 ---
 Restructured Flow

 ACT 1: Hook + Foundations (0-20 min)

 [0-3 min] Opening Hook: "Watch This"
 - Live local demo: Feed a prefix into GPT-2 (try running locally, ~500MB model) and watch it generate a real person's
  name, address, phone/fax number
 - Fallback: Pre-recorded GIF/video + screenshots if local inference is too slow
 - Say nothing theoretical. Just: "We'll come back to why this happens."

 [3-18 min] ML/DL Foundations (Thorough)
 - Supervised Learning: Start with the classic f(x) = y paradigm. Simple examples (spam detection, image
 classification). The model learns a mapping from inputs to outputs.
 - Deep Learning: Explain how neural networks learn representations automatically instead of hand-crafted features.
 Show a simple NN diagram. Layers extract increasingly abstract features.
 - Training & Gradient Descent: The model has parameters (weights). Training = finding weights that minimize errors.
 Loss function measures "how wrong." Gradients point toward "less wrong." Update weights step by step.
   - Crucial framing: "Each gradient carries information about the specific training example that produced it. Think
 of it as a fingerprint."
 - Generative AI: Transition to generative models. LLMs predict the next token given a prefix -- sequential decisions.
  Diffusion models learn to denoise images. Both are trained on massive datasets.
 - Keep this interactive: ask the audience questions throughout ("What do you think happens if we train longer?", "Why
  would a bigger model memorize more?")

 [18-20 min] Bridge to Privacy
 - "Now you know how models learn. They compress training data into weights. But what if someone can reverse-engineer
 those weights to extract the original data?"
 - Callback to the opening demo: "That's exactly what happened here."

 ---
 ACT 2: The Privacy Problem (20-35 min)

 [20-22 min] Interactive Poll: "AI Art or Stolen Photo?"
 - Show 6-8 images. Audience votes: AI-generated or real photograph?
 - Reveal: many AI images are near-pixel-perfect copies of training data (diffusion model forgery)

 [22-24 min] "Why Not Just Use Safe Data?"
 - Quick audience question: "So why don't companies just avoid sensitive data?" Take 2-3 answers.
 - Healthcare examples: TB detection, tumor detection need real patient scans (HIPAA/GDPR)
 - Models need in-domain data for robustness -- off-the-shelf data causes distribution shift

 [24-35 min] GAME 1: The De-Anonymization Challenge
 - Display a table of 10 "anonymized" records (age range, partial zip, gender, occupation, # children, favorite genre)
 - Display 5 target bios of fictional people with similar attributes
 - Pairs/small groups race to match bios to records -- 4 minute countdown timer
 - Most groups will match 4-5 out of 5
 - Reveal: "You just replicated Latanya Sweeney's 1997 attack -- she re-identified the Governor of Massachusetts from
 'anonymized' hospital records using just zip code, birthdate, and gender. Stripping names is NOT anonymization. In
 high-dimensional data, your behavior IS your identity."
 - React component: Two-panel layout, countdown timer, answer submission form

 ---
 ACT 3: Attacks -- Become the Attacker (35-50 min)

 [35-38 min] Formalizing the Threats (Brief)
 - Two types of attacks, explained simply:
   a. Data Extraction/Reconstruction: The model literally spits out training data (the GPT-2 demo)
   b. Membership Inference: Can you tell if a specific person's data was used to train the model?

 [38-47 min] GAME 2: Membership Inference Guessing Game
 - Pre-computed confidence scores from a simple text model (no live model needed -- scores embedded in slides)
 - Show sentences with the model's confidence scores
 - Round 1 (calibration): 4 sentences -- 2 were in training data, 2 were not. Audience guesses. Reveal: model is
 suspiciously confident on memorized data.
 - Round 2 (competition): Groups get 3 new sentences + scores. They vote. Tally results.
 - Key line: "You just attacked a model with nothing but its output. No hacking. No code. Just reading confidence
 scores."
 - React component: Sentence cards with confidence bars, reveal animation, group scoreboard

 [47-50 min] Why Models Memorize
 - Brief explanation tying back to foundations: larger models = more capacity = more memorization. More training =
 more memorization. Show the scaling chart (memorization increases with model size).
 - "This isn't a bug in one model. It's a fundamental property of how neural networks learn."

 ---
 ACT 4: The Defense -- Inventing Privacy with Coins (50-70 min)

 [50-62 min] GAME 3: The Coin Flip Survey (Randomized Response) -- CENTERPIECE ACTIVITY

 Everyone needs a coin (bring extras or use phone random generators).

 Display a mildly sensitive yes/no question, e.g.:
 - "Have you ever submitted an assignment past the deadline and lied about it?"
 - "Have you ever copied code from StackOverflow without understanding it?"

 Protocol (animated step-by-step on screen):
 1. Flip your coin secretly. Don't show anyone.
 2. If HEADS: answer the question TRUTHFULLY (raise hand for Yes, keep down for No)
 3. If TAILS: flip again secretly
   - Second HEADS -> raise hand (regardless of truth)
   - Second TAILS -> keep hand down (regardless of truth)
 4. Presenter counts raised hands

 Walk-through (collaborative arithmetic on screen, not a formula):
 - "I see 9 of 16 hands raised."
 - "About 1/4 of you (the Tails-then-Heads group, ~4 people) were forced to say Yes regardless."
 - "So ~5 truthful Yeses out of ~8 people who actually answered truthfully = ~62%."
 - "But I have NO IDEA which of you actually did it. You have plausible deniability."

 Key insight on screen: "Hide the individual. Preserve the population statistic. This IS differential privacy."

 Run 2-3 rounds with different questions to show the estimates converge.

 Small group mitigation: If <8 people, also run a simulated version with 100 virtual participants to show convergence.

 React component: Animated decision tree, hand-count input, computes estimated %, shows confidence interval

 [62-70 min] From Coins to Algorithms: Differential Privacy
 - The formal idea (intuition, not formula): "A private algorithm ensures that adding or removing ONE person's data
 barely changes the output."
 - Visual: Two overlapping probability curves -- one with your data, one without. If they nearly overlap, the
 algorithm is private.
 - Epsilon = the privacy dial: Small epsilon = curves overlap = strong privacy. Large epsilon = curves apart = weak
 privacy.
 - Sensitivity: "How much can one person's data move the answer? If a lot, you need more noise."
 - Noise addition: "Just like the coin flip added randomness to your answer, we add calibrated noise to the
 algorithm's output."
 - For DS students: can briefly mention Laplace/Gaussian mechanism at a high level, but focus on the intuition
 - React component: Interactive epsilon slider that animates the two curves separating/overlapping

 ---
 ACT 5: The Solution -- DP-SGD & Demo (70-87 min)

 [70-75 min] DP-SGD: Making Training Private
 - Callback: "Remember -- gradients are fingerprints of training data. To make training private, we need to smudge
 those fingerprints."
 - Three steps (animated):
   a. Clip: Bound each example's gradient -- no single example gets too much influence (limits sensitivity)
   b. Noise: Add calibrated noise to the aggregated gradient (the coin flip for gradients)
   c. Privacy Accountant: Track cumulative privacy spend across training steps. Stop when budget runs out.
 - For DS students: briefly show the connection to the epsilon budget from the previous section

 [75-82 min] Live Demo: Attack Fails on DP-Trained Model
 - Local notebook, side-by-side comparison:
   - Normal model: run membership inference -- clear gap in confidence between training and non-training data
   - DP-trained model: run same attack -- confidence scores are indistinguishable. Attack fails.
 - Show the privacy-utility tradeoff chart: "DP model has slightly higher loss, but memorization drops by an order of
 magnitude. That's the deal."

 [82-87 min] Group Discussion: "Where Would You Set the Dial?"
 - 3 scenarios on screen:
   a. A hospital building a tumor detection model with patient scans
   b. A social media company training a recommendation model on user posts
   c. A university training a plagiarism detector on student submissions
 - Each group picks an epsilon setting (strong/medium/weak privacy) and defends their choice
 - No right answers -- the tradeoff is ultimately a policy decision, not just technical

 ---
 ACT 6: Wrap-up (87-90 min)

 [87-89 min] Narrative Recap (one slide)
 - "We watched a model leak a real person's address"
 - "You de-anonymized 'private' records in under 4 minutes"
 - "You attacked a model just by reading confidence scores"
 - "You invented differential privacy with a coin flip"
 - "And you saw it work -- the attack failed on a DP model"
 - Closing: "The question is no longer whether AI leaks data. It does. The question is whether we choose to do
 something about it."

 [89-90 min] Q&A + Resources
 - Links to key papers, OpenDP library, further reading

 ---
 Interactive Beats Summary

 ┌───────┬───────────────────────┬─────────────────────────────────────┐
 │ Time  │         Type          │              Activity               │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 0-3   │ Live Demo             │ GPT-2 extraction (hook)             │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 3-18  │ Lecture (interactive) │ ML/DL foundations with audience Q&A │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 20-22 │ Audience Poll         │ "AI art or stolen photo?"           │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 24-35 │ Game 1                │ De-anonymization challenge (pairs)  │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 38-47 │ Game 2                │ Membership inference guessing game  │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 50-62 │ Game 3                │ Coin-flip randomized response       │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 75-82 │ Live Demo             │ DP model attack comparison          │
 ├───────┼───────────────────────┼─────────────────────────────────────┤
 │ 82-87 │ Discussion            │ "Where would you set the dial?"     │
 └───────┴───────────────────────┴─────────────────────────────────────┘

 Interactive or demo moment every 8-12 minutes. Longest passive stretch is the foundations lecture (15 min), but it's
 kept interactive with audience questions throughout.

 ---
 React Components Needed

 1. PollSlide -- Image display + show-of-hands tally (AI art or stolen photo)
 2. DeAnonymizationGame -- Two-panel layout: anonymized data table + target bios, countdown timer, answer form
 3. MembershipInferenceGame -- Sentence cards with confidence bars, reveal animation, group scoreboard
 4. CoinFlipCalculator -- Animated decision tree, hand-count input, estimated percentage + confidence interval
 5. EpsilonDial -- Interactive slider controlling two overlapping Gaussian curves in real time
 6. DPModelComparison -- Side-by-side confidence score charts (normal vs. DP model)
 7. Standard slide components -- Title slides, content slides with bullet points, image slides, diagram slides

 ---
 Key Files

 - /Users/saranathp/privacy-in-ai-presentation/plan.md -- Original plan (reference for content)
 - /Users/saranathp/privacy-in-ai-presentation/lecture1.pdf -- Source visuals (GPT-2 attack slides 2-3, diffusion
 forgery slide 4, DP curves slides 5-9, tradeoff charts slides 10/16, healthcare slide 14)

 ---
 Fallback Mitigations

 - GPT-2 local demo too slow: Pre-record a GIF/video, or show screenshots with narration
 - Too few people for coin-flip stats: Run 3 rounds + supplement with simulated 100-participant version in React
 - No coins: Phone-based random number generator, or React app generates private coin flips per participant
 - Membership inference live model too complex: Pre-compute all confidence scores, embed in slides (already the
 default plan)
 - Time overrun: Discussion segment (82-87) is the primary buffer -- can shrink to 3 min or cut

 ---
 Verification

 1. Build the React app and navigate through all slides in order
 2. Test each interactive component (timer, calculator, epsilon slider, poll)
 3. Dry run the coin-flip game with test data to verify arithmetic display
 4. Verify local GPT-2 notebook runs (or confirm fallback is ready)
 5. Time a full dry run of the 90-min flow