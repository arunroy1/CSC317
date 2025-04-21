# Assignment 4 Submission

**Name:** Arun Roy  
**Student ID:** 924419103 

**GitHub Repository:**  
https://github.com/arunroy1/CSC317

**Live Demo:**  
https://arunroy1.github.io/CSC317/assignments/assignment-4/

---

## Part 1: JavaScript Calculator

I wanted to build a calculator that feels like the one you use on your phone—sleek, responsive, and easy to reach for simple math or quick conversions.

I started with the basics: addition, subtraction, multiplication, and division. From there, I added percentage, sign‑toggle (±), and clear/backspace functions so it behaves exactly how you’d expect. You can also type on your keyboard—numbers, operators, Enter for equals, Escape for clear, and Backspace to delete.

**Memory Features** 

- **M+**: stash the current result into memory  
- **M-**: subtract the current result from memory  
- **MR**: pull that stored value back onto the screen  
- **MC**: clear memory (and the button highlights when there’s something saved!)  

Just compute or enter a number, hit M+ or M–, and recall it anytime with MR. If there’s a value in memory, MC lights up to remind you.

I also made sure the calculator never runs unsafe code: before evaluating anything, it checks the expression contains only digits, operators, parentheses, and decimals.

---

## Part 2: Portfolio Integration

For this part, I brought my portfolio from Assignment 3 into a new folder and added a **Projects** section. The JavaScript Calculator is the first card:

- A snug thumbnail that scales for desktop and mobile  
- A brief, friendly description of what it does  
- A “Live Demo” link to open the calculator in a new tab  
- A “Back to Portfolio” link on the calculator page itself  

Everything sits neatly in `assignments/assignment-4/` with clear paths and files organized under `styles/`, `scripts/`, and `images/`.

---

## What I Learned

- **Balancing usability and security** by sanitizing input before using the Function constructor.  
- **CSS Grid magic** to create a compact layout where the zero button spans two columns and memory buttons blend in smoothly.  
- **Simple state management**—keeping track of `expression` and `memory` in JavaScript, then updating the UI with every change.

---

## Acknowledgments

Big thanks to MDN Web Docs for clear guides on CSS Grid, event handling, and safe eval patterns. And also thanks to Stack Overflow for the tips on memory button logic and keyboard support.  