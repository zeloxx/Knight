# Knight Moves Challenge

### Instructions to run the program

<b>If TypeScript is installed on your machine just do the following:</b>

1. Open a terminal
2. Navigate to the root folder of the project
3. Run the following command:
   `ts-node index.ts`

<b>If you don't have TypeScript installed:</b>

1. Run the following command:
   `npm install`
2. Run the following command:
   `npm start`

## Problem Requirements & Constraints

Given a 2D matrix, the code should calculate how many total unique paths of 10 cells combinations within
the matrix using knight moves (9 moves, 10 cells visited) with those properties:

-   The starting cell can be any cell.
-   Every combination possible should be totaled.
-   Only knight moves are allowed.
-   No wrap around the matrix is permitted.
-   Combinations have those properties:
-   -   10 cells are visited, including starting cell.
-   -   Contains only 9 moves, not more, not less.
-   -   Each combination is unique.
-   -   There can be at most 2 vowels in any combination (in our case we consider
        Y a vowel, therefore vowels are A,E,I,O,U and Y.
-   -   Empty cells are just that, empty, therefore should not be considered a valid
        move landing.
-   -   Cells can be re-used as long as the constraint of total cells and uniqueness of
        the combination is enforced. Essentially, it is possible to have a combination
        of moves using the same 2 cells only.
        For those not familiar with chess, a knight move is made in one of the following ways, like
        on a chess board:
-   Move two steps horizontally and one step vertically
-   Move two steps vertically and one step horizontally

## Approach

We can draw a tree to visualize the recursive DFS process. Assuming we start at a position like [0,0] for example. From that position we have various potential moves that branch out from that position. There are 8 potential moves from the Knight piece, we can iterate over an array of knight move deltas to get the next potential position. If the position is outside the bounds of the grid or if the cell is null, that position would be invalid and we would not branch out from that new position, so we do nothing in this case. Otherwise, we recursively search the next position.

Eventually we will hit our base cases, which are:

-   We have counted 2 vowels in our current search path before reaching the 9th move, so we return 0.
-   We have reached the 9th move and we have not counted 2 vowels, so we return 1.

When the base cases are hit, the call stack will unwind and we will return to the previous recursive call the count which we will add to the total paths count. and so on and so forth up the stack until we reach the initial call.

## Time and Space Complexity

### Time Complexity is (O)m*n*8^d

-   m is the number of rows
-   n is the number of columns
-   d is the depth of the tree
-   8 is the number of potential moves from a knight piece

#### Explanation:

Each position can branch out potentially 8 times, so if our depth is 3, then we will have 8^3 = 512 potential paths to search. We must run this algorithm for each cell in the grid which is m\*n cells.

### Space Complexity is (O)n

-   n is the depth of the tree

#### Explanation:

In this implementation of DFS, we are only keeping track of a maximum depth of 9 moves throughout the recursion since the function calls are popped off the stack as the calls unwind when reaching the base case, so our space complexity is linear to the depth of the tree.
