# Wordle Repeated Letters: Why a Letter Can Still Turn Gray

Few Wordle moments confuse players more than this: you know a letter is in the word… and another copy of the same letter comes back **gray**. That is not a glitch. It is how Wordle budgets matches for duplicate letters — and it is one of the biggest content gaps weak solvers mishandle.

## The scoring order

Wordle roughly:

1. Awards **greens** first (exact position matches)  
2. Then awards **yellows** for remaining unmatched letters that still have unused copies in the answer  
3. Leaves extra guess letters **gray** once every copy in the answer is spoken for  

So gray means “no unmatched copy left,” not always “letter absent.”

## Classic example

Guess `SPEED` against an answer with a single E (for example a word like `SPEND` in practice puzzles):

- One E may receive color  
- The second E goes gray  

The gray E does **not** authorize you to eliminate E from the word. It tells you the answer does not need two Es.

## How this breaks naive Wordle helpers

A helper that only stores three bags — greens, includes, excludes — will often dump E into excludes because it saw a gray tile. That silently deletes the real answer.

A correct [Wordle word finder](/) protects letters that already appear as green or yellow and only excludes letters that are gray **without** a protected copy.

## How to enter duplicates in our finder

1. Enter every green copy in its slot.  
2. Enter yellow copies in the positions you tried.  
3. Add gray letters only when that letter has **no** green/yellow protection.  
4. If you need exactly two of a letter, you will see that requirement emerge from multiple green/yellow placements.

## Strategic takeaway

When the remaining list looks empty but your board “should” work, check duplicates first. Then check whether you accidentally gray-listed a letter that was also colored.

## Related guides

- [How Wordle colors work](/how-wordle-colors-work)  
- [How to use a Wordle word finder](/how-to-use-a-wordle-word-finder)  
- [Wordle strategy tips](/wordle-strategy-tips-and-tricks)  
