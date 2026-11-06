# How to Use a Wordle Word Finder: Green, Yellow & Gray Clues

A **Wordle word finder** is useful the moment you have at least one colored tile and still feel stuck. This guide walks through the exact workflow used by ranking solvers — green locks, yellow position bans, and gray exclusions — so your shortlist matches the board you actually see.

## What you need before you open a finder

1. Your latest Wordle grid (or a clear memory of it)
2. Every green letter and its position
3. Every yellow letter **and** the positions where it already failed
4. Gray letters that are truly absent (watch duplicates — see below)

If you only remember “R is somewhere,” you will over-filter or under-filter. Yellow without a banned position is incomplete information.

## Step 1 — Enter green letters by position

Green means the letter is in the answer **and** in that exact slot. In the [Wordle word finder](/), type each green letter into the matching box (1–5).

Example: if slot 1 is green **S** and slot 5 is green **E**, every surviving word must look like `S _ _ _ E`.

Leave unknown slots empty. Empty means “wildcard,” not “space.”

## Step 2 — Add yellow letters where you tried them

Yellow means two constraints at once:

- The letter **must appear** somewhere in the word
- The letter is **not** in the position you just tried

That is the content gap many weak tools leave open. Ranking helpers (and our finder) let you place a yellow letter in the slot where it appeared so the position is banned automatically.

If the same letter has been yellow in two different slots, ban both. Stacking those exclusions is often what turns a 40-word list into five.

## Step 3 — List gray letters carefully

Gray usually means “not in the word.” Enter those letters in the absent box.

**Exception:** repeated letters. If you guessed `SPEED` and one **E** is yellow while the other is gray, the letter E is still present — you simply do not have two copies. Do **not** put E in the gray box in that case. Our finder also protects letters that already appear as green or yellow so a mistaken gray cannot wipe them out. Full explanation: [Wordle repeated letters](/wordle-repeated-letters-explained).

## Step 4 — Read the candidate list like a strategist

Once the list appears:

1. Check the **count**. Under ~20 words, you can often commit. Above ~50, prefer a scout guess.
2. Use **hot letters** — letters that appear most often across remaining words.
3. Prefer candidates with **new information** early; prefer **plausible answers** late.

Toggle **Common words only** when you want likely daily answers. Turn it off when you need obscure scout words the game still accepts as guesses.

## Worked mini-example

Suppose your board gave you:

- Green: `_ A _ E _`
- Yellow: **R** tried in slot 1
- Gray: `S T L N`

Enter `A` in position 2, `E` in position 4, place `R` in the yellow row under slot 1, and type `STLN` as gray. The finder keeps words that contain A and E in those slots, contain R somewhere other than slot 1, and avoid S/T/L/N.

## Common mistakes that break a Wordle helper

- Putting a yellow letter only in an “includes” field without banning its failed position
- Marking a duplicate letter gray when another copy was green/yellow
- Forcing early greens into guess two instead of scouting new letters ([second-guess strategy](/wordle-second-guess-strategy))
- Expecting the tool to reveal today’s official answer — good finders never do that

## Hard mode note

In [hard mode](/wordle-hard-mode-guide), every later guess must reuse greens and include yellows. The finder still works the same way; you simply choose from the remaining candidates instead of inventing an unrelated scout word.

## Quick checklist

- [ ] Greens locked in exact slots
- [ ] Yellows entered with wrong-position bans
- [ ] Grays exclude only unprotected letters
- [ ] Common-only toggle matches your goal (answer vs scout)
- [ ] Next guess targets hot letters or commits to a shortlist

Open the live tool on the [homepage](/) and practice on a finished puzzle from yesterday — you will feel how fast accurate constraints shrink the dictionary.
