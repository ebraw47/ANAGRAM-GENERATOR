# How Wordle Colors Work: Green, Yellow, and Gray Explained

Every Wordle helper is only as accurate as your reading of the tiles. This page explains **green**, **yellow**, and **gray** the way the game actually scores them — including the duplicate cases that break naive solvers.

## Green — right letter, right place

A green tile means:

- The letter appears in the answer
- It belongs in **this exact position**

In later guesses (and in hard mode), keep greens locked. In a [Wordle word finder](/), type greens into the matching position boxes.

## Yellow — right letter, wrong place

A yellow tile means:

- The letter appears in the answer at least once (accounting for other matches)
- It does **not** belong in the position where you just put it

Yellow is two clues. Players who only remember “letter is in the word” forget the ban and keep retrying the same square.

## Gray — no remaining match for that copy

Gray is the most misunderstood color.

- If your guess had **one** copy of a letter and it went gray, the answer usually does not contain that letter.
- If your guess had **two** copies and only one got color, the gray copy means there is **no extra** match left — not necessarily “letter absent.”

Greens are scored first, then yellows, then leftovers go gray. That ordering is why `SPEED` against an answer with one E can show mixed E colors.

## Keyboard colors remember your best result

The on-screen keyboard keeps the strongest feedback a letter has earned. Use it as a quick map of what is still worth testing — but trust the full grid when duplicates are involved.

## How to translate colors into finder inputs

| Tile | Finder action |
| --- | --- |
| Green A in slot 3 | Put A in green box 3 |
| Yellow R in slot 2 | Put R in yellow row under slot 2 |
| Gray T (single copy) | Add T to gray/absent letters |
| Gray E beside a yellow/green E | Do **not** mark E absent |

Walkthrough: [how to use a Wordle word finder](/how-to-use-a-wordle-word-finder).

## Practice examples (not today’s answer)

**Example A:** Guess `CRANE` → C gray, R yellow, A green, N gray, E yellow  
Means: slot 3 is A; R and E are present but not in slots 2 and 5; C and N are out.

**Example B:** Guess `ALLEY` vs answer pattern with one L  
One L may be yellow while the other is gray. L is still required once.

## Why color literacy beats spoilers

People search for “Wordle hints” when they really need cleaner reading of feedback. Once colors are clear, a finder becomes a precision tool instead of a crutch — and you avoid false exclusions that delete the real answer from your list.
